const User = require('../models').User;
const VerificationToken = require('../models').VerificationToken;
import crypto from 'crypto-random-string';
import sendVerificationEmail from '../services/sendVerificationEmail';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

class UserController {

    async logIn(req, res){
        try {
            let user = await User.findOne({where: {email: req.body.email}})
            if(user !== null && user.isVerified === true && bcrypt.compare(req.body.password, user.password)){
                jwt.sign({user}, process.env.SECRET_KEY,  { expiresIn: '3600s'} , (err, token) => {
                    res.json({
                        token,
                        id: user.id,
                        name: user.name,
                        role: user.role
                    });              
                });
            }
            else if(user !== null && user.isVerified === false){
                res.status(400).send("Is not verified yet");
            }
            else {
                res.status(400).json({message: "User not found"});
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async singUp(req, res){
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10);

            let user = await User.create(req.body);

            let verify = await VerificationToken.create({
                UserId: user.id,
                token: crypto({length: 10})
            });

            await sendVerificationEmail(user.email, verify.token);

            res.status(200).json({message: "success"})
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async verifyRegistration(req, res){
        try {
            let user = await User.findOne({where : { email : req.query.email }});

            if(user.isVerified){
                return res.status(202).json({message: `Email Already Verified`});
            }
            
            let foundToken = await VerificationToken.findOne( { where : { token: req.query.token } } )

            if(foundToken){
                const uptdatedUser = await user.update({isVerified: true})
                await foundToken.destroy();
                return res.status(200).json({message: `User with ${user.email} has been verified`});
            }

        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getAll(req, res){
        try {
            let response = await User.findAll({});

            res.status(200).json({response});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async deleteById(req, res){
        try {
            let response = await User.findByPk(req.params.id);
            
            await response.destroy();

            res.status(200).json({deleted: response});

        } catch (error) {
            res.status(400).send(error.message);
        }
    }

}

export default new UserController;
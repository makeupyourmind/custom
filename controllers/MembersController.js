import { Member } from '../models';
import { Ship } from '../models';

class MembersController{
    
    async create(req, res){
        try {
            let response = await Member.create({...req.body, ShipId: req.params.shipId});

            res.status(200).json({response});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getAll(req, res) {
        try {
            let response = await Member.findAll({
                include: [{
                    model: Ship,
                    as: "Ship"
                }]
            });

            res.status(200).json({response});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getById(req, res){
        try {
            let response = await Member.findByPk(req.params.id, {
                include: [{
                    model: Ship,
                    as: "Ship"
                }]
            });
            if(response === null){
                return res.status(404).json({message: 'Member Not found'});
            }

            res.status(200).json({response});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async updateById(req, res){
        try {
            let response = await Member.findOne({
                where: {
                    id: req.params.id
                }
            })

            if(response === null){
                return res.status(404).json({message: 'Member Not found'});
            }

            await response.update(req.body);

            res.status(200).json({message: 'Updated successfully.'});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async deleteById(req, res){
        try {
            let response = await Member.findOne({
                where: {
                    id: req.params.id
                }
            })

            if(response === null){
                return res.status(404).json({message: 'Member Not found'});
            }

            await response.destroy();

            res.status(200).json({ message: 'Deleted successfully.'});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new MembersController;
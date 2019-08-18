
import { Ship } from '../models';
import { Member } from '../models';

class ShipController{

    async getAll(req, res) {
        try {
            let response = await Ship.findAll({
                include: [{
                    model: Member,
                    as: "members"
                }]
            });

            res.status(200).json({response});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getById(req, res){
        try {
            let response = await Ship.findByPk(req.params.id, {
                include: [{
                    model: Member,
                    as: "members"
                }]
            });
            if(response === null){
                return res.status(404).json({message: 'Ship Not found'});
            }

            res.status(200).json({response});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }


    async create(req, res){
        try {
            let response = await Ship.create(req.body);

            res.status(200).json({response});
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async deleteById(req, res){
        try {
            let response = await Ship.findByPk(req.params.id, {
                include: [{
                    model: Member,
                    as: "members"
                }]
            });
            if(!response){
               return res.status(404).json({message: 'Not found'});
            }

            await response.destroy()

            res.status(200).json({message: 'Deleted successfully.'});
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async updateById(req, res){
        try {
            let response = await Ship.findByPk(req.params.id, {
                include: [{
                    model: Member,
                    as: "members"
                }]
            });
            if(!response){
               return res.status(404).json({message: 'Not found'});
            }

            await response.update(req.body);

            res.status(200).json({message: 'Updated successfully.'});
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}

export default new ShipController;
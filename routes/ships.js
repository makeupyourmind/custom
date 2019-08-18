import express from 'express';
import ShipController from '../controllers/ShipController';
const router = express.Router();

router.get('/', ShipController.getAll);

router.get('/:id', ShipController.getById)

router.post('/', ShipController.create);

router.delete('/:id', ShipController.deleteById);

router.patch('/:id', ShipController.updateById);

export default router;
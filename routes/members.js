import express from 'express';
import MembersController from '../controllers/MembersController';
const router = express.Router();

router.post('/:shipId', MembersController.create);

router.get('/', MembersController.getAll);

router.get('/:id', MembersController.getById);

router.patch('/:id', MembersController.updateById)

router.delete('/:id', MembersController.deleteById)

export default router;
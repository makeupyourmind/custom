import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController';
import verifyTokenAvailable from '../middleware/tokenAvailable';
import verifyRole from '../middleware/verifyRole';
import {Roles} from '../helpers/roles';

router.post('/login', UserController.logIn);

router.post('/signUp', UserController.singUp);

router.post('/verifyRegistration', UserController.verifyRegistration);

router.get('/:id', UserController.getById);

router.get('/', verifyTokenAvailable, verifyRole(Roles.Admin), UserController.getAll);

router.delete('/:id', verifyTokenAvailable, verifyRole(Roles.Admin), UserController.deleteById);

export default router;
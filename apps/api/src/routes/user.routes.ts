import { Router } from 'express';
import { container } from '../inversify/inversify.config';
import { TYPES } from '../inversify/types';
import { IUserController } from '../controllers/user.controller.interface';

const userController = container.get<IUserController>(TYPES.IUserController);

const router = Router();

router.get('/', userController.getAllUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));

export default router;

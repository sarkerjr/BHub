import { Router } from 'express';
import { TYPES } from '../inversify/types';
import { IAuthController } from '../controllers/auth.controller.interface';
import { container } from '../inversify/inversify.config';

const authController = container.get<IAuthController>(TYPES.IAuthController);

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;

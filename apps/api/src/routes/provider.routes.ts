import { Router } from 'express';
import { TYPES } from '../inversify/types';
import { IProviderController } from '../controllers/provider.controller.interface';
import { container } from '../inversify/inversify.config';

const providerController = container.get<IProviderController>(
  TYPES.IProviderController
);

const router = Router();

router.post('/', providerController.processProviders.bind(providerController));
router.get('/', providerController.getAllProviders.bind(providerController));
router.get('/:id', providerController.getProviderById.bind(providerController));

export default router;

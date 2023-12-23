import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { EquipmentValidation } from './equipment.validation';
import { EquipmentController } from './equipment.controller';

const router = express.Router();

// create
router.get(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(EquipmentValidation.create),
  EquipmentController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), EquipmentController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), EquipmentController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(EquipmentValidation.update),
  EquipmentController.updateSingle
);

export const EquipmentRoutes = router;

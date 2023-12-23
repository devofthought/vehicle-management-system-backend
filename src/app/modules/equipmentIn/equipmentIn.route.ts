import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { EquipmentInValidation } from './equipmentIn.validation';
import { EquipmentInController } from './equipmentIn.controller';

const router = express.Router();

// create
router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(EquipmentInValidation.create),
  EquipmentInController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), EquipmentInController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), EquipmentInController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(EquipmentInValidation.update),
  EquipmentInController.updateSingle
);

// delete single
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  EquipmentInController.deleteSingle
);

export const EquipmentInRoutes = router;

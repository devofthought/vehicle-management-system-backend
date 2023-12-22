import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { VehicleValidation } from './vehicle.validation';
import { VehicleController } from './vehicle.controller';

const router = express.Router();

// create
router.get(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(VehicleValidation.create),
  VehicleController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), VehicleController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), VehicleController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(VehicleValidation.update),
  VehicleController.updateSingle
);

// inactive
router.patch(
  '/:id/inactive',
  auth(ENUM_USER_ROLE.ADMIN),
  VehicleController.inactive
);

export const VehicleRoutes = router;

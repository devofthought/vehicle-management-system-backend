import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { VehicleValidation } from './vehicle.validation';
import { VehicleController } from './vehicle.controller';

const router = express.Router();

// create
router.post(
  '/create',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.DRIVER,
    ENUM_USER_ROLE.HELPER
  ),
  validateRequest(VehicleValidation.create),
  VehicleController.create
);

// get all
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.DRIVER,
    ENUM_USER_ROLE.HELPER
  ),
  VehicleController.getAll
);

// get single
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.DRIVER,
    ENUM_USER_ROLE.HELPER
  ),
  VehicleController.getSingle
);

// update single
router.patch(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.DRIVER,
    ENUM_USER_ROLE.HELPER
  ),
  validateRequest(VehicleValidation.update),
  VehicleController.updateSingle
);

// inactive
router.patch(
  '/:id/inactive',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.DRIVER,
    ENUM_USER_ROLE.HELPER
  ),
  VehicleController.inactive
);

export const VehicleRoutes = router;

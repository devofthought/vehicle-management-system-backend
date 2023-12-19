import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// create super admin
router.post(
  '/create-super-admin',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createSuperAdmin),
  UserController.createSuperAdmin
);

// create admin
router.post(
  '/create-admin',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createAdmin),
  UserController.createAdmin
);

// create driver
router.post(
  '/create-driver',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createDriver),
  UserController.createDriver
);

// create helper
router.post(
  '/create-helper',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createHelper),
  UserController.createHelper
);

export const UserRoutes = router;

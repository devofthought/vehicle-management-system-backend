import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { SuperAdminValidation } from './superAdmin.validation';
import { SuperAdminController } from './superAdmin.controller';

const router = express.Router();

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), SuperAdminController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), SuperAdminController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(SuperAdminValidation.update),
  SuperAdminController.updateSingle
);

// inactive
router.patch(
  '/:id/inactive',
  auth(ENUM_USER_ROLE.ADMIN),
  SuperAdminController.inactive
);

export const SuperAdminRoutes = router;

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.controller';

const router = express.Router();

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), AdminController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), AdminController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AdminValidation.update),
  AdminController.updateSingle
);

// inactive
router.patch(
  '/:id/inactive',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.inactive
);

export const AdminRoutes = router;

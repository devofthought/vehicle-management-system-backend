import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { HelperValidation } from './helper.validation';
import { HelperController } from './helper.controller';

const router = express.Router();

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), HelperController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), HelperController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(HelperValidation.update),
  HelperController.updateSingle
);

// inactive
router.patch(
  '/:id/inactive',
  auth(ENUM_USER_ROLE.ADMIN),
  HelperController.inactive
);

export const HelperRoutes = router;

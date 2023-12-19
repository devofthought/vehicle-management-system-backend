import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { DriverValidation } from './driver.validation';
import { DriverController } from './driver.controller';

const router = express.Router();

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), DriverController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), DriverController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(DriverValidation.update),
  DriverController.updateSingle
);

// inactive
router.patch(
  '/:id/inactive',
  auth(ENUM_USER_ROLE.ADMIN),
  DriverController.inactive
);

export const DriverRoutes = router;

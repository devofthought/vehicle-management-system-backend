import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FuelTypeValidation } from './fuelType.validation';
import { FuelTypeController } from './fuelType.controller';

const router = express.Router();

// create
router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FuelTypeValidation.create),
  FuelTypeController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), FuelTypeController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), FuelTypeController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FuelTypeValidation.update),
  FuelTypeController.updateSingle
);

export const FuelTypeRoutes = router;

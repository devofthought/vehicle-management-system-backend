import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FuelStationValidation } from './fuelStation.validation';
import { FuelStationController } from './fuelStation.controller';

const router = express.Router();

// create
router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FuelStationValidation.create),
  FuelStationController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), FuelStationController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), FuelStationController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FuelStationValidation.update),
  FuelStationController.updateSingle
);

export const FuelStationRoutes = router;

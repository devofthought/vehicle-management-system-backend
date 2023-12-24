import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { TripValidation } from './trip.validation';
import { TripController } from './trip.controller';

const router = express.Router();

// create
router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(TripValidation.create),
  TripController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), TripController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), TripController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(TripValidation.update),
  TripController.updateSingle
);

// delete single
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), TripController.deleteSingle);

export const TripRoutes = router;

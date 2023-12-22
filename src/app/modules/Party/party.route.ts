import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { PartyValidation } from './party.validation';
import { PartyController } from './party.controller';

const router = express.Router();

// create
router.get(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(PartyValidation.create),
  PartyController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), PartyController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), PartyController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(PartyValidation.update),
  PartyController.updateSingle
);

// inactive
router.patch(
  '/:id/inactive',
  auth(ENUM_USER_ROLE.ADMIN),
  PartyController.inactive
);

export const PartyRoutes = router;

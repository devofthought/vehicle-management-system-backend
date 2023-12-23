import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { AccountHeadValidation } from './accountHead.validation';
import { AccountHeadController } from './accountHead.controller';

const router = express.Router();

// create
router.get(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AccountHeadValidation.create),
  AccountHeadController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), AccountHeadController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), AccountHeadController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AccountHeadValidation.update),
  AccountHeadController.updateSingle
);

export const AccountHeadRoutes = router;

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { AccountTypeValidation } from './accountType.validation';
import { AccountTypeController } from './accountType.controller';

const router = express.Router();

// create
router.get(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AccountTypeValidation.create),
  AccountTypeController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), AccountTypeController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), AccountTypeController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AccountTypeValidation.update),
  AccountTypeController.updateSingle
);

export const AccountTypeRoutes = router;

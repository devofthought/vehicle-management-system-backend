import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ExpenseValidation } from './expense.validation';
import { ExpenseController } from './expense.controller';

const router = express.Router();

// create
router.get(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ExpenseValidation.create),
  ExpenseController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), ExpenseController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), ExpenseController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ExpenseValidation.update),
  ExpenseController.updateSingle
);

// delete
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ExpenseController.deleteSingle
);

export const ExpenseRoutes = router;

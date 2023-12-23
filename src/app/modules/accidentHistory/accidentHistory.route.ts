import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { AccidentHistoryValidation } from './accidentHistory.validation';
import { AccidentHistoryController } from './accidentHistory.controller';

const router = express.Router();

// create
router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AccidentHistoryValidation.create),
  AccidentHistoryController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), AccidentHistoryController.getAll);

// get single
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AccidentHistoryController.getSingle
);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AccidentHistoryValidation.update),
  AccidentHistoryController.updateSingle
);

// delete single
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AccidentHistoryController.deleteSingle
);

export const AccidentHistoryRoutes = router;

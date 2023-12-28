import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { UomValidation } from './uom.validation';
import { UomController } from './uom.controller';

const router = express.Router();

// create
router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UomValidation.create),
  UomController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UomController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UomController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UomValidation.update),
  UomController.updateSingle
);

export const UomRoutes = router;

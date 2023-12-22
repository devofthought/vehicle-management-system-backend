import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ModelValidation } from './model.validation';
import { ModelController } from './model.controller';

const router = express.Router();

// create
router.get(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ModelValidation.create),
  ModelController.create
);

// get all
router.get('/', auth(ENUM_USER_ROLE.ADMIN), ModelController.getAll);

// get single
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), ModelController.getSingle);

// update single
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ModelValidation.update),
  ModelController.updateSingle
);

export const ModelRoutes = router;

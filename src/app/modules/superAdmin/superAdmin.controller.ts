import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { SuperAdminService } from './superAdmin.service';
import { SuperAdmin } from '@prisma/client';
import pick from '../../../shared/pick';
import { superAdminFilterableFields } from './superAdmin.constant';
import { paginationFields } from '../../../constants/pagination';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, superAdminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await SuperAdminService.getAll(filters, paginationOptions);

  sendResponse<SuperAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Super Admins retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SuperAdminService.getSingle(id);

  sendResponse<SuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Super Admin retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await SuperAdminService.updateSingle(id, data);

  sendResponse<SuperAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Super Admin Updated Successfully',
    data: result,
  });
});

// inactive
const inactive = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SuperAdminService.inactive(id);

  sendResponse<SuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Super Admin Inactive successfully',
    data: result,
  });
});

export const SuperAdminController = {
  getAll,
  getSingle,
  updateSingle,
  inactive,
};

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AdminService } from './admin.service';
import { Admin } from '@prisma/client';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constant';
import { paginationFields } from '../../../constants/pagination';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AdminService.getAll(filters, paginationOptions);

  sendResponse<Admin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminService.getSingle(id);

  sendResponse<Admin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await AdminService.updateSingle(id, data);

  sendResponse<Admin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin Updated Successfully',
    data: result,
  });
});

// inactive
const inactive = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminService.inactive(id);

  sendResponse<Admin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Inactive successfully',
    data: result,
  });
});

export const AdminController = {
  getAll,
  getSingle,
  updateSingle,
  inactive,
};

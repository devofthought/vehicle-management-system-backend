import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { HelperService } from './helper.service';
import { Helper } from '@prisma/client';
import pick from '../../../shared/pick';
import { helperFilterableFields } from './helper.constant';
import { paginationFields } from '../../../constants/pagination';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, helperFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await HelperService.getAll(filters, paginationOptions);

  sendResponse<Helper[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Helpers retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await HelperService.getSingle(id);

  sendResponse<Helper>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Helper retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await HelperService.updateSingle(id, data);

  sendResponse<Helper>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Helper Updated Successfully',
    data: result,
  });
});

// inactive
const inactive = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await HelperService.inactive(id);

  sendResponse<Helper>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Helper Inactive successfully',
    data: result,
  });
});

export const HelperController = {
  getAll,
  getSingle,
  updateSingle,
  inactive,
};

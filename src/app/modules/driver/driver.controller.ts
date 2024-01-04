import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { DriverService } from './driver.service';
import { Driver } from '@prisma/client';
import pick from '../../../shared/pick';
import { driverFilterableFields } from './driver.constant';
import { paginationFields } from '../../../constants/pagination';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, driverFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await DriverService.getAll(filters, paginationOptions);

  sendResponse<Driver[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Drivers retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DriverService.getSingle(id);

  sendResponse<Driver>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await DriverService.updateSingle(id, data);

  sendResponse<Driver>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Driver Updated Successfully',
    data: result,
  });
});

// inactive
const inactive = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DriverService.inactive(id);

  sendResponse<Driver>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver Inactive successfully',
    data: result,
  });
});

export const DriverController = {
  getAll,
  getSingle,
  updateSingle,
  inactive,
};

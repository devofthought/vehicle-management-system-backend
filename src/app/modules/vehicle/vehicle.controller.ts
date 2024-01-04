import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Vehicle } from '@prisma/client';
import pick from '../../../shared/pick';
import { vehicleFilterableFields } from './vehicle.constant';
import { paginationFields } from '../../../constants/pagination';
import { VehicleService } from './vehicle.service';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await VehicleService.create(data);

  sendResponse<Vehicle>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vehicle Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, vehicleFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await VehicleService.getAll(filters, paginationOptions);

  sendResponse<Vehicle[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vehicles retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await VehicleService.getSingle(id);

  sendResponse<Vehicle>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vehicle retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await VehicleService.updateSingle(id, data);

  sendResponse<Vehicle>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vehicle Updated Successfully',
    data: result,
  });
});

// inactive
const inactive = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await VehicleService.inactive(id);

  sendResponse<Vehicle>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vehicle Inactive successfully',
    data: result,
  });
});

export const VehicleController = {
  create,
  getAll,
  getSingle,
  updateSingle,
  inactive,
};

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FuelTypeService } from './fuelType.service';
import { FuelType } from '@prisma/client';
import pick from '../../../shared/pick';
import { fuelTypeFilterableFields } from './fuelType.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await FuelTypeService.create(data);

  sendResponse<FuelType>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fuel Type Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, fuelTypeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FuelTypeService.getAll(filters, paginationOptions);

  sendResponse<FuelType[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Types retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FuelTypeService.getSingle(id);

  sendResponse<FuelType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Type retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await FuelTypeService.updateSingle(id, data);

  sendResponse<FuelType>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fuel Type Updated Successfully',
    data: result,
  });
});

export const FuelTypeController = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

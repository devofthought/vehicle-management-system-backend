import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FuelService } from './fuel.service';
import { Fuel } from '@prisma/client';
import pick from '../../../shared/pick';
import { fuelFilterableFields } from './fuel.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await FuelService.create(data);

  sendResponse<Fuel>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fuel Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, fuelFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FuelService.getAll(filters, paginationOptions);

  sendResponse<Fuel[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuels retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FuelService.getSingle(id);

  sendResponse<Fuel>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await FuelService.updateSingle(id, data);

  sendResponse<Fuel>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fuel Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FuelService.deleteSingle(id);

  sendResponse<Fuel>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Deleted successfully',
    data: result,
  });
});

export const FuelController = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};

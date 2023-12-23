import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FuelStationService } from './fuelStation.service';
import { FuelStation } from '@prisma/client';
import pick from '../../../shared/pick';
import { fuelStationFilterableFields } from './fuelStation.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await FuelStationService.create(data);

  sendResponse<FuelStation>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fuel Station Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, fuelStationFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FuelStationService.getAll(filters, paginationOptions);

  sendResponse<FuelStation[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Stations retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FuelStationService.getSingle(id);

  sendResponse<FuelStation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Station retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await FuelStationService.updateSingle(id, data);

  sendResponse<FuelStation>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fuel Station Updated Successfully',
    data: result,
  });
});

export const FuelStationController = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

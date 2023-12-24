import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { MaintenanceService } from './maintenance.service';
import { Maintenance } from '@prisma/client';
import pick from '../../../shared/pick';
import { maintenanceFilterableFields } from './maintenance.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const { equipmentUses, ...otherData } = req.body;

  const result = await MaintenanceService.create(otherData, equipmentUses);

  sendResponse<Maintenance>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Maintenance Created Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, maintenanceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await MaintenanceService.getAll(filters, paginationOptions);

  sendResponse<Maintenance[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Maintenances retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await MaintenanceService.getSingle(id);

  sendResponse<Maintenance>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Maintenance retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { equipmentUses, ...otherData } = req.body;

  const result = await MaintenanceService.updateSingle(
    id,
    otherData,
    equipmentUses
  );

  sendResponse<Maintenance>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Maintenance Updated Successfully',
    data: result,
  });
});

// delete single
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await MaintenanceService.deleteSingle(id);

  sendResponse<Maintenance>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Maintenance Deleted successfully',
    data: result,
  });
});

export const MaintenanceController = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { MaintenanceHeadService } from './maintenanceHead.service';
import { MaintenanceHead } from '@prisma/client';
import pick from '../../../shared/pick';
import { maintenanceHeadFilterableFields } from './maintenanceHead.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await MaintenanceHeadService.create(data);

  sendResponse<MaintenanceHead>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Maintenance Head Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, maintenanceHeadFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await MaintenanceHeadService.getAll(
    filters,
    paginationOptions
  );

  sendResponse<MaintenanceHead[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Maintenance Heads retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await MaintenanceHeadService.getSingle(id);

  sendResponse<MaintenanceHead>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Maintenance Head retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await MaintenanceHeadService.updateSingle(id, data);

  sendResponse<MaintenanceHead>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Maintenance Head Updated Successfully',
    data: result,
  });
});

export const MaintenanceHeadController = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

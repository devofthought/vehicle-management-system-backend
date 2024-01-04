import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { EquipmentInService } from './equipmentIn.service';
import { EquipmentIn } from '@prisma/client';
import pick from '../../../shared/pick';
import { equipmentInFilterableFields } from './equipmentIn.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await EquipmentInService.create(data);

  sendResponse<EquipmentIn>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Equipment In Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, equipmentInFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await EquipmentInService.getAll(filters, paginationOptions);

  sendResponse<EquipmentIn[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Equipment Ins retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await EquipmentInService.getSingle(id);

  sendResponse<EquipmentIn>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Equipment In retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await EquipmentInService.updateSingle(id, data);

  sendResponse<EquipmentIn>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Equipment In Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await EquipmentInService.deleteSingle(id);

  sendResponse<EquipmentIn>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Equipment In Deleted successfully',
    data: result,
  });
});

export const EquipmentInController = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};

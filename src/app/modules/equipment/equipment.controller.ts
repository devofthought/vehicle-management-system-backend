import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { EquipmentService } from './equipment.service';
import { Equipment } from '@prisma/client';
import pick from '../../../shared/pick';
import { equipmentFilterableFields } from './equipment.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await EquipmentService.create(data);

  sendResponse<Equipment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Equipment Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, equipmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await EquipmentService.getAll(filters, paginationOptions);

  sendResponse<Equipment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Equipments retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await EquipmentService.getSingle(id);

  sendResponse<Equipment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Equipment retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await EquipmentService.updateSingle(id, data);

  sendResponse<Equipment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Equipment Updated Successfully',
    data: result,
  });
});

export const EquipmentController = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

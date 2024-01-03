import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ModelService } from './model.service';
import { Model } from '@prisma/client';
import pick from '../../../shared/pick';
import { modelFilterableFields } from './model.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await ModelService.create(data);

  sendResponse<Model>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Model Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, modelFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ModelService.getAll(filters, paginationOptions);

  sendResponse<Model[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Models retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ModelService.getSingle(id);

  sendResponse<Model>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Model retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ModelService.updateSingle(id, data);

  sendResponse<Model>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Model Updated Successfully',
    data: result,
  });
});

export const ModelController = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

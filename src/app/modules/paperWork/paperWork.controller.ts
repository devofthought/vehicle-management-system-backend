import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { PaperWorkService } from './paperWork.service';
import { PaperWork } from '@prisma/client';
import pick from '../../../shared/pick';
import { paperWorkFilterableFields } from './paperWork.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await PaperWorkService.create(data);

  sendResponse<PaperWork>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Paper Work Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, paperWorkFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await PaperWorkService.getAll(filters, paginationOptions);

  sendResponse<PaperWork[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Accident Histories retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PaperWorkService.getSingle(id);

  sendResponse<PaperWork>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Paper Work retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await PaperWorkService.updateSingle(id, data);

  sendResponse<PaperWork>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Paper Work Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PaperWorkService.deleteSingle(id);

  sendResponse<PaperWork>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Paper Work Deleted successfully',
    data: result,
  });
});

export const PaperWorkController = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};

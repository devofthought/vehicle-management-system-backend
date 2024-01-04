import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AccidentHistoryService } from './accidentHistory.service';
import { AccidentHistory } from '@prisma/client';
import pick from '../../../shared/pick';
import { accidentHistoryFilterableFields } from './accidentHistory.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await AccidentHistoryService.create(data);

  sendResponse<AccidentHistory>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Accident History Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, accidentHistoryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AccidentHistoryService.getAll(
    filters,
    paginationOptions
  );

  sendResponse<AccidentHistory[]>(res, {
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

  const result = await AccidentHistoryService.getSingle(id);

  sendResponse<AccidentHistory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Accident History retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await AccidentHistoryService.updateSingle(id, data);

  sendResponse<AccidentHistory>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Accident History Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AccidentHistoryService.deleteSingle(id);

  sendResponse<AccidentHistory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Accident History Deleted successfully',
    data: result,
  });
});

export const AccidentHistoryController = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};

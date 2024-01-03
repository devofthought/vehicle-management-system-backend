import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { UomService } from './uom.service';
import { Uom } from '@prisma/client';
import pick from '../../../shared/pick';
import { uomFilterableFields } from './uom.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await UomService.create(data);

  sendResponse<Uom>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Uom Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, uomFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UomService.getAll(filters, paginationOptions);

  sendResponse<Uom[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Uom retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UomService.getSingle(id);

  sendResponse<Uom>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Uom retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await UomService.updateSingle(id, data);

  sendResponse<Uom>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Uom Updated Successfully',
    data: result,
  });
});

export const UomController = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

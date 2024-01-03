import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Party } from '@prisma/client';
import pick from '../../../shared/pick';
import { partyFilterableFields } from './party.constant';
import { paginationFields } from '../../../constants/pagination';
import { PartyService } from './party.service';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await PartyService.create(data);

  sendResponse<Party>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Party Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, partyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await PartyService.getAll(filters, paginationOptions);

  sendResponse<Party[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Parties retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PartyService.getSingle(id);

  sendResponse<Party>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Party retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await PartyService.updateSingle(id, data);

  sendResponse<Party>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Party Updated Successfully',
    data: result,
  });
});

// inactive
const inactive = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PartyService.inactive(id);

  sendResponse<Party>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Party Inactive successfully',
    data: result,
  });
});

export const PartyController = {
  create,
  getAll,
  getSingle,
  updateSingle,
  inactive,
};

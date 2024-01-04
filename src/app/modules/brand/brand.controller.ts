import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { BrandService } from './brand.service';
import { Brand } from '@prisma/client';
import pick from '../../../shared/pick';
import { brandFilterableFields } from './brand.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await BrandService.create(data);

  sendResponse<Brand>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brand Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, brandFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BrandService.getAll(filters, paginationOptions);

  sendResponse<Brand[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brands retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BrandService.getSingle(id);

  sendResponse<Brand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await BrandService.updateSingle(id, data);

  sendResponse<Brand>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brand Updated Successfully',
    data: result,
  });
});

export const BrandController = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

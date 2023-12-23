import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ExpenseHeadService } from './expenseHead.service';
import { ExpenseHead } from '@prisma/client';
import pick from '../../../shared/pick';
import { expenseHeadFilterableFields } from './expenseHead.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await ExpenseHeadService.create(data);

  sendResponse<ExpenseHead>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Expense Head Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, expenseHeadFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ExpenseHeadService.getAll(filters, paginationOptions);

  sendResponse<ExpenseHead[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense Heads retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ExpenseHeadService.getSingle(id);

  sendResponse<ExpenseHead>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense Head retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ExpenseHeadService.updateSingle(id, data);

  sendResponse<ExpenseHead>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Expense Head Updated Successfully',
    data: result,
  });
});

export const ExpenseHeadController = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ExpenseService } from './expense.service';
import { Expense } from '@prisma/client';
import pick from '../../../shared/pick';
import { expenseFilterableFields } from './expense.constant';
import { paginationFields } from '../../../constants/pagination';

// create
const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await ExpenseService.create(data);

  sendResponse<Expense>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Expense Added Successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, expenseFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ExpenseService.getAll(filters, paginationOptions);

  sendResponse<Expense[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expenses retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ExpenseService.getSingle(id);

  sendResponse<Expense>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ExpenseService.updateSingle(id, data);

  sendResponse<Expense>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Expense Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ExpenseService.deleteSingle(id);

  sendResponse<Expense>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Expense Deleted successfully',
    data: result,
  });
});

export const ExpenseController = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};

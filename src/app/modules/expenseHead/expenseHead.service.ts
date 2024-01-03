import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { ExpenseHead, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IExpenseHeadFilters } from './expenseHead.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { expenseHeadSearchableFields } from './expenseHead.constant';

// create
const create = async (data: ExpenseHead): Promise<ExpenseHead | null> => {
  const result = await prisma.expenseHead.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IExpenseHeadFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ExpenseHead[]>> => {
  const { searchTerm, isTripExpense } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: expenseHeadSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (isTripExpense) {
    andConditions.push({
      isTripExpense: isTripExpense === 'true' ? true : false,
    });
  }

  const whereConditions: Prisma.ExpenseHeadWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.expenseHead.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.expenseHead.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

// get single
const getSingle = async (id: string): Promise<ExpenseHead | null> => {
  const result = await prisma.expenseHead.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<ExpenseHead>
): Promise<ExpenseHead | null> => {
  // check is exist
  const isExist = await prisma.expenseHead.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ExpenseHead Not Found');
  }

  const result = await prisma.expenseHead.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update ExpenseHead');
  }

  return result;
};

export const ExpenseHeadService = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

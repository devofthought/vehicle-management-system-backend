import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { AccidentHistory, AccidentPaymentStatus, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IAccidentHistoryFilters } from './accidentHistory.interface';
import { accidentHistorySearchableFields } from './accidentHistory.constant';

// create
const create = async (
  data: AccidentHistory
): Promise<AccidentHistory | null> => {
  // find account head
  const findIncomeHead = await prisma.accountHead.findFirst({
    where: { label: 'Accidental Income' },
  });

  const findExpenseHead = await prisma.accountHead.findFirst({
    where: { label: 'Accidental Income' },
  });

  if (!findIncomeHead || !findExpenseHead) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'First setup your account');
  }

  // set account head
  if (data.paymentStatus === AccidentPaymentStatus.Received) {
    data.accountHeadId = findIncomeHead.id;
  } else if (data.paymentStatus === AccidentPaymentStatus.Paid) {
    data.accountHeadId = findExpenseHead.id;
  }

  const result = await prisma.accidentHistory.create({
    data,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IAccidentHistoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<AccidentHistory[]>> => {
  const { searchTerm, startDate, endDate, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: accidentHistorySearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (startDate) {
    andConditions.push({
      date: {
        gte: new Date(`${startDate}, 00:00:00`),
      },
    });
  }

  if (endDate) {
    andConditions.push({
      date: {
        lte: new Date(`${endDate}, 23:59:59`),
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions: Prisma.AccidentHistoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.accidentHistory.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      vehicle: true,
      driver: true,
    },
  });

  const total = await prisma.accidentHistory.count({
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
const getSingle = async (id: string): Promise<AccidentHistory | null> => {
  const result = await prisma.accidentHistory.findUnique({
    where: {
      id,
    },
    include: {
      vehicle: true,
      driver: true,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<AccidentHistory>
): Promise<AccidentHistory | null> => {
  // check is exist
  const isExist = await prisma.accidentHistory.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Accident History Not Found');
  }

  const result = await prisma.accidentHistory.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to Update Accident History'
    );
  }

  return result;
};

// delete single
const deleteSingle = async (id: string): Promise<AccidentHistory | null> => {
  // check is exist
  const isExist = await prisma.accidentHistory.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Accident History Not Found');
  }

  const result = await prisma.accidentHistory.delete({
    where: {
      id,
    },
  });

  return result;
};

export const AccidentHistoryService = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};

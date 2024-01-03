import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { PaperWork, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaperWorkFilters } from './paperWork.interface';
import { paperWorkSearchableFields } from './paperWork.constant';

// create
const create = async (data: PaperWork): Promise<PaperWork | null> => {
  // find expense head
  const findHead = await prisma.accountHead.findFirst({
    where: { label: 'Paper Expense' },
  });

  if (!findHead) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'First setup your account');
  }
  // set account head
  data.accountHeadId = findHead.id;

  const result = await prisma.paperWork.create({
    data,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IPaperWorkFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<PaperWork[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: paperWorkSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions: Prisma.PaperWorkWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.paperWork.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      vehicle: true,
    },
  });

  const total = await prisma.paperWork.count({
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
const getSingle = async (id: string): Promise<PaperWork | null> => {
  const result = await prisma.paperWork.findUnique({
    where: {
      id,
    },
    include: {
      vehicle: true,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<PaperWork>
): Promise<PaperWork | null> => {
  // check is exist
  const isExist = await prisma.paperWork.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Paper Work Not Found');
  }

  const result = await prisma.paperWork.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Paper Work');
  }

  return result;
};

// delete single
const deleteSingle = async (id: string): Promise<PaperWork | null> => {
  // check is exist
  const isExist = await prisma.paperWork.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Paper Work Not Found');
  }

  const result = await prisma.paperWork.delete({
    where: {
      id,
    },
  });

  return result;
};

export const PaperWorkService = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};

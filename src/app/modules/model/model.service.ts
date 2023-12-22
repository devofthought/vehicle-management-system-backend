import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Model, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IModelFilters } from './model.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { modelSearchableFields } from './model.constant';

// create
const create = async (data: Model): Promise<Model | null> => {
  const result = await prisma.model.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IModelFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Model[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: modelSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.ModelWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.model.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.model.count({
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
const getSingle = async (id: string): Promise<Model | null> => {
  const result = await prisma.model.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Model>
): Promise<Model | null> => {
  // check is exist
  const isExist = await prisma.model.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Model Not Found');
  }

  const result = await prisma.model.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Model');
  }

  return result;
};

export const ModelService = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

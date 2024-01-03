import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Brand, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IBrandFilters } from './brand.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { brandSearchableFields } from './brand.constant';

// create
const create = async (data: Brand): Promise<Brand | null> => {
  const result = await prisma.brand.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IBrandFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Brand[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: brandSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.BrandWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.brand.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.brand.count({
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
const getSingle = async (id: string): Promise<Brand | null> => {
  const result = await prisma.brand.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Brand>
): Promise<Brand | null> => {
  // check is exist
  const isExist = await prisma.brand.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand Not Found');
  }

  const result = await prisma.brand.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Brand');
  }

  return result;
};

export const BrandService = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

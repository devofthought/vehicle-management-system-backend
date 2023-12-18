import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { SuperAdmin, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { ISuperAdminFilters } from './superAdmin.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { superAdminSearchableFields } from './superAdmin.constant';

// get all
const getAll = async (
  filters: ISuperAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<SuperAdmin[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: superAdminSearchableFields.map(field => ({
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
        [field]: value === 'true' ? true : value === 'false' ? false : value,
      })),
    });
  }

  const whereConditions: Prisma.SuperAdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.superAdmin.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.superAdmin.count({
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
const getSingle = async (id: string): Promise<SuperAdmin | null> => {
  const result = await prisma.superAdmin.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<SuperAdmin>
): Promise<SuperAdmin | null> => {
  // check is exist
  const isExist = await prisma.superAdmin.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Super Admin Not Found');
  }

  const result = await prisma.superAdmin.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Super Admin');
  }

  return result;
};

// inactive
const inactive = async (id: string): Promise<SuperAdmin | null> => {
  // check is exist
  const isExist = await prisma.superAdmin.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Super Admin Not Found');
  }

  const result = await prisma.superAdmin.update({
    where: {
      id,
    },
    data: { isActive: false },
  });

  return result;
};

export const SuperAdminService = {
  getAll,
  getSingle,
  updateSingle,
  inactive,
};

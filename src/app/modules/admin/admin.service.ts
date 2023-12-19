import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Admin, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IAdminFilters } from './admin.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { adminSearchableFields } from './admin.constant';

// get all
const getAll = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Admin[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map(field => ({
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

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.admin.count({
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
const getSingle = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Admin>
): Promise<Admin | null> => {
  // check is exist
  const isExist = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not Found');
  }

  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Admin');
  }

  return result;
};

// inactive
const inactive = async (id: string): Promise<Admin | null> => {
  // check is exist
  const isExist = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not Found');
  }

  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: { isActive: false },
  });

  return result;
};

export const AdminService = {
  getAll,
  getSingle,
  updateSingle,
  inactive,
};

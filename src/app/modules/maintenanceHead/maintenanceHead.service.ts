import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { MaintenanceHead, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IMaintenanceHeadFilters } from './maintenanceHead.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { maintenanceHeadSearchableFields } from './maintenanceHead.constant';

// create
const create = async (
  data: MaintenanceHead
): Promise<MaintenanceHead | null> => {
  const result = await prisma.maintenanceHead.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IMaintenanceHeadFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<MaintenanceHead[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: maintenanceHeadSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.MaintenanceHeadWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.maintenanceHead.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.maintenanceHead.count({
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
const getSingle = async (id: string): Promise<MaintenanceHead | null> => {
  const result = await prisma.maintenanceHead.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<MaintenanceHead>
): Promise<MaintenanceHead | null> => {
  // check is exist
  const isExist = await prisma.maintenanceHead.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MaintenanceHead Not Found');
  }

  const result = await prisma.maintenanceHead.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to Update MaintenanceHead'
    );
  }

  return result;
};

export const MaintenanceHeadService = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

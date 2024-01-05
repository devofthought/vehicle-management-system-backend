import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Driver, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IDriverFilters } from './driver.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { driverSearchableFields } from './driver.constant';

// get all
const getAll = async (
  filters: IDriverFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Driver[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: driverSearchableFields.map(field => ({
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

  const whereConditions: Prisma.DriverWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.driver.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.driver.count({
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
const getSingle = async (id: string): Promise<Driver | null> => {
  const result = await prisma.driver.findUnique({
    where: {
      id,
    },
    include: {
      vehicles: true,
      trips: true,
      fuels: true,
      maintenances: true,
      accidentHistories: true,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Driver>
): Promise<Driver | null> => {
  // check is exist
  const isExist = await prisma.driver.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver Not Found');
  }

  const result = await prisma.driver.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Driver');
  }

  return result;
};

// inactive
const inactive = async (id: string): Promise<Driver | null> => {
  // check is exist
  const isExist = await prisma.driver.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver Not Found');
  }

  const result = await prisma.driver.update({
    where: {
      id,
    },
    data: { isActive: false },
  });

  return result;
};

export const DriverService = {
  getAll,
  getSingle,
  updateSingle,
  inactive,
};

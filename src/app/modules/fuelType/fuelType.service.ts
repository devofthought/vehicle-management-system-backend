import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { FuelType, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IFuelTypeFilters } from './fuelType.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { fuelTypeSearchableFields } from './fuelType.constant';

// create
const create = async (data: FuelType): Promise<FuelType | null> => {
  const result = await prisma.fuelType.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IFuelTypeFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<FuelType[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: fuelTypeSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.FuelTypeWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.fuelType.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.fuelType.count({
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
const getSingle = async (id: string): Promise<FuelType | null> => {
  const result = await prisma.fuelType.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<FuelType>
): Promise<FuelType | null> => {
  // check is exist
  const isExist = await prisma.fuelType.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fuel Type Not Found');
  }

  const result = await prisma.fuelType.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Fuel Type');
  }

  return result;
};

export const FuelTypeService = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { FuelStation, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IFuelStationFilters } from './fuelStation.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { fuelStationSearchableFields } from './fuelStation.constant';

// create
const create = async (data: FuelStation): Promise<FuelStation | null> => {
  const result = await prisma.fuelStation.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IFuelStationFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<FuelStation[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: fuelStationSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.FuelStationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.fuelStation.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.fuelStation.count({
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
const getSingle = async (id: string): Promise<FuelStation | null> => {
  const result = await prisma.fuelStation.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<FuelStation>
): Promise<FuelStation | null> => {
  // check is exist
  const isExist = await prisma.fuelStation.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fuel Station Not Found');
  }

  const result = await prisma.fuelStation.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Fuel Station');
  }

  return result;
};

export const FuelStationService = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

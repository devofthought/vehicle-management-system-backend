import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Fuel, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IFuelFilters } from './fuel.interface';
import { fuelSearchableFields } from './fuel.constant';

// create
const create = async (data: Fuel): Promise<Fuel | null> => {
  const result = await prisma.fuel.create({
    data,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IFuelFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Fuel[]>> => {
  const { searchTerm, startDate, endDate, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: fuelSearchableFields.map(field => ({
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

  const whereConditions: Prisma.FuelWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.fuel.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      vehicle: true,
      driver: true,
      fuelType: true,
      fuelStation: true,
    },
  });

  const total = await prisma.fuel.count({
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
const getSingle = async (id: string): Promise<Fuel | null> => {
  const result = await prisma.fuel.findUnique({
    where: {
      id,
    },
    include: {
      vehicle: true,
      driver: true,
      fuelType: true,
      fuelStation: true,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Fuel>
): Promise<Fuel | null> => {
  // check is exist
  const isExist = await prisma.fuel.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fuel Not Found');
  }

  const result = await prisma.fuel.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Fuel');
  }

  return result;
};

// delete single
const deleteSingle = async (id: string): Promise<Fuel | null> => {
  // check is exist
  const isExist = await prisma.fuel.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fuel Not Found');
  }

  const result = await prisma.fuel.delete({
    where: {
      id,
    },
  });

  return result;
};

export const FuelService = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};

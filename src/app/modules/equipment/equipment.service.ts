import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Equipment, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IEquipmentFilters } from './equipment.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { equipmentSearchableFields } from './equipment.constant';

// create
const create = async (data: Equipment): Promise<Equipment | null> => {
  const result = await prisma.equipment.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IEquipmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Equipment[]>> => {
  const { searchTerm, uomId } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: equipmentSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (uomId) {
    andConditions.push({
      uomId,
    });
  }

  const whereConditions: Prisma.EquipmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.equipment.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.equipment.count({
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
const getSingle = async (id: string): Promise<Equipment | null> => {
  const result = await prisma.equipment.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Equipment>
): Promise<Equipment | null> => {
  // check is exist
  const isExist = await prisma.equipment.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Equipment Not Found');
  }

  const result = await prisma.equipment.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Equipment');
  }

  return result;
};

export const EquipmentService = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

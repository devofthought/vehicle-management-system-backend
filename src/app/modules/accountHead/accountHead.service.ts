import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { AccountHead, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IAccountHeadFilters } from './accountHead.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { accountHeadSearchableFields } from './accountHead.constant';

// create
const create = async (data: AccountHead): Promise<AccountHead | null> => {
  const result = await prisma.accountHead.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all
const getAll = async (
  filters: IAccountHeadFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<AccountHead[]>> => {
  const { searchTerm, accountTypeId } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: accountHeadSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (accountTypeId) {
    andConditions.push({
      accountTypeId,
    });
  }

  const whereConditions: Prisma.AccountHeadWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.accountHead.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      accountType: true,
    },
  });

  const total = await prisma.accountHead.count({
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
const getSingle = async (id: string): Promise<AccountHead | null> => {
  const result = await prisma.accountHead.findUnique({
    where: {
      id,
    },
    include: {
      accountType: true,
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<AccountHead>
): Promise<AccountHead | null> => {
  // check is exist
  const isExist = await prisma.accountHead.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AccountHead Not Found');
  }

  const result = await prisma.accountHead.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update AccountHead');
  }

  return result;
};

export const AccountHeadService = {
  create,
  getAll,
  getSingle,
  updateSingle,
};

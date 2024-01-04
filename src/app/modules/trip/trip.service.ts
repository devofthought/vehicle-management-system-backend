import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { Expense, Prisma, Trip } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { generateTripNo } from './trip.utils';
import { ITripFilters } from './trip.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { tripSearchableFields } from './trip.constant';

// create
const create = async (data: Trip): Promise<Trip | null> => {
  // generate Trip no
  const tripNo = await generateTripNo();

  // set Trip no
  data.tripNo = tripNo;

  const findHead = await prisma.accountHead.findFirst({
    where: { label: 'Trip Income' },
  });

  if (!findHead) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'First setup your account');
  }
  data.accountHeadId = findHead.id;

  const result = await prisma.trip.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Trip');
  }

  return result;
};

// get all
const getAll = async (
  filters: ITripFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Trip[]>> => {
  const { searchTerm, startDate, endDate, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (startDate) {
    andConditions.push({
      startDate: {
        gte: new Date(`${startDate}, 00:00:00`),
      },
    });
  }
  if (endDate) {
    andConditions.push({
      startDate: {
        lte: new Date(`${endDate}, 23:59:59`),
      },
    });
  }

  if (searchTerm) {
    andConditions.push({
      OR: tripSearchableFields.map(field => ({
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

  const whereConditions: Prisma.TripWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.trip.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      vehicle: true,
      driver: true,
      helper: true,
      party: true,
      expenses: {
        include: {
          expenseHead: true,
        },
      },
    },
  });

  const total = await prisma.trip.count({
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
const getSingle = async (id: string): Promise<Trip | null> => {
  const result = await prisma.trip.findUnique({
    where: {
      id,
    },
    include: {
      vehicle: true,
      driver: true,
      helper: true,
      party: true,
      expenses: {
        include: {
          expenseHead: true,
        },
      },
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Trip>
): Promise<Trip | null> => {
  // check is exist
  const isExist = await prisma.trip.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trip Not Found');
  }

  const result = await prisma.trip.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Trip');
  }

  return result;
};

// delete
const deleteSingle = async (id: string): Promise<Trip | null> => {
  // check is exist
  const isExist = await prisma.trip.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trip Not Found');
  }

  const result = await prisma.$transaction(async trans => {
    await trans.trip.update({
      where: {
        id,
      },
      data: {
        expenses: {
          deleteMany: {},
        },
      },
    });

    return await trans.trip.delete({
      where: {
        id,
      },
    });
  });

  return result;
};

const updateTripExpense = async (
  id: string,
  payload: Expense[]
): Promise<Trip | null> => {
  // check is exist
  const isExist = await prisma.trip.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trip Not Found');
  }

  const findHead = await prisma.accountHead.findFirst({
    where: { label: 'Trip Expense' },
  });

  if (!findHead) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'First setup your account');
  }

  const updatedData = payload?.map(el => ({
    ...el,
    accountHeadId: findHead.id,
  }));

  const result = await prisma.$transaction(async trans => {
    await trans.trip.update({
      where: {
        id,
      },
      data: {
        expenses: {
          deleteMany: {},
        },
      },
    });

    return await trans.trip.update({
      where: {
        id,
      },
      data: {
        expenses: {
          create: updatedData,
        },
      },
    });
  });

  return result;
};

export const TripService = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
  updateTripExpense,
};

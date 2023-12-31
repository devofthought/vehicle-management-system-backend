import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { AccountHead, Equipment, Prisma, Vehicle } from '@prisma/client';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IEquipmentFilters } from './report.interface';

// balance sheet
const balanceSheet = async (): Promise<AccountHead[]> => {
  const result = await prisma.accountHead.findMany({
    where: {},
    include: {
      accountType: {
        select: { label: true },
      },
      trips: {
        select: {
          amount: true,
        },
      },
      expenses: {
        select: {
          amount: true,
        },
      },
      vehicles: {
        select: {
          vehicleValue: true,
        },
      },
      maintenances: {
        select: {
          serviceCharge: true,
        },
      },
      equipmentUses: {
        select: {
          totalPrice: true,
        },
      },
      accidentHistories: {
        select: {
          amount: true,
        },
      },
      paperWorks: {
        select: {
          totalAmount: true,
        },
      },
    },
  });

  return result;
};

// fuel status
const fuelStatus = async (): Promise<Vehicle[]> => {
  const findExpenseHead = await prisma.expenseHead.findFirst({
    where: {
      label: 'Fuel Expense',
    },
  });

  if (!findExpenseHead) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'First Setup Your Account');
  }

  const result = await prisma.vehicle.findMany({
    where: {},
    include: {
      fuels: {
        select: {
          amount: true,
        },
      },
      expenses: {
        where: { expenseHeadId: findExpenseHead.id },
        select: {
          amount: true,
        },
      },
    },
  });

  return result;
};

// stock status
const stockStatus = async (
  filters: IEquipmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Equipment[]>> => {
  const { id } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (id) {
    andConditions.push({
      id,
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
    include: {
      equipmentIns: {
        select: {
          quantity: true,
        },
      },
      equipmentUses: {
        where: { inHouse: true },
        select: {
          quantity: true,
        },
      },
    },
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

export const ReportService = {
  balanceSheet,
  fuelStatus,
  stockStatus,
};

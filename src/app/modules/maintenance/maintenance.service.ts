import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { EquipmentUse, Maintenance, Prisma } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IMaintenanceFilters } from './maintenance.interface';
import { maintenanceSearchableFields } from './maintenance.constant';
import { generateMaintenanceBillNo } from './maintenance.utils';

// create
const create = async (
  data: Maintenance,
  equipmentUses: EquipmentUse[]
): Promise<Maintenance | null> => {
  // generate bill no
  const billNo = await generateMaintenanceBillNo();

  // set bill no
  data.billNo = billNo;

  // find maintenance expense head
  const findHead = await prisma.accountHead.findFirst({
    where: { label: 'Maintenance Expense' },
  });

  // find equipment expense head
  const findEquipmentHead = await prisma.accountHead.findFirst({
    where: { label: 'Equipment Expense' },
  });

  if (!findHead || !findEquipmentHead) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'First setup your account');
  }

  // set maintenance account head
  data.accountHeadId = findHead.id;

  // set equipment use account head
  const mappedEquipmentUses = equipmentUses?.map((el: EquipmentUse) => ({
    ...el,
    accountHeadId: findEquipmentHead.id,
  }));

  const result = await prisma.maintenance.create({
    data: {
      ...data,
      equipmentUses: { create: mappedEquipmentUses },
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Maintenance');
  }

  return result;
};

// get all
const getAll = async (
  filters: IMaintenanceFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Maintenance[]>> => {
  const { searchTerm, startDate, endDate, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: maintenanceSearchableFields.map(field => ({
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

  const whereConditions: Prisma.MaintenanceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.maintenance.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      vehicle: true,
      driver: true,
      equipmentUses: {
        include: {
          equipment: true,
        },
      },
    },
  });

  const total = await prisma.maintenance.count({
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
const getSingle = async (id: string): Promise<Maintenance | null> => {
  const result = await prisma.maintenance.findUnique({
    where: {
      id,
    },
    include: {
      vehicle: true,
      driver: true,
      maintenanceHead: true,
      equipmentUses: {
        include: {
          equipment: true,
        },
      },
    },
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Maintenance>,
  equipmentUses: EquipmentUse[]
): Promise<Maintenance | null> => {
  // check is exist
  const isExist = await prisma.maintenance.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Maintenance Not Found');
  }

  const result = await prisma.$transaction(async trans => {
    if (equipmentUses?.length) {
      // find equipment expense head
      const findEquipmentHead = await prisma.accountHead.findFirst({
        where: { label: 'Equipment Expense' },
      });

      if (!findEquipmentHead) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'First setup your account');
      }

      // set equipment use account head
      const mappedEquipmentUses = equipmentUses?.map((el: EquipmentUse) => ({
        ...el,
        accountHeadId: findEquipmentHead.id,
      }));

      await trans.maintenance.update({
        where: {
          id,
        },
        data: {
          equipmentUses: {
            deleteMany: {},
          },
        },
      });

      return await trans.maintenance.update({
        where: {
          id,
        },
        data: {
          ...payload,
          equipmentUses: {
            create: mappedEquipmentUses,
          },
        },
      });
    }

    return await trans.maintenance.update({
      where: {
        id,
      },
      data: payload,
    });
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Maintenance');
  }

  return result;
};

// delete
const deleteSingle = async (id: string): Promise<Maintenance | null> => {
  // check is exist
  const isExist = await prisma.maintenance.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Maintenance Not Found');
  }

  const result = await prisma.$transaction(async trans => {
    await trans.maintenance.update({
      where: {
        id,
      },
      data: {
        equipmentUses: {
          deleteMany: {},
        },
      },
    });

    return await trans.maintenance.delete({
      where: {
        id,
      },
    });
  });

  return result;
};

export const MaintenanceService = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};

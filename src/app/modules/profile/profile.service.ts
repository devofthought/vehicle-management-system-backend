import prisma from '../../../shared/prisma';
import { User } from '@prisma/client';

// get profile
const getProfile = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      superAdmin: true,
      admin: true,
      driver: {
        include: {
          vehicles: true,
          trips: true,
          fuels: true,
          maintenances: true,
          accidentHistories: true,
        },
      },
      helper: {
        include: {
          vehicles: true,
          trips: true,
        },
      },
    },
  });

  return result;
};

export const ProfileService = {
  getProfile,
};

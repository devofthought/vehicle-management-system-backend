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
      driver: true,
      helper: true,
    },
  });

  return result;
};

export const ProfileService = {
  getProfile,
};

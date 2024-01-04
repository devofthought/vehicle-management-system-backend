import prisma from '../../../shared/prisma';

// find Last ID
const findLastId = async (): Promise<string> => {
  const currentId = await prisma.driver.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      driverId: true,
    },
  });

  const splitCurrent = currentId?.driverId?.split('D-') || ['', '0'];

  return splitCurrent[1];
};
// generate driver ID
export const generateDriverId = async (): Promise<string> => {
  const currentId = parseInt(await findLastId());
  const incrementId = currentId + 1;

  return incrementId?.toString().padStart(6, 'D-00000');
};

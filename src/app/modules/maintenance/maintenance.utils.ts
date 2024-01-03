import prisma from '../../../shared/prisma';

// find Last ID
const findLastId = async (): Promise<string> => {
  const currentId = await prisma.maintenance.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      billNo: true,
    },
  });

  const splitCurrent = currentId?.billNo?.split('M-') || ['', '0'];

  return splitCurrent[1];
};
// generate trip ID
export const generateMaintenanceBillNo = async (): Promise<string> => {
  const currentId = parseInt(await findLastId());
  const incrementId = currentId + 1;

  return incrementId?.toString().padStart(8, 'M-000000');
};

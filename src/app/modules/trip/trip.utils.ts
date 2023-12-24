import prisma from '../../../shared/prisma';

// find Last ID
const findLastId = async (): Promise<string> => {
  const currentId = await prisma.trip.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      tripNo: true,
    },
  });

  const splitCurrent = currentId?.tripNo?.split('T-') || ['', '0'];

  return splitCurrent[1];
};
// generate trip no
export const generateTripNo = async (): Promise<string> => {
  const currentId = parseInt(await findLastId());
  const incrementId = currentId + 1;

  return incrementId?.toString().padStart(8, 'T-000000');
};

import prisma from '../../../shared/prisma';

// find Last ID
const findLastId = async (): Promise<string> => {
  const currentId = await prisma.helper.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      helperId: true,
    },
  });

  const splitCurrent = currentId?.helperId?.split('F-') || ['', '0'];

  return splitCurrent[1];
};
// generate helper ID
export const generateHelperId = async (): Promise<string> => {
  const currentId = parseInt(await findLastId());
  const incrementId = currentId + 1;

  return incrementId?.toString().padStart(6, 'H-00000');
};

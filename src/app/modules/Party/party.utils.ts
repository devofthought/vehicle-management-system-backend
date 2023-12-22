import prisma from '../../../shared/prisma';

// find Last ID
const findLastId = async (): Promise<string> => {
  const currentId = await prisma.party.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      partyId: true,
    },
  });

  const splitCurrent = currentId?.partyId?.split('P-') || ['', '0'];

  return splitCurrent[1];
};
// generate party ID
export const generatePartyId = async (): Promise<string> => {
  const currentId = parseInt(await findLastId());
  const incrementId = currentId + 1;

  return incrementId?.toString().padStart(8, 'P-000000');
};

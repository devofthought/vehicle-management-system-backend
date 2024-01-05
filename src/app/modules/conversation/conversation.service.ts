/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Conversation } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
// import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { conversationSearchableFields } from './conversation.constant';
import { IConversationFilters } from './conversation.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';

export const createConversationToDB = async (
  user: JwtPayload | null,
  conversationData: Conversation
): Promise<any> => {
  const { message, senderId, receiverId } = conversationData;

  const newConversation = await prisma.$transaction(async transactionClient => {
    const isExist = await transactionClient.conversation.findFirst({
      where: {
        senderId,
        receiverId,
      },
    });

    if (isExist) {
      const result = await transactionClient.conversation.update({
        where: {
          id: isExist.id,
        },
        data: { message },
      });

      if (!result) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Unable to update conversation'
        );
      }

      await transactionClient.message.create({
        data: {
          message,
          conversationId: result.id,
        },
      });
      return result;
    } else {
      const result = await transactionClient.conversation.create({
        data: {
          message,
          senderId,
          receiverId,
        },
      });

      if (!result) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Unable to create conversation'
        );
      }

      await transactionClient.message.create({
        data: {
          message,
          conversationId: result.id,
        },
      });
      return result;
    }
  });

  if (newConversation) {
    const responseData = await prisma.conversation.findUnique({
      where: {
        id: newConversation.id,
      },
      include: {
        sender: {
          include: {
            superAdmin: true,
            admin: true,
            driver: true,
            helper: true,
          },
        },
        receiver: {
          include: {
            superAdmin: true,
            admin: true,
            driver: true,
            helper: true,
          },
        },
      },
    });
    return responseData;
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create/update conversation!'
    );
  }
};

export const getAllConversationFromDB = async (
  filters: IConversationFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Conversation[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: conversationSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andCondition.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.ConversationWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.conversation.findMany({
    where: whereCondition,
    include: {
      sender: true,
      receiver: true,
    },
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: 'desc' },
  });
  const total = await prisma.conversation.count();
  const totalPage = Number(total) / Number(limit);

  return {
    meta: {
      total,
      page,
      limit,
      totalPage: Math.ceil(totalPage),
    },
    data: result,
  };
};

export const getSingleConversationFromDB = async (
  id: string
): Promise<Conversation | null> => {
  const result = await prisma.conversation.findUnique({
    where: {
      id,
    },
    include: {
      sender: true,
      receiver: true,
    },
  });

  if (result) {
    return result;
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'There is no conversation with the id/Failed to fetched conversation'
    );
  }
};

export const updateSingleConversationToDB = async (
  id: string,
  payload: Conversation
): Promise<Partial<Conversation> | null> => {
  // check is exist
  const isExist = await prisma.conversation.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Conversation Not Found');
  }

  const result = await prisma.conversation.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Conversation');
  }

  return result;
};

export const deleteSingleConversationFromDB = async (
  id: string
): Promise<Partial<Conversation> | undefined> => {
  const deleteConversation = await prisma.conversation.delete({
    where: {
      id,
    },
  });

  if (deleteConversation) {
    return deleteConversation;
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'There is no conversation with the id/Failed to delete conversation'
    );
  }
};

import { z } from 'zod';

export const createConversationZodSchema = z.object({
  body: z.object({
    message: z.string({
      required_error: 'message is required',
    }),
    senderId: z.string({
      required_error: 'senderId is required',
    }),
    receiverId: z.string({
      required_error: 'receiverId is required',
    }),
  }),
});

export const updateConversationZodSchema = z.object({
  body: z.object({
    message: z.string().optional(),
    senderId: z.string().optional(),
    receiverId: z.string().optional(),
  }),
});

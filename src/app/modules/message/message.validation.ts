import { z } from 'zod';

export const createMessageZodSchema = z.object({
  body: z.object({
    message: z.string({
      required_error: 'message is required',
    }),
    conversationId: z.string({
      required_error: 'conversationId is required',
    }),
  }),
});

export const updateMessageZodSchema = z.object({
  body: z.object({
    message: z.string().optional(),
    conversationId: z.string().optional(),
  }),
});

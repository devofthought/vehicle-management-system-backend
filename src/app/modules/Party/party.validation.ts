import { z } from 'zod';

const create = z.object({
  body: z.object({
    fullName: z.string({ required_error: 'Full Name is Required' }),
    mobile: z.string({ required_error: 'Mobile is required' }),
    address: z.string().optional(),
    isActive: z.boolean().optional().default(true),
  }),
});

const update = z.object({
  body: z.object({
    fullName: z.string().optional(),
    mobile: z.string().optional(),
    address: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const PartyValidation = {
  create,
  update,
};

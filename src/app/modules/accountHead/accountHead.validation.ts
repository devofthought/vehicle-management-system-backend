import { z } from 'zod';

const create = z.object({
  body: z.object({
    accountTypeId: z.string({ required_error: 'Account Type ID is Required' }),
    label: z.string({ required_error: 'Account Head is Required' }),
  }),
});
const update = z.object({
  body: z.object({
    accountTypeId: z.string().optional(),
    label: z.string().optional(),
  }),
});

export const AccountHeadValidation = {
  create,
  update,
};

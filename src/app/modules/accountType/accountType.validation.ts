import { z } from 'zod';

const create = z.object({
  body: z.object({
    label: z.string({ required_error: 'Account Type is Required' }),
  }),
});
const update = z.object({
  body: z.object({
    label: z.string({ required_error: 'Account Type is Required' }),
  }),
});

export const AccountTypeValidation = {
  create,
  update,
};

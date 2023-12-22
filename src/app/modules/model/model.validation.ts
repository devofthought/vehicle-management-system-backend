import { z } from 'zod';

const create = z.object({
  body: z.object({
    label: z.string({ required_error: 'Model is Required' }),
  }),
});
const update = z.object({
  body: z.object({
    label: z.string().optional(),
  }),
});

export const ModelValidation = {
  create,
  update,
};

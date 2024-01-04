import { z } from 'zod';

const create = z.object({
  body: z.object({
    brandId: z.string({ required_error: 'Brand ID is Required' }),
    label: z.string({ required_error: 'Model is Required' }),
  }),
});
const update = z.object({
  body: z.object({
    brandId: z.string().optional(),
    label: z.string().optional(),
  }),
});

export const ModelValidation = {
  create,
  update,
};

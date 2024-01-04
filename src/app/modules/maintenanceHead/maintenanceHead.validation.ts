import { z } from 'zod';

const create = z.object({
  body: z.object({
    label: z.string({ required_error: 'Maintenance Head is Required' }),
  }),
});
const update = z.object({
  body: z.object({
    label: z.string().optional(),
  }),
});

export const MaintenanceHeadValidation = {
  create,
  update,
};

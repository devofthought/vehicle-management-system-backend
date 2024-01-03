import { z } from 'zod';

const create = z.object({
  body: z.object({
    accountHeadId: z.string({ required_error: 'Account Head ID is Required' }),
    label: z.string({ required_error: 'Maintenance Head is Required' }),
  }),
});
const update = z.object({
  body: z.object({
    accountHeadId: z.string().optional(),
    label: z.string().optional(),
  }),
});

export const MaintenanceHeadValidation = {
  create,
  update,
};

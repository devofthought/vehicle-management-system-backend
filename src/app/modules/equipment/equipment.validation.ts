import { z } from 'zod';

const create = z.object({
  body: z.object({
    uomId: z.string({ required_error: 'UOM ID is Required' }),
    label: z.string({ required_error: 'Equipment is Required' }),
  }),
});
const update = z.object({
  body: z.object({
    uomId: z.string().optional(),
    label: z.string().optional(),
  }),
});

export const EquipmentValidation = {
  create,
  update,
};

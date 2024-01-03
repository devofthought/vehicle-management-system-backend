import { z } from 'zod';

const create = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is Required' }),
    equipmentId: z.string({ required_error: 'Equipment ID is Required' }),
    quantity: z.number({ required_error: 'Quantity is Required' }),
    unitPrice: z.number({ required_error: 'Unit Price is Required' }),
    totalPrice: z.number({ required_error: 'Total Price is Required' }),
    remarks: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    date: z.string().optional(),
    equipmentId: z.string().optional(),
    quantity: z.number().optional(),
    unitPrice: z.number().optional(),
    totalPrice: z.number().optional(),
    remarks: z.string().optional(),
  }),
});

export const EquipmentInValidation = {
  create,
  update,
};

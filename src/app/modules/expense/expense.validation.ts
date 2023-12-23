import { z } from 'zod';

const create = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is Required' }),
    vehicleId: z.string().optional(),
    expenseHeadId: z.string({ required_error: 'Expense Head is required' }),
    amount: z.number({ required_error: 'Amount is Required' }),
    remarks: z.number().optional(),
  }),
});

const update = z.object({
  body: z.object({
    date: z.string().optional(),
    vehicleId: z.string().optional(),
    expenseHeadId: z.string().optional(),
    amount: z.number().optional(),
    remarks: z.number().optional(),
  }),
});

export const ExpenseValidation = {
  create,
  update,
};

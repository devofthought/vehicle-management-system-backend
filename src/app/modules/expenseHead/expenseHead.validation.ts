import { z } from 'zod';

const create = z.object({
  body: z.object({
    label: z.string({ required_error: 'Expense Head is Required' }),
    isTripExpense: z.boolean().optional(),
  }),
});
const update = z.object({
  body: z.object({
    label: z.string().optional(),
    isTripExpense: z.boolean().optional(),
  }),
});

export const ExpenseHeadValidation = {
  create,
  update,
};

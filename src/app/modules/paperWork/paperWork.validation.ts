import { z } from 'zod';

const create = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is Required' }),
    vehicleId: z.string({ required_error: 'Vehicle ID is Required' }),
    certificateNo: z.string({ required_error: 'Certificate No is Required' }),
    effectiveDate: z.string({ required_error: 'Effective Date is Required' }),
    expiryDate: z.string().optional().nullable(),
    daysToRemind: z.number().optional().nullable(),
    odoMeter: z.number().optional(),
    paperType: z.enum(['Registration', 'Tax', 'Fitness', 'Route'], {
      required_error: 'Document Type is Required',
    }),
    fee: z.number({ required_error: 'Fee is required' }),
    otherAmount: z.number().optional(),
    totalAmount: z.number({ required_error: 'Total Amount is Required' }),
    remarks: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    date: z.string().optional(),
    vehicleId: z.string().optional(),
    certificateNo: z.string().optional(),
    effectiveDate: z.string().optional(),
    expiryDate: z.string().optional().nullable(),
    daysToRemind: z.number().optional().nullable(),
    odoMeter: z.number().optional(),
    paperType: z.enum(['Registration', 'Tax', 'Fitness', 'Route']).optional(),
    fee: z.number().optional(),
    otherAmount: z.number().optional(),
    totalAmount: z.number().optional(),
    remarks: z.string().optional(),
  }),
});

export const PaperWorkValidation = {
  create,
  update,
};

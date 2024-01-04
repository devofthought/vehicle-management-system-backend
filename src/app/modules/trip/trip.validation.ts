import { z } from 'zod';

const create = z.object({
  body: z.object({
    startDate: z.string({ required_error: 'Start Date is Required' }),
    endDate: z.string({ required_error: 'End Date is Required' }),
    startedTime: z.string().optional(),
    completedTime: z.string().optional(),
    from: z.string({ required_error: 'From Location is Required' }),
    to: z.string({ required_error: 'To Location is Required' }),
    odometerStart: z.number().optional(),
    odometerEnd: z.number().optional(),
    distance: z.number({ required_error: 'Distance is Required' }),
    amount: z.number({ required_error: 'Amount is Required' }),
    remarks: z.string().optional(),
    vehicleId: z.string({ required_error: 'Vehicle ID is Required' }),
    driverId: z.string({ required_error: 'Driver ID is Required' }),
    helperId: z.string().optional(),
    partyId: z.string({ required_error: 'Party ID is Required' }),
    status: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    startedTime: z.string().optional(),
    completedTime: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    odometerStart: z.number().optional(),
    odometerEnd: z.number().optional(),
    distance: z.number().optional(),
    amount: z.number().optional(),
    remarks: z.string().optional(),
    vehicleId: z.string().optional(),
    driverId: z.string().optional(),
    helperId: z.string().optional(),
    partyId: z.string().optional(),
    status: z.string().optional(),
  }),
});

const updateTripExpenses = z.object({
  body: z.object({
    expenses: z.array(
      z.object({
        date: z.string({ required_error: 'Date is required' }),
        vehicleId: z.string({
          required_error: 'Vehicle ID is required',
        }),
        expenseHeadId: z.string({ required_error: 'Expense head is required' }),
        amount: z.number({ required_error: 'Amount is required' }),
        remarks: z.string().optional(),
      }),
      { required_error: 'Expenses is required' }
    ),
  }),
});

export const TripValidation = {
  create,
  update,
  updateTripExpenses,
};

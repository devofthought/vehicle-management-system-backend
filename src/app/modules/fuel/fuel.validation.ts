import { z } from 'zod';

const create = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is Required' }),
    vehicleId: z.string({ required_error: 'Vehicle ID is Required' }),
    driverId: z.string().optional(),
    fuelTypeId: z.string({ required_error: 'Fuel Type ID is Required' }),
    fuelStationId: z.string().optional().nullable(),
    odoMeter: z.number().optional(),
    quantity: z.number({ required_error: 'Quantity is Required' }),
    amount: z.number({ required_error: 'Amount is Required' }),
    remarks: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    date: z.string().optional(),
    vehicleId: z.string().optional(),
    driverId: z.string().optional(),
    fuelTypeId: z.string().optional(),
    fuelStationId: z.string().optional().nullable(),
    odoMeter: z.number().optional(),
    quantity: z.number().optional(),
    amount: z.number().optional(),
    remarks: z.string().optional(),
  }),
});

export const FuelValidation = {
  create,
  update,
};

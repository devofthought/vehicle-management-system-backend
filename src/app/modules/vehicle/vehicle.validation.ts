import { z } from 'zod';

const create = z.object({
  body: z.object({
    regNo: z.string({ required_error: 'Registration No is Required' }),
    brandId: z.string({ required_error: 'Brand ID is required' }),
    modelId: z.string({ required_error: 'Model ID is required' }),
    vehicleValue: z.number({ required_error: 'Vehicle Value is required' }),
    driverId: z.string({ required_error: 'Driver ID is required' }),
    helperId: z.string().optional(),
    imageUrl: z.string().optional(),
    isActive: z.boolean().optional().default(true),
  }),
});

const update = z.object({
  body: z.object({
    regNo: z.string().optional(),
    brandId: z.string().optional(),
    modelId: z.string().optional(),
    vehicleValue: z.number().optional(),
    driverId: z.string().optional(),
    helperId: z.string().optional(),
    imageUrl: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const VehicleValidation = {
  create,
  update,
};

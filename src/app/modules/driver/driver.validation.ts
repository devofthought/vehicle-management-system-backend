import { z } from 'zod';

const update = z.object({
  body: z.object({
    fullName: z.string().optional(),
    mobile: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const DriverValidation = {
  update,
};

import { User } from '@prisma/client';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';

// create super admin
const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const { superAdmin, ...userData } = req.body;

  const result = await UserService.createSuperAdmin(userData, superAdmin);

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Super Admin Added Successfully',
    data: result,
  });
});

// create admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;

  const result = await UserService.createAdmin(userData, admin);

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin Added Successfully',
    data: result,
  });
});

// create driver
const createDriver = catchAsync(async (req: Request, res: Response) => {
  const { driver, ...userData } = req.body;

  const result = await UserService.createDriver(userData, driver);

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Driver Added Successfully',
    data: result,
  });
});

// create helper
const createHelper = catchAsync(async (req: Request, res: Response) => {
  const { helper, ...userData } = req.body;

  const result = await UserService.createHelper(userData, helper);

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Helper Added Successfully',
    data: result,
  });
});

export const UserController = {
  createSuperAdmin,
  createAdmin,
  createDriver,
  createHelper,
};

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AccountHead, Equipment, Vehicle } from '@prisma/client';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import {
  stockStatusFilterableFields,
  summaryReportFilterableFields,
} from './report.constant';
import { ReportService } from './report.service';
import { ITotalTripSummary, IYearMonthSummary } from './report.interface';

// balance sheet
const balanceSheet = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.balanceSheet();

  sendResponse<AccountHead[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Balance Sheet retrieved successfully',
    data: result,
  });
});

// fuel status
const fuelStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.fuelStatus();

  sendResponse<Vehicle[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fuel Status retrieved successfully',
    data: result,
  });
});

// stock status
const stockStatus = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, stockStatusFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ReportService.stockStatus(filters, paginationOptions);

  sendResponse<Equipment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Equipment retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// summary report
const vehicleSummaryReport = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, summaryReportFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ReportService.vehicleSummaryReport(
    filters,
    paginationOptions
  );

  sendResponse<Vehicle[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Summary Report retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get all trip summary
const getTripSummary = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.getTripSummary();

  sendResponse<ITotalTripSummary>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trip Summary retrieved successfully',
    data: result,
  });
});

// get trip summary by grouping year, month
const tripSummaryGroupByMonthYear = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReportService.tripSummaryGroupByMonthYear();

    sendResponse<IYearMonthSummary[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Trip Summary retrieved successfully',
      data: result,
    });
  }
);

// get fuel summary by grouping year, month
const fuelSummaryGroupByMonthYear = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReportService.fuelSummaryGroupByMonthYear();

    sendResponse<IYearMonthSummary[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Fuels Summary retrieved successfully',
      data: result,
    });
  }
);

export const ReportController = {
  balanceSheet,
  fuelStatus,
  stockStatus,
  vehicleSummaryReport,
  getTripSummary,
  tripSummaryGroupByMonthYear,
  fuelSummaryGroupByMonthYear,
};

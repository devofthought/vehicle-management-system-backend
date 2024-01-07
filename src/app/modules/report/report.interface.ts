export type IEquipmentFilters = {
  id?: string;
};

export type ISummaryReportFilters = {
  vehicleId?: string;
  startDate?: string;
  endDate?: string;
};

export type ITotalTripSummary = {
  amount?: number;
  count?: number;
  expense?: number;
};

export type IYearMonthSummary = {
  year?: number;
  month?: number;
  total_quantity?: number;
  total_amount?: number;
};

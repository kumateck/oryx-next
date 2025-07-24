export const FilterBtn = [
  "Today",
  "This Week",
  "This Month",
  "All Time",
] as const;
export type FilterButton = (typeof FilterBtn)[number];

export interface QcDashboardDto {
  numberOfAnalyticalRawData: number;
  numberOfApprovals: number;
  numberOfBatchTestApprovedRawMaterials: number;
  numberOfBatchTestCountRawMaterials: number;
  numberOfBatchTestPendingRawMaterials: number;
  numberOfBatchTestRejectedRawMaterials: number;
  numberOfPendingApprovals: number;
  numberOfRejectedApprovals: number;
  numberOfStpProducts: number;
  numberOfStpRawMaterials: number;
}

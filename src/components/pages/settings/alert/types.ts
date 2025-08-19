import { AlertType, NotificationType } from "@/lib";
import { AlertDto } from "@/lib/redux/api/openapi.generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const alertTypeLabels: Record<AlertType, string> = {
  [AlertType.InApp]: "In-App",
  [AlertType.Email]: "Email",
} as const;

export const NotificationTypeLabels: Record<NotificationType, string> = {
  [NotificationType.PartialRequestProduction]: "Partial Request Production",
  [NotificationType.PartialRequisitionCreated]: "Partial Requisition Created",
  [NotificationType.StockRequisitionCreated]: "Stock Requisition Created",
  [NotificationType.MaterialReachedReorderLevel]:
    "Material Reached Reorder Level",
  [NotificationType.MaterialBelowMinStock]: "Material Below Min Stock",
  [NotificationType.MaterialAboveMaxStock]: "Material Above Max Stock",
  [NotificationType.ShipmentArrived]: "Shipment Arrived",
  [NotificationType.ShiftAssigned]: "Shift Assigned",
  [NotificationType.ProductionStageChanged]: "Production Stage Changed",
  [NotificationType.OvertimeRequest]: "Overtime Request",
  [NotificationType.LeaveRequest]: "Leave Request",
  [NotificationType.StaffRequest]: "Staff Request",
  [NotificationType.AuditLogEvent]: "Audit Log Event",
  [NotificationType.BmrBprRequested]: "BMR/BPR Requested",
  [NotificationType.BmrBprApproved]: "BMR/BPR Approved",
};

export type AlertResponse = {
  data: AlertDto[];
  pageIndex: number;
  pageCount: number;
  totalRecordCount: number;
  numberOfPagesToShow: number;
  startPageIndex: number;
  stopPageIndex: number;
};

export enum NotificationFrequency {
  IMMEDIATE = 0,
  HOURLY = 1,
  DAILY = 2,
  WEEKLY = 3,
  MONTHLY = 4,
  NEVER = 5,
}

export const AlertSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),

  alertType: z
    .array(
      z.object({
        value: z.string().min(1, "Alert type is required"),
        label: z.string(),
      }),
      { message: "At least one channels must be selected" },
    )
    .min(1, "At least one channels must be selected"),

  timeFrame: z
    .string({ required_error: "Time frame is required" })
    .min(1, "Time frame is required"),

  notificationType: z.object(
    {
      value: z.nativeEnum(NotificationType),
      label: z.string(),
    },
    { message: "Notification type is required" },
  ),
  roleIds: z
    .array(
      z.object({
        value: z
          .string({ required_error: "Role ID is required" })
          .min(1, "Role ID cannot be empty"),
        label: z
          .string({ required_error: "Role label is required" })
          .min(1, "Role label cannot be empty"),
      }),
      { required_error: "At least one role must be selected" },
    )
    .optional(),
  userIds: z
    .array(
      z.object({
        value: z
          .string({ required_error: "User ID is required" })
          .min(1, "User ID cannot be empty"),
        label: z
          .string({ required_error: "User label is required" })
          .min(1, "User label cannot be empty"),
      }),
      { required_error: "At least one user must be selected" },
    )
    .optional(),
});

export type CreateAlertDto = z.infer<typeof AlertSchema>;
export const CreateAlertDtoValidator = zodResolver(AlertSchema);

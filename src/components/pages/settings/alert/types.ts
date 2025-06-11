import { AlertType, NotificationType } from "@/lib";
import { AlertDto } from "@/lib/redux/api/openapi.generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const alertTypeLabels: Record<AlertType, string> = {
  [AlertType.InApp]: "In-App",
  [AlertType.Email]: "Email",
  [AlertType.Sms]: "Sms",
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

export const AlertSchema = z.object({
  title: z.string().min(1, "Title is required"),
  alertType: z.enum(["InApp", "Email", "Sms"], {
    errorMap: () => ({ message: "Invalid alert type" }),
  }),
  timeFrame: z.enum(
    [
      "instant",
      "real-time",
      "immediate",
      "hourly",
      "daily",
      "weekly",
      "monthly",
    ],
    {
      errorMap: () => ({ message: "Invalid time frame" }),
    },
  ),
});

export type CreateAlertDto = z.infer<typeof AlertSchema>;
export const CreateAlertDtoValidator = zodResolver(AlertSchema);

import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";

export enum modelTypes {
  General = "General",
  FileUpload = "File Upload",
  Collection = "Collection",

  Logistics = "Logistics",
  AvailableStock = "Available Stock",
  ShipmentInvoices = "Shipment Invoices",
  ShipmentDocuments = "Shipment Documents",
  ShipmentDiscrepancy = "Shipment Discrepancy",
  BillingSheets = "Billing Sheets",
  Waybill = "Waybill",

  Warehouse = "Warehouse",
  ReceivingArea = "Receiving Area",
  QuarantineAreaGRN = "Quarantine Area/GRN",
  Materials = "Materials",
  UnlinkMaterials = "Unlink Materials",
  LinkedMaterials = "Linked Materials",
  ApprovedMaterials = "Approved Materials",
  StockRequisitions = "Stock Requisitions",
  ExtraPackingRequisitions = "Extra Packing Requisitions",
  StockTransferIssues = "Stock Transfer Issues",
  LocationChartRecord = "Location Chart Record",
  PackingMaterialStock = "Packing Material Stock",
  RawMaterialStock = "Raw Material Stock",

  Procurement = "Procurement",
  PurchaseRequisition = "Purchase Requisition",
  QuotationsRequest = "Quotations Request",
  QuotationsResponses = "Quotations Responses",
  PriceComparison = "Price Comparison",
  AwardedQuotations = "Awarded Quotations",
  ProformaResponses = "Proforma Responses",
  CreatePurchaseOrders = "Create Purchase Orders",
  PurchaseOrderLists = "Purchase Order Lists",
  MaterialDistribution = "Material Distribution",

  Production = "Production",
  MaterialRequisitions = "Material Requisitions",
  CreatePurchaseRequisitions = "Create Purchase Requisitions",
  Others = "Others",
  ProductPlanning = "Product Planning",
  StockTransferRequests = "Stock Transfer Requests",
  ProductSchedule = "Product Schedule",
  Activities = "Activities",
  Steps = "Steps",
  BMR = "BMR",
  GoodsReceivedNotes = "Goods Received Notes",
  FinalPacking = "Final Packing",
  ExtraPacking = "Extra Packing",
  BOM = "BOM",
  Packing = "Packing",
  Procedure = "Procedure",

  HRManagement = "HR Management",
  Employee = "Employee",
  Designation = "Designation",
  LeaveRequest = "Leave Request",
  LeaveType = "Leave Type",
  OverTime = "Over Time",
  StaffRequisition = "Staff Requisition",

  AccessManagement = "Access Management",
  ManageRoles = "Manage Roles",
  ManagePermissions = "Manage Permissions",

  UserManagement = "User Management",
  ManageUsersDirectory = "Manage Users Directory",

  QualityAssurance = "Quality Assurance",
  IssueBMR = "Issue BMR",
  PendingApprovals = "Pending Approvals",
  AnalyticalRawData = "Analytical Raw Data",

  Settings = "Settings",
  Departments = "Departments",
  Configurations = "Configurations",
  CodeSettings = "Code Settings",
  ChangePassword = "Change Password",
  AuthenticatedUser = "Authenticated User",
  Approvals = "Approvals",
  AlertsAndNotifications = "Alerts & Notifications",
  CurrencySettings = "Currency Settings",
  Equipment = "Equipment",
  WorkFlow = "Work Flow",
  UserDirectory = "User Directory",
  Warehouses = "Warehouses",
  Locations = "Locations",
  Racks = "Racks",
  Shelves = "Shelves",
  StandardTestProcedure = "Standard Test Procedure",
  Manufacturers = "Manufacturers",
  Holidays = "Holidays",
  Suppliers = "Suppliers",
  Alerts = "Alerts",

}


export const AlertSchema = z.object({
  title: z.string().min(1, "Title is required"),
  modelType: z.nativeEnum(modelTypes, {
    errorMap: () => ({ message: "Invalid model type" }),
  }),
  alertType: z.enum(["1","2","3"], {
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
    }
  ),
})

export type CreateAlertDto = z.infer<typeof AlertSchema>;
export const CreateAlertDtoValidator = zodResolver(
  AlertSchema,
);



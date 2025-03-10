import { z } from "zod";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const IS_DEV = process.env.NODE_ENV !== "production";

export const APP_NAME = "Oryx ERP";

export const COOKIE_ID = "_bt3HfM6509fhsYE";

export enum APP_CONTEXT {
  ORYX_ERP = "oryx-erp",
}

export const ORYX_ERP_COOKIE_ID = `${APP_CONTEXT.ORYX_ERP}-${COOKIE_ID}`;

export const COLLECTION_TYPES = {
  ProductCategory: "ProductCategory",
  MaterialCategory: "MaterialCategory",
  PackageCategory: "PackageCategory",
  PackageType: "PackageType",
  Resource: "Resource",
  UnitOfMeasure: "UnitOfMeasure",
  Material: "Material",
  MaterialType: "MaterialType",
  Warehouse: "Warehouse",
  WarehouseLocation: "WarehouseLocation",
  WarehouseLocationRack: "WarehouseLocationRack",
  Product: "Product",
  WorkCenter: "WorkCenter",
  Operation: "Operation",
  Role: "Role",
  User: "User",
  Country: "Country",
  Currency: "Currency",
};

export const CODE_SETTINGS = {
  modelTypes: {
    Product: "Product",
    WorkOrder: "WorkOrder",
    Stock: "Stock",
    RequestOrder: "RequestOrder",
    Requisition: "Requisition",
    RawMaterial: "RawMaterial",
    Warehouse: "Warehouse",
    PackageMaterial: "PackageMaterial",
    ProductionSchedule: "ProductionSchedule",
    Department: "Department",
    PurchaseOrder: "PurchaseOrder",
    ShipmentDocument: "ShipmentDocument",
    GRNNumber: "GrnNumber",
  },
  nameTypes: {
    Time: 2,
    Random: 1,
    Series: 0,
  },
};

export enum CodeNameTypes {
  Series = 0,
  Random = 1,
  Time = 2,
}
export enum CodeModelTypes {
  Product = "Product",
  WorkOrder = "WorkOrder",
  StockRequisition = "StockRequisition",
  StockTransfer = "StockTransfer",
  FinishedGoodsTransfer = "FinishedGoodsTransfer",
  PurchaseRequisition = "PurchaseRequisition",
  RawMaterial = "RawMaterial",
  Warehouse = "Warehouse",
  PackageMaterial = "PackageMaterial",
  ProductionSchedule = "ProductionSchedule",
  Department = "Department",
  PurchaseOrder = "PurchaseOrder",
  ShipmentDocument = "ShipmentDocument",
  GRNNumber = "GrnNumber",
}

export enum ProductionStatus {
  New = 0,
  Checked = 1,
}
export enum PurchaseOrderStatusList {
  Pending = 0,
  Delivered = 1,
  Attached = 2,
  Completed = 3,
}
export enum RequisitionStatus {
  Pending = 0,
  Sourced = 1,
  Completed = 2,
  Rejected = 3,
}
export enum RequisitionType {
  StockVoucher,
  Purchase,
}
export enum EMaterialKind {
  Raw = 0,
  Packing = 1,
}

export enum WarehouseType {
  RawMaterialStorage = 0,
  PackagedMaterialStorage = 1,
  FinishedGoodsStorage = 2,
  Production = 3,
}
export enum SupplierType {
  Foreign = 0,
  Local = 1,
  // Other = 3,
}
export enum ActivityStepStatus {
  New = 0,
  Progress = 1,
  Completed = 2,
  Delayed = 3,
  Cancelled = 4,
  Active = 5,
}

export enum FORM_BUILDER_CONFIG {
  TEMPLATES = "Templates",
  QUESTIONS = "Questions",
}

export enum InputTypes {
  SWITCH = "switch",
  TEXT = "text",
  LABEL = "label",
  OTP = "otp",
  EMAIL = "email",
  MULTIPLE = "multiple",
  NUMBER = "number",
  PASSWORD = "password",
  PHONE = "phone",
  SELECT = "select",
  ASYNC_SELECT = "async-select",
  SPACE = "space",
  PAGINATED_SELECT = "paginated-select",
  MULTI = "multi",
  DATE = "date",
  RANGE = "daterange",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  RICHTEXT = "richtext",
  UPLOAD = "upload",
  DRAGNDROP = "drag-n-drop",
  MOMENT = "moment",
  TIME = "time",
  IMAGE = "image",
  BUTTON = "button",
  SUBMIT = "submit",
  COLOR = "color",
  SPECIAL_SELECT = "special-select",
}

export enum Status {
  Open = "Open",
  InProgress = "In Progress",
  New = "New",
  Closed = "Closed",
  Rejected = "Rejected",
  Resolved = "Resolved",
  Overdue = "Overdue",
  NonCompliant = "Non Compliant",
}

export enum TimeType {
  Time = "time",
  Moment = "moment",
}

export enum ProcurementType {
  Local = "Local",
  Foreign = "Foreign",
}
export enum MaterialStatus {
  NoSource = 0,
  StockTransfer = 1,
  PurchaseRequisition = 2,
  LocalProcurement = 3,
  ForeignProcurement = 4,
  StockRequisition = 5,
  IssuedRequisition = 6,
  InHouse = 7,
}
export enum QuestionTypes {
  ShortAnswer = 0,
  LongAnswer = 1,
  Paragraph = 2,
  Datepicker = 3,
  SingleChoice = 4,
  Dropdown = 5,
  Checkbox = 6,
  FileUpload = 7,
  Signature = 8,
  Reference = 9,
}
export interface Option {
  label: string;
  value: string;
}
export enum IsYesorNo {
  Yes = 1,
  No = 0,
}
export enum IsTrueorFalse {
  True = 1,
  False = 0,
}
export enum BatchStatus {
  Received = 0,
  Quarantine = 1,
  Testing = 2,
  Available = 3,
  Rejected = 4,
  Retest = 5,
  Frozen = 6,
  Consumed = 7,
  Approved = 8,
}

export enum DistributedMaterialStatus {
  Distributed = 0,
  Arrived = 1,
  Checked = 2,
  GrnGenerated = 3,
}

export const routes = {
  home: () => "/home",
  signin: () => "/signin",
  signout: () => "/signout",
  profile: () => "/profile",
  resetPassword: () => "/reset-password",
  forgotPassword: () => "/forgot-password",
  setPassword: () => "/set-password",
  otpValidation: (params: { telephone: string }) => `/otp/${params.telephone}`,
  settings: () => "/settings",
  newObservation: () => "/observations/create",
  newIncident: () => "/incidents/create",
  categories: () => "categories",
  schedules: () => "schedules",
  newSchedule: () => "schedules/create",
  viewSchedule: (id: string) => `schedules/${id}/details`,
  planning: () => "plannings",
  newPlanning: () => "plannings/create",
  viewPlanning: (id: string) => `plannings/${id}/details`,
  editPlanning: (id: string) => `/production/plannings/${id}/edit/bom`,
  editPlanningBom: () => `bom`,
  editPlanningInfo: () => `info`,
  editPlanningPackaging: () => `packaging`,
  editPlanningProcedure: () => `procedure`,
  editPackingOrder: () => `packing-order`,
  rawMaterials: () => "/warehouse/materials",
  viewMaterial: (id: string) => `/warehouse/materials/${id}/details`,
  vendors: () => `/procurement/vendors`,
  editVendor: (id: string) => `/procurement/vendors/${id}/edit`,
  viewScheduleRequisition: (scheduleId: string, productId: string) =>
    `/production/schedules/${scheduleId}/product/${productId}/requisition`,

  createChecklist: (id: string) =>
    `/warehouse/receiving-area/${id}/create-checklist`,
  createPackagingChecklist: (id: string) =>
    `/warehouse/packaging-receiving-area/${id}/create-checklist`,
  finishedProducts: () => "finished-products",
  newEmployee: () => "/resource/employees/create",
  newRegulation: () => "/compliance/external/regulations/create",
  newInspection: () => "/inspections/create",
  newAudit: () => "/audits/create",
  certifications: () => "/compliance/internal/certifications",
  newCertification: () => "/compliance/internal/certifications/create",
  observations: () => "/observations",
  inspections: () => "/inspections",
  regulations: () => "/compliance/external/regulations",
  newStockRequisition: () => "stock-requisition/create",
  newRequisition: () => "requisition/create",
  productionSchedules: () => "/production/schedules",
  audits: () => "/audits",
  findings: () => "/findings",
  editEmployee: (params: { id: string }) =>
    `/resource/employees/edit/${params.id}`,
  viewChecklist: (id: string) =>
    `/warehouse/receiving-area/${id}/view-checklist`,
};

export const formatClock = (hours: number, minutes: number, light: boolean) => {
  const result = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${light ? "AM" : "PM"}`;
  return result.trim(); // Ensure there are no extra spaces
};

export type OptionsMap = {
  [key: string]: Option[];
};

export const IdSchema = (msg: string) =>
  z.object(
    {
      value: z.string({
        message: `${msg} is required`,
      }),
      label: z.string(),
      uom: z.string().optional(),
    },
    {
      message: `${msg} is required`,
    },
  );

export enum Units {
  ML = "ml",
  MG = "mg",
  L = "L",
  KG = "kg",
  G = "g",
}

// export const avatarFallbackColors = [
//   "border border-red-300 bg-red-100 text-pink-800",
//   " border border-blue-300 bg-blue-100 text-blue-800",
//   "bg-green-100 text-green-800",
//   "bg-yellow-100 text-yellow-800",
//   "bg-indigo-100 text-indigo-800",
//   "bg-purple-100 text-purple-800",
//   "bg-pink-100 text-pink-800",
//   "bg-amber-100 text-amber-800",
//   "bg-orange-100 text-orange-800",
//   "bg-lime-100 text-lime-800",
//   "bg-emerald-100 text-emerald-800",
//   "bg-teal-100 text-teal-800",
//   "bg-cyan-100 text-cyan-800",
//   "bg-sky-100 text-sky-800",
//   "bg-violet-100 text-violet-800",
//   "bg-fuchsia-100 text-fuchsia-800",
//   "bg-rose-100 text-rose-800",
//   "bg-gray-100 text-gray-900",
//   "bg-stone-100 text-stone-900",
//   "bg-zinc-100 text-zinc-900",
// ];

export const avatarFallbackColors = [
  "border border-red-300 bg-red-100 text-red-800",
  "border border-blue-300 bg-blue-100 text-blue-800",
  "border border-green-300 bg-green-100 text-green-800",
  "border border-yellow-300 bg-yellow-100 text-yellow-800",
  "border border-indigo-300 bg-indigo-100 text-indigo-800",
  "border border-purple-300 bg-purple-100 text-purple-800",
  "border border-pink-300 bg-pink-100 text-pink-800",
  "border border-amber-300 bg-amber-100 text-amber-800",
  "border border-orange-300 bg-orange-100 text-orange-800",
  "border border-lime-300 bg-lime-100 text-lime-800",
  "border border-emerald-300 bg-emerald-100 text-emerald-800",
  "border border-teal-300 bg-teal-100 text-teal-800",
  "border border-cyan-300 bg-cyan-100 text-cyan-800",
  "border border-sky-300 bg-sky-100 text-sky-800",
  "border border-violet-300 bg-violet-100 text-violet-800",
  "border border-fuchsia-300 bg-fuchsia-100 text-fuchsia-800",
  "border border-rose-300 bg-rose-100 text-rose-800",
  "border border-gray-300 bg-gray-100 text-gray-800",
  "border border-stone-300 bg-stone-100 text-stone-800",
  "border border-zinc-300 bg-zinc-100 text-zinc-800",
];
export enum ChecklistBoolean {
  No = 0,
  Yes = 1,
}
export enum ChecklistCarrierCondition {
  Clean = 0,
  Dirty = 1,
  Wet = 2,
  Insect_Infested = 3,
  Excessive_Dust = 4,
  Damaged = 5,
}

export enum Intactness {
  No = 0,
  Yes = 1,
}

export enum ConsignmentCarrier {
  Bad = 0,
  Good = 1,
}

export enum BatchSizeType {
  Full = 0,
  Half = 1,
}

export enum DepartmentType {
  Production = 0,
  NonProduction = 1,
}

export enum SupplierStatus {
  New,
  Approved,
  UnApproved,
}

export enum FloorType {
  Ground = "Ground",
  First = "First",
  Second = "Second",
  Third = "Third",
  Fourth = "Fourth",
  Fifth = "Fifth",
}

export enum RawLocationType {
  General = "General",
  Active = "Active",
  Excipient = "Excipient",
}
export enum PackLocationType {
  General = "General",
  Foils = "Foils",
  PVC = "PVC",
}

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
  },
  nameTypes: {
    Time: 2,
    Random: 1,
    Series: 0,
  },
};

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
  Package = 1,
}

export enum WarehouseType {
  Storage = 0,
  Production = 1,
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
  rawMaterials: () => "raw-materials",
  createChecklist: (id: string) =>
    `/warehouse/receiving-area/${id}/create-checklist`,
  // createChecklist: () => `/warehouse/receiving-area/create-checklist`,
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
  audits: () => "/audits",
  findings: () => "/findings",
  editEmployee: (params: { id: string }) =>
    `/resource/employees/edit/${params.id}`,
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

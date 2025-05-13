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
  Reserved = 6,
  Consumed = 7,
  Approved = 8,
}

export enum DistributedMaterialStatus {
  Distributed = 0,
  Arrived = 1,
  Checked = 2,
  GrnGenerated = 3,
}

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

export enum ApprovalDocument {
  PurchaseRequisition = "PurchaseRequisition",
  StockRequisition = "StockRequisition",
  PurchaseOrder = "PurchaseOrder",
  BillingSheet = "BillingSheet",
  LeaveRequest = "LeaveRequest",
}

export enum InterestType {
  User = "User",
  Role = "Role",
}

export enum StockTransfer {
  New = 0,
  Approved = 1,
  Issued = 2,
  Rejected = 3,
}
export enum ProductionStatus {
  New,
  InProgress,
  Completed,
  Delayed,
  Cancelled,
}
export enum PurchaseOrderStatusList {
  New = 0,
  Pending = 1,
  Delivered = 2,
  Attached = 3,
  Completed = 4,
}
export enum RequisitionStatus {
  New = 0,
  Pending = 1,
  Sourced = 2,
  Completed = 3,
  Rejected = 4,
}
export enum RequisitionType {
  StockVoucher,
  Purchase,
  StockTransfer,
  StockRequisition,
  Planning,
  Production,
  PurchaseRequisition,
  Sourcing,
  PriceComparison,
  PurchaseOrder,
  ProfomaInvoice,
  GRN,
  Checklist,
}
export enum EMaterialKind {
  Raw = 0,
  Packing = 1,
}
export enum PermissionType {
  Access = "Access",
}

export enum RevisionType {
  ReassignSupplier = 0,
  ChangeSource = 1,
  AddItem = 2,
  UpdateItem = 3,
  RemoveItem = 4,
}

export enum WarehouseType {
  RawMaterial = 0,
  PackagedMaterial = 1,
  FinishedGoods = 2,
  Production = 3,
}
export enum SupplierType {
  Foreign = 0,
  Local = 1,
  // Other = 3,
}
export enum ActivityStepStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Delayed = 3,
  Cancelled = 4,
  Active = 5,
}

export enum FORM_BUILDER_CONFIG {
  TEMPLATES = "Templates",
  QUESTIONS = "Questions",
}
export enum QuestionType {
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

export enum ExtraPackingStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
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
  CLOCK = "clock",
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
  Clock = "clock",
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

export enum Units {
  ML = "ml",
  MG = "mg",
  L = "L",
  KG = "kg",
  G = "g",
}

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

export enum TransferType {
  Incoming,
  Outgoing,
}

export enum ShipmentStatus {
  New = 0,
  InTransit = 1,
  Cleared = 2,
  Arrived = 3,
}

export enum WaybillStatus {
  New = 0,
  Cleared = 1,
  Arrived = 3,
}
export enum BillingSheetStatus {
  Pending,
  Paid,
}

export enum MaritalStatus {
  Single,
  Married,
}

export enum Gender {
  Male,
  Female,
}

export enum LifeStatus {
  Alive,
  Deceased,
}

export enum Religions {
  Christianity,
  Islam,
  Hinduism,
  Buddhism,
  Judaism,
  TARs,
  Sikhism,
  Baháí,
  Other,
}

export enum EmployeeType {
  Casual = 0,
  Permanent = 1,
}

export enum LeaveCategories {
  LeaveRequest = 0,
  AbsenceRequest = 1,
  ExitPassRequest = 2,
}

export enum LeaveStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export enum ApprovalStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

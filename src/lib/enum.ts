export enum IsYesorNo {
  Yes = 1,
  No = 0,
}
export enum IsTrueorFalse {
  True = 1,
  False = 0,
}
export enum SpecificationReference {
  BP,
  USP,
  PhInt,
  InHouse,
}

export enum Division {
  "BETALACTAM" = 0,
  "NON-BETALACTAM" = 1,
}

export enum ExpressionKind {
  Expression,
  Evaluation,
}
export enum WorkflowFormType {
  Material = 0,
  Product = 1,
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
  Stock = "Stock",
  RequestOrder = "RequestOrder",
  Requisition = "Requisition",
  RawMaterial = "RawMaterial",
  Warehouse = "Warehouse",
  PackageMaterial = "PackageMaterial",
  ProductionSchedule = "ProductionSchedule",
  Department = "Department",
  PurchaseOrder = "PurchaseOrder",
  ShipmentDocument = "ShipmentDocument",
  MaterialStandardTestProcedure = "MaterialStandardTestProcedure",
  ProductStandardTestProcedure = "ProductStandardTestProcedure",
  GRNNumber = "GrnNumber",
  StockTransfer = "StockTransfer",
  Waybill = "Waybill",
  BillingSheet = "BillingSheet",
  Employee = "Employee",
  LeaveRequest = "LeaveRequest",
  Overtime = "Overtime",
  MaterialAnalyticalRawData = "MaterialAnalyticalRawData",
  ProductAnalyticalRawData = "ProductAnalyticalRawData",
  FinishedGoodsTransferNote = "FinishedGoodsTransferNote",
  Service = "Service",
  ProductBatchNumber = "ProductBatchNumber",
  ProductionOrder = "ProductionOrder",
  Item = "Item",
  ArNumberMaterial = "ArNumberMaterial",
  ArNumberProduct = "ArNumberProduct",
  MaterialSTPNumber = "MaterialSTPNumber",
  ProductSTPNumber = "ProductSTPNumber",
}

export enum ApprovalDocument {
  PurchaseRequisition = "PurchaseRequisition",
  StockRequisition = "StockRequisition",
  PurchaseOrder = "PurchaseOrder",
  BillingSheet = "BillingSheet",
  LeaveRequest = "LeaveRequest",
  OvertimeRequest = "OvertimeRequest",
  Response = "Response",
  AllocateProductionOrder = "AllocateProductionOrder",
}
export enum InterestType {
  User = "User",
  Role = "Role",
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
  Formular = 10,
  Specification = 11,
}

export enum FormComplete {
  Batch,
  Specification,
}

export enum OperationAction {
  BmrAndBprRequisition = 0,
  StockRequisition = 1,
  FullReturn = 2,
  AdditionalStockRequest = 3,
  FinalPackingOrPartialReturn = 4,
  FinishedGoodsTransferNote = 5,
  Dispatch = 6,
  Atr = 7,
  Ard = 8,
}

export enum ProductState {
  Liquid,
  Granules,
  CompressedTablet,
  FilledCapsules,
  Ointment,
  Coated,
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
  ASYNC_MULTI = "async-multi",
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
  FORMULAR = "formular",
  SIGNATURE = "signature",
}
export enum CollectionTypes {
  ProductCategory = "ProductCategory",
  MaterialCategory = "MaterialCategory",
  PackageCategory = "PackageCategory",
  PackageType = "PackageType",
  Resource = "Resource",
  UnitOfMeasure = "UnitOfMeasure",
  Material = "Material",
  MaterialType = "MaterialType",
  Warehouse = "Warehouse",
  WarehouseLocation = "WarehouseLocation",
  WarehouseLocationRack = "WarehouseLocationRack",
  Product = "Product",
  WorkCenter = "WorkCenter",
  Operation = "Operation",
  Role = "Role",
  User = "User",
  Country = "Country",
  Currency = "Currency",
  PackageStyle = "PackageStyle",
  Charge = "Charge",
  TermsOfPayment = "TermsOfPayment",
  DeliveryMode = "DeliveryMode",
  ShiftCategory = "ShiftCategory",
  ProductState = "ProductState",
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

export enum StockTransfer {
  New = 0,
  Approved = 1,
  Issued = 2,
  Rejected = 3,
}

export enum AnalyticalTestRequestStatus {
  New = 0,
  Sampled = 1,
  Acknowledged = 2,
  Testing = 3,
  TestTaken = 4,
  Released = 5,
}
export enum AnalyticalTestRequestStage {
  Intermediate,
  Bulk,
  Finished,
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
  TestTaken = 9,
  Checked = 10,
}
export enum GRNStatus {
  Pending = 0,
  Partial = 1,
  Completed = 2,
}

export enum ProductionStatus {
  New,
  InProgress,
  Completed,
  Delayed,
  Cancelled,
}
export enum ScheduleStatus {
  New,
  InProgress,
  Completed,
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
export enum ActivityStepStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Delayed = 3,
  Cancelled = 4,
  Active = 5,
}
export enum ExtraPackingStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
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

export enum ProductBMRStatus {
  Requested,
  Issued,
}

export enum SupplierStatus {
  New,
  Approved,
  UnApproved,
}
export enum ShipmentStatus {
  New = 0,
  InTransit = 1,
  AtPort = 2,
  Cleared = 3,
  Arrived = 4,
}

export enum WaybillStatus {
  New = 0,
  Cleared = 3,
  Arrived = 4,
}
export enum BillingSheetStatus {
  Pending,
  Paid,
}

export enum MaritalStatus {
  Single,
  Married,
}

export enum LeaveStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Expired = 3,
  Recalled = 4,
}

export enum ApprovalStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export enum FormType {
  Default,
  Specification,
}

export enum MaterialReturnsStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export enum OvertimeStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}
export enum ShipmentDocumentType {
  Document,
  Waybill,
}
export enum Gender {
  Male,
  Female,
}

export enum LifeStatus {
  Alive,
  Deceased,
}

export enum AnalyticalTestStatus {
  Approved = 0,
  Quarantine = 1,
  Under_Test = 2,
  Rejected = 3,
  Test_Completed = 4,
}

export enum EmployeeStatusType {
  Active = 0,
  Inactive = 1,
  New = 2,
}

export enum EmployeeActiveStatus {
  Question = 0,
  Warning = 1,
  FinalWarning = 2,
  Suspension = 3,
}

export enum EmployeeInactiveStatus {
  Resignation = 0,
  VacatedPost = 1,
  Deceased = 2,
  SummaryDismissed = 3,
  Termination = 4,
  Transfer = 5,
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
  OfficialDutyRequest = 3,
}

export enum ShiftFrequency {
  Week = 0,
  BiWeek = 1,
  Month = 2,
  Quarter = 3,
  Half = 4,
  Year = 5,
}

export enum StartDay {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}

export enum rotationType {
  Rotational = 0,
  Fixed = 1,
}

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export enum StaffRequisitionType {
  Budgeted = 0,
  Unbudgeted = 1,
}

export enum AppointmentType {
  New = 0,
  Replacement = 1,
}

export enum RoleType {
  Production = 0,
  NonProduction = 1,
}

export enum NotificationType {
  ProductionStageChanged = 0,
  ShiftAssigned = 1,
  ShipmentArrived = 2,
  MaterialAboveMaxStock = 3,
  MaterialBelowMinStock = 4,
  MaterialReachedReorderLevel = 5,
  StockRequisitionCreated = 6,
  PartialRequisitionCreated = 7,
  PartialRequestProduction = 8,
  OvertimeRequest = 9,
  LeaveRequest = 10,
  StaffRequest = 11,
  AuditLogEvent = 12,
  BmrBprRequested = 13,
  BmrBprApproved = 14,
  ExpiredMaterial = 15,
}

export enum AlertType {
  Email = 0,
  InApp = 1,
}

export enum FormTypeEnum {
  ARD = 0,
  Specification = 1,
}

export enum InventoryClassificationEnum {
  Recoverable = 0,
  NonRecoverable = 1,
}

export enum ReorderdRules {
  Minimum = 0,
  Reorder = 1,
  Maximum = 2,
}

export enum InventoryType {
  EquipmentStore = 0,
  GeneralStore = 1,
  "IT Store" = 2,
}

export enum ProductionOrderType {
  Pending = 0,
  Paid = 1,
}

export enum IssueItemStockRequisitionStatus {
  Pending = 0,
  Partial = 1,
  Completed = 2,
}

export enum InventoryRequisitionSource {
  TrustedVendor = 0,
  OpenMarket = 1,
}

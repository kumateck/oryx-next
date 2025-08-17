import { z } from "zod";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const IS_DEV = process.env.NODE_ENV !== "production";

export const APP_NAME = "Oryx ERP";

export const COOKIE_ID = "_bt3HfM6509fhsYE";
export const USER_PERMISSIONS = "PERMISSIONS";
export enum APP_CONTEXT {
  ORYX_ERP = "oryx-erp",
}

export const ORYX_ERP_COOKIE_ID = `${APP_CONTEXT.ORYX_ERP}-${COOKIE_ID}`;

export const USER_PERMISSIONS_COOKIE_ID = `${APP_CONTEXT.ORYX_ERP}-${COOKIE_ID}-${USER_PERMISSIONS}`;

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
  PackageStyle: "PackageStyle",
  Charge: "Charge",
  TermsOfPayment: "TermsOfPayment",
  DeliveryMode: "DeliveryMode",
  ShiftCategory: "ShiftCategory",
  ProductState: "ProductState",
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
    MaterialStandardTestProcedure: "MaterialStandardTestProcedure",
    ProductStandardTestProcedure: "ProductStandardTestProcedure",
    GRNNumber: "GrnNumber",
    StockTransfer: "StockTransfer",
    Waybill: "Waybill",
    BillingSheet: "BillingSheet",
    Employee: "Employee",
    LeaveRequest: "LeaveRequest",
    Overtime: "Overtime",
    MaterialAnalyticalRawData: "MaterialAnalyticalRawData",
    ProductAnalyticalRawData: "ProductAnalyticalRawData",
    FinishedGoodsTransferNote: "FinishedGoodsTransferNote",
    Service: "Service",
    // GeneralInventory: "GeneralInventory",
    ProductionOrder: "ProductionOrder",
    Item: "Item",
  },
  nameTypes: {
    Time: 2,
    Random: 1,
    Series: 0,
  },
};

export interface NumberOption {
  id: string;
  quantity: number;
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
  onboarding: () => "/onboarding",
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
  planning: () => "/plannings",
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
  // suppliers: () => `/procurement/suppliers`,
  // editSupplier: (id: string) => `/procurement/suppliers/${id}/edit`,
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
  suppliers: () => "/settings/suppliers",
  newSupplier: () => "/settings/suppliers/create",
  editSupplier: (id: string) => `/settings/suppliers/${id}/edit`,
  approvals: () => "/settings/approvals",
  newApproval: () => "/settings/approvals/create",
  editApproval: (params: { id: string }) =>
    `/settings/approvals/edit/${params.id}`,
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
  viewFinalPacking: (id: string) =>
    `/production/activities/${id}/final-packing`,
  viewExtraPacking: (id: string, pid: string, psId: string) =>
    `/production/activities/${id}/extra-packing/${pid}/${psId}`,
  viewBoard: (id: string) => `/production/activities/${id}/board`,
  viewDetails: (id: string, sid: string) =>
    `/production/activities/${id}/board/${sid}`,

  manageRoles: () => "/access-management/roles",
  newRole: () => "/access-management/roles/create",
  editRole: (id: string) => `/access-management/roles/edit/${id}`,
  access: () => "/access-management/permissions",
};

// export const formatClock = (hours: number, minutes: number, light: boolean) => {
//   const result = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${light ? "AM" : "PM"}`;
//   return result.trim(); // Ensure there are no extra spaces
// };
// export const formatClock = (
//   hours: number,
//   minutes: number,
//   light: boolean,
//   days?: number
// ): string => {
//   const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
//     .toString()
//     .padStart(2, "0")} ${light ? "AM" : "PM"}`;

//   if (days && days > 0) {
//     console.log(days, "days",`${days}d ${timeStr}`.trim());
//     return `${days}d ${timeStr}`.trim();
//   }

//   console.log(timeStr.trim(), "time only")
//   return timeStr.trim();
// };

export type OptionsMap = {
  [key: string]: Option[];
};

export type stringsMap = {
  [key: string]: Option[];
};
export type quantityMap = {
  [key: string]: NumberOption[];
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

export const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

export const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

export const scales = ["", "Thousand", "Million", "Billion"];

export const PermissionKeys = {
  procurement: {
    createManufacturer: "CanCreateManufacturer",
    viewManufacturerDetails: "CanViewManufacturerDetails",
    updateManufacturerDetails: "CanUpdateManufacturerDetails",
    deleteManufacturer: "CanDeleteManufacturer",
    createVendor: "CanCreateVendor",
    viewVendorDetails: "CanViewVendorDetails",
    updateVendorDetails: "CanUpdateVendorDetails",
    deleteVendor: "CanDeleteVendor",
    viewPurchaseRequisitions: "CanViewPurchaseRequisitions",
    sourceItemsBasedOnRequisition: "CanSourceItemsBasedOnRequisition",
    sendQuotationRequest: "CanSendQuotationRequest",
    inputResponses: "CanInputResponses",
    selectVendorPricing: "CanSelectVendorPricing",
    sendAwardedQuotations: "CanSendAwardedQuotations",
    uploadProformaInvoice: "CanUploadProformaInvoice",
    createPurchaseOrder: "CanCreatePurchaseOrder",
    reviseExistingPurchaseOrder: "CanReviseExistingPurchaseOrder",
    distributeMaterials: "CanDistributeMaterials",
  },
  logistics: {
    createShipmentInvoice: "CanCreateShipmentInvoice",
    viewShipmentInvoice: "CanViewShipmentInvoice",
    editShipmentInvoice: "CanEditShipmentInvoice",
    deleteShipmentInvoice: "CanDeleteShipmentInvoice",
    createShipmentDocument: "CanCreateShipmentDocument",
    viewShipmentDocument: "CanViewShipmentDocument",
    editShipmentDocument: "CanEditShipmentDocument",
    deleteShipmentDocument: "CanDeleteShipmentDocument",
    changeShipmentDocumentStatus: "CanChangeShipmentDocumentStatus",
    createBillingSheet: "CanCreateBillingSheet",
    viewBillingSheet: "CanViewBillingSheet",
    editBillingSheet: "CanEditBillingSheet",
    deleteBillingSheet: "CanDeleteBillingSheet",
    createWaybill: "CanCreateWaybill",
    viewWaybill: "CanViewWaybill",
    editWaybill: "CanEditWaybill",
    deleteWaybill: "CanDeleteWaybill",
    changeWaybillStatus: "CanChangeWaybillStatus",
  },
  humanResources: {
    viewEmployee: "CanViewEmployee",
    registerEmployee: "CanRegisterEmployee",
    updateEmployeeDetails: "CanUpdateEmployeeDetails",
    deleteEmployee: "CanDeleteEmployee",
    viewUser: "CanViewUser",
    createUser: "CanCreateUser",
    updateUserDetails: "CanUpdateUserDetails",
    deleteUser: "CanDeleteUser",
    viewDesignation: "CanViewDesignation",
    createDesignation: "CanCreateDesignation",
    editDesignation: "CanEditDesignation",
    deleteDesignation: "CanDeleteDesignation",
    viewRoles: "CanViewRoles",
    createRoleAndAssignPermissions: "CanCreateRoleAndAssignPermissions",
    editRoleWithItsPermissions: "CanEditRoleWithItsPermissions",
    deleteRole: "CanDeleteRole",
    viewLeaveRequests: "CanViewLeaveRequests",
    createLeaveRequest: "CanCreateLeaveRequest",
    editLeaveRequest: "CanEditLeaveRequest",
    deleteOrCancelLeaveRequest: "CanDeleteOrCancelLeaveRequest",
    approveOrRejectLeaveRequest: "CanApproveOrRejectLeaveRequest",
  },
  warehouse: {
    viewReceivedRawMaterialsItems: "CanViewReceivedRawMaterialsItems",
    viewReceivedPackagingMaterialsItems:
      "CanViewReceivedPackagingMaterialsItems",
    createChecklistForIncomingRawMaterialsGoods:
      "CanCreateChecklistForIncomingRawMaterialsGoods",
    createChecklistForIncomingPackagingMaterialsGoods:
      "CanCreateChecklistForIncomingPackagingMaterialsGoods",
    createGrnForRawMaterialsChecklistedItems:
      "CanCreateGrnForRawMaterialsChecklistedItems",
    createGrnForPackagingMaterialsChecklistedItems:
      "CanCreateGrnForPackagingMaterialsChecklistedItems",
    viewQuarantineRawMaterialsRecords: "CanViewQuarantineRawMaterialsRecords",
    viewQuarantinePackagingMaterialsRecords:
      "CanViewQuarantinePackagingMaterialsRecords",
    assignRawMaterialsStockToStorageLocations:
      "CanAssignRawMaterialsStockToStorageLocations",
    assignPackagingMaterialsStockToStorageLocations:
      "CanAssignPackagingMaterialsStockToStorageLocations",
    viewDepartments: "CanViewDepartments",
    createNewDepartment: "CanCreateNewDepartment",
    editDepartment: "CanEditDepartment",
    viewWarehouses: "CanViewWarehouses",
    addWarehouse: "CanAddWarehouse",
    editWarehouse: "CanEditWarehouse",
    viewLocations: "CanViewLocations",
    addNewLocation: "CanAddNewLocation",
    editLocation: "CanEditLocation",
    viewRacks: "CanViewRacks",
    addNewRack: "CanAddNewRack",
    editRack: "CanEditRack",
    viewShelves: "CanViewShelves",
    addNewShelf: "CanAddNewShelf",
    editShelf: "CanEditShelf",
    viewRawMaterials: "CanViewRawMaterials",
    viewPackagingMaterials: "CanViewPackagingMaterials",
    createNewRawMaterials: "CanCreateNewRawMaterials",
    createNewPackagingMaterials: "CanCreateNewPackagingMaterials",
    editRawMaterials: "CanEditRawMaterials",
    editPackagingMaterials: "CanEditPackagingMaterials",
    deleteRawMaterials: "CanDeleteRawMaterials",
    deletePackagingMaterials: "CanDeletePackagingMaterials",
    viewApprovedRawMaterials: "CanViewApprovedRawMaterials",
    viewApprovedPackagingMaterials: "CanViewApprovedPackagingMaterials",
    viewRejectedRawMaterials: "CanViewRejectedRawMaterials",
    viewRejectedPackagingMaterials: "CanViewRejectedPackagingMaterials",
    viewRawMaterialRequisitions: "CanViewRawMaterialRequisitions",
    viewPackagingMaterialRequisitions: "CanViewPackagingMaterialRequisitions",
    issueRawMaterialRequisitions: "CanIssueRawMaterialRequisitions",
    issuePackagingMaterialRequisitions: "CanIssuePackagingMaterialRequisitions",
    viewRawMaterialTransferList: "CanViewRawMaterialTransferList",
    viewPackagingMaterialTransferList: "CanViewPackagingMaterialTransferList",
    issueRawMaterialStockTransfers: "CanIssueRawMaterialStockTransfers",
    issuePackagingMaterialStockTransfers:
      "CanIssuePackagingMaterialStockTransfers",
    viewRawMaterialLocationChartList: "CanViewRawMaterialLocationChartList",
    viewPackagingMaterialLocationChartList:
      "CanViewPackagingMaterialLocationChartList",
    reassignRawMaterialStock: "CanReassignRawMaterialStock",
    reassignPackagingMaterialStock: "CanReassignPackagingMaterialStock",
  },
  production: {
    createRawMaterialPurchaseRequisition:
      "CanCreateRawMaterialPurchaseRequisition",
    createPackagingMaterialPurchaseRequisition:
      "CanCreatePackagingMaterialPurchaseRequisition",
    createRawMaterialStockRequisition: "CanCreateRawMaterialStockRequisition",
    createPackagingMaterialStockRequisition:
      "CanCreatePackagingMaterialStockRequisition",
    createRawMaterialStockTransfer: "CanCreateRawMaterialStockTransfer",
    createPackagingMaterialStockTransfer:
      "CanCreatePackagingMaterialStockTransfer",
    viewPlannedProducts: "CanViewPlannedProducts",
    createNewProductionPlan: "CanCreateNewProductionPlan",
    editProductionPlan: "CanEditProductionPlan",
    viewStockTransferRequests: "CanViewStockTransferRequests",
    approveOrRejectStockTransferRequest:
      "CanApproveOrRejectStockTransferRequest",
    viewProductSchedules: "CanViewProductSchedules",
    createProductSchedule: "CanCreateProductSchedule",
    updateProductSchedule: "CanUpdateProductSchedule",
  },
  settings: {
    viewSystemSettings: "CanViewSystemSettings",
    viewUserSettings: "CanViewUserSettings",
    viewAuditLogs: "CanViewAuditLogs",
    exportAuditLogs: "CanExportAuditLogs",
  },
  categories: {
    productCategory: {
      view: "CanViewProductCategories",
      createNew: "CanCreateNewProductCategory",
      edit: "CanEditProductCategory",
      delete: "CanDeleteProductCategory",
    },
    rawCategory: {
      view: "CanViewRawCategories",
      createNew: "CanCreateNewRawCategory",
      edit: "CanEditRawCategory",
      delete: "CanDeleteRawCategory",
    },
    packageCategory: {
      view: "CanViewPackageCategories",
      createNew: "CanCreateNewPackageCategory",
      edit: "CanEditPackageCategory",
      delete: "CanDeletePackageCategory",
    },
  },
  procedures: {
    resource: {
      view: "CanViewResources",
      createNew: "CanCreateNewResource",
      edit: "CanEditResource",
      delete: "CanDeleteResource",
    },
    operation: {
      view: "CanViewOperations",
      createNew: "CanCreateNewOperation",
      edit: "CanEditOperation",
      delete: "CanDeleteOperation",
    },
    workCenter: {
      view: "CanViewWorkCenters",
      createNew: "CanCreateNewWorkCenter",
      edit: "CanEditWorkCenter",
      delete: "CanDeleteWorkCenter",
    },
  },
  products: {
    materialType: {
      view: "CanViewMaterialTypes",
      createNew: "CanCreateNewMaterialType",
      edit: "CanEditMaterialType",
      delete: "CanDeleteMaterialType",
    },
    unitOfMeasure: {
      view: "CanViewUnitOfMeasure",
    },
  },
  address: {
    country: {
      view: "CanViewCountries",
    },
  },
  container: {
    packStyle: {
      view: "CanViewPackStyles",
      createNew: "CanCreateNewPackStyle",
      edit: "CanEditPackStyle",
      delete: "CanDeletePackStyle",
    },
  },
  billingSheetCharges: {
    view: "CanViewBillingCharges",
    createNew: "CanCreateNewBillingSheetCharge",
    edit: "CanEditBillingSheetCharge",
    delete: "CanDeleteBillingSheetCharge",
  },
  termsOfPayment: {
    view: "CanViewPaymentTerms",
    createNew: "CanCreateNewPaymentTerm",
    edit: "CanEditPaymentTerm",
    delete: "CanDeletePaymentTerm",
  },
  deliveryMode: {
    view: "CanViewDeliveryModes",
    createNew: "CanCreateNewDeliveryMode",
    edit: "CanEditDeliveryMode",
    delete: "CanDeleteDeliveryMode",
  },
  codeSettings: {
    view: "CanViewCodeSettings",
    addNewCodes: "CanAddNewCodes",
    edit: "CanEditCodeSettings",
    delete: "CanDeleteCodeSettings",
  },
  approvals: {
    view: "CanViewApproval",
    createOrConfigureNewApproval: "CanCreateOrConfigureNewApproval",
    editApprovalWorkflow: "CanEditApprovalWorkflow",
    deleteOrDisableApprovals: "CanDeleteOrDisableApprovals",
  },
  alertsAndNotifications: {
    view: "CanViewAlerts",
    createNew: "CanCreateNewAlerts",
    edit: "CanEditAlerts",
    enableOrDisable: "CanEnableOrDisableAlerts",
    delete: "CanDeleteAlerts",
  },
  equipment: {
    view: "CanViewEquipments",
    addNew: "CanAddNewEquipment",
    edit: "CanEditEquipmentDetails",
    delete: "CanDeleteEquipment",
  },
  workflowForms: {
    questions: {
      view: "CanViewQuestions",
      createNew: "CanCreateNewQuestions",
      edit: "CanEditQuestions",
      delete: "CanDeleteQuestions",
    },
    templates: {
      view: "CanViewTemplates",
      createNew: "CanCreateNewTemplates",
      edit: "CanEditTemplates",
      delete: "CanDeleteTemplates",
    },
  },
  qualityControl: {
    materialStp: {
      view: "CanViewMaterialSTPs",
      create: "CanCreateMaterialSTP",
      edit: "CanEditMaterialSTP",
      delete: "CanDeleteMaterialSTP",
    },
    productStp: {
      view: "CanViewProductSTPs",
      create: "CanCreateProductSTP",
      edit: "CanEditProductSTP",
      delete: "CanDeleteProductSTP",
    },
    materialArd: {
      view: "CanViewMaterialARDs",
      create: "CanCreateMaterialARD",
      edit: "CanEditMaterialARD",
      delete: "CanDeleteMaterialARD",
    },
    productArd: {
      view: "CanViewProductARDs",
      create: "CanCreateProductARD",
      edit: "CanEditProductARD",
      delete: "CanDeleteProductARD",
    },
    goodsReceipt: "CanViewGoodsReceiptNotes",
    sample: "CanTakeSample",
    startTest: "CanStartTest",
    materialSpecification: {
      view: "CanViewMaterialSpecifications",
      create: "CanCreateMaterialSpecification",
      edit: "CanEditMaterialSpecification",
      delete: "CanDeleteMaterialSpecification",
    },
    productSpecification: {
      view: "CanViewProductSpecifications",
      create: "CanCreateProductSpecification",
      edit: "CanEditProductSpecification",
      delete: "CanDeleteProductSpecification",
    },
  },
  qualityAssurance: {
    bmr: {
      viewIssued: "CanViewIssuedBMRs",
      issue: "CanIssueBMR",
    },
    bmrbpr: {
      viewRequests: "CanViewBMRBPRRequests",
      createRequest: "CanCreateBMRBPRRequest",
      approveOrReject: "CanApproveOrRejectBMRBPRRequest",
    },
    analyticalTest: {
      view: "CanViewAnalyticalTestRequests",
      create: "CanCreateAnalyticalTestRequest",
      takeSamples: "CanTakeSamples",
      startTest: "CanStartTestAnalytical",
    },
    pendingApprovals: "CanViewPendingApprovals",
  },
  inventory: {
    vendors: {
      view: "CanViewVendorsInventory",
      create: "CanCreateVendorInventory",
      edit: "CanEditVendorInventory",
      // delete missing in C# snippet but may exist
    },
  },
};

export const AuditModules = {
  general: {
    name: "General",
    fileUpload: "File Upload",
    collection: "Collection",
    AssignShift: "Assign Shift",
  },
  logistics: {
    name: "Logistics",
    availableStock: "Available Stock",
    shipmentInvoices: "Shipment Invoices",
    shipmentDocuments: "Shipment Documents",
    shipmentDiscrepancy: "Shipment Discrepancy",
    billingSheets: "Billing Sheets",
    waybill: "Waybill",
  },

  warehouse: {
    name: "Warehouse",
    receivingArea: "Receiving Area",
    quarantineAreaGRN: "Quarantine Area/GRN",
    materials: "Materials",
    unlinkMaterials: "Unlink Materials",
    linkedMaterials: "Linked Materials",
    approvedMaterials: "Approved Materials",
    stockRequisitions: "Stock Requisitions",
    extraPackingRequisitions: "Extra Packing Requisitions",
    stockTransferIssues: "Stock Transfer Issues",
    locationChartRecord: "Location Chart Record",
    QaGrn: "Quality Assurance Goods Receipt Note",
    packingStock: "Packing Material Stock",
    rawStock: "Raw Material Stock ",
    approvedProducts: "Approved Products",
    attendanceReport: "Attendance Report",
  },

  procurement: {
    name: "Procurement",
    purchaseRequisition: "Purchase Requisition",
    quotationsRequest: "Quotations Request",
    quotationsResponses: "Quotations Responses",
    priceComparison: "Price Comparison",
    awardedQuotations: "Awarded Quotations",
    proformaResponses: "Proforma Responses",
    createPurchaseOrders: "Create Purchase Orders",
    purchaseOrderLists: "Purchase Order Lists",
    materialDistribution: "Material Distribution",
  },

  production: {
    name: "Production",
    materialRequisitions: "Material Requisitions",
    createPurchaseRequisitions: "Create Purchase Requisitions",
    others: "Others",
    planning: "Product Planning",
    productSpecification: "Product Specification",
    materialSpecification: "Material Specification",
    stockTransferRequests: "Stock Transfer Requests",
    productSchedule: "Product Schedule",
    activities: "Activities",
    steps: "Steps",
    bmr: "BMR",
    goodsReceivedNotes: "Goods Received Notes",
    finalPacking: "Final Packing",
    extraPacking: "Extra Packing",
    bom: "BOM",
    packing: "Packing",
    returns: "Returns",
    procedure: "Procedure",
  },
  management: {
    name: "HR Management",
    employeeManagement: "Employee",
    designationManagement: "Designation",
    leaveManagement: "Leave Request",
    leaveTypeConfiguration: "Leave Type",
    overTimeMangement: "Over Time",
    staffRequisition: "Staff Requisition",
    shiftUpload: "Shift Upload",
  },

  accessManagement: {
    name: "Access Management",
    manageRoles: "Manage Roles",
    managePermissions: "Manage Permissions",
  },

  userManagement: {
    name: "User Management",
    manageUsersDirectory: "Manage Users Directory",
  },

  qualityAssurance: {
    name: "Quality Assurance",
    issueBMR: "Issue BMR",
    pendingApprovals: "Pending Approvals",
    analyticalRawData: "Analytical Raw Data",
  },

  settings: {
    name: "Settings",
    departments: "Departments",
    configurations: "Configurations",
    codeSettings: "Code Settings",
    changePassword: "Change Password",
    authUser: "Authenticated User",
    approvals: "Approvals",
    alertsAndNotifications: "Alerts & Notifications",
    currencySettings: "Currency Settings",
    equipment: "Equipment",
    workFlow: "Work Flow",
    userDirectory: "User Directory",
    warehouses: "Warehouses",
    locations: "Locations",
    racks: "Racks",
    shelves: "Shelves",
    standardTestProcedure: "Standard Test Procedure",
    manufacturers: "Manufacturers",
    holidays: "Holidays",
    suppliers: "Suppliers",
    alerts: "Alerts",
    signature: "Signature",
  },
  authentication: {
    name: "Authentication",
    login: "Login",
    forgot: "Forgot Password",
    reset: "Reset Password",
    logout: "Logout",
    setPassword: "Set Password",
    changePassword: "Change Password",
  },
  extral: {
    name: "Extral",
    service: "Service",
    serviceProviders: "Service Providers",
    generalInventoryConfiguration: "General Inventory Configuration",
  },
};

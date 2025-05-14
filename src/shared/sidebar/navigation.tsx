import { type LucideIconProps } from "@/components/ui";

// Define the sub-item structure for nested menu items.
interface SubItem {
  title: string;
  url?: string;
  icon?: LucideIconProps;
  children?: SubItem[];
}

// Define the main menu item structure.
export interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIconProps;
  isActive?: boolean;
  items?: SubItem[]; // Optional array of sub-items.
}

// Define the structure for each main route section.
export interface Route {
  title: string;
  menu: MenuItem[];
}

export const ROUTES: Route[] = [
  {
    title: "Main",
    menu: [
      {
        title: "Dashboard",
        url: "/home",
        icon: "LayoutDashboard",
        isActive: false,
      },
      {
        title: "Product Board",
        url: "/production/activities",
        icon: "SquareDashedKanban",
        isActive: false,
      },
    ],
  },
  {
    title: "Supply Chain",
    menu: [
      {
        title: "Logistics",
        // url: "",
        icon: "Forklift",
        //    isActive: false,
        items: [
          {
            title: "Available Stock",
            url: "/stock/available",
          },
          {
            title: "Shipment Invoices",
            url: "/logistics/shipment-invoices",
          },
          {
            title: "Shipment Documents",
            url: "/logistics/shipment-documents",
          },
          {
            title: "Shipment Discrepancy",
            url: "/logistics/shipment-discrepancy",
          },
          {
            title: "Billing Sheets",
            url: "/logistics/billing-sheets",
          },
          {
            title: "Waybill",
            url: "/logistics/waybill",
          },
        ],
      },
      {
        title: "Warehouse",
        // url: "string",
        icon: "Warehouse",
        //    isActive: false,
        items: [
          {
            title: "Departments",
            url: "/warehouse/departments",
          },
          {
            title: "Receiving Area",
            url: "/warehouse/receiving-area",
          },
          {
            title: "Quarantine Area/GRN",
            url: "/warehouse/quarantine-area",
          },
          {
            title: "Warehouses",
            url: "/warehouse/warehouses",
          },
          {
            title: "Locations",
            url: "/warehouse/locations",
          },
          {
            title: "Racks",
            url: "/warehouse/racks",
          },
          {
            title: "Shelves",
            url: "/warehouse/shelves",
          },
          {
            title: "Materials",
            url: "/warehouse/materials",
          },
          {
            title: "Unlink Materials",
            url: "/warehouse/materials/unlink",
          },
          {
            title: "Linked Materials",
            url: "/warehouse/materials/linked",
          },
          // {
          //   title: "Raw Materials Requests",
          //   url: "/warehouse/raw-materials-requests",
          // },
          {
            title: "Approved Materials",
            url: "/warehouse/approved-materials",
          },
          // {
          //   title: "Available Stock",
          //   url: "/stock/available",
          // },
          {
            title: "Stock Requisitions",
            url: "/warehouse/stock-requisition",
          },
          {
            title: "Extra Packing Requisitions",
            url: "/warehouse/extra-packing",
          },
          {
            title: "Stock Transfer issues",
            url: "/warehouse/stock-transfer-requests",
          },
          {
            title: "Location Chart Record",
            url: "/warehouse/location-chart",
          },
          {
            title: "Material Returns Note",
            url: "/warehouse/material-returns",
          },
          // {
          //   title: "Packaging Materials Receiving Area",
          //   url: "/warehouse/packaging-receiving-area",
          // },
        ],
      },
      {
        title: "Procurement",
        // url: "string",
        icon: "Microchip",
        //    isActive: false,
        items: [
          {
            title: "Manufacturers",
            url: "/procurement/manufacturers",
          },
          {
            title: "Suppliers",
            url: "/procurement/suppliers",
          },

          {
            title: "Purchase Requisition",
            url: "/procurement/requisition",
          },
          {
            title: "Quotations Request",
            url: "/procurement/quotations",
          },

          {
            title: "Quotations Reponses",
            url: "/procurement/sales-quotation",
          },
          {
            title: "Price Comparison",
            url: "/procurement/price-comparison",
          },
          {
            title: "Awarded Quotations",
            url: "/procurement/awarded-quotations",
          },
          {
            title: "Profoma Responses",
            url: "/procurement/profoma-responses",
          },
          {
            title: "Create Purchase Orders",
            url: "/procurement/purchase-orders",
          },
          {
            title: "Purchase Order Lists",
            url: "/procurement/purchase-order-lists",
          },
          {
            title: "Material Distribution",
            url: "/procurement/material-distribution",
          },
        ],
      },
    ],
  },
  {
    title: "Production",
    menu: [
      {
        title: "Requisition",
        // url: "",
        icon: "Notebook",
        //    isActive: false,
        items: [
          {
            title: "Material Requisitions",
            url: "/production/requisition/general",
          },
          {
            title: "Create Purchase Requisitions",
            url: "/production/requisition/create",
          },
          {
            title: "Others",
            url: "/production/stock-requisition/others",
          },
          // {
          //   title: "Shipment Discrepancy",
          //   url: "/logistics/shipment-discrepancy",
          // },
        ],
      },
      // {
      //   title: "Stock Requisition",
      //   // url: "/production/stock-requisition",
      //   icon: "Notebook",
      //   items: [
      //     {
      //       title: "Materials",
      //       url: "/production/stock-requisition",
      //     },
      //     {
      //       title: "Others",
      //       url: "/production/stock-requisition/others",
      //     },
      //   ],
      //   //    isActive: false,
      // },
      {
        title: "Planning",
        url: "/production/plannings",
        icon: "FolderKanban",
        //    isActive: false,
      },
      {
        title: "Stock Transfer Requests",
        url: "/production/stock-transfer-requests",
        icon: "ALargeSmall",
      },
      // {
      //   title: "Work Order",
      //   url: "/production/work-order",
      //   icon: "FolderKanban",
      //   isActive: false,
      // },
      {
        title: "Product Schedule",
        url: "/production/schedules",
        icon: "SwatchBook",
        isActive: false,
      },
      // {
      //   title: "Master Schedule",
      //   url: "/production/master-schedule",
      //   icon: "Bookmark",
      //   isActive: false,
      // },
    ],
  },
  {
    title: "Human Resource",
    menu: [
      {
        title: "Management",
        icon: "Folder",
        items: [
          {
            title: "Employee Management",
            url: "/hr/employee-management",
          },
          {
            title: "Designation Management",
            url: "/hr/designation-management",
          },
          {
            title: "Leave Management",
            url: "/hr/leave-management",
          },
          {
            title: "Leave Type Configuration",
            url: "/hr/leave-configuration",
          },
        ],
      },
    ],
  },
  {
    title: "Access Control",
    menu: [
      {
        title: "Access Management",
        icon: "Folder",
        items: [
          {
            title: "Manage Roles",
            url: "/access-management/roles",
          },
          {
            title: "Manage Permissions",
            url: "/access-management/permissions",
          },
        ],
      },
      {
        title: "User Management",
        icon: "Folder",
        items: [
          {
            title: "Manage Users Directory",
            url: "/access-management/users",
          },
          {
            title: "Audit Trail",
            url: "/access-management/audit-trail",
          },
        ],
      },
    ],
  },
  {
    title: "Quality Assurance",
    menu: [
      {
        title: "Issue BMR",
        url: "/qa/issue-bmr",
        icon: "BookUser",
        isActive: false,
        // items: [{
        //   title: "string",
        //   url: "string"
        // }]
      },
      {
        title: "Pending Approvals",
        url: "/qa/pending-approvals",
        icon: "CircleDotDashed",
        isActive: false,
      },
    ],
  },
  {
    title: "System Settings",
    menu: [
      {
        title: "Settings",
        url: "/settings",
        icon: "Settings",
        isActive: false,
      },
    ],
  },
  {
    title: "CRM",
    menu: [
      // {
      //   title: "string",
      //   url: "string",
      //   icon: "UserRound",
      //   isActive: false,
      //   // items: [{
      //   //   title: "string",
      //   //   url: "string"
      //   // }]
      // },
    ],
  },
  {
    title: "Internal",
    menu: [
      // {
      //   title: "string",
      //   url: "string",
      //   icon: "ShieldCheck",
      //   isActive: false,
      //   // items: [{
      //   //   title: "string",
      //   //   url: "string"
      //   // }]
      // },
    ],
  },
  {
    title: "Reports",
    menu: [
      // {
      //   title: "string",
      //   url: "string",
      //   icon: "ClipboardPlus",
      //   isActive: false,
      //   // items: [{
      //   //   title: "string",
      //   //   url: "string"
      //   // }]
      // },
    ],
  },
];

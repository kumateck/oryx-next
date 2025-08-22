import { type LucideIconProps } from "@/components/ui";
import { AnalyticalTestRequestStatus } from "@/lib";

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
        title: "HR Dashboard",
        url: "/hr-dashboard",
        icon: "ChartBarBig",
        isActive: false,
      },
      {
        title: "QC Dashboard",
        url: "/qa-qc-dashboard/qc",
        icon: "Table2",
        isActive: false,
      },
      {
        title: "QA Dashboard",
        url: "/qa-qc-dashboard/qa",
        icon: "TableProperties",
        isActive: false,
      },
      {
        title: "Product Board",
        url: "/production/activities",
        icon: "SquareChartGantt",
        isActive: false,
      },
      {
        title: "Planned Shift",
        url: "/plan-shift",
        icon: "NotebookPen",
        isActive: false,
      },
    ],
  },
  {
    title: "Logistics",
    menu: [
      {
        title: "Shipment Management",
        icon: "Forklift",
        items: [
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
        title: "Stock Information",
        icon: "Boxes",
        items: [
          {
            title: "Available Stock",
            url: "/stock/available",
          },
        ],
      },
    ],
  },
  {
    title: "Warehouse Management",
    menu: [
      {
        title: "Material Intake",
        icon: "Warehouse",
        items: [
          {
            title: "Receiving Area",
            url: "/warehouse/receiving-area",
          },
          {
            title: "Quarantine Area/GRN",
            url: "/warehouse/quarantine-area",
          },
          {
            title: "Approved Materials",
            url: "/warehouse/approved-materials",
          },
          {
            title: "Unlink Materials",
            url: "/warehouse/materials/unlink",
          },
          {
            title: "Linked Materials",
            url: "/warehouse/materials/linked",
          },
          {
            title: "Materials",
            url: "/warehouse/materials",
          },
        ],
      },
      {
        icon: "ReceiptJapaneseYen",
        title: "Rejected Area",
        url: "/warehouse/rejected-area",
      },
      {
        title: "Material Requests",
        icon: "FilePenLine",
        items: [
          {
            title: "Issue Stock Requisition",
            url: "/warehouse/stock-requisition",
          },
          {
            title: "Extra Packing Requisitions",
            url: "/warehouse/extra-packing",
          },
          {
            title: "Material Returns Note",
            url: "/warehouse/material-returns",
          },
        ],
      },
      {
        title: "Stock Movement",
        icon: "PackageMinus",
        items: [
          {
            title: "Stock Transfer issues",
            url: "/warehouse/stock-transfer-requests",
          },
          {
            title: "Location Chart Record",
            url: "/warehouse/location-chart",
          },
          {
            title: "Approved Products",
            url: "/warehouse/approved-products",
          },
          {
            title: "Products Allocation",
            url: "/warehouse/products-allocation",
          },
          {
            title: "Finished Goods Transfer Note",
            url: "/warehouse/finished-goods-transfer-notes",
          },
        ],
      },
    ],
  },
  {
    title: "Procurement",
    menu: [
      {
        title: "Requests",
        icon: "ShoppingCart",
        items: [
          {
            title: "Purchase Requisition",
            url: "/procurement/requisition",
          },
          {
            title: "Quotations Request",
            url: "/procurement/quotations",
          },
          {
            title: "Price Comparison",
            url: "/procurement/price-comparison",
          },
        ],
      },
      {
        title: "Quotations",
        icon: "FileSpreadsheet",
        items: [
          {
            title: "Quotations Responses",
            url: "/procurement/sales-quotation",
          },
          {
            title: "Awarded Quotations",
            url: "/procurement/awarded-quotations",
          },
        ],
      },
      {
        title: "Orders",
        icon: "Package",
        items: [
          {
            title: "Create Purchase Orders",
            url: "/procurement/purchase-orders",
          },
          {
            title: "Purchase Order Lists",
            url: "/procurement/purchase-order-lists",
          },
        ],
      },
      {
        title: "Distribution",
        icon: "Forklift",
        items: [
          {
            title: "Material Distribution",
            url: "/procurement/material-distribution",
          },
          {
            title: "Profoma Responses",
            url: "/procurement/profoma-responses",
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
        icon: "FilePenLine",
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
        ],
      },
      {
        title: "Planning",
        url: "/production/plannings",
        icon: "CalendarRange",
        isActive: false,
      },
      {
        title: "Product Schedule",
        url: "/production/schedules",
        icon: "Calendar",
        isActive: false,
      },
      {
        title: "Stock Transfer Requests",
        url: "/production/stock-transfer-requests",
        icon: "PackageMinus",
      },
    ],
  },
  {
    title: "Quality Assurance",
    menu: [
      {
        title: "Issue BMR/BPR",
        url: "/qa/issue-bmr",
        icon: "ShieldCheck",
        isActive: false,
      },
      {
        title: "Analytical Test Requests",
        url: `/atr?type=${AnalyticalTestRequestStatus.New}`,
        icon: "FlaskConical",
      },
      {
        title: "Pending Approvals",
        url: "/qa/pending-approvals",
        icon: "Hourglass",
        isActive: false,
      },
    ],
  },
  {
    title: "Quality Control",
    menu: [
      {
        title: "Testing",
        icon: "FlaskRound",
        items: [
          {
            title: "Analytical Test Requests",
            url: `/atr?type=${AnalyticalTestRequestStatus.Sampled}`,
          },
          {
            title: "Goods Receipt Note",
            url: "/qc/goods-receipt-note",
          },
        ],
      },
      {
        title: "StandardTest Procedures",
        icon: "ChartNoAxesGantt",
        items: [
          {
            title: "Material",
            url: "/qc/material-stp",
          },
          {
            title: "Product",
            url: "/qc/products-stp",
          },
        ],
      },
      {
        title: "Specifications",
        icon: "ClipboardList",
        items: [
          {
            title: "Material",
            url: "/qc/material-specification",
          },
          {
            title: "Product",
            url: "/qc/product-specification",
          },
        ],
      },
      {
        title: "Analytical Raw Data",
        icon: "FileText",
        items: [
          {
            title: "Material",
            url: "/qc/analytical-raw-data",
          },
          {
            title: "Product",
            url: "/qc/product-analytical-raw-data",
          },
        ],
      },
    ],
  },
  {
    title: "CRM",
    menu: [
      {
        title: "Customer",
        url: "/crm/customers",
        icon: "UserRound",
        isActive: false,
      },
      {
        title: "Job Request",
        url: "/crm/jobs/job-request",
        icon: "UserRoundPlus",
        isActive: false,
      },
      {
        title: "Production Order",
        url: "/crm/production-order",
        icon: "Factory",
        isActive: false,
      },
      {
        title: "Proforma Invoice",
        url: "/crm/proforma-invoice",
        icon: "Sheet",
        isActive: false,
      },
      {
        title: "Invoice",
        url: "/crm/invoices",
        icon: "FileSpreadsheet",
        isActive: false,
      },
    ],
  },
  {
    title: "Inventory & Stores",
    menu: [
      {
        title: "Stores",
        icon: "Boxes",
        items: [
          {
            title: "Receiving Area",
            url: "/extrals/receiving-area",
          },
          {
            title: "Available Stocks",
            url: "/extrals/available-stocks",
          },
          {
            title: "Purchase Requisition",
            url: "/extrals/purchase-requisitions",
          },
          {
            title: "Purchase Requisition Sourcing",
            url: "/extrals/purchase-requisition-sourcing",
          },
          {
            title: "Stock Requisition",
            url: "/extrals/stock-requisitions",
          },
          {
            title: "Damage/Missing Items",
            url: "/extrals/damage-missing-items",
          },
          {
            title: "Vendors",
            url: "/extrals/vendors",
          },
          {
            title: "Open Source Memos",
            url: "/extrals/open-source-memo",
          },
          {
            title: "Open Market Quotation",
            url: "/extrals/open-market-quotation",
          },
          {
            title: "Price Comparison",
            url: "/extrals/price-comparison",
          },
        ],
      },
      {
        title: "Service",
        icon: "Wrench",
        items: [
          {
            title: "Services",
            url: "/extrals/services",
          },
          {
            title: "Service Providers",
            url: "/extrals/services-providers",
          },
          {
            title: "General Inventory",
            url: "/extrals/general-inventory-config",
          },
        ],
      },
    ],
  },
  {
    title: "Human Resource",
    menu: [
      {
        title: "Employee Management",
        icon: "UserCog",
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
            title: "Staff Requisition",
            url: "/hr/staff-requisition",
          },
        ],
      },
      {
        title: "Leave Management",
        icon: "CalendarRange",
        items: [
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
      {
        title: "Attendance & Schedule",
        icon: "Calendar",
        items: [
          {
            title: "Attendance Report Upload",
            url: "/hr/attendance-report-upload",
          },
          {
            title: "Shift Schedule Report Upload",
            url: "/hr/shift-schedule-upload",
          },
          {
            title: "Overtime Management",
            url: "/hr/overtime-management",
          },
        ],
      },
    ],
  },
  {
    title: "IT Support",
    menu: [
      {
        title: "User Management",
        icon: "UserPlus",
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
      {
        title: "Access Management",
        icon: "Key",
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
    ],
  },
  {
    title: "System Settings",
    menu: [
      {
        title: "System Configuration",
        url: "/settings",
        icon: "Cog",
        isActive: false,
      },
    ],
  },
  {
    title: "Reports",
    menu: [
      {
        title: "Human Resources Report",
        url: "/reports/human-resources-report",
        icon: "Users",
      },
      {
        title: "Inventory Report",
        url: "/reports/inventory-report",
        icon: "ClipboardList",
      },
      {
        title: "QC and QA Report",
        url: "/reports/qc-qa-reports",
        isActive: false,
        icon: "FileCheck2",
      },
    ],
  },
];

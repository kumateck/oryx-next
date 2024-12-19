import { LucideIconName } from "./ui/icon";

// Define the sub-item structure for nested menu items.
interface SubItem {
  title: string;
  url?: string;
  children?: SubItem[];
}

// Define the main menu item structure.
export interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIconName;
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
        url: "/dashboard",
        icon: "LayoutDashboard",
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
            title: "Manufacturers",
            url: "/logistics/manufacturers",
          },
          {
            title: "Vendors",
            url: "/logistics/vendors",
          },
          {
            title: "Available Stock",
            url: "/stock/available",
          },
          {
            title: "Shipment",
            url: "/logistics/shipment",
          },
          {
            title: "Billing Sheet",
            url: "/logistics/billing-sheet",
          },
          {
            title: "Purchase Order",
            url: "/logistics/purchase-order",
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
            title: "Lists",
            url: "/warehouse/raw-materials",
          },
          {
            title: "Raw Materials",
            url: "/warehouse/raw-materials",
          },
          {
            title: "Available Stock",
            url: "/stock/available",
          },
          {
            title: "Stock Requisitions",
            url: "/stock/requisitions",
          },
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
            title: "Vendors",
            url: "/procurement/vendors",
          },
          // {
          //   title: "Proforma Invoices",
          //   url: "/procurement/proforma-invoice",
          // },
          {
            title: "Purchase Requisition",
            url: "/procurement/requisition",
          },
          {
            title: "Quotations Request",
            url: "/procurement/quotations",
            children: [
              {
                title: "Foreign",
                url: "/procurement/foreign-quotation",
              },
              {
                title: "Local",
                url: "/procurement/local-quotation",
              },
            ],
          },
          // {
          //   title: "Foreign Quotations",
          //   url: "/procurement/foreign-quotation",
          // },
          // {
          //   title: "Local Quotations",
          //   url: "/procurement/local-quotation",
          // },

          {
            title: "Sales Quotations",
            url: "/procurement/sales",
            children: [
              {
                title: "Foreign",
                url: "/procurement/foreign-sales-quotation",
              },
              {
                title: "Local",
                url: "/procurement/local-sales-quotation",
              },
            ],
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
            title: "Purchase Orders",
            url: "/procurement/purchase-orders",
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
        // url: "/production/stock-requisition",
        icon: "Notebook",
        items: [
          {
            title: "General",
            url: "/production/requisition",
          },
          {
            title: "Others",
            url: "/production/stock-requisition/others",
          },
        ],
        //    isActive: false,
      },
      {
        title: "Stock Requisition",
        // url: "/production/stock-requisition",
        icon: "Notebook",
        items: [
          {
            title: "Materials",
            url: "/production/stock-requisition",
          },
          {
            title: "Others",
            url: "/production/stock-requisition/others",
          },
        ],
        //    isActive: false,
      },
      {
        title: "Planning",
        url: "/production/plannings",
        icon: "Notebook",
        //    isActive: false,
      },
      {
        title: "Work Order",
        url: "/production/work-order",
        icon: "FolderKanban",
        isActive: false,
      },
      {
        title: "Product Schedule",
        url: "/production/schedules",
        icon: "SwatchBook",
        isActive: false,
      },
      {
        title: "Master Schedule",
        url: "/production/master-schedule",
        icon: "Bookmark",
        isActive: false,
      },
    ],
  },
  {
    title: "Human Resource",
    menu: [
      // {
      //   title: "string",
      //   url: "string",
      //   icon: "BookUser",
      //   isActive: false,
      //   // items: [{
      //   //   title: "string",
      //   //   url: "string"
      //   // }]
      // },
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

// 🔵 NEW/INITIAL STATES - Light Blue
const NEW_STATUSES = ["New", "Open", "Received", "Question"];
const NEW_COLORS = {
  tailwind: {
    bg: "bg-blue-50",
    text: "text-blue-900",
    border: "border-blue-200",
  },
  hex: { background: "#E3F2FD", color: "#0D47A1" },
};

// 🟡 PENDING/WAITING STATES - Light Amber
const PENDING_STATUSES = ["Pending", "Quarantine", "Warning", "Requested"];
const PENDING_COLORS = {
  tailwind: {
    bg: "bg-amber-50",
    text: "text-amber-900",
    border: "border-amber-200",
  },
  hex: { background: "#FFF8E1", color: "#F57F17" },
};

// 🟢 SUCCESS/APPROVED STATES - Light Green
const SUCCESS_STATUSES = [
  "Approved",
  "Completed",
  "Available",
  "Released",
  "Resolved",
  "Active",
  "Alive",
  "Paid",
  "Issued",
];
const SUCCESS_COLORS = {
  tailwind: {
    bg: "bg-green-50",
    text: "text-green-900",
    border: "border-green-200",
  },
  hex: { background: "#E8F5E8", color: "#2E7D32" },
};

// 🔴 REJECTED/ERROR STATES - Light Red
const REJECTED_STATUSES = [
  "Rejected",
  "Cancelled",
  "Overdue",
  "NonCompliant",
  "Non Compliant",
  "SummaryDismissed",
  "Termination",
  "Suspension",
];
const REJECTED_COLORS = {
  tailwind: { bg: "bg-red-50", text: "text-red-900", border: "border-red-200" },
  hex: { background: "#FFEBEE", color: "#C62828" },
};

// 🟠 WARNING/PARTIAL STATES - Light Orange
const WARNING_STATUSES = [
  "Partial",
  "Delayed",
  "Retest",
  "FinalWarning",
  "Final Warning",
  "Recalled",
  "IssuedRequisition",
  "Issued Requisition",
];
const WARNING_COLORS = {
  tailwind: {
    bg: "bg-orange-50",
    text: "text-orange-900",
    border: "border-orange-200",
  },
  hex: { background: "#FFF3E0", color: "#E65100" },
};

// 🟣 PROCESSING/TESTING STATES - Light Purple
const PROCESSING_STATUSES = [
  "Testing",
  "InProgress",
  "In Progress",
  "Sampled",
  "Under Test",
  "Under_Test",
  "Bulk",
  "TestTaken",
  "Test Taken",
  "Attached",
  "PurchaseRequisition",
  "Purchase Requisition",
  "VacatedPost",
  "Vacated Post",
];
const PROCESSING_COLORS = {
  tailwind: {
    bg: "bg-purple-50",
    text: "text-purple-900",
    border: "border-purple-200",
  },
  hex: { background: "#F3E5F5", color: "#6A1B9A" },
};

// 🔵 ACKNOWLEDGED/CLEARED STATES - Light Teal
const ACKNOWLEDGED_STATUSES = [
  "Acknowledged",
  "Cleared",
  "Sourced",
  "Delivered",
  "Checked",
  "LocalProcurement",
  "Local Procurement",
  "TestCompleted",
  "Test Completed",
  "Transfer",
];
const ACKNOWLEDGED_COLORS = {
  tailwind: {
    bg: "bg-teal-50",
    text: "text-teal-900",
    border: "border-teal-200",
  },
  hex: { background: "#E0F2F1", color: "#00695C" },
};

// 🔵 TRANSIT/MOVEMENT STATES - Light Cyan
const TRANSIT_STATUSES = ["InTransit", "In Transit", "Frozen", "Arrived"];
const TRANSIT_COLORS = {
  tailwind: {
    bg: "bg-cyan-50",
    text: "text-cyan-900",
    border: "border-cyan-200",
  },
  hex: { background: "#E1F5FE", color: "#0277BD" },
};

// 🟤 INACTIVE/CLOSED STATES - Light Stone/Brown
const INACTIVE_STATUSES = [
  "Consumed",
  "Closed",
  "Inactive",
  "Expired",
  "Deceased",
  "NoSource",
  "No Source",
];
const INACTIVE_COLORS = {
  tailwind: {
    bg: "bg-stone-50",
    text: "text-stone-900",
    border: "border-stone-200",
  },
  hex: { background: "#EFEBE9", color: "#5D4037" },
};

// 🔵 INTERMEDIATE STATES - Light Amber (different from pending)
const INTERMEDIATE_STATUSES = [
  "Intermediate",
  "StockRequisition",
  "Stock Requisition",
  "Finished",
];
const INTERMEDIATE_COLORS = {
  tailwind: {
    bg: "bg-yellow-50",
    text: "text-yellow-900",
    border: "border-yellow-200",
  },
  hex: { background: "#FFFBF0", color: "#92400E" },
};

// ============================================================================
// INDIVIDUAL/UNIQUE STATUS COLORS - Special cases
// ============================================================================

const INDIVIDUAL_STATUS_COLORS = {
  // Gender specific colors
  Male: {
    tailwind: {
      bg: "bg-blue-50",
      text: "text-blue-900",
      border: "border-blue-200",
    },
    hex: { background: "#E3F2FD", color: "#0D47A1" },
  },
  Female: {
    tailwind: {
      bg: "bg-pink-50",
      text: "text-pink-900",
      border: "border-pink-200",
    },
    hex: { background: "#FCE4EC", color: "#AD1457" },
  },

  // Marital status specific colors
  Single: {
    tailwind: {
      bg: "bg-indigo-50",
      text: "text-indigo-900",
      border: "border-indigo-200",
    },
    hex: { background: "#E8EAF6", color: "#3F51B5" },
  },
  Married: {
    tailwind: {
      bg: "bg-pink-50",
      text: "text-pink-900",
      border: "border-pink-200",
    },
    hex: { background: "#FCE4EC", color: "#AD1457" },
  },

  // Document types
  Document: {
    tailwind: {
      bg: "bg-indigo-50",
      text: "text-indigo-900",
      border: "border-indigo-200",
    },
    hex: { background: "#E8EAF6", color: "#3F51B5" },
  },
  Waybill: {
    tailwind: {
      bg: "bg-purple-50",
      text: "text-purple-900",
      border: "border-purple-200",
    },
    hex: { background: "#F3E5F5", color: "#6A1B9A" },
  },

  // Form types
  Default: {
    tailwind: {
      bg: "bg-gray-50",
      text: "text-gray-900",
      border: "border-gray-200",
    },
    hex: { background: "#F5F5F5", color: "#424242" },
  },
  Specification: {
    tailwind: {
      bg: "bg-indigo-50",
      text: "text-indigo-900",
      border: "border-indigo-200",
    },
    hex: { background: "#E8EAF6", color: "#3F51B5" },
  },

  // Material status specific
  StockTransfer: {
    tailwind: {
      bg: "bg-blue-50",
      text: "text-blue-900",
      border: "border-blue-200",
    },
    hex: { background: "#E3F2FD", color: "#0D47A1" },
  },
  "Stock Transfer": {
    tailwind: {
      bg: "bg-blue-50",
      text: "text-blue-900",
      border: "border-blue-200",
    },
    hex: { background: "#E3F2FD", color: "#0D47A1" },
  },
  ForeignProcurement: {
    tailwind: {
      bg: "bg-indigo-50",
      text: "text-indigo-900",
      border: "border-indigo-200",
    },
    hex: { background: "#E8EAF6", color: "#3F51B5" },
  },
  "Foreign Procurement": {
    tailwind: {
      bg: "bg-indigo-50",
      text: "text-indigo-900",
      border: "border-indigo-200",
    },
    hex: { background: "#E8EAF6", color: "#3F51B5" },
  },
  InHouse: {
    tailwind: {
      bg: "bg-green-50",
      text: "text-green-900",
      border: "border-green-200",
    },
    hex: { background: "#E8F5E8", color: "#2E7D32" },
  },
  "In House": {
    tailwind: {
      bg: "bg-green-50",
      text: "text-green-900",
      border: "border-green-200",
    },
    hex: { background: "#E8F5E8", color: "#2E7D32" },
  },

  // Port/shipping specific
  AtPort: {
    tailwind: {
      bg: "bg-purple-50",
      text: "text-purple-900",
      border: "border-purple-200",
    },
    hex: { background: "#F3E5F5", color: "#6A1B9A" },
  },
  "At Port": {
    tailwind: {
      bg: "bg-purple-50",
      text: "text-purple-900",
      border: "border-purple-200",
    },
    hex: { background: "#F3E5F5", color: "#6A1B9A" },
  },

  // Employee status specific
  Resignation: {
    tailwind: {
      bg: "bg-indigo-50",
      text: "text-indigo-900",
      border: "border-indigo-200",
    },
    hex: { background: "#E8EAF6", color: "#3F51B5" },
  },
  UnApproved: {
    tailwind: {
      bg: "bg-red-50",
      text: "text-red-900",
      border: "border-red-200",
    },
    hex: { background: "#FFEBEE", color: "#C62828" },
  },
};

// Default fallback color
const DEFAULT_COLOR = {
  tailwind: {
    bg: "bg-gray-50",
    text: "text-gray-900",
    border: "border-gray-200",
  },
  hex: { background: "#F5F5F5", color: "#424242" },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get color scheme for a status label
 */
function getStatusColors(label: string, useHex: boolean = false): any {
  const colorType = useHex ? "hex" : "tailwind";

  // Check individual status colors first (highest priority)
  if (
    INDIVIDUAL_STATUS_COLORS[label as keyof typeof INDIVIDUAL_STATUS_COLORS]
  ) {
    return INDIVIDUAL_STATUS_COLORS[
      label as keyof typeof INDIVIDUAL_STATUS_COLORS
    ][colorType];
  }

  // Check grouped status colors
  if (NEW_STATUSES.includes(label)) return NEW_COLORS[colorType];
  if (PENDING_STATUSES.includes(label)) return PENDING_COLORS[colorType];
  if (SUCCESS_STATUSES.includes(label)) return SUCCESS_COLORS[colorType];
  if (REJECTED_STATUSES.includes(label)) return REJECTED_COLORS[colorType];
  if (WARNING_STATUSES.includes(label)) return WARNING_COLORS[colorType];
  if (PROCESSING_STATUSES.includes(label)) return PROCESSING_COLORS[colorType];
  if (ACKNOWLEDGED_STATUSES.includes(label))
    return ACKNOWLEDGED_COLORS[colorType];
  if (TRANSIT_STATUSES.includes(label)) return TRANSIT_COLORS[colorType];
  if (INACTIVE_STATUSES.includes(label)) return INACTIVE_COLORS[colorType];
  if (INTERMEDIATE_STATUSES.includes(label))
    return INTERMEDIATE_COLORS[colorType];

  // Default fallback
  return DEFAULT_COLOR[colorType];
}

// ============================================================================
// MAIN FUNCTIONS
// ============================================================================

/**
 * Get enum badge data with Tailwind classes
 * Usage: const { label, colorClass } = getEnumBadge(GRNStatus, status);
 */
export function getEnumBadgeWithTailwind<
  T extends Record<string, string | number>,
>(enumObj: T, value: T[keyof T]): { label: string; colorClass: string } {
  // Get the label
  const label =
    typeof value === "number"
      ? (enumObj[value] as string) // numeric enum
      : value?.toString(); // string enum

  // Get Tailwind colors
  const colors = getStatusColors(label || "", false);

  // Combine all classes
  const colorClass = `${colors.bg} ${colors.text} ${colors.border}`;

  return {
    label: label || "Unknown",
    colorClass,
  };
}

/**
 * Get enum badge data with hex colors (inline styles)
 * Usage: const { label, style } = getEnumBadgeWithHexColors(GRNStatus, status);
 */
export function getEnumBadgeWithHexColors<
  T extends Record<string, string | number>,
>(
  enumObj: T,
  value: T[keyof T],
): { label: string; style: React.CSSProperties } {
  const label =
    typeof value === "number" ? (enumObj[value] as string) : value?.toString();

  const colors = getStatusColors(label || "", true);

  return {
    label: label || "Unknown",
    style: {
      backgroundColor: colors.background,
      color: colors.color,
      border: `1px solid ${colors.color}20`, // 20% opacity for border
    },
  };
}

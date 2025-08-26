import { cva } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { OptionsUpdate } from "@/components/pages/production/schedule/create/form";

import {
  APP_NAME,
  CODE_SETTINGS,
  Option,
  ones,
  scales,
  tens,
} from "./constants";
import { MaterialStatus, Units } from "./enum";

import {
  NamingType,
  ProductionScheduleProcurementDto,
} from "./redux/api/openapi.generated";
import { Quotations, RecordItem, Section } from "./types";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const avatarStackVariants = cva("flex", {
  variants: {
    orientation: {
      vertical: "flex-row",
      horizontal: "flex-col",
    },
    spacing: {
      sm: "-space-x-5 -space-y-5",
      md: "-space-x-4 -space-y-4",
      lg: "-space-x-3 -space-y-3",
      xl: "-space-x-2 -space-y-2",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    spacing: "md",
  },
});

export type FormOption = {
  id: string;
  name: string;
  isDisabled?: boolean;
};
export const getKeyByValue = (value: number) => {
  const nameTypes = CODE_SETTINGS.nameTypes;

  // Type assertion to tell TypeScript that the keys are of type keyof typeof nameTypes
  return (Object.keys(nameTypes) as (keyof typeof nameTypes)[]).find(
    (key) => nameTypes[key] === value,
  );
};

export function getPageTitle(pageName: string) {
  return `${APP_NAME} | ${pageName}`;
}
export const formatTime = (hours: number, minutes: number) => {
  let result = "";

  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  if (minutes > 0) {
    // Add a space if hours is included
    if (hours > 0) result += " ";
    result += `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return result.trim(); // Ensure there are no extra spaces
};

export function splitWords(input: string) {
  return input?.replace(/([a-z])([A-Z])/g, "$1 $2"); // Insert space before each uppercase letter if it follows a lowercase letter
}

export function getFirstCharacter(word: string) {
  if (word && typeof word === "string") {
    return word.charAt(0);
  }
  return ""; // return an empty string if input is invalid
}

interface ErrorDetail {
  code: string;
  description: string;
  type: number;
  message?: string;
}

export interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  data?: {
    errors: ErrorDetail[];
  };
  errors: ErrorDetail[];
}
export const isErrorResponse = (error: ErrorResponse) => {
  console.log("error", error);
  const err = error.errors ?? error?.data?.errors;
  const errorResponse = err[0];
  console.log("Error message", errorResponse.description);
  return errorResponse;
};

export interface GenerateCodeOptions {
  prefix: string;
  minlength: number;
  maxlength: number;
  type: NamingType;
  seriesCounter?: number;
}

enum CodeGenType {
  Sequencial = 0,
  Random = 1,
  Timestamp = 2,
}
export const generateCode = (options: GenerateCodeOptions) => {
  const { prefix, minlength, maxlength, type, seriesCounter = 1 } = options; // Default to 1 if seriesCounter is not provided

  let generatedCode = "";

  switch (type) {
    case CodeGenType.Timestamp:
      // Generate code based on the current timestamp
      generatedCode = Date.now().toString();
      break;

    case CodeGenType.Random:
      // Generate a random numeric string
      generatedCode = Math.random()
        .toString()
        .slice(2, 2 + maxlength); // Slice to fit the max length
      break;

    case CodeGenType.Sequencial:
      // Increment the series counter and pad it with zeros to match the length
      generatedCode = seriesCounter.toString().padStart(minlength, "0");
      break;

    default:
      // throw new Error("Invalid type provided");
      generatedCode = "";
  }

  // Ensure the generated code fits the minlength and maxlength constraints
  if (generatedCode.length < minlength) {
    generatedCode = generatedCode.padStart(minlength, "0"); // Pad with leading zeros
  } else if (generatedCode.length > maxlength) {
    generatedCode = generatedCode.slice(0, maxlength); // Truncate to the max length
  }

  // Return the final code with the prefix
  return `${prefix}${generatedCode}`;
};

export const getStatusColor = (status: MaterialStatus) => {
  switch (status) {
    case MaterialStatus.NoSource:
      return "bg-platinum-default text-platinum-disabled";
    case MaterialStatus.StockTransfer:
      return "bg-warning-default text-warning-disabled";
    case MaterialStatus.PurchaseRequisition:
      return "bg-teal-default text-teal-disabled";
    case MaterialStatus.ForeignProcurement:
      return "bg-severe-default text-severe-disabled";
    case MaterialStatus.LocalProcurement:
      return "bg-danger-default text-danger-disabled";
    case MaterialStatus.StockRequisition:
      return "bg-gold-default text-gold-disabled";
    case MaterialStatus.IssuedRequisition:
      return "bg-success-default text-success-disabled";

    default:
      return "bg-white text-neutral-dark";
  }
};

export function areAllMaterialsAvailable(
  materials: ProductionScheduleProcurementDto[],
): boolean {
  return materials.every(
    (item) => Number(item.quantityOnHand) >= Number(item.quantityNeeded),
  );
}

export function areAnyMaterialsUnavailable(
  materials: ProductionScheduleProcurementDto[],
): boolean {
  return materials.some(
    (item) => Number(item.quantityOnHand) < Number(item.quantityNeeded),
  );
}

export function isStockUnAvailable(
  materials: ProductionScheduleProcurementDto[],
): boolean {
  for (const item of materials) {
    // console.log(item.material?.name, item.quantityOnHand, item.quantityNeeded,Number(item.quantityOnHand) >= Number(item.quantityNeeded),"unavailable");

    if (
      // Number(item.status) === MaterialStatus.NoSource &&
      Number(item.quantityOnHand) < Number(item.quantityNeeded)
    ) {
      console.log("I cannot process, I need to add a stock.");
      return true; // At least one stock is insufficient
    }
  }
  return false; // All stocks are sufficient
}

export function isStockAvailable(
  materials: ProductionScheduleProcurementDto[],
): boolean {
  for (const item of materials) {
    // console.log(item.material?.name, item.quantityOnHand, item.quantityNeeded,Number(item.quantityOnHand) >= Number(item.quantityNeeded),"available");
    if (
      // Number(item.status) === MaterialStatus.InHouse &&

      Number(item.quantityOnHand) >= Number(item.quantityNeeded)
    ) {
      console.log("I cannot process, I need to add a stock.");
      return true; // At least one stock is insufficient
    }
  }
  return false; // All stocks are sufficient
}
export const quantityAvailable = (
  materials: ProductionScheduleProcurementDto[],
) => {
  // Calculate the total quantityRequested
  const totalQuantityRequested = materials.reduce(
    (sum, item) => sum + (item?.quantityNeeded || 0),
    0,
  );

  // Calculate the total quantityOnHand
  const totalQuantityOnHand = materials.reduce(
    (sum, item) => sum + (item?.quantityOnHand || 0),
    0,
  );

  // console.log(
  //   totalQuantityOnHand,
  //   totalQuantityRequested,
  //   totalQuantityOnHand > totalQuantityRequested,
  //   materials,
  // );

  return totalQuantityOnHand > totalQuantityRequested;
};

// export const calcQuantityMargin = (quantity: number, margin: number) => {
//   return quantity * (margin / 100);
// };
export const calcQuantityMargin = (quantity: number, margin: number) => {
  const result = quantity * (margin / 100);
  return parseFloat(result.toFixed(2));
};
type GroupedBySupplier = {
  supplierId: string;
  sourceRequisitionId: string;
  items: {
    materialId: string;
    uomId: string;
    quantity: number;
    price: number;
  }[];
};
// export const findSelectedQuotation = (state: Quotations[]) => {
//   const data = state
//     ?.map((item) => {
//       const selected = item?.supplierQuotations?.find((p) => p?.selected);
//       return {
//         materialId: item?.materialId,
//         quantity: item?.quantity,
//         uomId: item?.uomId,
//         supplierId: selected?.supplierId,
//         price: selected?.price,
//       };
//     })
//     .filter((item) => item?.supplierId);
//   const grouped: { [key: string]: GroupedBySupplier } = {};

//   data.forEach((item) => {
//     const { supplierId, materialId, uomId, quantity, price } = item;
//     const supplier = supplierId as string;
//     const pricePerUnit = price as number;
//     if (!grouped[supplier]) {
//       grouped[supplier] = {
//         supplierId: supplier,
//         items: [],
//       };
//     }

//     grouped[supplier].items.push({
//       materialId,
//       uomId,
//       quantity,
//       price: pricePerUnit,
//     });
//   });

//   return Object.values(grouped);
// };

export const getFormData = (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key] ?? "");
  });
  return formData;
};
export function generateShelfCode(
  floor: string,
  rackNumber: string,
  shelfLevel: string,
) {
  // console.log("Shelf code generation function called");
  // Ensure all parameters are provided
  if (!floor || !rackNumber || !shelfLevel) {
    return "";
  }
  // Get the first letter of floor and shelfLevel, convert to uppercase
  const floorCode = floor.trim()[0].toUpperCase();
  const shelfCode = shelfLevel.trim()[0].toUpperCase();
  // Combine into the desired format
  const code = `${floorCode}/${rackNumber}/${shelfCode}`;
  return code;
}

export const calculateFitAndOverflow = (
  options: Option[],
  maxCharacters: number,
): {
  fitItems: Option[];
  overflowItems: Option[];
  overflowCount: number;
  currentTotal: number;
} => {
  // Function to calculate total length (label length + 3)
  const calculateTotalLength = (label: string): number => label.length + 4;
  const maxChars = maxCharacters - 5;

  const fitItems: Option[] = [];
  let currentTotal = 0;

  // Track the items that fit within the maxCharacters
  cleanArrayObject(options)?.forEach((item) => {
    const itemLength = calculateTotalLength(item.label);
    if (currentTotal + itemLength <= maxChars) {
      fitItems.push(item);
      currentTotal += itemLength;
    }
  });

  const fitItemsValues = fitItems?.map((item) => item.value);
  const overflowItems = options.filter(
    (item) => !fitItemsValues?.includes(item.value),
  );

  // Calculate overflow count
  const overflowCount = options.length - fitItems.length;

  const cleanedArray = cleanArrayObject(fitItems);

  // console.log(cleanedArray, "cleanedArray", options, fitItems);

  return { currentTotal, fitItems: cleanedArray, overflowCount, overflowItems };
};

// export const cleanArrayObject = (fitItems: Option[]) => {
//   const cleanedArray = fitItems?.filter(
//     (item) => item && Object.keys(item).length > 0,
//   );
//   return cleanedArray;
// };
export const cleanArrayObject = (fitItems: Option[]) => {
  const cleanedArray = fitItems?.filter(
    (item) =>
      item && // Ensure item is not null or undefined
      Object.keys(item).length > 0 && // Ensure the object is not empty
      item.label?.trim() !== "" && // Check that 'label' is not an empty string
      item.value?.trim() !== "", // Check that 'value' is not an empty string
  );
  return cleanedArray;
};

export const findSelectedQuotation = (state: Quotations[]) => {
  const data = state
    ?.map((item) => {
      const selected = item?.supplierQuotations?.find((p) => p?.selected);
      return {
        materialId: item?.materialId,
        quantity: item?.quantity,
        uomId: item?.uomId,
        supplierId: selected?.supplierId,
        price: selected?.price,
        sourceRequisitionId: selected?.sourceRequisitionId,
      };
    })
    .filter((item) => item?.supplierId);
  const grouped: { [key: string]: GroupedBySupplier } = {};

  data.forEach((item) => {
    const {
      supplierId,
      materialId,
      uomId,
      quantity,
      price,
      sourceRequisitionId,
    } = item;
    const supplier = supplierId as string;
    const pricePerUnit = price as number;
    if (!grouped[supplier]) {
      grouped[supplier] = {
        supplierId: supplier,
        sourceRequisitionId: sourceRequisitionId as string,
        items: [],
      };
    }

    grouped[supplier].items.push({
      materialId,
      uomId,
      quantity,
      price: pricePerUnit,
    });
  });

  return Object.values(grouped);
};

export const findSelectedQuotationSubmit = (state: Quotations[]) => {
  const data = state?.map((item) => {
    const selected = item?.supplierQuotations?.find((p) => p?.selected);
    return {
      materialId: item?.materialId,
      quantity: item?.quantity,
      uomId: item?.uomId,
      supplierId: selected?.supplierId,
      price: selected?.price,
      sourceRequisitionId: selected?.sourceRequisitionId,
    };
  });

  // check if any material has no selected supplier
  const unselected = data?.filter((d) => !d?.supplierId);
  if (unselected?.length) {
    throw new Error(
      "Please select a supplier for all materials before submitting",
    );
  }

  // group only valid ones
  const grouped: { [key: string]: GroupedBySupplier } = {};
  data
    .filter((item) => item?.supplierId)
    .forEach((item) => {
      const {
        supplierId,
        materialId,
        uomId,
        quantity,
        price,
        sourceRequisitionId,
      } = item;
      const supplier = supplierId as string;
      const pricePerUnit = price as number;

      if (!grouped[supplier]) {
        grouped[supplier] = {
          supplierId: supplier,
          sourceRequisitionId: sourceRequisitionId as string,
          items: [],
        };
      }

      grouped[supplier].items.push({
        materialId,
        uomId,
        quantity,
        price: pricePerUnit,
      });
    });

  return Object.values(grouped);
};
export const convertUnits = (
  quantity: number,
  fromUnit: string,
  toUnit: string,
): number | string => {
  // Handle ml to L and vice versa
  if (fromUnit === Units.ML && toUnit === Units.L) {
    return quantity / 1000;
  } else if (fromUnit === Units.L && toUnit === Units.ML) {
    return quantity * 1000;
  }

  // Handle mg to g and vice versa
  if (fromUnit === Units.MG && toUnit === Units.G) {
    return quantity / 1000;
  } else if (fromUnit === Units.G && toUnit === Units.MG) {
    return quantity * 1000;
  }

  // Handle mg to kg and vice versa
  if (fromUnit === Units.MG && toUnit === Units.KG) {
    return quantity / 1_000_000;
  } else if (fromUnit === Units.KG && toUnit === Units.MG) {
    return quantity * 1_000_000;
  }

  // Handle g to kg and vice versa
  if (fromUnit === Units.G && toUnit === Units.KG) {
    return quantity / 1000;
  } else if (fromUnit === Units.KG && toUnit === Units.G) {
    return quantity * 1000;
  }

  return "Invalid unit conversion";
};

export const renderUOM = (productOptions: OptionsUpdate[], value: string) => {
  const uom = productOptions?.find((item) => item.value === value)?.uom ?? "";
  let IndexUom = "";
  if (uom === Units.ML) {
    IndexUom = Units.L;
  } else if (uom === Units.MG) {
    IndexUom = Units.KG;
  }
  return IndexUom;
};
export const formulaForRawMaterialCalc = (
  materialQty: number,
  baseQty: number,
  batchSize: number,
) => {
  const res = (materialQty / baseQty) * batchSize;
  return res;
};

interface UnitFactor {
  name: Units;
  factor: number;
}

export const volumeUnits: UnitFactor[] = [
  { name: Units.ML, factor: 1 },
  { name: Units.L, factor: 1_000 }, // 1 L = 1000 mL
  // { name: "kL", factor: 1_000_000 }, // 1 kL = 1000 L = 1,000,000 mL
  // You could add more (e.g., ML = 1,000 kL) if needed
];
export const massUnits: UnitFactor[] = [
  { name: Units.MG, factor: 1 },
  { name: Units.G, factor: 1_000 },
  { name: Units.KG, factor: 1_000_000 },
];

export function convertToLargestUnit(
  value: number,
  baseUnit: Units,
): { value: number; unit: Units | string } {
  const relevantArray = getRelevantArray(baseUnit);
  if (relevantArray.length === 0) {
    return {
      value: Math.round(value * 100) / 100,
      unit: "",
    };
  }

  // 2a) Identify which chain to use (volume or mass), based on the baseUnit
  let chain: UnitFactor[];
  if (volumeUnits.some((u) => u.name === baseUnit)) {
    chain = volumeUnits;
  } else if (massUnits.some((u) => u.name === baseUnit)) {
    chain = massUnits;
  } else {
    // If the baseUnit isn't in our known lists, just return as-is
    return { value, unit: baseUnit };
  }

  // 2b) Find the factor for the base unit.
  //     Example: if baseUnit = "mL", factor = 1; if baseUnit = "g", factor = 1000 (since g is 1000 mg).
  const base = chain.find((u) => u.name === baseUnit);
  if (!base) {
    // Not found in chain — fallback
    return { value: Math.round(value * 100) / 100, unit: baseUnit };
  }

  // 2c) Convert 'value' into the smallest “baseline” in the chain.
  //     e.g. if baseUnit = "g", we move to mg by multiplying:
  //     newValueInBaseline = value * base.factor.
  //
  //     For example, 5 g = 5 × 1000 mg = 5000 mg in baseline mg
  //
  //     If baseUnit = "mL", baseline is also mL, so factor=1 → no change.
  const valueInBaseline = value * base.factor;

  // 2d) Starting from the largest unit in the chain, see how high we can go
  let bestUnit = chain[0];
  for (const unit of chain) {
    // We compare the "valueInBaseline" to "unit.factor":
    // e.g. if valueInBaseline = 3,000,000 mg, then we see if that >= 1,000,000 (kg's factor).
    if (valueInBaseline >= unit.factor) {
      bestUnit = unit;
    } else {
      // The chain is in ascending order, so once we fail, we stop.
      break;
    }
  }

  // 2e) Convert from "baseline" up to the bestUnit
  // e.g. if bestUnit = kg (1,000,000 mg), and we have valueInBaseline = 3,000,000 mg,
  // then finalValue = 3,000,000 / 1,000,000 = 3
  // const finalValue = valueInBaseline / bestUnit.factor;
  const finalValue = parseFloat((valueInBaseline / bestUnit.factor).toFixed(2));

  return { value: finalValue, unit: bestUnit.name };
}

export function convertToSmallestUnit(
  value: number,
  baseUnit: Units,
): { value: number; unit: Units | string } {
  const relevantArray = getRelevantArray(baseUnit);
  if (relevantArray.length === 0) {
    return {
      value,
      unit: "",
    };
  }

  // console.log(value, baseUnit);
  // 1) Identify which chain to use (volume or mass), based on the baseUnit
  let chain: UnitFactor[];
  if (volumeUnits.some((u) => u.name === baseUnit)) {
    chain = volumeUnits;
  } else if (massUnits.some((u) => u.name === baseUnit)) {
    chain = massUnits;
  } else {
    // If the baseUnit isn't in our known lists, just return as-is
    return { value, unit: baseUnit };
  }

  // 2) Find the factor for the base unit
  const base = chain.find((u) => u.name === baseUnit);
  if (!base) {
    // Not found in chain — fallback
    return { value, unit: baseUnit };
  }

  // 3) Convert 'value' into the smallest “baseline” in the chain
  // Example: if baseUnit = "kg", we move to mg by multiplying:
  // valueInBaseline = value * base.factor
  const valueInBaseline = value * base.factor;

  // 4) The smallest unit is always the first unit in the chain
  const smallestUnit = chain[0];

  // 5) The value in the smallest unit is the valueInBaseline
  // const finalValue = valueInBaseline / smallestUnit.factor;
  const finalValue = parseFloat(
    (valueInBaseline / smallestUnit.factor).toFixed(2),
  );

  return { value: finalValue, unit: smallestUnit.name };
}

interface UnitFactor {
  name: Units;
  factor: number;
}

/**
 * Utility to determine which array (volumeUnits or massUnits)
 * contains the given `fromUnit`.
 */
function getRelevantArray(fromUnit: Units): UnitFactor[] {
  // Check if the unit is in volumeUnits
  if (volumeUnits.some((u) => u.name === fromUnit)) {
    return volumeUnits;
  }
  // Else check if the unit is in massUnits
  if (massUnits.some((u) => u.name === fromUnit)) {
    return massUnits;
  }

  // return empty if the unit is invalid
  return [];
}

/**
 * Returns the unit (by `name`) with the largest factor
 * for whichever array (volume or mass) contains `fromUnit`.
 */
export function getLargestUnit(fromUnit: Units): Units {
  const relevantArray = getRelevantArray(fromUnit);
  if (relevantArray.length === 0) {
    return fromUnit;
  }
  const largest = relevantArray.reduce((prev, current) =>
    current.factor > prev.factor ? current : prev,
  );
  return largest.name;
}

/**
 * Returns the unit (by `name`) with the smallest factor
 * for whichever array (volume or mass) contains `fromUnit`.
 */
export function getSmallestUnit(fromUnit: Units): Units {
  const relevantArray = getRelevantArray(fromUnit);
  if (relevantArray.length === 0) {
    return fromUnit;
  }

  const smallest = relevantArray.reduce((prev, current) =>
    current.factor < prev.factor ? current : prev,
  );
  return smallest.name;
}

type ObjectType = {
  [key: number]: boolean;
};
interface DataProps {
  id?: string;
}
export function getMatchingIds(
  array: DataProps[],
  object: ObjectType,
): string[] {
  const result: string[] = [];
  array.forEach((item, index) => {
    if (object[index] === true) {
      result.push(item.id as string);
    }
  });
  return result;
}
export const fullname = (name?: string, surname?: string) =>
  `${name} ${surname}`;
export const getInitials = (name: string) => {
  if (!name || typeof name !== "string") return "";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 0) return "";

  const initials =
    (parts[0][0]?.toUpperCase() ?? "") +
    (parts[parts.length - 1][0]?.toUpperCase() ?? "");

  return initials;
};

// Define types for the objects in the arrays
interface Operation {
  id: string;
  name: string;
  code: string | null;
  description: string | null;
}

interface Step {
  productionActivity: {
    id: string;
    name: string | null;
    code: string;
    description: string | null;
  };
  operation: {
    id: string;
    name: string;
    code: string | null;
    description: string | null;
  };
  workCenters: Array<any>;
  responsibleUsers: Array<any>;
  status: number;
  startedAt: string | null;
  completedAt: string | null;
  order: number;
  id: string;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string | null;
    department: {
      id: string;
      code: string;
      name: string;
      description: string;
      warehouses: Array<any>;
    };
  };
  createdAt: string;
  activityId?: string; // Add activityId
  product?: Product; // Add product field
  productionSchedule?: Product; // Add productSchedule field
}

interface Product {
  id: string;
  name?: string;
  code: string;
}

interface Activity {
  id: string;
  steps: Step[];
  product?: Product;
  productionSchedule?: Product;
}

// Example data (operations and steps should be assigned here)

// Function to group steps by operation id and append activityId
export const groupStepsByOperation = (
  operations: Operation[],
  activities: Activity[],
) => {
  return operations.map((operation) => {
    // For each operation, we need to find the related steps from the activities
    const relatedSteps = activities.flatMap((activity) =>
      activity.steps
        .filter((step) => step.operation.id === operation.id)
        .map((step) => ({
          ...step, // Spread the existing step object
          activityId: activity.id, // Add the activityId field
          product: activity.product || null, // Include product from activity, default to null if not available
          productionSchedule: activity.productionSchedule || null, // Include productSchedule from activity, default to null if not available
        })),
    );

    // Return the operation with its related steps
    return {
      ...operation,
      steps: relatedSteps,
    };
  });
};

// // Apply the grouping function
// const groupedActivities = groupStepsByOperation(operations, activities);

// console.log(groupedActivities);

export const objectSchema = (msg: string) =>
  z.object({
    value: z.string({
      required_error: msg,
      message: msg,
    }),
    label: z.string({
      required_error: msg,
      message: msg,
    }),
  });

export function waitForTimeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const isImageFile = (filename: string) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"];
  return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
};
export const isDocument = (fileName: string) => {
  const documentExtensions = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt"];
  // console.log(fileName, "fileName");
  return documentExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
};

export function toSentenceCase(text: string | undefined): string {
  if (!text) return "";

  const trimmedText = text.trim().toLowerCase();

  return trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1);
}

export const numberToWords = (num: number): string => {
  const convertHundreds = (n: number): string => {
    let result = "";
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }
    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    }
    if (n > 0) {
      result += ones[n] + " ";
    }
    return result.trim();
  };

  if (num === 0) return "Zero";
  let result = "";
  let scaleIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      result = convertHundreds(chunk) + " " + scales[scaleIndex] + " " + result;
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  // Handle decimal part for cents
  const decimalPart = Math.round((num - Math.floor(num)) * 100);
  if (decimalPart > 0) {
    result += `and ${decimalPart}/100`;
  }

  return result.replace(/\s+/g, " ").trim() + " Dollars";
};

export function amountToWordsBritishStyle(
  num: number,
  currency?: string,
): string {
  const belowTwenty = [
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

  const tens = [
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

  const thousands = ["", "Thousand", "Million", "Billion"];

  function helper(n: number): string {
    if (n === 0) return "";
    if (n < 20) return belowTwenty[n];
    if (n < 100)
      return (
        tens[Math.floor(n / 10)] +
        (n % 10 !== 0 ? "-" + belowTwenty[n % 10] : "")
      );
    if (n < 1000) {
      const remainder = n % 100;
      return (
        belowTwenty[Math.floor(n / 100)] +
        " Hundred" +
        (remainder !== 0 ? " and " + helper(remainder) : "")
      );
    }
    return "";
  }

  function convertInteger(n: number): string {
    if (n === 0) return "Zero";
    let res = "";
    let i = 0;
    while (n > 0) {
      const chunk = n % 1000;
      if (chunk !== 0) {
        const chunkStr = helper(chunk);
        res =
          chunkStr +
          (thousands[i] ? " " + thousands[i] : "") +
          (res ? " " + res : "");
      }
      n = Math.floor(n / 1000);
      i++;
    }
    return res.trim();
  }

  const [whole, decimal] = num.toFixed(2).split(".");
  const dollars = parseInt(whole);
  const cents = parseInt(decimal);

  let result =
    convertInteger(dollars) + " " + currency + (dollars !== 1 ? "s" : "");
  if (cents > 0) {
    result +=
      " and " + convertInteger(cents) + " coin" + (cents !== 1 ? "s" : "");
  }

  return result;
}

export function amountToWordsAmericanStyle(
  num: number,
  currency?: string,
): string {
  const belowTwenty = [
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

  const tens = [
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

  const thousands = ["", "Thousand", "Million", "Billion"];

  function helper(n: number): string {
    if (n === 0) return "";
    else if (n < 20) return belowTwenty[n] + " ";
    else if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);
    else
      return belowTwenty[Math.floor(n / 100)] + " Hundred " + helper(n % 100);
  }

  function convertInteger(n: number): string {
    if (n === 0) return "Zero";
    let res = "";
    let i = 0;
    while (n > 0) {
      if (n % 1000 !== 0) {
        res = helper(n % 1000) + thousands[i] + " " + res;
      }
      n = Math.floor(n / 1000);
      i++;
    }
    return res.trim();
  }

  const [whole, decimal] = num.toFixed(2).split(".");
  const dollars = parseInt(whole);
  const cents = parseInt(decimal);

  let result =
    convertInteger(dollars) + " " + currency + (dollars !== 1 ? "s" : "");
  if (cents > 0) {
    result +=
      " and " + convertInteger(cents) + " Coin" + (cents !== 1 ? "s" : "");
  }

  return result; //.replace(/\s+/g, " ").trim() + " "+ currency;
}

export function formatAmount(
  value: number,
  options?: {
    currencySymbol?: string;
    decimalPlaces?: number;
    thousandSeparator?: string;
    decimalSeparator?: string;
    prefix?: string;
    suffix?: string;
  },
): string {
  const {
    currencySymbol = "",
    decimalPlaces = 2,
    thousandSeparator = ",",
    decimalSeparator = ".",
    prefix = "",
    suffix = "",
  } = options || {};

  const negative = value < 0;
  const absValue = Math.abs(value).toFixed(decimalPlaces);

  const [integerPart, decimalPart] = absValue.split(".");

  const withThousands = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandSeparator,
  );

  let result = `${currencySymbol}${withThousands}`;
  if (decimalPlaces > 0) {
    result += `${decimalSeparator}${decimalPart}`;
  }

  if (prefix) result = prefix + result;
  if (suffix) result += suffix;

  return negative ? `-${result}` : result;
}

const Access = "Access";
// const Self = "Self";
// const Direct = "Direct";
// const Indirect = "Indirect";
export const permissionOptions = [Access];
export const hasOptions = [Access];
export const groupByModule = (children: RecordItem[]) => {
  return children.reduce(
    (acc, child) => {
      acc[child.subModule] = acc[child.subModule] || [];
      acc[child.subModule].push(child);
      return acc;
    },
    {} as Record<string, RecordItem[]>,
  );
};

export const removeDuplicateTypes = (data: Section[]): Section[] => {
  return data.map((section) => ({
    ...section,
    children: section.children.map((child) => ({
      ...child,
      types: [...new Set(child.types)], // Remove duplicate values
    })),
  }));
};

export const findRecordWithAccess = (
  sections: Section[],
  key: string,
): RecordItem | null => {
  for (const section of sections) {
    for (const child of section?.children) {
      if (child?.key === key) {
        // Check if the types array includes FullAccess
        if (child?.types?.includes(Access)) {
          return child;
        }
      }
    }
  }
  return null; // Return null if the key is not found or FullAccess is not in types
};

export const hasPermissionForKey = (
  sections: Section[],
  key: string,
): boolean => {
  const record = findRecordWithAccess(sections, key);
  return !!record;
};
export const findRecordWithSpecifiedAccess = (
  sections: Section[],
  key: string,
  access: string,
): boolean => {
  for (const section of sections) {
    for (const child of section.children) {
      if (child.key === key) {
        // Check if the types array includes FullAccess
        if (child.types.includes(access)) {
          return true;
        }
      }
    }
  }
  return false; // Return null if the key is not found or FullAccess is not in types
};

export const findRecordWithNotIncludedAccess = (
  sections: Section[],
  key: string,
  access: string,
): boolean => {
  for (const section of sections) {
    for (const child of section.children) {
      if (child.key === key) {
        console.log(child.types, access, "access, types");
        // Check if the types array includes FullAccess
        if (!child.types.includes(access)) {
          return true;
        }
      }
    }
  }
  return false; // Return null if the key is not found or FullAccess is not in types
};

// export const isSelfPlusOtherOrNonSelf = (accessList: string[]): boolean => {
//   return !(accessList.length === 1 && accessList.includes(Self));
// };
// export const findRecordWithNotIncludedSelfAccess = (
//   sections: Section[],
//   key: string,
// ): boolean => {
//   for (const section of sections) {
//     for (const child of section.children) {
//       if (child.key === key) {
//         // console.log(child.types, access, "access, types");
//         // Check if the types array includes FullAccess
//         return isSelfPlusOtherOrNonSelf(child.types);
//         // if (!child.types.includes(access)) {
//         //   return true;
//         // }
//       }
//     }
//   }
//   return false; // Return null if the key is not found or FullAccess is not in types
// };

export const formatClock = (
  hours: number,
  minutes: number,
  light: boolean,
  days?: number,
): string => {
  const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${light ? "AM" : "PM"}`;
  if (days && days > 0) {
    const result = `${days}d ${timeStr}`.trim();
    return result;
  }
  const result = timeStr.trim();
  return result;
};

export const parseClock = (input: string) => {
  const regex = /(?:(\d+)d\s*)?(\d{2}):(\d{2})\s*(AM|PM)/i;
  const match = input.match(regex);

  if (!match) return { days: 0, hours: 0, minutes: 0, light: true };

  const [, d, h, m, ampm] = match;
  return {
    days: d ? parseInt(d) : 0,
    hours: h ? parseInt(h) : 0,
    minutes: m ? parseInt(m) : 0,
    light: ampm?.toUpperCase() === "AM",
  };
};

export const formatClock24 = (
  hours: number,
  minutes: number,
  light: boolean,
  days?: number,
): string => {
  // Convert 12-hour to 24-hour format
  let h = hours % 12; // converts 12 to 0
  if (!light) h += 12;

  const hh = h.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = "00";

  if (typeof days === "number" && days > 0) {
    return `${days}.${hh}:${mm}:${ss}`;
  }

  return `0.${hh}:${mm}:${ss}`;
};

export const parseClockReadable = (input: string): string => {
  const regex = /^(\d+)\.(\d{2}):(\d{2}):(\d{2})$/;
  const match = input.match(regex);

  if (!match) return "0d 12:00 AM";

  const [, d, hhStr, mmStr] = match;
  const days = parseInt(d, 10);
  const hours24 = parseInt(hhStr, 10);
  const minutes = parseInt(mmStr, 10);

  const light = hours24 < 12;
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const paddedHours = hours12.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const ampm = light ? "AM" : "PM";

  return `${days}d ${paddedHours}:${paddedMinutes} ${ampm}`;
};

export function sanitizeNumber(value: any): number {
  const num = Number(value);
  return isNaN(num) || value === null || value === undefined ? 0 : num;
}

//server actions

export const unexpectedServerErrorResponse = {
  errors: [
    {
      message:
        "An unexpected server error occurred. We are working on restoring the service.",
      status: 500,
    },
  ],
};

export function routeHandlerResponse(response: any, init?: ResponseInit) {
  if (!response) {
    return Response.json(unexpectedServerErrorResponse, {
      status: 500,
    });
  }

  // handle REST error
  if (response.error || response.data?.error) {
    return Response.json(response.data ?? response.error, {
      status: response.data?.status ?? response.error?.status,
    });
  }

  // handle REST cookie
  if (response.response?.headers?.get("set-cookie")) {
    return Response.json(response.data, {
      ...init,
      headers: {
        ...init?.headers,
        "Set-Cookie": response.response.headers.get("set-cookie"),
      },
    });
  }

  return Response.json(response.data, init);
}

export function evaluateExpressionWithOperator(
  expr: string,
  values: Record<string, string | number>,
): number {
  const evaluatedExpr = expr.replace(/:(\w+)/g, (_, key) => {
    if (values.hasOwnProperty(key)) {
      return values[key]!.toString();
    }
    throw new Error(`Missing value for parameter: ${key}`);
  });

  return new Function(`return ${evaluatedExpr}`)();
}

function renderExpressionTemplate(
  expr: string,
  values: Record<string, string | number>,
): string {
  return expr.replace(/:(\w+)/g, (_, key) => {
    if (values.hasOwnProperty(key)) {
      return values[key]!.toString();
    }
    throw new Error(`Missing value for parameter: ${key}`);
  });
}

function evaluateRenderedExpression(rendered: string): number {
  return new Function(`return ${rendered}`)();
}

export function evaluateExpressionWithPreview(
  expr: string,
  values: Record<string, string | number>,
): { preview: string; result: number } {
  const preview = renderExpressionTemplate(expr, values);
  const result = evaluateRenderedExpression(preview);
  return { preview, result };
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// utils/getEnumBadge.ts

// Fixed Tailwind palette (light bg + dark text)
const colorPalette = [
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-orange-100 text-orange-800 border-orange-200",
  "bg-purple-100 text-purple-800 border-purple-200",
  "bg-green-100 text-green-800 border-green-200",
  "bg-red-100 text-red-800 border-red-200",
  "bg-yellow-100 text-yellow-800 border-yellow-200",
  "bg-gray-100 text-gray-800 border-gray-200",
  "bg-gray-200 text-gray-900 border-gray-300",
  "bg-emerald-100 text-emerald-800 border-emerald-200",
  "bg-teal-100 text-teal-800 border-teal-200",
  "bg-indigo-100 text-indigo-800 border-indigo-200",
];
// Hash function to pick a color index
function hashValue(value: string): number {
  let hash = 0;
  const length = value?.length || 0;
  for (let i = 0; i < length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

/**
 * Given an enum and a value, returns:
 * - label: the enum label (string)
 * - colorClass: the TailwindCSS badge color
 */
export function getEnumBadge<T extends Record<string, string | number>>(
  enumObj: T,
  value: T[keyof T],
): { label: string; colorClass: string } {
  const label =
    typeof value === "number"
      ? (enumObj[value] as string) // numeric enum
      : value?.toString(); // string enum

  const colorIndex = hashValue(label) % colorPalette.length;

  return {
    label,
    colorClass: colorPalette[colorIndex],
  };
}

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) => {
  const clone = { ...obj };
  keys.forEach((key) => {
    delete clone[key];
  });
  return clone as Omit<T, K>;
};

export const getNameInBeta = (name: string) => {
  return /beta/i.test(name);
};

//function for getting date range
export const getDateRange = (filter: string) => {
  const now = new Date();
  let startDate: Date;
  const endDate: Date = now;

  switch (filter) {
    case "Today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "This Week":
      const firstDayOfWeek = new Date(
        now.setDate(now.getDate() - now.getDay()),
      );
      startDate = new Date(
        firstDayOfWeek.getFullYear(),
        firstDayOfWeek.getMonth(),
        firstDayOfWeek.getDate(),
      );
      break;
    case "This Month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "All Time":
      startDate = new Date(2000, 0, 1);
      break;
    default:
      startDate = now;
  }

  return { startDate, endDate };
};

import { cva } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { OptionsUpdate } from "@/components/pages/production/schedule/create/form";

// import { Quotations } from "@/components/pages/supply-chain/procurement/price-comparison/type";
import {
  APP_NAME,
  CODE_SETTINGS,
  MaterialStatus,
  Option,
  Units,
} from "./constants";
import {
  NamingType,
  ProductionScheduleProcurementDto,
} from "./redux/api/openapi.generated";
import { Quotations } from "./types";

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
  return input.replace(/([a-z])([A-Z])/g, "$1 $2"); // Insert space before each uppercase letter if it follows a lowercase letter
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
}

export interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  errors: ErrorDetail[];
}
export const isErrorResponse = (error: ErrorResponse) => {
  const err = error.errors;
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
): { value: number; unit: Units } {
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
    return { value, unit: baseUnit };
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
): { value: number; unit: string } {
  console.log(value, baseUnit);
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

  // If neither, throw
  throw new Error(
    `Unit "${fromUnit}" was not found in volumeUnits or massUnits.`,
  );
}

/**
 * Returns the unit (by `name`) with the largest factor
 * for whichever array (volume or mass) contains `fromUnit`.
 */
export function getLargestUnit(fromUnit: Units): Units {
  const relevantArray = getRelevantArray(fromUnit);
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
  const smallest = relevantArray.reduce((prev, current) =>
    current.factor < prev.factor ? current : prev,
  );
  return smallest.name;
}

type ObjectType = {
  [key: number]: boolean;
};
interface DataProps {
  id: string;
}
export function getMatchingIds(
  array: DataProps[],
  object: ObjectType,
): string[] {
  const result: string[] = [];
  array.forEach((item, index) => {
    if (object[index] === true) {
      result.push(item.id);
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

export type OptionMap = {
  [key: string]: Option[];
};

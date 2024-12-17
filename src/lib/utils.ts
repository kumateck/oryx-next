import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Quotations } from "@/components/pages/supply-chain/procurement/price-comparison/type";

import { APP_NAME, CODE_SETTINGS, Status } from "./constants";
import {
  NamingType,
  ProductionScheduleProcurementDtoRead,
} from "./redux/api/openapi.generated";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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

export const generateCode = async (
  options: GenerateCodeOptions,
): Promise<string> => {
  const { prefix, minlength, maxlength, type, seriesCounter = 1 } = options; // Default to 1 if seriesCounter is not provided

  let generatedCode = "";

  switch (type) {
    case 2:
      // Generate code based on the current timestamp
      generatedCode = Date.now().toString();
      break;

    case 1:
      // Generate a random numeric string
      generatedCode = Math.random()
        .toString()
        .slice(2, 2 + maxlength); // Slice to fit the max length
      break;

    case 0:
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

export const getStatusColor = (status: string) => {
  switch (status) {
    case Status.New:
      return "bg-neutral-300 text-neutral-600";
    case Status.Open:
      return "bg-accent-200 text-accent-900";
    case Status.InProgress:
      return "bg-info-100 text-info-500";
    case Status.Resolved:
      return "bg-success-100 text-success-500";
    case Status.Rejected:
      return "bg-danger-200 text-danger-500";
    case Status.NonCompliant:
      return "bg-warning-200 text-warning-800";
    case Status.Overdue:
      return "bg-danger-500 text-white";
    case Status.Closed:
      return "bg-success-500 text-white";
    default:
      return "bg-gray-100 text-neutral-500";
  }
};

export const quantityAvailable = (
  materials: ProductionScheduleProcurementDtoRead[],
) => {
  // Calculate the total quantityRequested
  const totalQuantityRequested = materials.reduce(
    (sum, item) => sum + (item?.quantityRequested || 0),
    0,
  );

  // Calculate the total quantityOnHand
  const totalQuantityOnHand = materials.reduce(
    (sum, item) => sum + (item?.quantityOnHand || 0),
    0,
  );

  return totalQuantityOnHand > totalQuantityRequested;
};

type GroupedBySupplier = {
  supplierId: string;
  items: {
    materialId: string;
    uomId: string;
    quantity: number;
    price: number;
  }[];
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
      };
    })
    .filter((item) => item?.supplierId);
  const grouped: { [key: string]: GroupedBySupplier } = {};

  data.forEach((item) => {
    const { supplierId, materialId, uomId, quantity, price } = item;
    const supplier = supplierId as string;
    const pricePerUnit = price as number;
    if (!grouped[supplier]) {
      grouped[supplier] = {
        supplierId: supplier,
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
  console.log("Shelf code generation function called");
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

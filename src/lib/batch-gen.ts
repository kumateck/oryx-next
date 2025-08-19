// utils/batchNumber.ts
const yearCodeMap: Record<number, string> = {
  2018: "A",
  2019: "B",
  2020: "C",
  2021: "D",
  2022: "E",
  2023: "F",
  2024: "G",
  2025: "J",
  2026: "K",
  2027: "L",
  2028: "M",
  2029: "N",
  2030: "P",
  2031: "R",
  2032: "S",
  2033: "T",
  2034: "U",
  2035: "V",
  2036: "W",
  2037: "Y",
  2038: "Z",
};

type MaterialType = "RM" | "PM";
type Stage = "BP" | "IP" | "FP";
type WarehouseCode = "BWH" | "NWH";

function transformProductCode(productCode: string): string {
  // Matches patterns like HH-003, NT-088, P-001, etc.
  const match = productCode.match(/^([A-Z]{1,2})-R?(\d{3})$/i);
  if (!match) {
    throw new Error(`Invalid product code format: ${productCode}`);
  }

  const [, letters, digits] = match;

  let letterPart: string;
  if (letters.length === 2) {
    // Take second letter if two are given
    letterPart = letters[1];
  } else {
    // Take first if only one given
    letterPart = letters[0];
  }

  return (letterPart + digits).toUpperCase();
}

export function generateBatchNumber(
  productCode: string,
  year: number,
  serial: number,
): string {
  // const productPart = transformProductCode(productCode);

  // const yearCode = yearCodeMap[year];
  // if (!yearCode) {
  //   throw new Error(`Year ${year} not supported`);
  // }

  const genCode = getBatchPrefix(productCode, year);
  const serialPart = serial.toString().padStart(3, "0");

  return `${genCode}${serialPart}`;
  // return `${productPart}${yearCode}${serialPart}`;
}

export const getBatchPrefix = (productCode: string, year: number) => {
  const productPart = transformProductCode(productCode);

  const yearCode = yearCodeMap[year];
  if (!yearCode) {
    throw new Error(`Year ${year} not supported`);
  }

  return `${productPart}${yearCode}`;
};

interface ARNumberOptions {
  dept: string; // e.g. "QCD"
  type: MaterialType | Stage; // e.g. "RM" or "FP"
  year: number; // e.g. 2025
  serial: number; // e.g. 1, auto-incremented externally
}

export function generateARNumber({
  dept,
  type,
  year,
  serial,
}: ARNumberOptions): string {
  // Series padded to 4 digits
  const genCode = getArNumberPrefix(dept, type, year);
  const series = serial.toString().padStart(4, "0");

  return `${genCode}/${series}`;
}

export const getArNumberPrefix = (
  dept: string,
  type: MaterialType | Stage,
  year: number,
): string => {
  const yearCode = year.toString().slice(-2);
  return `${dept}/${type}/${yearCode}`;
};

interface GRNOptions {
  warehouse: WarehouseCode; // "BWH" or "NWH"
  type: MaterialType; // "RM" or "PM"
  year: number; // e.g. 2025
  serial: number; // e.g. 1 (auto-increment externally)
}

export function generateGRNNumber({
  warehouse,
  type,
  year,
  serial,
}: GRNOptions) {
  const genCode = getGRNPrefix(warehouse, type, year);
  const series = serial.toString().padStart(3, "0");

  return `${genCode}/${series}`;
}

export const getGRNPrefix = (
  warehouse: WarehouseCode,
  type: MaterialType,
  year: number,
) => {
  const yearCode = year.toString().slice(-2);
  return `${warehouse}/${type}/${yearCode}`;
};

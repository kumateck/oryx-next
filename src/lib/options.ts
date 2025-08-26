import { Option } from "./constants";
import {
  ApprovalDocument,
  BatchSizeType,
  BatchStatus,
  CodeModelTypes,
  CodeNameTypes,
  Division,
  FloorType,
  FormType,
  OperationAction,
  PackLocationType,
  QuestionType,
  RawLocationType,
  ShipmentStatus,
  SpecificationReference,
  SupplierStatus,
  UomCategory,
  UoMType,
  WaybillStatus,
} from "./enum";
import { splitWords } from "./utils";

export type OptionMap = {
  [key: string]: Option[];
};

// Each item in the result will look like: { label: "Full", value: "0" }
export const batchSizeTypeOptions = Object.values(BatchSizeType)
  // First filter out the reverse lookup strings, so we only keep numeric values (0, 1, ...)
  .filter((enumValue) => typeof enumValue === "number")
  // Then map the numeric value to an object
  .map((enumValue) => {
    // Convert the numeric value back to the string enum key
    const enumKey = BatchSizeType[enumValue as BatchSizeType];
    return {
      label: splitWords(enumKey), // e.g., "Full"
      value: String(enumValue), // e.g., "0"
    };
  });

//
export const formTypeOptions = Object.values(FormType)
  // First filter out the reverse lookup strings, so we only keep numeric values (0, 1, ...)
  .filter((enumValue) => typeof enumValue === "number")
  // Then map the numeric value to an object
  .map((enumValue) => {
    // Convert the numeric value back to the string enum key
    const enumKey = FormType[enumValue as FormType];
    return {
      label: splitWords(enumKey), // e.g., "Full"
      value: String(enumValue), // e.g., "0"
    };
  });

//
export const referenceOptions = Object.values(SpecificationReference)
  // First filter out the reverse lookup strings, so we only keep numeric values (0, 1, ...)
  .filter((enumValue) => typeof enumValue === "number")
  // Then map the numeric value to an object
  .map((enumValue) => {
    // Convert the numeric value back to the string enum key
    const enumKey = SpecificationReference[enumValue as SpecificationReference];
    return {
      label: splitWords(enumKey), // e.g., "Full"
      value: String(enumValue), // e.g., "0"
    };
  });

export const SupplierTypeOptions = Object.values(SupplierStatus)
  // First filter out the reverse lookup strings, so we only keep numeric values (0, 1, ...)
  .filter((enumValue) => typeof enumValue === "number")
  // Then map the numeric value to an object
  .map((enumValue) => {
    // Convert the numeric value back to the string enum key
    const enumKey = SupplierStatus[enumValue as SupplierStatus];
    return {
      label: splitWords(enumKey), // e.g., "Full"
      value: String(enumValue), // e.g., "0"
    };
  }) as Option[];

export const DivisionOptions = Object.values(Division)
  // First filter out the reverse lookup strings, so we only keep numeric values (0, 1, ...)
  .filter((enumValue) => typeof enumValue === "number")
  // Then map the numeric value to an object
  .map((enumValue) => {
    // Convert the numeric value back to the string enum key
    const enumKey = Division[enumValue as Division];
    return {
      label: splitWords(enumKey), // e.g., "Full"
      value: String(enumValue), // e.g., "0"
    };
  }) as Option[];

export const BatchStatusOptions = Object.values(BatchStatus)
  // First filter out the reverse lookup strings, so we only keep numeric values (0, 1, ...)
  .filter((enumValue) => typeof enumValue === "number")
  // Then map the numeric value to an object
  .map((enumValue) => {
    // Convert the numeric value back to the string enum key
    const enumKey = SupplierStatus[enumValue as BatchStatus];
    return {
      label: splitWords(enumKey), // e.g., "Full"
      value: String(enumValue), // e.g., "0"
    };
  }) as Option[];

export const QuestionTypeOptions = Object.values(QuestionType)
  // First filter out the reverse lookup strings, so we only keep numeric values (0, 1, ...)
  .filter((enumValue) => typeof enumValue === "number")
  // Then map the numeric value to an object
  .map((enumValue) => {
    // Convert the numeric value back to the string enum key
    const enumKey = QuestionType[enumValue as QuestionType];
    return {
      label: splitWords(enumKey), // e.g., "Full"
      value: String(enumValue), // e.g., "0"
    };
  }) as Option[];

export const OperationActionOptions = Object.values(OperationAction)
  // First filter out the reverse lookup strings, so we only keep numeric values (0, 1, ...)
  .filter((enumValue) => typeof enumValue === "number")
  // Then map the numeric value to an object
  .map((enumValue) => {
    // Convert the numeric value back to the string enum key
    const enumKey = OperationAction[enumValue as OperationAction];
    return {
      label: splitWords(enumKey), // e.g., "Full"
      value: String(enumValue), // e.g., "0"
    };
  }) as Option[];

export const FloorTypeOptions = Object.keys(FloorType).map((key) => ({
  label: splitWords(key),
  value: FloorType[key as keyof typeof FloorType],
})) as Option[];

export const ApprovalDocumentOptions = Object.keys(ApprovalDocument).map(
  (key) => ({
    label: splitWords(key),
    value: ApprovalDocument[key as keyof typeof ApprovalDocument],
  }),
) as Option[];

export const RawLocationOptions = Object.keys(RawLocationType).map((key) => ({
  label: splitWords(key),
  value: RawLocationType[key as keyof typeof RawLocationType],
})) as Option[];

export const PackLocationOptions = Object.keys(PackLocationType).map((key) => ({
  label: splitWords(key),
  value: PackLocationType[key as keyof typeof PackLocationType],
})) as Option[];

export const CodeModelTypesOptions = Object.keys(CodeModelTypes).map((key) => ({
  label: splitWords(key),
  value: CodeModelTypes[key as keyof typeof CodeModelTypes],
})) as Option[];

export const CodeNameTypeOptions = Object.values(CodeNameTypes)
  .filter((enumValue) => typeof enumValue === "number")
  .map((enumValue) => {
    const enumKey = CodeNameTypes[enumValue as CodeNameTypes];
    return {
      label: splitWords(enumKey), // e.g., "New", "InTransit"
      value: String(enumValue), // e.g., "0", "1"
    };
  }) as Option[];

export const UomTypeOptions = Object.values(UoMType)
  .filter((enumValue) => typeof enumValue === "number")
  .map((enumValue) => {
    const enumKey = UoMType[enumValue as UoMType];
    return {
      label: splitWords(enumKey), // e.g., "New", "InTransit"
      value: String(enumValue), // e.g., "0", "1"
    };
  }) as Option[];
export const UomCategoryOptions = Object.values(UomCategory)
  .filter((enumValue) => typeof enumValue === "number")
  .map((enumValue) => {
    const enumKey = UomCategory[enumValue as UomCategory];
    return {
      label: splitWords(enumKey), // e.g., "New", "InTransit"
      value: String(enumValue), // e.g., "0", "1"
    };
  }) as Option[];
//
export const ShipmentStatusOptions = Object.values(ShipmentStatus)
  .filter((enumValue) => typeof enumValue === "number")
  .map((enumValue) => {
    const enumKey = ShipmentStatus[enumValue as ShipmentStatus];
    return {
      label: splitWords(enumKey), // e.g., "New", "InTransit"
      value: String(enumValue), // e.g., "0", "1"
    };
  }) as Option[];

export const capitalizeFirstWord = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const WaybillStatusOptions = Object.values(WaybillStatus)
  .filter((enumValue) => typeof enumValue === "number")
  .map((enumValue) => {
    const enumKey = WaybillStatus[enumValue as WaybillStatus];
    return {
      label: splitWords(enumKey), // e.g., "New", "InTransit"
      value: String(enumValue), // e.g., "0", "1"
    };
  }) as Option[];

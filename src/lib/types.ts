interface SupplierQuotation {
  supplierId: string; // or number, based on your data
  supplierName: string;
  price: number; // assuming price is a number
  selected: boolean;
  sourceRequisitionId: string; // or number
}

export interface Quotations {
  materialCode: string;
  materialId: string; // or number
  materialName: string;
  quantity: number;
  uomId: string;
  uomName: string;
  supplierQuotations: SupplierQuotation[];
}

export type RecordItem = {
  key: string;
  name: string;
  description: string;
  subModule: string;
  hasOptions: boolean;
  types: string[];
};

export type Section = {
  module: string;
  isActive: boolean;
  children: RecordItem[];
};

// export interface PermissionChild {
//   key: string;
//   name: string;
//   description: string;
//   subModule: string;
//   hasOptions: boolean;
//   types: string[];
// }

// export interface Permission {
//   module: string;
//   isActive: boolean;
//   children: PermissionChild[];
// }

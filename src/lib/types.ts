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
  module: string;
  hasOptions: boolean;
  types: any[];
};

export type Section = {
  section: string;
  isActive: boolean;
  children: RecordItem[];
};

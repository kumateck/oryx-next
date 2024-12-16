// Define the types for SupplierQuotation
interface SupplierQuotation {
  supplierId: string; // or number, based on your data
  supplierName: string;
  price: number; // assuming price is a number
  selected: boolean;
}

// Define the type for Material
export interface Material {
  code: string;
  id: string; // or number
  name: string;
}

// Define the type for the Item
export interface Quotations {
  materialCode: string;
  materialId: string; // or number
  materialName: string;
  quantity: number;
  uomId: string;
  uomName: string;
  supplierQuotations: SupplierQuotation[];
}

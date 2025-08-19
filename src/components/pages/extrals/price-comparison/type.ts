// Define the types for VendorQuotation
interface VendorQuotation {
  vendorId: string; // or number, based on your data
  vendorName: string;
  price: number; // assuming price is a number
  selected: boolean;
  sourceRequisitionId: string; // or number
}

// Define the type for items
export interface items {
  code: string;
  id: string; // or number
  name: string;
}

// Define the type for the Item
export interface Quotations {
  itemCode: string;
  itemId: string; // or number
  itemName: string;
  quantity: number;
  uomId: string;
  uomName: string;
  vendorQuotations: VendorQuotation[];
}

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

type GroupedByVendor = {
  vendor: string;
  sourceRequisitionId: string;
  items: {
    item: string;
    uomId: string;
    quantity: number;
    price: number;
  }[];
};

export const findSelectedQuotation = (state: Quotations[]) => {
  const data = state
    ?.map((item) => {
      const selected = item?.vendorQuotations?.find((p) => p?.selected);
      return {
        itemCode: item?.itemCode,
        quantity: item?.quantity,
        uomId: item?.uomId,
        vendorId: selected?.vendorId,
        price: selected?.price,
        sourceRequisitionId: selected?.sourceRequisitionId,
      };
    })
    .filter((item) => item?.vendorId);
  const grouped: { [key: string]: GroupedByVendor } = {};

  data.forEach((item) => {
    const { vendorId, itemCode, uomId, quantity, price, sourceRequisitionId } =
      item;
    const vendor = vendorId as string;
    const pricePerUnit = price as number;
    if (!grouped[vendor]) {
      grouped[vendor] = {
        vendor: vendor,
        sourceRequisitionId: sourceRequisitionId as string,
        items: [],
      };
    }

    grouped[vendor].items.push({
      item: itemCode,
      uomId,
      quantity,
      price: pricePerUnit,
    });
  });

  return Object.values(grouped);
};

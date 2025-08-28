import React from "react";
import { Separator } from "@/components/ui";
import { PurchaseOrderItemDtoRead } from "@/lib/redux/api/openapi.generated";
import { convertToLargestUnit, getSmallestUnit, Units } from "@/lib";

interface Props {
  items: PurchaseOrderItemDtoRead[];
  currency?: string;
}

const PurchaseOrderSummary = ({ items, currency }: Props) => {
  // Calculate totals
  const totals = items.reduce(
    (acc, item) => {
      const converted = convertToLargestUnit(
        item.quantity as number,
        getSmallestUnit(item.uom?.symbol as Units),
      );
      const quantity = converted.value;

      const price = item.price || 0;
      const cost = quantity * price;

      return {
        totalItems: acc.totalItems + 1,
        totalQuantity: acc.totalQuantity + quantity,
        subtotal: acc.subtotal + cost,
      };
    },
    {
      totalItems: 0,
      totalQuantity: 0,
      subtotal: 0,
    },
  );

  const grandTotal = totals.subtotal;

  const formatCurrency = (amount: number) => {
    return `${currency} ${amount.toFixed(2)}`;
  };

  return (
    <div className="mt-6 flex justify-end">
      {/* Financial Summary */}
      <div className="bg-gray-50 p-4 rounded-lg w-full max-w-sm">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">
              {formatCurrency(totals.subtotal)}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-gray-800">Total Amount:</span>
            <span className="font-bold text-gray-900">
              {formatCurrency(grandTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderSummary;

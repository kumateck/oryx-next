import React, { useState } from "react";
import { toast } from "sonner";

import { Button, Card, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  useGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionQuery,
  useLazyGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionQuery,
  usePostApiV1ProcurementConfirmDistributionMutation,
} from "@/lib/redux/api/openapi.generated";
import { DistributionRequisitionItem } from "@/lib/redux/api/openapi.generated";

import { getColumns } from "./columns";
import TableForData from "./table";

interface Props {
  products: DistributionRequisitionItem[];
  shipmentDocumentId: string;
  totalQty: number;
}

const Products = ({ products, shipmentDocumentId, totalQty }: Props) => {
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [approveDistribution] =
    usePostApiV1ProcurementConfirmDistributionMutation();
  const { data: result } =
    useGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionQuery(
      { shipmentDocumentId },
    );
  const [loadMaterials] =
    useLazyGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionQuery();
  const id = result?.sections?.[0]?.shipmentInvoiceItem?.id || null;

  const handleApprove = async (item: DistributionRequisitionItem) => {
    try {
      setApprovingId(item.requistionItem?.id || null);

      const payload = {
        shipmentInvoiceItemId: id as string,
        items: [
          {
            departmentId: item.department?.id as string,
            requistionItemId: item.requistionItem?.id as string,
            quantityAllocated: item.quantityAllocated as number,
          },
        ],
      };

      await approveDistribution({
        materialDistributionSectionRequest: payload,
      }).unwrap();
      toast.success("Distribution approved successfully");
      loadMaterials({ shipmentDocumentId });
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    } finally {
      setApprovingId(null);
    }
  };

  return (
    <div className="w-full space-y-4">
      {products?.map((item, index) => (
        <Card key={index} className="p-6">
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between px-2">
              <div>
                <h3 className="text-lg font-semibold">
                  {item.requistionItem?.material?.name}
                </h3>
                <p className="text-sm">
                  Total Quantity Supplied -
                  {/* {(item.quantityRemaining ?? 0) +
                    (item.quantityAllocated ?? 0)} */}
                  {/* {item.requistionItem?.} */}
                  {totalQty}
                </p>
              </div>

              <div>
                <Button
                  variant="default"
                  className="flex items-center gap-2"
                  onClick={() => handleApprove(item)}
                  disabled={approvingId === item.requistionItem?.id}
                >
                  <Icon name="CircleCheck" className="h-4 w-4" />
                  <span>
                    {approvingId === item.requistionItem?.id
                      ? "Approving..."
                      : "Approve Distribution"}
                  </span>
                </Button>
              </div>
            </div>
            <TableForData lists={[item]} defaultColumns={getColumns()} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Products;

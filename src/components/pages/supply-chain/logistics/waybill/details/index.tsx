"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Card, CardContent, CardTitle, Icon } from "@/components/ui";
import { useGetApiV1ProcurementWaybillByWaybillIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { MaterialRequestDto } from "../create/types";
import TableForData from "./table";

const WaybillDetails = () => {
  const { id } = useParams();
  const waybillId = id as string;
  const router = useRouter();
  const { data } = useGetApiV1ProcurementWaybillByWaybillIdQuery({
    waybillId,
  });
  const [materialLists, setMaterialLists] = useState<MaterialRequestDto[]>([]);

  useEffect(() => {
    if (data?.shipmentInvoice?.items) {
      const payload = data.shipmentInvoice.items.map((item) => ({
        materialId: item.material?.id as string,
        uomId: item.uoM?.id as string,
        expectedQuantity: item.expectedQuantity as number,
        materialName: item.material?.name as string,
        uomName: item.uoM?.symbol as string,
        receivedQuantity: item.receivedQuantity as number,
        reason: item.reason as string,
        code: item.material?.code as string,
        costPrice: item.price?.toString(),
        manufacturer: item.manufacturer?.name as string,
        purchaseOrderCode: item?.purchaseOrder?.code as string,
        purchaseOrderId: item?.purchaseOrder?.id as string,
      })) as MaterialRequestDto[];
      setMaterialLists(payload);
    }
  }, [data]);

  return (
    <ScrollablePageWrapper>
      <div
        className="group mb-2 flex items-center gap-1 hover:cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <Icon name="ArrowLeft" className="h-5 w-5" />
        <div className="group-hover:underline">
          <PageTitle title={"Waybill List"} />
        </div>
      </div>

      <div className="my-5 space-y-3">
        <Card>
          <CardContent className="space-y-4 py-2">
            <div
              className={`inline-block rounded-full px-2 py-1 text-xs font-medium text-white ${data?.arrivedAt ? "bg-green-500" : "bg-gray-500"}`}
            >
              {data?.arrivedAt ? "Arrived" : "Pending"}
            </div>
            <div className="flex justify-start gap-4">
              <div className="w-full space-y-2">
                <span className="font-Medium block text-lg">
                  Waybill Information
                </span>
                <div className="grid w-full grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Waybill Code:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {data?.code}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Supplier Name:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {data?.shipmentInvoice?.supplier?.name}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Invoice Number:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {data?.shipmentInvoice?.code}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-3">
        <Card className="space-y-4 p-5">
          <CardTitle>
            <span className="text-sm text-gray-500">Invoice Items</span>
          </CardTitle>
          <TableForData lists={materialLists} setItemLists={setMaterialLists} />
        </Card>
      </div>
    </ScrollablePageWrapper>
  );
};

export default WaybillDetails;

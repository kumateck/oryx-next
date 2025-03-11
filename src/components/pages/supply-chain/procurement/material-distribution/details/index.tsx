"use client";

import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { Card, CardContent, Icon } from "@/components/ui";
import {
  // MaterialDistributionDto,
  useGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdQuery,
  useLazyGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { ClientDatatable } from "@/shared/datatable";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { columns } from "./columns";

const ScheduleDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const shipmentDocumentId = id as string;
  const [loadShipment, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionQuery();
  const router = useRouter();
  useEffect(() => {
    loadShipment({
      shipmentDocumentId,
    });

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipmentDocumentId, triggerReload]);

  const { data: shipmentDocInfo } =
    useGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdQuery({
      shipmentDocumentId,
    });
  const data = result?.sections ?? [];

  return (
    <ScrollablePageWrapper>
      <div className="mb-2 flex items-center gap-2">
        <Icon
          name="ArrowLeft"
          className="h-5 w-5 text-black hover:cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <span className="font-Medium text-primary-500 text-base">
          Distribution List
        </span>
      </div>
      <div className="space-y-3">
        <PageTitle title={`Distribution for ${shipmentDocInfo?.code}`} />
        <Card>
          <CardContent>
            <ul>
              <li>Invoice #: {shipmentDocInfo?.shipmentInvoice?.code}</li>
              <li>
                Supplier Name:{" "}
                {shipmentDocInfo?.shipmentInvoice?.supplier?.name}
              </li>{" "}
              <li>
                Arrived:{" "}
                {shipmentDocInfo?.arrivedAt
                  ? format(shipmentDocInfo?.arrivedAt, "MMM d, yyyy h:mm a")
                  : "N/A"}
              </li>
            </ul>
          </CardContent>
        </Card>
        <ClientDatatable
          data={data}
          columns={columns}
          isLoading={isLoading || isFetching}
        />
      </div>
    </ScrollablePageWrapper>
  );
};

export default ScheduleDetail;

// function removeDuplicateShipmentItems(
//   data: MaterialDistributionDto,
// ): MaterialDistributionDto {
//   data.sections?.forEach((section) => {
//     const seenMaterialCodes = new Set<string>();

//     if (section.shipmentInvoice) {
//       section.shipmentInvoice.items = section.shipmentInvoice.items?.filter(
//         (item) => {
//           if (
//             item?.material?.code &&
//             seenMaterialCodes.has(item.material.code)
//           ) {
//             return false; // Skip duplicate
//           }
//           if (item?.material?.code) {
//             seenMaterialCodes.add(item.material.code);
//           }
//           return true; // Keep unique item
//         },
//       );
//     }
//   });

//   return data;
// }

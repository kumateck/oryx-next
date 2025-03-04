"use client";

import { useParams } from "next/navigation";
import React from "react";

import {
  // MaterialDistributionDto,
  useGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionQuery,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";

// import PageTitle from "@/shared/title";
import Products from "./products";

const ScheduleDetail = () => {
  const { id } = useParams();
  const shipmentDocumentId = id as string;
  const { data: result } =
    useGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionQuery(
      {
        shipmentDocumentId,
      },
    );

  const data = result?.sections ?? [];
  // const resultData = removeDuplicateShipmentItems(
  //   result as MaterialDistributionDto,
  // );

  // console.log(resultData, "result");
  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        {/* <p className="text-sm text-neutral-500">
          {data.map((section) => section.shipmentInvoice?.supplier?.name)}
        </p>
        <PageTitle
          title={data
            .map((section) => section.shipmentInvoice?.code)
            .filter(Boolean)
            .join(", ")}
        /> */}

        {data.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            {/* <h2 className="text-xl font-bold">{section.}</h2> */}
            {(section?.items?.length ?? 0) > 0 && (
              <Products
                shipmentDocumentId={shipmentDocumentId}
                totalQty={section?.totalQuantity ?? 0}
                products={section.items ?? []}
              />
            )}
          </div>
        ))}
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

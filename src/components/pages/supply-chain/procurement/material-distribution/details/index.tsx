"use client";

import { useParams } from "next/navigation";
import React from "react";

import { useGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import Products from "./products";

const ScheduleDetail = () => {
  const { id } = useParams();
  const shipmentDocumentId = id as string;
  const { data: result } =
    useGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionQuery(
      {
        shipmentDocumentId: shipmentDocumentId,
      },
    );

  const data = result?.sections ?? [];

  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <p className="text-sm text-neutral-500">
          {data.map((section) => section.shipmentInvoice?.supplier?.name)}
        </p>
        <PageTitle
          title={data
            .map((section) => section.shipmentInvoice?.code)
            .filter(Boolean)
            .join(", ")}
        />

        {data.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            {/* <h2 className="text-xl font-bold">{section.}</h2> */}
            {(section?.items?.length ?? 0) > 0 && (
              <Products
                shipmentDocumentId={shipmentDocumentId}
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

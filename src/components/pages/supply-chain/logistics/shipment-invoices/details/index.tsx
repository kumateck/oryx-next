"use client";

import { useParams } from "next/navigation";
import React from "react";

import { useGetApiV1ProcurementShipmentInvoiceByIdQuery } from "@/lib/redux/api/openapi.generated";

const Page = () => {
  const { id } = useParams();
  const shipmentInvoiceId = id as string;
  const { data } = useGetApiV1ProcurementShipmentInvoiceByIdQuery({
    id: shipmentInvoiceId,
  });
  console.log(data, "data");
  return <div>Page</div>;
};

export default Page;

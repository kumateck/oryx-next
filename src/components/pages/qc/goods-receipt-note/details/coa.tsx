"use client";
import { WorkflowFormType } from "@/lib";
import { useGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery } from "@/lib/redux/api/openapi.generated";
import { useParams } from "next/navigation";
import React from "react";

const PreviewResponse = () => {
  const { type, id } = useParams();
  const materialBatchId = id as string;
  const formType = Number(type) as WorkflowFormType;
  const { data, isLoading: isDataLoading } =
    useGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery({
      materialBatchId,
    });

  console.log(data, "data", formType, isDataLoading);
  return <div>PreviewResponse</div>;
};

export default PreviewResponse;

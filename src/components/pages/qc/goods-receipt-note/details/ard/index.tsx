"use client";
import {
  useGetApiV1FormResponsesMaterialBatchByMaterialBatchIdQuery,
  useGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery,
  useGetApiV1MaterialBatchByBatchIdQuery,
  useGetApiV1MaterialSamplingsByGrnIdAndBatchIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { useParams } from "next/navigation";
import React from "react";
import { MaterialReportCard } from "./card";
import PageWrapper from "@/components/layout/wrapper";

const ArdDetails = () => {
  const { id, batchId } = useParams();
  const grnId = id as string;
  const materialBatchId = batchId as string;
  const { data: sampleData } =
    useGetApiV1MaterialSamplingsByGrnIdAndBatchIdQuery({
      grnId,
      batchId: materialBatchId,
    });
  const { data: ardBatchData } =
    useGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery({
      materialBatchId,
    });

  const { data: batchData } = useGetApiV1MaterialBatchByBatchIdQuery({
    batchId: materialBatchId,
  });

  const { data: batchFormResponses } =
    useGetApiV1FormResponsesMaterialBatchByMaterialBatchIdQuery({
      materialBatchId,
    });
  console.log(sampleData, "sample", batchFormResponses);
  return (
    <PageWrapper>
      <MaterialReportCard
        sampledOn={sampleData?.sampleDate as string}
        arNumber={sampleData?.arNumber as string}
        specNumber={ardBatchData?.specNumber as string}
        materialName={batchData?.material?.name as string}
        batchNumber={batchData?.batchNumber as string}
        mfgDate={batchData?.manufacturingDate as string}
        expDate={batchData?.expiryDate as string}
        stpNumber={
          ardBatchData?.materialStandardTestProcedure?.stpNumber as string
        }
        issuedBy={ardBatchData?.createdBy?.firstName as string}
        issueDate={ardBatchData?.createdAt as string}
      />
    </PageWrapper>
  );
};

export default ArdDetails;

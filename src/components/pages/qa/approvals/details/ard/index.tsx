"use client";
import {
  useGetApiV1FormResponsesMaterialBatchByMaterialBatchIdQuery,
  useGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery,
  useGetApiV1MaterialBatchByBatchIdQuery,
  useGetApiV1MaterialSamplingsByGrnIdAndBatchIdQuery,
} from "@/lib/redux/api/openapi.generated";

import React from "react";
import { MaterialReportCard } from "./card";
import PageWrapper from "@/components/layout/wrapper";
import FormResponseView from "./response";
import PageTitle from "@/shared/title";
import { Button } from "@/components/ui";
import ScrollableWrapper from "@/shared/scroll-wrapper";

import PreviewCoa from "./coa";

import CertificateOfAnalysis from "./preview";

interface Props {
  grnId: string;
  materialBatchId: string;
}
const ArdDetails = ({ grnId, materialBatchId }: Props) => {
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

  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <PageWrapper className="space-y-5">
      <div>
        <div className="pb-3 flex justify-between gap-4">
          <PageTitle title="Analytic Raw Data" />
          <Button onClick={() => setIsOpen(true)}>Preview COA</Button>
        </div>
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
      </div>
      <ScrollableWrapper>
        <div>
          <span className="text-lg font-semibold">Form Responses</span>{" "}
        </div>
        <FormResponseView responses={batchFormResponses} />
      </ScrollableWrapper>
      <PreviewCoa
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        materialBatchId={materialBatchId}
      >
        <CertificateOfAnalysis
          batchNo={batchData?.batchNumber as string}
          dateOfMfg={batchData?.manufacturingDate as string}
          dateOfExp={batchData?.expiryDate as string}
          qcArNo={sampleData?.arNumber as string}
          pageNumber={1}
          sampledDate={sampleData?.sampleDate as string}
          analysedDate={sampleData?.sampleDate as string}
          productName={batchData?.material?.name as string}
          tests={batchFormResponses?.filter(
            (item) => item.formField?.description,
          )}
          comment={"Product complies with In-House specification."}
        />
      </PreviewCoa>
    </PageWrapper>
  );
};

export default ArdDetails;

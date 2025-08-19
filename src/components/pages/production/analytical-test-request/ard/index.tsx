"use client";
import {
  AnalyticalTestRequestDtoRead,
  ProductAnalyticalRawDataDto,
  useLazyGetApiV1FormResponsesBmrByBatchManufacturingRecordIdQuery,
  useLazyGetApiV1ProductArdProductByProductIdQuery,
  useLazyGetApiV1ProductionScheduleManufacturingByIdQuery,
  useLazyGetApiV1QaAnalyticalTestsByIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ProductReportCard } from "./card";
import PageWrapper from "@/components/layout/wrapper";
import FormResponseView from "./response";
import PageTitle from "@/shared/title";
import { Button } from "@/components/ui";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import PreviewCoa from "./coa";
import CertificateOfAnalysis from "./preview";

// Skeleton Components
const ProductReportCardSkeleton = () => (
  <div className="bg-white rounded-lg border p-6 space-y-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);

const FormResponseSkeleton = () => (
  <div className="space-y-4">
    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ArdDetails = () => {
  const { id, batchId } = useParams();
  const atrId = id as string;
  const productBatchId = batchId as string;
  const [isOpen, setIsOpen] = React.useState(false);

  // State management for data
  const [atrData, setAtrData] = useState<AnalyticalTestRequestDtoRead>();
  const [batchData, setBatchData] = useState<any>(null);
  const [batchFormResponses, setBatchFormResponses] = useState<any[]>([]);
  const [filteredArdData, setFilteredArdData] =
    useState<ProductAnalyticalRawDataDto>();

  // Lazy query hooks
  const [fetchAtrData, { isLoading: isAtrLoading }] =
    useLazyGetApiV1QaAnalyticalTestsByIdQuery();
  const [fetchBatchData, { isLoading: isBatchLoading }] =
    useLazyGetApiV1ProductionScheduleManufacturingByIdQuery();
  const [fetchFormResponses, { isLoading: isFormResponsesLoading }] =
    useLazyGetApiV1FormResponsesBmrByBatchManufacturingRecordIdQuery();
  const [fetchArdBatchData, { isLoading: isArdBatchLoading }] =
    useLazyGetApiV1ProductArdProductByProductIdQuery();

  const handleLoadData = async (atrId: string, productBatchId: string) => {
    try {
      // Run all independent fetches in parallel
      const [atrData, batchData, formResponses] = await Promise.all([
        fetchAtrData({ id: atrId }).unwrap(),
        fetchBatchData({ id: productBatchId }).unwrap(),
        fetchFormResponses({
          batchManufacturingRecordId: productBatchId,
        }).unwrap(),
      ]);

      setAtrData(atrData);
      setBatchData(batchData);
      setBatchFormResponses(formResponses);
      // Use atrData to fetch the dependent data
      const productId = atrData?.product?.id;
      if (!productId) throw new Error("Product ID not found in ATR data");

      const ardBatchData = await fetchArdBatchData({ productId }).unwrap();
      const filtered = ardBatchData.find(
        (item) => Number(item?.stage) === Number(atrData?.stage),
      );
      setFilteredArdData(filtered);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  // Initial data loading
  useEffect(() => {
    if (atrId && productBatchId) {
      handleLoadData(atrId, productBatchId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atrId, productBatchId]);

  return (
    <PageWrapper className="space-y-5">
      <div>
        <div className="pb-3 flex justify-between gap-4">
          <PageTitle title="Product Analytical Raw Data" />
          <Button
            onClick={() => setIsOpen(true)}
            disabled={!atrData || !batchData || !filteredArdData}
          >
            Preview COA
          </Button>
        </div>

        {isAtrLoading || isBatchLoading || isArdBatchLoading ? (
          <ProductReportCardSkeleton />
        ) : (
          <ProductReportCard
            sampledOn={atrData?.sampledAt as string}
            numberOfContainers={atrData?.numberOfContainers as number}
            sampledQuantity={atrData?.sampledQuantity as string}
            specNumber={filteredArdData?.specNumber as string}
            productName={batchData?.product?.name as string}
            batchNumber={batchData?.batchNumber as string}
            mfgDate={batchData?.manufacturingDate as string}
            expDate={batchData?.expiryDate as string}
            stpNumber={
              filteredArdData?.productStandardTestProcedure?.stpNumber as string
            }
            issuedBy={filteredArdData?.createdBy?.firstName as string}
            issueDate={filteredArdData?.createdAt as string}
          />
        )}
      </div>

      <ScrollableWrapper>
        <div>
          <span className="text-lg font-semibold">Form Responses</span>
        </div>

        {isFormResponsesLoading ? (
          <FormResponseSkeleton />
        ) : (
          <FormResponseView responses={batchFormResponses} />
        )}
      </ScrollableWrapper>

      {/* Only render COA when all data is ready */}
      {batchData && atrData && (
        <PreviewCoa
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          productBatchId={productBatchId}
          productionActivityStepId={
            atrData.productionActivityStep?.id as string
          }
        >
          <CertificateOfAnalysis
            batchNo={batchData.batchNumber as string}
            dateOfMfg={batchData.manufacturingDate as string}
            dateOfExp={batchData.expiryDate as string}
            qcArNo=""
            pageNumber={1}
            sampledDate={atrData.sampledAt as string}
            analysedDate={atrData.sampledAt as string}
            productName={batchData.product?.name as string}
            tests={batchFormResponses?.filter(
              (item) => item.formField?.description,
            )}
            comment="Product complies with In-House specification."
          />
        </PreviewCoa>
      )}
    </PageWrapper>
  );
};

export default ArdDetails;

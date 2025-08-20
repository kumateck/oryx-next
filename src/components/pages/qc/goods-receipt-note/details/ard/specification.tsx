"use client";
import PageWrapper from "@/components/layout/wrapper";

import {
  FormResponseDto,
  useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery,
} from "@/lib/redux/api/openapi.generated";

import PageTitle from "@/shared/title";
import React, { useEffect } from "react";
import FormResponseView from "@/shared/form-response-view";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import MaterialSpecificationSkeleton from "../../../material-specification/details/loadingSkeleton";

interface Props {
  modelId: string;
  type: string;
  title: string;
}
const SpecificationResponse = ({ modelId, type, title }: Props) => {
  const [fetchMaterialSpecification, { data: materialData, isLoading }] =
    useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery();

  useEffect(() => {
    if (modelId && type === "M") {
      fetchMaterialSpecification({ id: modelId as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelId, type]);
  if (isLoading) return <MaterialSpecificationSkeleton />;

  return (
    <PageWrapper>
      <ScrollableWrapper className="">
        <div className="space-y-2">
          <PageTitle title={title} />
          <FormResponseView
            responses={
              materialData?.response?.formResponses as FormResponseDto[]
            }
          />
        </div>
      </ScrollableWrapper>
    </PageWrapper>
  );
};

export default SpecificationResponse;

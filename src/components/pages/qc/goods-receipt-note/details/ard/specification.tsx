"use client";
import PageWrapper from "@/components/layout/wrapper";

import {
  FormResponseDto,
  useLazyGetApiV1FormResponsesMaterialSpecificationByMaterialSpecificationIdQuery,
  useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery,
} from "@/lib/redux/api/openapi.generated";

import PageTitle from "@/shared/title";
import React, { useEffect, useState } from "react";
import FormResponseView from "@/shared/form-response-view";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import MaterialSpecificationSkeleton from "../../../material-specification/details/loadingSkeleton";

interface Props {
  modelId: string;
  type: string;
  title?: string;
}
const SpecificationResponse = ({ modelId, type }: Props) => {
  const [fetchMaterialSpecification] =
    useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery();
  const [fetSpecForm, { data: specForm, isLoading }] =
    useLazyGetApiV1FormResponsesMaterialSpecificationByMaterialSpecificationIdQuery();
  useEffect(() => {
    if (modelId && type === "M") {
      handleLoadSpecInformation(modelId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelId, type]);

  const [formTitle, setFormTitle] = useState("");

  const handleLoadSpecInformation = async (id: string) => {
    try {
      const response = await fetchMaterialSpecification({
        id,
      }).unwrap();

      const specId = response?.id as string;
      console.log(response.form);
      setFormTitle(response.form?.name as string);
      fetSpecForm({
        materialSpecificationId: specId,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <MaterialSpecificationSkeleton />;

  return (
    <PageWrapper>
      <ScrollableWrapper className="">
        <div className="space-y-2">
          <PageTitle title={formTitle} />
          <FormResponseView responses={specForm as FormResponseDto[]} />
        </div>
      </ScrollableWrapper>
    </PageWrapper>
  );
};

export default SpecificationResponse;

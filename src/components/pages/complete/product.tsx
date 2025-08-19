"use client";
import { AnalyticalTestRequestStage, fileToBase64, FormComplete } from "@/lib";
import {
  useLazyGetApiV1FormByFormIdQuery,
  useLazyGetApiV1ProductArdProductByProductIdQuery,
  useLazyGetApiV1ProductionScheduleManufacturingByIdQuery,
  useLazyGetApiV1ProductSpecificationsByIdQuery,
  usePostApiV1FormResponsesMutation,
} from "@/lib/redux/api/openapi.generated";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import FormSection from "./section";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildSchema, FormResponse, FormValues } from "./type";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import { Button, Icon } from "@/components/ui";
import PageWrapper from "@/components/layout/wrapper";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";
import PageTitle from "@/shared/title";
const FormResponseForProduct = () => {
  const router = useRouter();

  const { id, form } = useParams();
  const searchParams = useSearchParams();
  const stage = searchParams.get(
    "stage",
  ) as unknown as AnalyticalTestRequestStage; // Extracts 'type' from URL
  const productionActivityStepId = searchParams.get("stepId") as string;
  const completeId = id as string;
  const completeForm = Number(form) as unknown as FormComplete;

  const [currentFormId, setCurrentFormId] = useState<string>("");
  const [loadProductArd] = useLazyGetApiV1ProductArdProductByProductIdQuery();
  const [formResponseMutation, { isLoading }] =
    usePostApiV1FormResponsesMutation();

  const [loadProductBatchData, { isLoading: isDataLoading }] =
    useLazyGetApiV1ProductionScheduleManufacturingByIdQuery();

  const [loadSpecData, { isLoading: isSpecLoading }] =
    useLazyGetApiV1ProductSpecificationsByIdQuery();

  const [loadFormData, { data: formTemplate, isLoading: isFormLoading }] =
    useLazyGetApiV1FormByFormIdQuery();

  useEffect(() => {
    if (completeForm === FormComplete.Batch) {
      handleLoadProductBatchData(completeId);
    }

    if (completeForm === FormComplete.Specification) {
      handleProductSpecification(completeId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completeId, completeForm]);

  const handleProductSpecification = async (id: string) => {
    try {
      const response = await loadSpecData({
        id,
      }).unwrap();
      const batchFormId = response?.form?.id as string;
      setCurrentFormId(batchFormId);
      await handleLoadForm(batchFormId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadProductBatchData = async (id: string) => {
    try {
      const response = await loadProductBatchData({
        id,
      }).unwrap();
      const productResponse = await loadProductArd({
        productId: response?.product?.id as string,
      }).unwrap();
      const findSpec = productResponse?.find(
        (item) => Number(item.stage) === Number(stage),
      );
      const batchFormId = findSpec?.form?.id as string;
      setCurrentFormId(batchFormId);
      await handleLoadForm(batchFormId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadForm = async (formId: string) => {
    try {
      await loadFormData({ formId }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(buildSchema(formTemplate?.sections)),
    mode: "all",
  });

  const onSubmit = async (data: FormValues) => {
    // console.log(data, "data");
    const formResponse: FormResponse[] = Object.entries(data).map(
      ([key, value]) => ({
        formFieldId: key,
        value:
          typeof value === "object" && value !== null && "value" in value
            ? (value.value as string | string[] | { [key: string]: any })
            : (value as string | string[] | { [key: string]: any }),
      }),
    );

    const formData = await Promise.all(
      formResponse.map(async (response) => {
        let value: string | null = null;
        if (response?.value instanceof FileList) {
          if (response?.value.length > 0) {
            const images: string[] = [];
            const files = response?.value || [];
            for (const file of files) {
              images.push(await fileToBase64(file));
            }
            value = images.join("|");
          }
        } else {
          value = Array.isArray(response.value)
            ? response.value?.join(",")
            : typeof response.value === "string"
              ? response.value
              : null;
        }
        return {
          formFieldId: response.formFieldId,
          value,
        };
      }),
    );

    try {
      await formResponseMutation({
        createResponseRequest: {
          productionActivityStepId,
          formId: currentFormId,
          batchManufacturingRecordId:
            completeForm === FormComplete.Batch ? completeId : undefined,
          productSpecificationId:
            completeForm === FormComplete.Specification
              ? completeId
              : undefined,
          formResponses: formData,
        },
      }).unwrap();
      toast.success("Form Completed Successfully");
      if (completeForm === FormComplete.Specification) {
        router.push(`/qc/product-specification`);
      } else {
        router.back();
      }
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  console.log(formTemplate, "formf tem");
  return (
    <PageWrapper>
      {(isDataLoading || isSpecLoading || isFormLoading) && (
        <SkeletonLoadingPage />
      )}
      <ScrollableWrapper>
        <div className="pb-3">
          <PageTitle title={formTemplate?.name as string} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {formTemplate?.sections?.map((section, idx) => (
              <FormSection
                section={section}
                register={register}
                control={control}
                errors={errors}
                key={idx}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="default"
              className="flex h-9 items-center gap-2"
              onClick={() => router.back()}
            >
              <span>Cancel </span>
            </Button>

            <Button
              type="submit"
              variant="default"
              size="default"
              className="flex h-9 items-center gap-2"
            >
              {isLoading && (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              )}
              <span>Submit</span>
            </Button>
          </div>
        </form>
      </ScrollableWrapper>
    </PageWrapper>
  );
};

export default FormResponseForProduct;

//

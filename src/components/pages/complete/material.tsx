"use client";
import { fileToBase64, FormComplete } from "@/lib";
import {
  useLazyGetApiV1FormByFormIdQuery,
  useLazyGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery,
  useLazyGetApiV1MaterialSpecificationsByIdQuery,
  usePostApiV1FormResponsesMutation,
} from "@/lib/redux/api/openapi.generated";
import { useParams, useRouter } from "next/navigation";
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
const FormResponseForMaterial = () => {
  const router = useRouter();

  const { id, form } = useParams();
  const completeId = id as string;
  const completeForm = Number(form) as unknown as FormComplete;

  const [currentFormId, setCurrentFormId] = useState<string>("");

  const [formResponseMutation, { isLoading }] =
    usePostApiV1FormResponsesMutation();
  const [loadMaterialBatchData, { isLoading: isDataLoading }] =
    useLazyGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery();

  const [loadMaterialSpecData, { isLoading: isSpecLoading }] =
    useLazyGetApiV1MaterialSpecificationsByIdQuery();

  const [loadFormData, { data: formTemplate, isLoading: isFormLoading }] =
    useLazyGetApiV1FormByFormIdQuery();

  useEffect(() => {
    if (completeForm === FormComplete.Batch) {
      handleLoadMaterialBatchData(completeId);
    }

    if (completeForm === FormComplete.Specification) {
      handleMaterialSpecification(completeId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completeId, completeForm]);

  const handleMaterialSpecification = async (id: string) => {
    try {
      const response = await loadMaterialSpecData({
        id,
      }).unwrap();
      const batchFormId =
        (response?.form?.id as string) || (response.form?.id as string);
      setCurrentFormId(batchFormId);
      await handleLoadForm(batchFormId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMaterialBatchData = async (id: string) => {
    try {
      const response = await loadMaterialBatchData({
        materialBatchId: id,
      }).unwrap();
      const batchFormId = response?.form?.id as string;
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
          formId: currentFormId,
          materialBatchId:
            completeForm === FormComplete.Batch ? completeId : undefined,
          materialSpecificationId:
            completeForm === FormComplete.Specification
              ? completeId
              : undefined,
          formResponses: formData,
        },
      }).unwrap();
      toast.success("Form Completed Successfully");
      if (completeForm === FormComplete.Specification) {
        router.push(`/qc/material-specification`);
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

export default FormResponseForMaterial;

"use client";
import { fileToBase64 } from "@/lib";
import {
  useGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery,
  useLazyGetApiV1FormByFormIdQuery,
  usePostApiV1FormResponsesMutation,
} from "@/lib/redux/api/openapi.generated";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
const FormResponseForProduct = () => {
  const router = useRouter();

  const { id } = useParams();
  const materialBatchId = id as string;

  const [formResponseMutation, { isLoading }] =
    usePostApiV1FormResponsesMutation();
  const { data, isLoading: isDataLoading } =
    useGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery({
      materialBatchId,
    });
  const batchFormId = data?.form?.id as string;
  const [loadFormData, { data: formTemplate, isLoading: isFormLoading }] =
    useLazyGetApiV1FormByFormIdQuery();

  useEffect(() => {
    if (data) {
      const formId = data?.form?.id as string;
      handleLoadForm(formId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
    console.log(data, "data");
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
          formId: batchFormId,
          materialBatchId,
          formResponses: formData,
        },
      }).unwrap();
      toast.success("Form Completed Successfully");
      router.back();
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  return (
    <PageWrapper>
      {(isDataLoading || isFormLoading) && <SkeletonLoadingPage />}
      <ScrollableWrapper>
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

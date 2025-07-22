"use client";
import { Button, Icon } from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse } from "@/lib";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CreateProductSpecificationDto,
  CreateProductSpecificationValidator,
  MaterialSpecificationReferenceEnum as MaterialSpecificationReferenceEnumValues,
  TestStageValues,
  TestTypeEnum as TestTypeEnumLabels,
} from "../types";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useParams, useRouter } from "next/navigation";
import {
  CreateProductSpecificationRequest,
  MaterialSpecificationReference as MaterialSpecificationReferenceEnum,
  TestSpecification,
  TestStage,
  TestType as TestTypeEnum,
  useGetApiV1ProductQuery,
  useLazyGetApiV1ProductSpecificationsByIdQuery,
  usePutApiV1ProductSpecificationsByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import SpecificationForm from "../create/form";
import PageTitle from "@/shared/title";

function Page() {
  return (
    <ScrollablePageWrapper>
      <EditMaterialSpecification />
    </ScrollablePageWrapper>
  );
}

export default Page;

export function EditMaterialSpecification() {
  const { id } = useParams();
  const router = useRouter();
  const { data: product } = useGetApiV1ProductQuery({});
  const [updateProductSpecification, { isLoading }] =
    usePutApiV1ProductSpecificationsByIdMutation();

  const [fetchProductSpecification, { data: productSpecification }] =
    useLazyGetApiV1ProductSpecificationsByIdQuery({});

  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductSpecificationDto>({
    resolver: CreateProductSpecificationValidator,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testSpecifications",
  });

  useEffect(() => {
    if (id) {
      fetchProductSpecification({ id: id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const productId = watch("productId");
  useEffect(() => {
    if (productId) {
      const selectedProduct = product?.data?.find(
        (option) => option.id === productId.value,
      );
      setValue("labelClaim", selectedProduct?.labelClaim || "Not availabel");
      setValue(
        "packingStyle",
        selectedProduct?.packageStyle || "Not available",
      );
      setValue("shelfLife", selectedProduct?.shelfLife || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  useEffect(() => {
    if (productSpecification) {
      // Populate form with fetched material data
      setValue(
        "specificationNumber",
        productSpecification?.specificationNumber as string,
      );
      setValue("testStage", {
        value: String(productSpecification?.testStage),
        label: TestStageValues[productSpecification?.testStage as TestStage],
      });
      setValue(
        "revisionNumber",
        productSpecification?.revisionNumber as string,
      );
      setValue(
        "supersedesNumber",
        productSpecification?.supersedesNumber as string,
      );
      if (productSpecification?.effectiveDate) {
        setValue("effectiveDate", new Date(productSpecification.effectiveDate));
      }
      setValue("labelClaim", productSpecification?.labelClaim as string);
      setValue("packingStyle", productSpecification?.packingStyle as string);
      setValue("shelfLife", productSpecification?.shelfLife as string);
      if (productSpecification?.reviewDate) {
        setValue("reviewDate", new Date(productSpecification.reviewDate));
      }
      setValue(
        "testSpecifications",
        (productSpecification?.testSpecifications ?? []).map((test) => ({
          srNumber: test.srNumber,
          testName: {
            value:
              test.testName !== undefined && test.testName !== null
                ? String(test.testName)
                : "",
            label:
              test.testName !== undefined && test.testName !== null
                ? TestTypeEnumLabels[test.testName]
                : "",
          },
          releaseSpecification:
            test.releaseSpecification !== undefined &&
            test.releaseSpecification !== null
              ? String(test.releaseSpecification)
              : "",
          reference: {
            value:
              test.reference !== undefined && test.reference !== null
                ? String(test.reference)
                : "",
            label:
              test.reference !== undefined && test.reference !== null
                ? MaterialSpecificationReferenceEnumValues[test.reference]
                : "",
          },
        })),
      );
      if (productSpecification?.product) {
        setValue("productId", {
          value: productSpecification?.product?.id ?? "",
          label: productSpecification?.product?.name ?? "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSpecification]);

  const productOptions =
    product?.data?.map((product) => ({
      label: product?.name as string,
      value: product?.id as string,
    })) || [];

  const onSubmit = async (data: CreateProductSpecificationDto) => {
    const payload: CreateProductSpecificationRequest = {
      specificationNumber: data.specificationNumber,
      testStage: Number(data.testStage.value) as unknown as TestStage,
      revisionNumber: data.revisionNumber,
      supersedesNumber: data.supersedesNumber,
      effectiveDate: data.effectiveDate
        ? new Date(data.effectiveDate).toISOString()
        : "",
      reviewDate: data.reviewDate
        ? new Date(data.reviewDate).toISOString()
        : "",
      testSpecifications: data.testSpecifications.map((test) => ({
        srNumber: Number(test.srNumber),
        testName: Number(test.testName.value) as unknown as TestTypeEnum,
        releaseSpecification: test.releaseSpecification,
        reference: Number(
          test.reference.value as unknown as MaterialSpecificationReferenceEnum,
        ),
      })) as TestSpecification[],
      productId: data.productId.value as string,
    };
    console.log("Submitting data", payload);
    if (!id) return;
    try {
      await updateProductSpecification({
        id: id as string,
        createProductSpecificationRequest: payload,
        module: AuditModules.production.name,
        subModule: AuditModules.production.productSpecification,
      }).unwrap();
      toast.success("Product Specification updated successfully");
      router.back();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <>
      <div
        onClick={() => router.back()}
        className="flex mb-6 cursor-pointer hover:underline items-center gap-2"
      >
        <Icon name="ArrowLeft" />
        <PageTitle title="Products Specification List" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <SpecificationForm
            control={control}
            remove={remove}
            append={append}
            fields={fields}
            register={register}
            productOptions={productOptions}
            errors={errors}
          />
          <span>
            <span className="text-red-600 text-sm font-medium">
              {errors?.testSpecifications?.message}
            </span>
          </span>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => router.back()}
            disabled={isLoading}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icon name="LoaderCircle" className="animate-spin h-4 w-4 mr-2" />
            )}
            {isLoading ? "Submitting..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </>
  );
}

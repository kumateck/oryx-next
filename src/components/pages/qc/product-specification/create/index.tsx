"use client";
import { Button, Icon } from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse } from "@/lib";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CreateProductSpecificationDto,
  CreateProductSpecificationValidator,
} from "../types";
import SpecificationForm from "./form";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useRouter } from "next/navigation";
import {
  CreateProductSpecificationRequest,
  MaterialSpecificationReference as MaterialSpecificationReferenceEnum,
  TestSpecification,
  TestStage,
  TestType as TestTypeEnum,
  useGetApiV1ProductQuery,
  usePostApiV1ProductSpecificationsMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { useEffect } from "react";
import PageTitle from "@/shared/title";

function Page() {
  return (
    <ScrollablePageWrapper>
      <MaterialSpecPage />
    </ScrollablePageWrapper>
  );
}

export default Page;

export function MaterialSpecPage() {
  const router = useRouter();
  const { data: product } = useGetApiV1ProductQuery({});
  const [createProductSpecification, { isLoading }] =
    usePostApiV1ProductSpecificationsMutation();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProductSpecificationDto>({
    resolver: CreateProductSpecificationValidator,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testSpecifications",
  });

  const productOptions =
    product?.data?.map((product) => ({
      label: product?.name as string,
      value: product?.id as string,
    })) || [];

  const productId = watch("productId");
  useEffect(() => {
    if (productId) {
      const selectedProduct = product?.data?.find(
        (option) => option.id === productId.value,
      );
      setValue("labelClaim", selectedProduct?.labelClaim || "Not availabel");
      setValue("packingStyle", selectedProduct?.packageStyle || "");
      setValue("shelfLife", selectedProduct?.shelfLife || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const onSubmit = async (data: CreateProductSpecificationDto) => {
    const payload: CreateProductSpecificationRequest = {
      specificationNumber: data.specificationNumber,
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
      testStage: Number(data.testStage.value) as unknown as TestStage,
      productId: data.productId.value as string,
    };
    console.log("Submitting data", payload);
    try {
      await createProductSpecification({
        createProductSpecificationRequest: payload,
        module: AuditModules.production.name,
        subModule: AuditModules.production.productSpecification,
      }).unwrap();
      toast.success("Product Specification created successfully");
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
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

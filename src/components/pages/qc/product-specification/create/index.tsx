"use client";
import { Button, Icon } from "@/components/ui";
import {
  AuditModules,
  ErrorResponse,
  FormComplete,
  FormTypeEnum,
  fullname,
  isErrorResponse,
  Option,
  WorkflowFormType,
} from "@/lib";
import { useForm, useWatch } from "react-hook-form";
import {
  CreateProductSpecificationDto,
  CreateProductSpecificationValidator,
} from "../types";
import SpecificationForm from "./form";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useRouter } from "next/navigation";
import {
  CreateProductSpecificationRequest,
  TestStage,
  useGetApiV1FormQuery,
  useGetApiV1ProductQuery,
  useGetApiV1UserQuery,
  usePostApiV1ProductSpecificationsMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { useEffect } from "react";
import PageTitle from "@/shared/title";
import { useSelector } from "@/lib/redux/store";

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
  const { data: product } = useGetApiV1ProductQuery({
    page: 1,
    pageSize: 1000,
  });
  const [createProductSpecification, { isLoading }] =
    usePostApiV1ProductSpecificationsMutation();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateProductSpecificationDto>({
    resolver: CreateProductSpecificationValidator,
  });

  const { data: userResults } = useGetApiV1UserQuery({
    page: 1,
    pageSize: 1000,
  });
  const currentUser = useSelector(
    (state) => state.persistedReducer.auth?.userId,
  );
  const users = userResults?.data ?? [];
  const userOptions = users?.map((user) => ({
    label: fullname(user?.firstName as string, user?.lastName as string),
    value: user.id,
  })) as Option[];

  const assignSpec = useWatch<CreateProductSpecificationDto>({
    name: "assignSpec",
    control,
  }) as boolean;
  const { data: formTemplates } = useGetApiV1FormQuery({
    page: 1,
    pageSize: 1000,
    type: FormTypeEnum.Specification,
  });

  // Convert form templates to options
  const formData = formTemplates?.data || [];
  const formOptions = formData?.map((form) => {
    return {
      label: form.name,
      value: form.id,
    };
  }) as Option[];

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
      formId: data.formId.value as string,
      dueDate: data.dueDate
        ? new Date(data.dueDate).toISOString()
        : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // adds 1 day,
      description: data.description,
      testStage: Number(data.testStage.value) as unknown as TestStage,
      productId: data.productId.value as string,
      userId: data.assignSpec
        ? (data?.userId?.value as string)
        : (currentUser as string),
    };

    try {
      const res = await createProductSpecification({
        createProductSpecificationRequest: payload,
        module: AuditModules.production.name,
        subModule: AuditModules.production.productSpecification,
      }).unwrap();
      toast.success("Product Specification created successfully");
      if (!assignSpec) {
        router.push(
          `/complete/${WorkflowFormType.Product}/${res}/${FormComplete.Specification}`,
        );
        return;
      } else {
        router.back();
      }
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  console.log(errors, "errors");
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
        <SpecificationForm
          control={control}
          register={register}
          userOptions={userOptions}
          formOptions={formOptions}
          productOptions={productOptions}
          errors={errors}
          assignSpec={assignSpec}
        />

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

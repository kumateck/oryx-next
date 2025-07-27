"use client";
import { Button, Icon } from "@/components/ui";
import {
  AuditModules,
  EMaterialKind,
  ErrorResponse,
  FormTypeEnum,
  isErrorResponse,
  Option,
} from "@/lib";
import { useForm } from "react-hook-form";
import {
  CreateMaterialSpecificationDto,
  CreateMaterialSpecificationValidator,
} from "../types";
import SpecificationForm from "./form";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CreateMaterialSpecificationRequest,
  useGetApiV1FormQuery,
  useGetApiV1MaterialMaterialSpecsNotLinkedQuery,
  useGetApiV1UserQuery,
  usePostApiV1MaterialSpecificationsMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const kind = searchParams.get("kind") as unknown as EMaterialKind;
  const { data: materials } = useGetApiV1MaterialMaterialSpecsNotLinkedQuery({
    materialKind: kind ?? EMaterialKind.Raw,
  });
  const [createMaterialSpecification, { isLoading }] =
    usePostApiV1MaterialSpecificationsMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMaterialSpecificationDto>({
    resolver: CreateMaterialSpecificationValidator,
  });

  const { data: userResults } = useGetApiV1UserQuery({
    page: 1,
    pageSize: 1000,
  });
  const users = userResults?.data ?? [];
  const userOptions = users?.map((user) => ({
    label: `${user?.firstName} ${user?.lastName} `,
    value: user.id,
  })) as Option[];

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

  const materialOptions =
    materials?.map((material) => ({
      label: material?.name as string,
      value: material?.id as string,
    })) || [];

  const onSubmit = async (data: CreateMaterialSpecificationDto) => {
    const payload: CreateMaterialSpecificationRequest = {
      specificationNumber: data.specificationNumber,
      revisionNumber: data.revisionNumber,
      supersedesNumber: data.supersedesNumber,
      formId: "",
      userId: "",

      effectiveDate: data.effectiveDate
        ? new Date(data.effectiveDate).toISOString()
        : "",
      reviewDate: data.reviewDate
        ? new Date(data.reviewDate).toISOString()
        : "",
      materialId: data.materialId.value as string,
    };
    try {
      await createMaterialSpecification({
        createMaterialSpecificationRequest: payload,
        module: AuditModules.production.name,
        subModule: AuditModules.production.materialRequisitions,
      }).unwrap();
      toast.success("Material Specification created successfully");
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
        <PageTitle title="Material Specification List" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <SpecificationForm
            control={control}
            register={register}
            formOptions={formOptions}
            userOptions={userOptions}
            materialOptions={materialOptions}
            kind={kind}
            errors={errors}
          />
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

"use client";
import { Button, Icon } from "@/components/ui";
import {
  AuditModules,
  EMaterialKind,
  ErrorResponse,
  isErrorResponse,
} from "@/lib";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CreateMaterialSpecificationDto,
  CreateMaterialSpecificationValidator,
} from "../types";
import SpecificationForm from "./form";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MaterialSpecificationReference as MaterialSpecificationReferenceEnum,
  TestSpecification,
  TestType as TestTypeEnum,
  useGetApiV1MaterialQuery,
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
  const { data: materials } = useGetApiV1MaterialQuery({
    kind: kind ?? EMaterialKind.Raw,
    pageSize: 1000,
    page: 1,
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testSpecifications",
  });

  const materialOptions =
    materials?.data?.map((material) => ({
      label: material?.name as string,
      value: material?.id as string,
    })) || [];

  const onSubmit = async (data: CreateMaterialSpecificationDto) => {
    const payload = {
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
            remove={remove}
            append={append}
            fields={fields}
            register={register}
            materialOptions={materialOptions}
            kind={kind}
            errors={errors}
          />
          <span className="text-red-600 text-sm font-medium">
            {errors?.testSpecifications?.message}
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

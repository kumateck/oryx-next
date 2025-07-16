"use client";
import { Button, Icon } from "@/components/ui";
import {
  AuditModules,
  EMaterialKind,
  ErrorResponse,
  isErrorResponse,
} from "@/lib";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CreateMaterialSpecificationDto,
  CreateMaterialSpecificationValidator,
  MaterialSpecificationReferenceEnum as MaterialSpecificationReferenceEnumValues,
  TestTypeEnum as TestTypeEnumLabels,
} from "../types";
import PageWrapper from "@/components/layout/wrapper";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  MaterialSpecificationReference as MaterialSpecificationReferenceEnum,
  TestSpecification,
  TestType as TestTypeEnum,
  useLazyGetApiV1MaterialQuery,
  useLazyGetApiV1MaterialSpecificationsByIdQuery,
  usePutApiV1MaterialSpecificationsByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import SpecificationForm from "../create/form";

function Page() {
  return (
    <PageWrapper>
      <ScrollablePageWrapper>
        <EditMaterialSpecification />
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}

export default Page;

export function EditMaterialSpecification() {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const router = useRouter();
  const kind = searchParams.get("kind") as unknown as EMaterialKind;
  const [getMaterials, { data: materials }] = useLazyGetApiV1MaterialQuery({});
  const [updateMaterialSpecification, { isLoading }] =
    usePutApiV1MaterialSpecificationsByIdMutation();

  const [fetchMaterialSpecification, { data: materialData }] =
    useLazyGetApiV1MaterialSpecificationsByIdQuery({});

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMaterialSpecificationDto>({
    resolver: CreateMaterialSpecificationValidator,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testSpecifications",
  });

  useEffect(() => {
    if (id) {
      fetchMaterialSpecification({ id: id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (!materialData) return;
    getMaterials({
      kind: materialData?.material?.kind,
      pageSize: 1000,
      page: 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialData]);
  useEffect(() => {
    if (materialData) {
      // Populate form with fetched material data
      setValue(
        "specificationNumber",
        materialData?.specificationNumber as string,
      );
      setValue("revisionNumber", materialData?.revisionNumber as string);
      setValue("supersedesNumber", materialData?.supersedesNumber as string);
      if (materialData?.effectiveDate) {
        setValue("effectiveDate", new Date(materialData.effectiveDate));
      }
      if (materialData?.reviewDate) {
        setValue("reviewDate", new Date(materialData.reviewDate));
      }
      setValue(
        "testSpecifications",
        (materialData?.testSpecifications ?? []).map((test) => ({
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
      if (materialData?.material) {
        setValue("materialId", {
          value: materialData?.material?.id ?? "",
          label: materialData?.material?.name ?? "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialData]);

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
    console.log("Submitting data", payload);
    if (!id) return;
    try {
      await updateMaterialSpecification({
        id: id as string,
        createMaterialSpecificationRequest: payload,
        module: AuditModules.production.name,
        subModule: AuditModules.production.materialSpecification,
      }).unwrap();
      toast.success("Material Specification updated successfully");
      router.back();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
  );
}

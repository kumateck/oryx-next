"use client";
import { Button, Icon } from "@/components/ui";
import {
  AuditModules,
  EMaterialKind,
  ErrorResponse,
  FormType,
  fullname,
  isErrorResponse,
  Option,
} from "@/lib";
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  CreateMaterialSpecificationDto,
  CreateMaterialSpecificationValidator,
} from "../types";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  useGetApiV1FormQuery,
  useGetApiV1UserQuery,
  useLazyGetApiV1MaterialMaterialSpecsNotLinkedQuery,
  useLazyGetApiV1MaterialSpecificationsByIdQuery,
  usePutApiV1MaterialSpecificationsByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import SpecificationForm from "../create/form";
import PageTitle from "@/shared/title";
import { useSelector } from "@/lib/redux/store";

function Page() {
  return (
    <ScrollablePageWrapper>
      <EditMaterialSpecification />
    </ScrollablePageWrapper>
  );
}

export default Page;

export function EditMaterialSpecification() {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const router = useRouter();
  const currentUser = useSelector(
    (state) => state.persistedReducer.auth?.userId,
  );
  const kind = searchParams.get("kind") as unknown as EMaterialKind;
  const [getMaterials, { data: materials }] =
    useLazyGetApiV1MaterialMaterialSpecsNotLinkedQuery({});
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

  useEffect(() => {
    if (id) {
      fetchMaterialSpecification({ id: id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (!materialData) return;
    getMaterials({
      materialKind: materialData?.material?.kind,
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
    materials?.map((material) => ({
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
      materialId: data.materialId.value as string,
      formId: data.formId.value as string,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
      description: data.description,
      userId: data.assignSpec
        ? (data?.userId?.value as string)
        : (currentUser as string),
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
  const { data: usersData } = useGetApiV1UserQuery({});

  const users = usersData?.data;
  const userOptions = users?.map((user) => ({
    label: fullname(user?.firstName as string, user?.lastName as string),
    value: user?.id as string,
  })) as Option[];

  const assignSpec = useWatch<CreateMaterialSpecificationDto>({
    name: "assignSpec",
    control,
  }) as boolean;
  //load forms template
  const { data: formTemplates } = useGetApiV1FormQuery({
    page: 1,
    pageSize: 1000,
    type: FormType.Specification,
  });

  const formOptionsData = formTemplates?.data || [];
  const formOptions = formOptionsData.map((form) => ({
    value: form.id,
    label: form.name,
  })) as Option[];
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
            assignSpec={assignSpec}
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
            {isLoading ? "Submitting..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </>
  );
}

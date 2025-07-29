"use client";
import { Button, Icon } from "@/components/ui";
import {
  AuditModules,
  ErrorResponse,
  InventoryClassificationEnum,
  isErrorResponse,
  Option,
  ReorderdRules,
} from "@/lib";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useParams, useRouter } from "next/navigation";
import {
  CreateInventoryRequest,
  InventoryClassification,
  ReorderRules,
  useGetApiV1CollectionUomQuery,
  useGetApiV1DepartmentQuery,
  useLazyGetApiV1InventoriesByIdQuery,
  usePutApiV1InventoriesByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import SpecificationForm from "../form";
import PageTitle from "@/shared/title";
import { CreateInventoryDto, CreateInventoryValidator } from "../types";

function Page() {
  return (
    <ScrollablePageWrapper>
      <EditInventory />
    </ScrollablePageWrapper>
  );
}

export default Page;
function EditInventory() {
  const { id } = useParams();
  const router = useRouter();

  const [editInventory, { isLoading }] = usePutApiV1InventoriesByIdMutation();
  const { data: departments } = useGetApiV1DepartmentQuery({
    page: 1,
    pageSize: 200,
  });
  const { data: uomResponse } = useGetApiV1CollectionUomQuery({
    isRawMaterial: true,
    module: AuditModules.general.name,
    subModule: AuditModules.general.collection,
  });

  const [fetchInventoryDetails, { data: inventoryDetails }] =
    useLazyGetApiV1InventoriesByIdQuery({});

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateInventoryDto>({
    resolver: CreateInventoryValidator,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "departments",
  });

  useEffect(() => {
    if (id) {
      fetchInventoryDetails({ id: id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (inventoryDetails) {
      // Populate form with fetched inventory data
      setValue("materialName", inventoryDetails?.materialName as string);
      setValue("code", inventoryDetails?.code as string);
      setValue("description", inventoryDetails?.description as string);

      setValue("inventoryTypeId", inventoryDetails?.inventoryTypeId ?? "");
      setValue("isActive", inventoryDetails?.isActive ?? false);
      setValue("isActive", inventoryDetails?.isActive ?? false);
      setValue(
        "initialStockQuantity",
        inventoryDetails?.initialStockQuantity ?? 0,
      );
      setValue("classification", {
        value: String(inventoryDetails?.classification),
        label:
          InventoryClassificationEnum[inventoryDetails?.classification ?? ""] ||
          "",
      });
      setValue("reorderRule", {
        value: String(inventoryDetails?.reorderRule),
        label: ReorderdRules[inventoryDetails?.reorderRule ?? ""] || "",
      });
      setValue("unitOfMeasureId", {
        value: String(inventoryDetails?.unitOfMeasure?.id),
        label: ReorderdRules[inventoryDetails?.unitOfMeasure?.name ?? ""] || "",
      });
    }
    // TODO: Populate departments field array with fetched data
    // if (inventoryDetails?.departments) {
    //   const departmentsData = inventoryDetails.departments.map((dept) => ({
    //     departmentId: {
    //       value: dept.departmentId,
    //       label: dept.departmentName,
    //     },
    //     initialStockQuantity: dept.initialStockQuantity,
    //     minimumLevel: dept.minimumLevel,
    //     maximumLevel: dept.maximumLevel,
    //     reorderLevel: dept.reorderLevel,
    //   }));
    //   // Set the departments field array with fetched data
    //   fields.forEach((_, index) => remove(index));
    //   departmentsData.forEach((dept) => append(dept));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryDetails]);

  const onSubmit = async (data: CreateInventoryDto) => {
    const payload: CreateInventoryRequest = {
      materialName: data.materialName,
      code: data.code,
      inventoryTypeId: data.inventoryTypeId,
      unitOfMeasureId: data.unitOfMeasureId.value,
      remarks: data.remarks,
      reorderRule: data.reorderRule.value as unknown as ReorderRules,
      initialStockQuantity: data.initialStockQuantity,
      departmentId: data.departmentId.value,
      isActive: data.isActive,
      description: data.description,
      classification: data.classification
        .value as unknown as InventoryClassification,
    };
    try {
      const res = await editInventory({
        id: id as string,
        createInventoryRequest: payload,
        module: AuditModules.extral.name,
        subModule: AuditModules.extral.generalInventoryConfiguration,
      }).unwrap();
      console.log(res, "res");
      toast.success("Inventory updated successfully");
      router.back();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  //selection options
  const departmentOptions = departments?.data?.map((dept) => ({
    label: dept.name as string,
    value: dept.id as string,
  })) as Option[];

  const unitOfMeasureOptions = uomResponse?.map((uom) => ({
    label: uom.symbol,
    value: uom.id,
  })) as Option[];

  return (
    <>
      <div
        onClick={() => router.back()}
        className="flex mb-6 cursor-pointer hover:underline items-center gap-2"
      >
        <Icon name="ArrowLeft" />
        <span>Inventory Configuration Listt</span>
      </div>
      <PageTitle title="Edit General Inventory " />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <SpecificationForm
            control={control}
            register={register}
            errors={errors}
            departmentOptions={departmentOptions}
            unitOfMeasureOptions={unitOfMeasureOptions}
            remove={remove}
            fields={fields}
            append={append}
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

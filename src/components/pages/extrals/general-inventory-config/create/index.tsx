"use client";
import { Button, Icon } from "@/components/ui";
import {
  AuditModules,
  CODE_SETTINGS,
  ErrorResponse,
  isErrorResponse,
  Option,
} from "@/lib";
import { useFieldArray, useForm } from "react-hook-form";
import SpecificationForm from "../form";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useRouter } from "next/navigation";
import {
  CreateItemRequest,
  useGetApiV1CollectionUomQuery,
  useGetApiV1DepartmentQuery,
  useLazyGetApiV1ServicesQuery,
  usePostApiV1InventoriesMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import PageTitle from "@/shared/title";
import { CreateInventoryDto, CreateInventoryValidator } from "../types";
import { useCodeGen } from "@/lib/code-gen";
import { useEffect } from "react";

function Page() {
  return (
    <ScrollablePageWrapper>
      <MaterialSpecPage />
    </ScrollablePageWrapper>
  );
}

export default Page;

export function MaterialSpecPage() {
  const { data: departments } = useGetApiV1DepartmentQuery({
    page: 1,
    pageSize: 200,
  });
  const [loadCodeModelCount] = useLazyGetApiV1ServicesQuery();
  const { data: uomResponse } = useGetApiV1CollectionUomQuery({
    isRawMaterial: true,
    module: AuditModules.general.name,
    subModule: AuditModules.general.collection,
  });
  const router = useRouter();
  const [createInventory, { isLoading }] = usePostApiV1InventoriesMutation();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateInventoryDto>({
    resolver: CreateInventoryValidator,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "departments",
  });
  const onSubmit = async (data: CreateInventoryDto) => {
    const payload: CreateItemRequest = {
      name: data.materialName,
      type: data.inventoryTypeId,
      // unitOfMeasureId: data.unitOfMeasureId.value,
      // remarks: data.remarks,
      // reorderRule: data.reorderRule.value as unknown as ReorderRules,
      // initialStockQuantity: data.initialStockQuantity,
      // departmentId: data.departmentId.value,
      // isActive: data.isActive,
      description: data.description,
      // classification: data.classification
      //   .value as unknown as InventoryClassification,
    };
    try {
      const res = await createInventory({
        createItemRequest: payload,

        module: AuditModules.extral.name,
        subModule: AuditModules.extral.generalInventoryConfiguration,
      }).unwrap();
      console.log(res, "res");
      // console.log(res, "res");
      toast.success("Inventory created successfully");
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  //code configuration
  const setCodeToInput = (code: string) => {
    setValue("code", code ?? "");
  };
  const fetchCount = async () => {
    const countResponse = await loadCodeModelCount({}).unwrap();

    return { totalRecordCount: countResponse?.totalRecordCount };
  };
  const { regenerateCode, loading } = useCodeGen(
    CODE_SETTINGS.modelTypes.GeneralInventory,
    fetchCount,
    setCodeToInput,
  );
  useEffect(() => {
    regenerateCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <span>General Inventory List</span>
      </div>
      <PageTitle title="Create General Configuration" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <div>
          <SpecificationForm
            control={control}
            register={register}
            errors={errors}
            departmentOptions={departmentOptions}
            unitOfMeasureOptions={unitOfMeasureOptions}
            remove={remove}
            isLoadingCode={loading}
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
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

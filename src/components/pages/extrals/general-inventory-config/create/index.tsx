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
import InventoryForm from "../form";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useRouter } from "next/navigation";
import {
  CreateItemRequest,
  useGetApiV1CollectionUomQuery,
  useGetApiV1DepartmentQuery,
  useLazyGetApiV1ServicesQuery,
  // usePostApiV1ItemsMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { CreateInventoryDto, CreateInventoryValidator } from "../types";
import { useCodeGen } from "@/lib/code-gen";
import { useEffect } from "react";

function Page() {
  return (
    <ScrollablePageWrapper>
      <CreateInventoryItem />
    </ScrollablePageWrapper>
  );
}

export default Page;
const isLoading = false; // Placeholder for loading state
export function CreateInventoryItem() {
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
  // const [createInventory, { isLoading }] = usePostApiV1ItemsMutation();
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
      description: data.description,
    };
    console.log(payload);
    try {
      // const res = await createInventory({

      //   // createItemsRequest: payload,
      //   module: AuditModules.extral.name,
      //   subModule: AuditModules.extral.generalInventoryConfiguration,
      // }).unwrap();
      // console.log(res, "res");
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <div>
          <InventoryForm
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

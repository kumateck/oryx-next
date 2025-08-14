"use client";
import { Button, Icon } from "@/components/ui";
import {
  AuditModules,
  CODE_SETTINGS,
  ErrorResponse,
  InventoryType,
  isErrorResponse,
  Option,
  splitWords,
} from "@/lib";
import { useForm } from "react-hook-form";
import InventoryForm from "../form";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CreateItemsRequest,
  InventoryClassification,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  Store,
  useGetApiV1CollectionUomQuery,
  useLazyGetApiV1ServicesQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePostApiV1ItemsMutation,
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

export function CreateInventoryItem() {
  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();
  const [loadCodeModelCount] = useLazyGetApiV1ServicesQuery();
  const { data: uomResponse } = useGetApiV1CollectionUomQuery({
    module: AuditModules.general.name,
    subModule: AuditModules.general.collection,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeType = searchParams.get("storeType");
  const [createItem, { isLoading }] = usePostApiV1ItemsMutation();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateInventoryDto>({
    resolver: CreateInventoryValidator,
  });

  const onSubmit = async (data: CreateInventoryDto) => {
    const payload: CreateItemsRequest = {
      description: data.description,
      isActive: data.isActive,
      code: data.code,
      name: data.materialName,
      classification: Number(
        data.classification.value,
      ) as unknown as InventoryClassification,
      store: Number(storeType) as unknown as Store,
      unitOfMeasureId: data.unitOfMeasureId.value,
      hasBatchNumber: data.isActive,
      maximumLevel: data.maximumLevel,
      minimumLevel: data.minimumLevel,
      reorderLevel: data.reorderLevel,
    };
    try {
      const itemId = await createItem({
        createItemsRequest: payload,
        module: AuditModules.extral.name,
        subModule: AuditModules.extral.generalInventoryConfiguration,
      }).unwrap();
      if (itemId && data?.attachments > 0) {
        const formData = new FormData();
        const attachmentsArray = Array.isArray(data.attachments)
          ? data.attachments
          : Array.from(data.attachments); // Convert FileList to an array
        attachmentsArray.forEach((attachment: File) => {
          formData.append("files", attachment, attachment.name);
        });

        await uploadAttachment({
          modelType: CODE_SETTINGS.modelTypes.Item,
          modelId: itemId as string,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
      router.back();
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
  const { regenerateCode } = useCodeGen(
    CODE_SETTINGS.modelTypes.Item,
    fetchCount,
    setCodeToInput,
  );
  useEffect(() => {
    regenerateCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!storeType) return;
    setValue(
      "storeType",
      splitWords(InventoryType[storeType as unknown as InventoryType]) ??
        "GeneralStore",
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeType]);

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
            unitOfMeasureOptions={unitOfMeasureOptions}
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => router.back()}
            disabled={isLoading || isUploadingAttachment}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icon name="LoaderCircle" className="animate-spin h-4 w-4 mr-2" />
            )}
            {isLoading || isUploadingAttachment ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

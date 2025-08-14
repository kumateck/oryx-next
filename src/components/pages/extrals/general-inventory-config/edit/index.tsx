"use client";
import { Button, Icon } from "@/components/ui";
import {
  AuditModules,
  CODE_SETTINGS,
  ErrorResponse,
  InventoryClassificationEnum,
  InventoryType,
  isErrorResponse,
  Option,
} from "@/lib";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useParams, useRouter } from "next/navigation";
import {
  CreateItemsRequest,
  InventoryClassification,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  Store,
  useGetApiV1CollectionUomQuery,
  useLazyGetApiV1ItemsByIdQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePutApiV1ItemsByIdMutation,
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

  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();
  const [editItem, { isLoading }] = usePutApiV1ItemsByIdMutation();
  const { data: uomResponse } = useGetApiV1CollectionUomQuery({
    isRawMaterial: true,
    module: AuditModules.general.name,
    subModule: AuditModules.general.collection,
  });

  const [fetchItemDetails, { data: inventoryDetails }] =
    useLazyGetApiV1ItemsByIdQuery({});
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateInventoryDto>({
    resolver: CreateInventoryValidator,
  });

  useEffect(() => {
    if (id) {
      fetchItemDetails({ id: id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (inventoryDetails) {
      // Populate form with fetched inventory data
      setValue("materialName", inventoryDetails?.name as string);
      setValue("code", inventoryDetails?.code as string);
      setValue("description", inventoryDetails?.description as string);
      setValue("maximumLevel", inventoryDetails?.maximumLevel ?? 0);
      setValue("reorderLevel", inventoryDetails?.reorderLevel ?? 0);
      setValue("minimumLevel", inventoryDetails?.minimumLevel ?? 0);
      setValue("unitOfMeasureId", {
        label: inventoryDetails?.unitOfMeasure?.symbol,
        value: String(inventoryDetails?.unitOfMeasure?.id),
      } as Option);
      setValue(
        "storeType",
        inventoryDetails?.store !== undefined
          ? String(InventoryType[inventoryDetails.store])
          : "",
      );
      setValue("isActive", inventoryDetails?.isActive ?? false);
      setValue("classification", {
        value: String(inventoryDetails?.classification),
        label:
          InventoryClassificationEnum[inventoryDetails?.classification ?? ""] ||
          "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryDetails]);

  const onSubmit = async (data: CreateInventoryDto) => {
    const payload: CreateItemsRequest = {
      description: data.description,
      code: data.code,
      name: data.materialName,
      isActive: data.isActive,
      classification: Number(
        data.classification.value,
      ) as unknown as InventoryClassification,
      store: Number(data.storeType) as unknown as Store,
      unitOfMeasureId: data.unitOfMeasureId.value,
      hasBatchNumber: data.isActive,
      maximumLevel: data.maximumLevel,
      minimumLevel: data.minimumLevel,
      reorderLevel: data.reorderLevel,
    };
    try {
      await editItem({
        id: id as string,
        createItemsRequest: payload,
        module: AuditModules.extral.name,
        subModule: AuditModules.extral.generalInventoryConfiguration,
      }).unwrap();
      if (data?.attachments > 0) {
        const formData = new FormData();
        const attachmentsArray = Array.isArray(data.attachments)
          ? data.attachments
          : Array.from(data.attachments); // Convert FileList to an array
        attachmentsArray.forEach((attachment: File) => {
          formData.append("files", attachment, attachment.name);
        });

        await uploadAttachment({
          modelType: CODE_SETTINGS.modelTypes.Item,
          modelId: id as string,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
      toast.success("Inventory updated successfully");
      router.back();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

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
          <Button disabled={isLoading || isUploadingAttachment} type="submit">
            {(isLoading || isUploadingAttachment) && (
              <Icon name="LoaderCircle" className="animate-spin h-4 w-4 mr-2" />
            )}
            {isLoading || isUploadingAttachment
              ? "Submitting..."
              : "Save Changes"}
          </Button>
        </div>
      </form>
    </>
  );
}

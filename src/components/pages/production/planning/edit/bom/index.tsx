"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse, routes } from "@/lib";
import {
  useLazyGetApiV1ProductByProductIdBomQuery,
  usePostApiV1BomMutation,
  usePutApiV1ProductByProductIdBomArchiveMutation,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import StepWrapper from "@/shared/wrapper";

import Create from "./create";
import TableForData from "./table";
import { BomFormData, BomFormValidator, BomRequestDto } from "./types";

const BOM = () => {
  const { id } = useParams();
  const productId = id as string;
  const router = useRouter();

  const [loadBom] = useLazyGetApiV1ProductByProductIdBomQuery();
  const [saveBom, { isLoading }] = usePostApiV1BomMutation();
  const [archiveBom, { isLoading: archiveLoading }] =
    usePutApiV1ProductByProductIdBomArchiveMutation();

  // Main form with useFieldArray
  const form = useForm<BomFormData>({
    resolver: BomFormValidator,
    defaultValues: {
      items: [],
    },
  });

  const { control, handleSubmit, setValue, watch } = form;

  const { append, remove, update } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");

  useEffect(() => {
    if (productId) {
      handleLoadBom(productId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleLoadBom = async (productId: string) => {
    try {
      const bomResponse = await loadBom({
        productId,
        module: AuditModules.production.name,
        subModule: AuditModules.production.bom,
      }).unwrap();

      if (bomResponse?.billOfMaterial?.items) {
        const defaultBillOfMaterials = bomResponse.billOfMaterial.items.map(
          (bom, idx) => ({
            ...bom,
            order: idx + 1,
            materialId: {
              label: bom.material?.name as string,
              value: bom.material?.id as string,
            },
            materialTypeId: {
              label: bom.materialType?.name as string,
              value: bom.materialType?.id as string,
            },
            baseUoMId: {
              label: bom.baseUoM?.symbol as string,
              value: bom.baseUoM?.id as string,
            },
          }),
        ) as BomRequestDto[];

        setValue("items", defaultBillOfMaterials);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (data: BomFormData) => {
    try {
      if (!data.items.length) {
        toast.error("Please add BOM items");
        return;
      }

      await saveBom({
        module: AuditModules.production.name,
        subModule: AuditModules.production.bom,
        createBillOfMaterialRequest: {
          productId,
          items: data.items.map((item, index) => ({
            materialId: item.materialId.value,
            materialTypeId: item.materialTypeId.value,
            baseUoMId: item.baseUoMId.value,
            baseQuantity: item.baseQuantity,
            casNumber: item.casNumber,
            function: item.function,
            grade: item.grade,
            isSubstitutable: item.isSubstitutable,
            order: index + 1,
          })),
        },
      }).unwrap();

      toast.success("BOM Saved Successfully");
      handleLoadBom(productId);
      router.push(routes.editPlanningPackaging());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const handleArchiveBom = async () => {
    try {
      await archiveBom({
        productId: productId as string,
        module: AuditModules.production.name,
        subModule: AuditModules.production.bom,
      }).unwrap();
      toast.success("BOM Archived");
      setValue("items", []);
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const handleAddItem = (newItem: BomRequestDto) => {
    // Check for duplicates
    const isDuplicate = watchedItems.some(
      (item) => item.materialId?.value === newItem.materialId?.value,
    );

    if (isDuplicate) {
      toast.error("This material is already added to the BOM");
      return false;
    }

    append({
      ...newItem,
      order: watchedItems.length + 1,
    });

    return true;
  };

  const handleUpdateItem = (index: number, updatedItem: BomRequestDto) => {
    // Check for duplicates (excluding current item)
    const isDuplicate = watchedItems.some(
      (item, idx) =>
        idx !== index &&
        item.materialId?.value === updatedItem.materialId?.value,
    );

    if (isDuplicate) {
      toast.error("This material is already added to the BOM");
      return false;
    }

    update(index, updatedItem);
    return true;
  };

  const handleRemoveItem = (index: number) => {
    remove(index);
    // Update order for remaining items
    const updatedItems = watchedItems
      .filter((_, idx) => idx !== index)
      .map((item, idx) => ({ ...item, order: idx + 1 }));

    setValue("items", updatedItems);
  };

  return (
    <div className="relative">
      <div className="absolute right-0 -mt-10">
        <div className="flex justify-end gap-4">
          <Link
            href={routes.editPlanningInfo()}
            className="underline hover:text-primary-hover"
          >
            Edit Info
          </Link>
          <Link
            href={routes.editPlanningPackaging()}
            className="underline hover:text-primary-hover"
          >
            Edit Packaging
          </Link>
          <Link
            href={routes.editPlanningProcedure()}
            className="underline hover:text-primary-hover"
          >
            Edit Procedure
          </Link>
          <Link
            href={routes.editPackingOrder()}
            className="underline hover:text-primary-hover"
          >
            Packing Order Preparation
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleSave)}>
        <StepWrapper className="w-full pb-3">
          <div className="flex w-full justify-between">
            <PageTitle title="BOM List" />
            <div className="flex gap-2">
              <Button
                onClick={handleArchiveBom}
                type="button"
                variant="outline"
                className="flex items-center gap-2"
              >
                {archiveLoading ? (
                  <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon name="Recycle" className="h-4 w-4" />
                )}
                <span>Archive BOM</span>
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon name="Save" className="h-4 w-4" />
                )}
                <span>Save Changes</span>
              </Button>
              <Create onAddItem={handleAddItem} existingItems={watchedItems} />
            </div>
          </div>

          <div className="w-full py-6">
            <TableForData
              items={watchedItems}
              onUpdateItem={handleUpdateItem}
              onRemoveItem={handleRemoveItem}
              existingItems={watchedItems}
            />
          </div>
        </StepWrapper>
      </form>
    </div>
  );
};

export default BOM;

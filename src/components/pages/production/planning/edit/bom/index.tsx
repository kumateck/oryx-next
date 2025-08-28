"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Button, Icon } from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse, routes } from "@/lib";
import {
  useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery,
  useLazyGetApiV1ProductByProductIdBomQuery,
  usePostApiV1BomMutation,
  usePutApiV1ProductByProductIdBomArchiveMutation,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import StepWrapper from "@/shared/wrapper";

import Create from "./create";

import { BomFormData, BomFormValidator, BomRequestDto } from "./types";
import { MovableDatatable } from "@/shared/datatable/movable";
import { getColumns } from "./columns";

const BOM = () => {
  const { id } = useParams();
  const productId = id as string;
  const router = useRouter();

  const [loadBom] = useLazyGetApiV1ProductByProductIdBomQuery();
  const [loadSpec] = useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery();
  const [saveBom, { isLoading }] = usePostApiV1BomMutation();
  const [archiveBom, { isLoading: archiveLoading }] =
    usePutApiV1ProductByProductIdBomArchiveMutation();
  const [isOpen, setIsOpen] = useState(false);

  // Main form with useFieldArray
  const form = useForm<BomFormData>({
    resolver: BomFormValidator,
    defaultValues: {
      items: [],
    },
  });

  const { control, handleSubmit, setValue, watch, getValues } = form;

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

  // console.log(watchedItems, "watchedItems");
  const handleLoadBom = async (productId: string) => {
    try {
      const bomResponse = await loadBom({ productId }).unwrap();

      if (bomResponse?.billOfMaterial?.items) {
        const defaultBillOfMaterials = await Promise.all(
          bomResponse.billOfMaterial.items.map(async (bom, idx) => {
            const specResponse = await loadSpec({
              id: bom.material?.id as string,
            }).unwrap();
            const spec = specResponse?.specificationNumber;
            return {
              ...bom,
              // Ensure each item has an id for the draggable table
              id: bom.id ?? uuidv4(), // fallback in case bom.id is missing
              rowId: uuidv4(),
              order: idx + 1,
              code: bom.material?.code,
              materialId: {
                label: bom.material?.name ?? "",
                value: bom.material?.id ?? "",
              },
              materialTypeId: {
                label: bom.materialType?.name ?? "",
                value: bom.materialType?.id ?? "",
              },
              baseUoMId: {
                label: bom.baseUoM?.symbol ?? "",
                value: bom.baseUoM?.id ?? "",
              },
              // If you need specResponse merged in, include it here
              spec,
            } as BomRequestDto;
          }),
        );

        setValue("items", defaultBillOfMaterials);
      }
    } catch (error) {
      console.error("Error loading BOM:", error);
    }
  };

  const handleSave = async () => {
    const data = (await getValues()) as BomFormData;
    try {
      if (!data.items.length) {
        toast.error("Please add at least one item to the BOM");
        return;
      }

      await saveBom({
        module: AuditModules.production.name,
        subModule: AuditModules.production.bom,
        createBillOfMaterialRequest: {
          productId,
          items: data.items.map((item) => ({
            materialId: item.materialId.value,
            materialTypeId: item.materialTypeId.value,
            baseUoMId: item.baseUoMId.value,
            baseQuantity: item.baseQuantity,
            grade: item.grade,
            isSubstitutable: item.isSubstitutable,
            order: item.order,
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

    // Generate a unique ID for the new item
    const newItemWithId = {
      ...newItem,
      id: `item-${Date.now()}-${Math.random()}`,
      // order: watchedItems.length + 1,
    };

    append(newItemWithId);
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

  // Handle reordering from the draggable table
  const handleDataReorder = (reorderedData: BomRequestDto[]) => {
    // Update the order property for each item
    const reorderedWithUpdatedOrder = reorderedData.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    // Replace the entire field array with the reordered data
    // replace(reorderedWithUpdatedOrder);
    form.setValue("items", reorderedWithUpdatedOrder);
    // Optional: Show feedback to user
    // toast.success("BOM items reordered successfully");
  };

  // // Define your table columns (you'll need to adapt this to your existing column definitions)
  // const columns = [
  //   // Add your column definitions here
  //   // Example:
  //   {
  //     accessorKey: "order",
  //     header: "Order",
  //   },
  //   {
  //     accessorKey: "materialId.label",
  //     header: "Material",
  //   },
  //   {
  //     accessorKey: "materialTypeId.label",
  //     header: "Material Type",
  //   },
  //   {
  //     accessorKey: "baseQuantity",
  //     header: "Base Quantity",
  //   },
  //   {
  //     accessorKey: "baseUoMId.label",
  //     header: "UoM",
  //   },
  //   // Add more columns as needed
  //   // You can also add action columns for edit/delete buttons
  // ];

  return (
    <div className="relative">
      <div className="absolute right-0 -mt-10">
        <div className="flex justify-end gap-4">
          <Link
            href={routes.editPlanningInfo()}
            className="underline hover:text-primary-hover"
          >
            Info
          </Link>
          <Link
            href={routes.editPlanningPackaging()}
            className="underline hover:text-primary-hover"
          >
            Packaging
          </Link>
          <Link
            href={routes.editPlanningPackingStyle()}
            className="hover:text-primary-500 underline"
          >
            Packing Style
          </Link>
          <Link
            href={routes.editPlanningProcedure()}
            className="underline hover:text-primary-hover"
          >
            Procedure
          </Link>
          <Link
            href={routes.editPackingOrder()}
            className="underline hover:text-primary-hover"
          >
            Packing Order Preparation
          </Link>
        </div>
      </div>

      <StepWrapper className="w-full pb-3">
        <div className="flex w-full justify-between">
          <div>
            <PageTitle title="BOM List" />
            <p className="text-sm text-gray-600 mt-2">
              Don’t forget to save your changes before leaving this page.
            </p>
          </div>
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
              onClick={handleSubmit(handleSave)}
              type="button"
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
            <Button
              onClick={() => setIsOpen(true)}
              type="button"
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Icon name="Plus" className="h-4 w-4" />
              <span>Add New</span>
            </Button>
            {isOpen && (
              <Create
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
                onAddItem={handleAddItem}
                existingItems={watchedItems}
              />
            )}
          </div>
        </div>

        <div className="w-full py-6">
          <MovableDatatable
            data={watchedItems}
            columns={getColumns(
              handleUpdateItem,
              handleRemoveItem,
              watchedItems,
            )}
            onDataReorder={handleDataReorder}
          />
        </div>
      </StepWrapper>
    </div>
  );
};

export default BOM;

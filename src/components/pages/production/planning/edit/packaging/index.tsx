"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Button, Icon } from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse, routes } from "@/lib";
import {
  PostApiV1ProductByProductIdPackagesApiArg,
  useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery,
  useLazyGetApiV1ProductByProductIdPackagesQuery,
  usePostApiV1ProductByProductIdPackagesMutation,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import StepWrapper from "@/shared/wrapper";

import Create from "./create";

import {
  PackagingFormData,
  PackagingFormValidator,
  PackagingRequestDto,
} from "./types";
import { useFieldArray, useForm } from "react-hook-form";
import { getColumns } from "./columns";
import { ListsTable } from "@/shared/datatable";

const Packaging = () => {
  const { id } = useParams();
  const productId = id as string;
  const router = useRouter();
  const [loadPacking] = useLazyGetApiV1ProductByProductIdPackagesQuery();
  const [loadSpec] = useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery();
  const [savePackaging, { isLoading }] =
    usePostApiV1ProductByProductIdPackagesMutation();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<PackagingFormData>({
    resolver: PackagingFormValidator,
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
      handleLoadPacking(productId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleLoadPacking = async (productId: string) => {
    try {
      const response = await loadPacking({ productId }).unwrap();

      if (!response) return;

      const defaultPackaging = await Promise.all(
        response.map(async (p, idx) => {
          let spec: string | undefined;

          if (p.material?.id) {
            const specResponse = await loadSpec({
              id: p.material.id,
            }).unwrap();
            spec = specResponse?.specificationNumber as string;
          }

          return {
            ...p,
            // Ensure stable id for draggable list or table
            rowId: uuidv4(),
            idIndex: (idx + 1).toString(),
            materialId: p.material
              ? {
                  label: p.material.name,
                  value: p.material.id,
                }
              : undefined,
            directLinkMaterial: p.directLinkMaterial
              ? {
                  label: p.directLinkMaterial.name,
                  value: p.directLinkMaterial.id,
                }
              : undefined,
            spec, // include fetched spec number
            code: p.material?.code || "",
          } as PackagingRequestDto;
        }),
      );

      // setItemLists(defaultPackaging);
      setValue("items", defaultPackaging);
    } catch (error) {
      console.error("Error loading packing:", error);
    }
  };

  // const [itemLists, setItemLists] = useState<PackagingRequestDto[]>([]);

  const handleSave = async () => {
    const data = (await getValues()) as PackagingFormData;

    try {
      if (!data.items.length) {
        toast.error("Please add at least one item to the Packaging");
        return;
      }
      await savePackaging({
        module: AuditModules.production.name,
        subModule: AuditModules.production.packing,
        productId,
        body: data?.items?.map((item) => ({
          baseQuantity: item.baseQuantity,
          unitCapacity: item.unitCapacity,
          packingExcessMargin: item.packingExcessMargin,
          materialId: item.materialId.value,
          directLinkMaterialId: item.directLinkMaterial?.value,
        })),
      } satisfies PostApiV1ProductByProductIdPackagesApiArg).unwrap();
      toast.success("Packaging Saved");
      handleLoadPacking(productId);
      router.push(routes.editPlanningPackingStyle());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const handleAddItem = (newItem: PackagingRequestDto) => {
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
    };

    append(newItemWithId);
    return true;
  };

  const handleUpdateItem = (
    index: number,
    updatedItem: PackagingRequestDto,
  ) => {
    // Check for duplicates (excluding current item)
    const isDuplicate = watchedItems.some(
      (item, idx) =>
        idx !== index &&
        item.materialId?.value === updatedItem.materialId?.value,
    );

    if (isDuplicate) {
      toast.error("This Packing Item is already added to the List");
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

  if (!productId) {
    return <div>Please Save a Product Info</div>;
  }

  return (
    <div className="relative">
      <div className="absolute right-0 -mt-10">
        <div className="flex justify-end gap-4">
          <Link
            href={routes.editPlanningInfo()}
            className="hover:text-primary-500 underline"
          >
            Info
          </Link>
          <Link
            href={routes.editPlanningBom()}
            className="hover:text-primary-500 underline"
          >
            BOM
          </Link>
          <Link
            href={routes.editPlanningPackingStyle()}
            className="hover:text-primary-500 underline"
          >
            Packing Style
          </Link>
          <Link
            href={routes.editPlanningProcedure()}
            className="hover:text-primary-500 underline"
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
            <PageTitle title="Package List" />
            <p className="text-sm text-gray-600 mt-2">
              Don’t forget to save your changes before leaving this page.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSubmit(handleSave)}
              type="button"
              variant={"default"}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              ) : (
                <Icon name="Save" className="h-4 w-4" />
              )}
              <span>Save Changes</span>{" "}
            </Button>
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
              type="button"
              variant={"secondary"}
              className="flex items-center gap-2"
            >
              <Icon name="Plus" className="h-4 w-4" />
              <span>Add New</span>{" "}
            </Button>
          </div>
        </div>
        {isOpen && (
          <Create
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onAddItem={handleAddItem}
            existingItems={watchedItems}
          />
        )}

        <div className="w-full py-6">
          <ListsTable
            data={
              watchedItems?.map((item, idx) => {
                return {
                  ...item,
                  idIndex: (idx + 1).toString(),
                };
              }) || []
            }
            columns={getColumns(
              handleUpdateItem,
              handleRemoveItem,
              watchedItems,
            )}
          />
        </div>
      </StepWrapper>
    </div>
  );
};

export default Packaging;

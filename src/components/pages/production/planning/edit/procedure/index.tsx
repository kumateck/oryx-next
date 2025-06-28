"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Button, Icon } from "@/components/ui";
import {
  AuditModules,
  ErrorResponse,
  isErrorResponse,
  OperationAction,
  routes,
} from "@/lib";
import {
  CreateRouteRequest,
  useLazyGetApiV1ProductByProductIdRoutesQuery,
  usePostApiV1ProductByProductIdRoutesMutation,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import StepWrapper from "@/shared/wrapper";

import Create from "./create";

import {
  RoutingFormData,
  RoutingFormValidator,
  RoutingRequestDto,
} from "./types";
import { MovableDatatable } from "@/shared/datatable/movable";
import { getColumns } from "./columns";

const Routing = () => {
  const router = useRouter();
  const { id } = useParams();
  const productId = id as string;

  const [loadProcedure] = useLazyGetApiV1ProductByProductIdRoutesQuery();
  const [saveRouting, { isLoading }] =
    usePostApiV1ProductByProductIdRoutesMutation();

  // Main form with useFieldArray
  const form = useForm<RoutingFormData>({
    resolver: RoutingFormValidator,
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
      handleLoadProcedure(productId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // console.log(watchedItems, "watchedItems");
  const handleLoadProcedure = async (productId: string) => {
    try {
      const procedureResponse = await loadProcedure({
        productId,
      }).unwrap();
      const defaultRouting = procedureResponse?.map((r) => ({
        ...r,
        rowId: uuidv4(),
        resources: r.resources?.map((res) => {
          return {
            label: res.resource?.name as string,
            value: res.resource?.id as string,
          };
        }),
        operationId: {
          label: r.operation?.name as string,
          value: r.operation?.id as string,
        },
        workCenters: r.workCenters?.map((res) => {
          return {
            label: res.workCenter?.name as string,
            value: res.workCenter?.id as string,
          };
        }),
        responsibleRoles: r.responsibleRoles?.map((res) => {
          return {
            label: res?.role?.name as string,
            value: res?.role?.id as string,
          };
        }),
        responsibleUsers: r.responsibleUsers?.map((res) => {
          return {
            label: res?.user?.name as string,
            value: res.user?.id as string,
          };
        }),
      })) as RoutingRequestDto[];

      setValue("items", defaultRouting);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    const data = (await getValues()) as RoutingFormData;
    try {
      if (!data.items.length) {
        toast.error("Please add Routing items");
        return;
      }

      await saveRouting({
        module: AuditModules.production.name,
        subModule: AuditModules.production.procedure,
        productId,
        body: data.items?.map((item, idx) => ({
          estimatedTime: item.estimatedTime,
          order: idx + 1,
          operationId: item.operationId.value,
          resourceIds: item.resources?.map((item) => ({
            resourceId: item.value,
          })),
          responsibleUsers: item.personnels
            ?.filter((item) => item.userId.value)
            ?.map((item) => ({
              userId: item.userId.value,
              productAnalyticalRawDataId: item.productAnalyticalRawDataId.value,
              action: Number(item.action.value) as OperationAction,
            })),
          responsibleRoles: item.personnels
            ?.filter((item) => item.roleId.value)
            ?.map((item) => ({
              userId: item.roleId.value,
              productAnalyticalRawDataId: item.productAnalyticalRawDataId.value,
              action: Number(item.action.value) as OperationAction,
            })),
          workCenters: item.workCenters?.map((item) => ({
            workCenterId: item.value,
          })),
          // workCenterId: item.workCenterId.value,
        })) as CreateRouteRequest[],
      }).unwrap();

      toast.success("Procedure Saved Successfully");
      handleLoadProcedure(productId);
      router.push(routes.editPlanningPackaging());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const handleAddItem = (newItem: RoutingRequestDto) => {
    // Check for duplicates
    const isDuplicate = watchedItems.some(
      (item) => item.operationId?.value === newItem.operationId?.value,
    );

    if (isDuplicate) {
      toast.error("This operation is already added to the Routing");
      return false;
    }

    // Generate a unique ID for the new item
    const newItemWithId = {
      ...newItem,
      id: `item-${Date.now()}-${Math.random()}`,
      order: watchedItems.length + 1,
    };

    append(newItemWithId);
    return true;
  };

  const handleUpdateItem = (index: number, updatedItem: RoutingRequestDto) => {
    // Check for duplicates (excluding current item)
    const isDuplicate = watchedItems.some(
      (item, idx) =>
        idx !== index &&
        item.operationId?.value === updatedItem.operationId?.value,
    );

    if (isDuplicate) {
      toast.error("This operation is already added to the Routing");
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
  const handleDataReorder = (reorderedData: RoutingRequestDto[]) => {
    // Update the order property for each item
    const reorderedWithUpdatedOrder = reorderedData.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    // Replace the entire field array with the reordered data
    // replace(reorderedWithUpdatedOrder);
    form.setValue("items", reorderedWithUpdatedOrder);
    // Optional: Show feedback to user
    // toast.success("Routing items reordered successfully");
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="absolute right-0 -mt-10">
        <div className="flex justify-end gap-4">
          <Link
            href={routes.editPlanningInfo()}
            className="hover:text-primary-500 underline"
          >
            Edit Info
          </Link>
          <Link
            href={routes.editPlanningBom()}
            className="hover:text-primary-500 underline"
          >
            Edit BOM
          </Link>
          <Link
            href={routes.editPlanningPackaging()}
            className="hover:text-primary-500 underline"
          >
            Edit Packaging
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
          <PageTitle title="Procedure List" />
          <div className="flex gap-2">
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

export default Routing;

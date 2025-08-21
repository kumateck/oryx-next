"use client";

import { useFieldArray, useForm } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { cn, ErrorResponse, isErrorResponse, Option } from "@/lib";
import {
  InventoryPurchaseRequisitionDto,
  useLazyGetApiV1ItemsQuery,
  usePutApiV1ProcurementInventoryByIdMutation,
} from "@/lib/redux/api/openapi.generated";

import {
  CreatePurchaseRequisitionDto,
  CreatePurchaseRequisitionValidator,
} from "./types";
import PurchaseRequisitionForm from "./form";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: InventoryPurchaseRequisitionDto;
}

const Edit = ({ isOpen, onClose, details }: Props) => {
  const [updatePurchaseRequisition, { isLoading: updating }] =
    usePutApiV1ProcurementInventoryByIdMutation();
  const dispatch = useDispatch();
  const [loadItems, { data: items, isLoading: loadingItems }] =
    useLazyGetApiV1ItemsQuery();
  const {
    register,
    control,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm<CreatePurchaseRequisitionDto>({
    resolver: CreatePurchaseRequisitionValidator,
    mode: "all",
    defaultValues: {
      code: details.code as string,
      deliveryDate: new Date(details.expectedDeliveryDate ?? ""),
      remarks: details.remarks ?? "",
      items: details?.items?.map((item) => ({
        itemId: { label: item.item?.name ?? "", value: item.item?.id ?? "" },
        orderQuantity: item.quantity,
      })),
    },
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: "items",
  });

  const loadDataOrSearch = async (searchQuery: string, page: number) => {
    const res = await loadItems({
      searchQuery,
      page,
    }).unwrap();
    const response = {
      options: res?.data?.map((item) => ({
        label: item.name,
        value: item.id,
      })) as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };

  const onSubmit = async (data: CreatePurchaseRequisitionDto) => {
    try {
      await updatePurchaseRequisition({
        id: details.id as string,
        createInventoryPurchaseRequisition: {
          code: data.code,
          expectedDeliveryDate: data.deliveryDate.toTimeString(),
          remarks: data.remarks,
          items: data.items.map((item) => ({
            itemId: item.itemId.value,
            quantity: item.orderQuantity,
          })),
        },
      }).unwrap();
      dispatch(commonActions.setTriggerReload());
      toast.success("Purchase requisition updated successfully.");
      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const handleItemsChange = (index: number, selecte: { value: string }) => {
    const item = items?.data?.filter((item) => item.id === selecte.value)[0];
    if (item) {
      setValue(
        `items.${index}.stockQuantity`,
        item.availableQuantity as number,
      );
      setValue(`items.${index}.itemCode`, item.code as string);
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Edit Purchase Requisition</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <PurchaseRequisitionForm
            fetcItems={loadDataOrSearch}
            isLoading={loadingItems}
            errors={errors}
            handleItemsChange={handleItemsChange}
            append={append}
            fields={fields}
            remove={remove}
            register={register}
            control={control}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={updating}
              type="submit"
              className="flex items-center gap-2"
            >
              <Icon
                name={updating ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": updating,
                })}
              />
              <span>Save</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;

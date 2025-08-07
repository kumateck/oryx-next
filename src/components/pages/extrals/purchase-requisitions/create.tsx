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
  useLazyGetApiV1ItemsQuery,
  usePostApiV1ProcurementInventoryMutation,
} from "@/lib/redux/api/openapi.generated";

import {
  CreatePurchaseRequisitionDto,
  CreatePurchaseRequisitionValidator,
} from "./types";
import PurchaseRequisitionForm from "./form";
import { toast } from "sonner";
import { useDispatch } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [createPurchaseRequisition, { isLoading: creating }] =
    usePostApiV1ProcurementInventoryMutation();
  const dispatch = useDispatch();
  const [loadItems, { isLoading: loadingItems }] = useLazyGetApiV1ItemsQuery();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePurchaseRequisitionDto>({
    resolver: CreatePurchaseRequisitionValidator,
    mode: "all",
  });

  const { remove, append, fields } = useFieldArray({
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
      await createPurchaseRequisition({
        createInventoryPurchaseRequisition: {
          code: data.code,
          expectedDeliveryDate: data.deliveryDate?.toISOString(),
          remarks: data.remarks,
          items: data.items.map((item) => ({
            itemId: item.itemId.value,
            quantity: item.orderQuantity,
            // uoMId: item.uoMId,
          })),
        },
      }).unwrap();
      dispatch(commonActions.setTriggerReload());
      toast.success("Purchase requisition created successfully.");
      onClose();
    } catch (error) {
      console.log("Error creating purchase requisition:", error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Create Purchase Requisition</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <PurchaseRequisitionForm
            fetcItems={loadDataOrSearch}
            remove={remove}
            append={append}
            fields={fields}
            isLoading={loadingItems}
            errors={errors}
            register={register}
            control={control}
          />
          <DialogFooter>
            <DialogFooter className="justify-end gap-4 py-6">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={creating}
                type="submit"
                className="flex items-center gap-2"
              >
                <Icon
                  name={creating ? "LoaderCircle" : "Plus"}
                  className={cn("h-4 w-4", {
                    "animate-spin": creating,
                  })}
                />
                <span>Save</span>
              </Button>
            </DialogFooter>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

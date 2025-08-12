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
import { commonActions } from "@/lib/redux/slices/common";
import {
  ItemStockRequisitionDtoRead,
  useLazyGetApiV1DepartmentQuery,
  useLazyGetApiV1ItemsQuery,
  usePutApiV1ItemsStockRequisitionsByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import StockRequisition from "./form";
import { CreateStockRequisitionValidator, StockRequisitionDto } from "./types";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

interface VendorFormProps {
  isOpen: boolean;
  onClose: () => void;
  details: ItemStockRequisitionDtoRead;
}

const Edit = ({ isOpen, onClose, details }: VendorFormProps) => {
  const [updateStockRequisition, { isLoading: updating }] =
    usePutApiV1ItemsStockRequisitionsByIdMutation();
  const [loadDepartments, { isLoading: loadingDepartments }] =
    useLazyGetApiV1DepartmentQuery();
  const [loadItems, { isLoading: loadingItems }] = useLazyGetApiV1ItemsQuery();

  const dispatch = useDispatch();

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
  const loadDataOrSearchDepartments = async (
    searchQuery: string,
    page: number,
  ) => {
    const res = await loadDepartments({
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
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<StockRequisitionDto>({
    resolver: CreateStockRequisitionValidator,
    mode: "all",
    defaultValues: {
      number: details.number ?? "",
      requisitionDate: details.requisitionDate
        ? new Date(details.requisitionDate)
        : undefined,
      justification: details.justification ?? "",
      departmentId: {
        label: details.department?.name ?? "",
        value: details.department?.id,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data: StockRequisitionDto) => {
    try {
      await updateStockRequisition({
        id: details?.id as string,
        createItemStockRequisitionRequest: {
          requisitionDate: data.requisitionDate?.toISOString(),
          justification: data.justification,
          number: data.number,
          requestedById: details?.requestedBy?.id as string,
          departmentId: data.departmentId.value,
          stockItems: data.items.map((item) => ({
            itemId: item.value,
            quantityRequested: item.orderQuantity,
          })),
        },
      });
      dispatch(commonActions.setTriggerReload());
      toast.success("Stock requisition updated successfully");
      reset();
      onClose();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to edit stock requisition. Please try again.",
      );
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Edit Stock Requisition</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <StockRequisition
            fetchItems={loadDataOrSearch}
            fetchDepartments={loadDataOrSearchDepartments}
            loadingDepartments={loadingDepartments}
            errors={errors}
            register={register}
            isLoading={loadingItems}
            append={append}
            remove={remove}
            fields={fields}
            control={control}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button
              disabled={updating}
              type="button"
              variant="secondary"
              onClick={onClose}
            >
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

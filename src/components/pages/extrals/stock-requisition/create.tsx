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
  CreateItemStockRequisitionRequest,
  useLazyGetApiV1DepartmentQuery,
  useLazyGetApiV1ItemsQuery,
  usePostApiV1ItemsStockRequisitionsMutation,
} from "@/lib/redux/api/openapi.generated";

import { CreateStockRequisitionValidator, StockRequisitionDto } from "./types";
import StockRequisition from "./form";
import { toast } from "sonner";
import { useSelector } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

interface VendorFormProps {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: VendorFormProps) => {
  const [loadItems, { isLoading: loadingItems }] = useLazyGetApiV1ItemsQuery();
  const [loadDepartments, { data: items, isLoading: loadingDepartments }] =
    useLazyGetApiV1DepartmentQuery();
  const [createStockRequisition, { isLoading: creating }] =
    usePostApiV1ItemsStockRequisitionsMutation();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.persistedReducer.auth);
  const loadDataOrSearch = async (searchQuery: string, page: number) => {
    const res = await loadItems({
      searchQuery,
      page,
      store: 2,
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
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<StockRequisitionDto>({
    resolver: CreateStockRequisitionValidator,
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data: StockRequisitionDto) => {
    if (!currentUser || !currentUser.userId) return;
    try {
      const payload: CreateItemStockRequisitionRequest = {
        requisitionDate: data.requisitionDate?.toISOString(),
        number: data.number,
        justification: data.justification,
        requestedById: currentUser.userId,
        departmentId: data.departmentId.value,
        stockItems: data.items.map((item) => ({
          itemId: item.itemId.value,
          quantityRequested: item.quantity,
        })),
      };
      await createStockRequisition({
        createItemStockRequisitionRequest: payload,
      }).unwrap();
      dispatch(commonActions.setTriggerReload());
      toast.success("Stock requisition created successfully");
      onClose();
      reset();
    } catch (error) {
      console.error("Error creating stock requisition:", error);
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to create stock requisition. Please try again.",
      );
    }
  };

  const handleProductChange = (index: number, selected: { value: string }) => {
    const product = items?.data?.find((p) => p.id === selected.value);
    if (product) {
      setValue(`items.${index}.itemCode`, product?.code ?? "");
    }
  };

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Create Stock Requisition</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <StockRequisition
            fetchItems={loadDataOrSearch}
            fetchDepartments={loadDataOrSearchDepartments}
            isLoading={loadingItems}
            loadingDepartments={loadingDepartments}
            errors={errors}
            register={register}
            handleProductChange={handleProductChange}
            append={append}
            remove={remove}
            fields={fields}
            control={control}
          />
          <DialogFooter>
            <DialogFooter className="justify-end gap-4 py-6">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                // disabled={isLoading}
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

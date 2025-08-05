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
import { cn, Option } from "@/lib";
import { useLazyGetApiV1ItemsQuery } from "@/lib/redux/api/openapi.generated";
import StockRequisition from "./form";
import { CreateStockRequisitionValidator, StockRequisitionDto } from "./types";

interface VendorFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const Edit = ({ isOpen, onClose }: VendorFormProps) => {
  const [loadItems, { isLoading: loadingItems }] = useLazyGetApiV1ItemsQuery();
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
  const {
    register,
    control,
    formState: { errors },
    reset,
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
    console.log(data, "Venders form data");
    reset();
    onClose();
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
            errors={errors}
            register={register}
            isLoading={loadingItems}
            append={append}
            remove={remove}
            fields={fields}
            control={control}
          />
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
                name={!false ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": !true,
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

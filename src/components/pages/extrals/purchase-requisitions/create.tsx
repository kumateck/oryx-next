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

import { CreateVendorValidator, VendorRequestDto } from "./types";
import PurchaseRequisitionForm from "./form";

interface VendorFormProps {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: VendorFormProps) => {
  const [loadItems, { isLoading: loadingItems }] = useLazyGetApiV1ItemsQuery();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<VendorRequestDto>({
    resolver: CreateVendorValidator,
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

  const onSubmit = async (data: VendorRequestDto) => {
    console.log(data, "Venders form data");
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
                // disabled={isLoading}
                type="submit"
                className="flex items-center gap-2"
              >
                <Icon
                  name={!true ? "LoaderCircle" : "Plus"}
                  className={cn("h-4 w-4", {
                    "animate-spin": !true,
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

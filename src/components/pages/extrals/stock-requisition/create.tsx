"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { cn, COLLECTION_TYPES, Option } from "@/lib";
import {
  PostApiV1CollectionApiArg,
  usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

import { CreateVendorValidator, VendorRequestDto } from "./types";
import PurchaseRequisitionForm from "./form";

interface VendorFormProps {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: VendorFormProps) => {
  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.Country, COLLECTION_TYPES.Currency],
    } as PostApiV1CollectionApiArg).unwrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<VendorRequestDto>({
    resolver: CreateVendorValidator,
    mode: "all",
  });

  const countryOptions = collectionResponse?.[COLLECTION_TYPES.Country]?.map(
    (uom) => ({
      label: uom.name,
      value: uom.id,
    }),
  ) as Option[];

  const onSubmit = async (data: VendorRequestDto) => {
    console.log(data, "Venders form data");
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Edit Vendor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <PurchaseRequisitionForm
            inventoryItemsOptions={countryOptions}
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

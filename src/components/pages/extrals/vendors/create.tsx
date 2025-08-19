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
import {
  cn,
  COLLECTION_TYPES,
  ErrorResponse,
  InventoryType,
  isErrorResponse,
  Option,
} from "@/lib";
import {
  PostApiV1CollectionApiArg,
  useLazyGetApiV1ItemsQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1VendorsMutation,
} from "@/lib/redux/api/openapi.generated";

import { CreateVendorValidator, VendorRequestDto } from "./types";
import VendorForm from "./form";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { toast } from "sonner";

interface VendorFormProps {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: VendorFormProps) => {
  const [createVendor, { isLoading }] = usePostApiV1VendorsMutation();
  const [loadItems, { data: itemsData }] = useLazyGetApiV1ItemsQuery({});

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.Country, COLLECTION_TYPES.Currency],
    } as PostApiV1CollectionApiArg).unwrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    register,
    control,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<VendorRequestDto>({
    resolver: CreateVendorValidator,
    mode: "all",
  });
  const storeType = watch("storyType");

  useEffect(() => {
    if (!storeType) return;
    loadItems({
      page: 1,
      pageSize: 1000,
      store:
        (Number(storeType?.value) as unknown as InventoryType) ??
        InventoryType["IT Store"],
    });
  }, [loadItems, storeType]);

  const countryOptions = collectionResponse?.[COLLECTION_TYPES.Country]?.map(
    (uom) => ({
      label: uom.name,
      value: uom.id,
    }),
  ) as Option[];
  const currencyOptions = collectionResponse?.[COLLECTION_TYPES.Currency]?.map(
    (uom) => ({
      label: uom.name,
      value: uom.id,
    }),
  ) as Option[];
  // Map services data to options
  const items = itemsData?.data || [];
  const itemsOptions = items.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  const onSubmit = async (data: VendorRequestDto) => {
    try {
      await createVendor({
        createVendorRequest: {
          address: data.address,
          email: data.email,
          countryId: data.country.value,
          currencyId: data.currency.value,
          name: data.name,
          itemIds: data.services.map((service) => service.value),
          phone: data.contactNumber,
        },
      }).unwrap();
      dispatch(commonActions.setTriggerReload());
      toast.success("Vendor created successfully");
      onClose();
      reset();
    } catch (error) {
      console.log("errro creating vendor", error);
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Something went wrong. Try again.",
      );
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Create Vendor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <VendorForm
            countryOptions={countryOptions}
            errors={errors}
            currencyOptions={currencyOptions}
            itemsOptions={itemsOptions}
            register={register}
            control={control}
          />
          <DialogFooter>
            <DialogFooter className="justify-end gap-4 py-6">
              <Button
                disabled={isLoading}
                type="button"
                variant="secondary"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                type="submit"
                className="flex items-center gap-2"
              >
                <Icon
                  name={isLoading ? "LoaderCircle" : "Plus"}
                  className={cn("h-4 w-4", {
                    "animate-spin": isLoading,
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

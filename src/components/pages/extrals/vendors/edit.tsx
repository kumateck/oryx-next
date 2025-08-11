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
  isErrorResponse,
  Option,
} from "@/lib";
import {
  PostApiV1CollectionApiArg,
  useGetApiV1ServicesQuery,
  usePostApiV1CollectionMutation,
  usePutApiV1VendorsByIdMutation,
  VendorDto,
} from "@/lib/redux/api/openapi.generated";

import VendorForm from "./form";
import { CreateVendorValidator, VendorRequestDto } from "./types";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";

interface VendorFormProps {
  isOpen: boolean;
  onClose: () => void;
  detail: VendorDto;
}

const Edit = ({ isOpen, onClose, detail }: VendorFormProps) => {
  const [updateVendor, { isLoading }] = usePutApiV1VendorsByIdMutation();
  const { data: servicesData } = useGetApiV1ServicesQuery({
    page: 1,
    pageSize: 1000,
  });

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
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<VendorRequestDto>({
    resolver: CreateVendorValidator,
    mode: "all",
    defaultValues: {
      email: detail.email ?? "",
      name: detail.name ?? "",
      address: detail.address as string,
      country: {
        value: detail.country?.id ?? "",
        label: detail.country?.name ?? "",
      },
      currency: {
        value: detail.currency?.id ?? "",
        label: detail.currency?.name ?? "",
      },
      contactNumber: detail?.phone ?? "",
      services: detail?.items?.map((item) => ({
        value: item?.id ?? "",
        label: item?.name ?? "",
      })),
    },
  });

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

  const services = servicesData?.data || [];
  const servicesOptions = services.map((service) => ({
    label: service.name,
    value: service.id,
  })) as Option[];

  const onSubmit = async (data: VendorRequestDto) => {
    try {
      await updateVendor({
        id: detail?.id as string,
        createVendorRequest: {
          address: data.address,
          email: data.email,
          countryId: data.country.value,
          currencyId: data.currency.value,
          name: data.name,
          itemIds: data.services.map((service) => service.value),
          phone: data.contactPerson,
        },
      }).unwrap();
      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
      toast.success("Vender updated successfully");
    } catch (error) {
      console.log(error, "thhis is error from edit vendor page");
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
          <DialogTitle>Edit Vendor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <VendorForm
            countryOptions={countryOptions}
            errors={errors}
            currencyOptions={currencyOptions}
            servicesOptions={servicesOptions}
            register={register}
            control={control}
          />
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;

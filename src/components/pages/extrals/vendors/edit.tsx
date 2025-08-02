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
  useGetApiV1ServicesQuery,
  usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

import VendorForm from "./form";
import { CreateVendorValidator, VendorRequestDto } from "./types";

interface VendorFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const Edit = ({ isOpen, onClose }: VendorFormProps) => {
  const { data: servicesData } = useGetApiV1ServicesQuery({
    page: 1,
    pageSize: 1000,
  });

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
    reset,
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
    console.log(data, "Venders form data");
    reset();
    onClose();
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
            servicesOptions={servicesOptions}
            register={register}
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

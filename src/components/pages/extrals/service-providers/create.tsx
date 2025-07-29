"use client";
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
  CreateServicesProviderDto,
  CreateServicesProviderValidator,
} from "./types";
import { useForm } from "react-hook-form";
import { ServiceForm } from "./form";
import {
  CreateServiceProviderRequest,
  PostApiV1CollectionApiArg,
  useGetApiV1ServicesQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1ServiceProvidersMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  AuditModules,
  cn,
  COLLECTION_TYPES,
  ErrorResponse,
  isErrorResponse,
  Option,
} from "@/lib";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

interface CreateServiceProps {
  isOpen: boolean;
  onClose: () => void;
}
export function CreateService({ isOpen, onClose }: CreateServiceProps) {
  const [createServiceProvider, { isLoading }] =
    usePostApiV1ServiceProvidersMutation();
  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();
  const { data: serviceData } = useGetApiV1ServicesQuery({
    page: 1,
    pageSize: 1000,
  });

  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateServicesProviderDto>({
    resolver: CreateServicesProviderValidator,
  });
  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.Country, COLLECTION_TYPES.Currency],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const serviceOptions = serviceData?.data?.map((service) => ({
    label: service.name,
    value: service.id,
  })) as Option[];

  const onSubmit = async (data: CreateServicesProviderDto) => {
    const payload: CreateServiceProviderRequest = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      countryId: data.countryId.value,
      currencyId: data.currencyId.value,
      serviceIds: data.serviceIds.map((service) => service.value),
    };
    try {
      await createServiceProvider({
        createServiceProviderRequest: payload,
        module: AuditModules.extral.name,
        subModule: AuditModules.extral.serviceProviders,
      }).unwrap();

      dispatch(commonActions.setTriggerReload());
      onClose();
      toast.success("Service provider created successfully.");
      reset();
    } catch (error) {
      console.log("Error creating Service provider:", error);
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to create service provider. Please try again.",
      );
    }
  };
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Service Provider</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <ServiceForm
            countryOptions={countryOptions}
            currencyOptions={currencyOptions}
            serviceOptions={serviceOptions}
            errors={errors}
            register={register}
            control={control}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
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
}

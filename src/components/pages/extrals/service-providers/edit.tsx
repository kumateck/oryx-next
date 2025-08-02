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
import {
  CreateServiceProviderRequest,
  PostApiV1CollectionApiArg,
  ServiceProviderDto,
  useGetApiV1ServicesQuery,
  usePostApiV1CollectionMutation,
  usePutApiV1ServiceProvidersByIdMutation,
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
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { ServiceForm } from "./form";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: ServiceProviderDto;
}

export function Edit({ isOpen, onClose, details }: Props) {
  const [updateServiceProvider, { isLoading }] =
    usePutApiV1ServiceProvidersByIdMutation();
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
    mode: "all",
    defaultValues: {
      name: details?.name as string,
      address: details?.address as string,
      phone: details?.phone as string,
      email: details?.email as string,
      countryId: {
        value: details?.country?.id,
        label: details?.country?.name ?? "",
      },
      currencyId: {
        value: details?.currency?.id,
        label: details?.currency?.name ?? "",
      },
    },
  });

  console.log("details", details);

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
    try {
      const payload: CreateServiceProviderRequest = {
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email,
        countryId: data.countryId.value,
        currencyId: data.currencyId.value,
        serviceIds: data.serviceIds.map((service) => service.value),
      };
      // Create the product analytical raw data
      await updateServiceProvider({
        id: details.id as string,
        module: AuditModules.extral.name,
        subModule: AuditModules.extral.serviceProviders,
        createServiceProviderRequest: payload,
      }).unwrap();

      toast.success("Service provider updated successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to update Service provider. Please try again.",
      );
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Service Provider</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <ServiceForm
            countryOptions={countryOptions}
            serviceOptions={serviceOptions}
            currencyOptions={currencyOptions}
            errors={errors}
            register={register}
            control={control}
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mr-2"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Icon
                name={isLoading ? "Loader" : "Plus"}
                className={cn("mr-2", { isLoading: "animate-spin" })}
              />
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

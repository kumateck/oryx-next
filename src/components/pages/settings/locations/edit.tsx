import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { Option } from "@/lib";
import {
  CreateWarehouseLocationRequest,
  WarehouseLocationDto,
  useLazyGetApiV1WarehouseQuery,
  usePutApiV1WarehouseLocationByLocationIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import LocationForm from "./form";
import {
  CreateLocationValidator,
  LocationRequestDto,
  WAREtYPES,
} from "./types";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: WarehouseLocationDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [editLocation, { isLoading }] =
    usePutApiV1WarehouseLocationByLocationIdMutation();
  const dispatch = useDispatch();

  const defaultWarehouse = {
    label: details?.warehouse?.name as string,
    value: details?.warehouse?.id as string,
  };

  const {
    control,
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm<LocationRequestDto>({
    resolver: CreateLocationValidator,
    mode: "all",
    defaultValues: {
      warehouseId: defaultWarehouse,
      description: details.description as string,
      isEdit: defaultWarehouse.label,
      name: { label: details.name as string, value: details.name as string },
      floorName: {
        label: details.floorName as string,
        value: details.floorName as string,
      },
    },
  });

  const onSubmit = async (data: LocationRequestDto) => {
    try {
      const payload = {
        ...data,
        floorName: data?.floorName?.value,
        name: data?.name?.value,
      } satisfies CreateWarehouseLocationRequest;

      await editLocation({
        locationId: details.id as string,
        createWarehouseLocationRequest: payload,
      });
      toast.success("Location updated successfully");
      dispatch(commonActions.setTriggerReload());
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  const warehouseId = useWatch<LocationRequestDto>({
    name: "warehouseId",
    control,
  }) as Option;
  const [
    loadWarehouse,
    { isLoading: isLoadingWarehouse, isFetching: isFetchingWarehouse },
  ] = useLazyGetApiV1WarehouseQuery();
  const [warehouseTypes, setWarehouseTypes] = useState<WAREtYPES[]>([]);

  const loadDataOrSearch = async (searchQuery: string, page: number) => {
    const res = await loadWarehouse({
      searchQuery,
      page,
    }).unwrap();
    const options = res?.data?.map((item) => ({
      label: item.name,
      value: item.id,
    })) as Option[];

    const wareTypes = res?.data?.map((item) => ({
      id: item.id as string,
      name: item.name as string,
      type: item.type as number,
    })) as WAREtYPES[];
    setWarehouseTypes(wareTypes);
    const response = {
      options,
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Location</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <LocationForm
            control={control}
            errors={errors}
            register={register}
            isEdit={true}
            fetchOptions={loadDataOrSearch}
            isLoading={isLoadingWarehouse || isFetchingWarehouse}
            warehouseType={
              warehouseTypes?.find((item) => item.id === warehouseId?.value)
                ?.type
            }
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Update Location</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;

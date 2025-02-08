// import { useForm } from "react-hook-form";
import { useForm } from "react-hook-form";
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
import { COLLECTION_TYPES, Option } from "@/lib";
import {
  CreateWarehouseLocationRequest,
  useGetApiV1CollectionByItemTypeQuery,
  useLazyGetApiV1WarehouseLocationQuery,
  usePostApiV1WarehouseByWarehouseIdLocationMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import LocationForm from "./form";
import { CreateLocationValidator, LocationRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [loadWarehouseLocations] = useLazyGetApiV1WarehouseLocationQuery();
  const [createWarehouseLocation, { isLoading }] =
    usePostApiV1WarehouseByWarehouseIdLocationMutation();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<LocationRequestDto>({
    resolver: CreateLocationValidator,
    mode: "all",
  });

  const { data } = useGetApiV1CollectionByItemTypeQuery({
    itemType: COLLECTION_TYPES.Warehouse,
  });

  const warehouseOptions = data?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  const onSubmit = async (data: LocationRequestDto) => {
    try {
      const payload = {
        ...data,
      } satisfies CreateWarehouseLocationRequest;
      await createWarehouseLocation({
        createWarehouseLocationRequest: payload,
        warehouseId: data?.warehouseId?.value,
      });
      toast.success("Location created successfully");
      loadWarehouseLocations({
        page: 1,
        pageSize: 10,
      });
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <LocationForm
            register={register}
            control={control}
            errors={errors}
            warehouseOptions={warehouseOptions}
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
              <span>Add Location</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

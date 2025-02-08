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
  CreateWarehouseLocationRackRequest,
  WarehouseLocationRackDto,
  useGetApiV1CollectionByItemTypeQuery,
  useLazyGetApiV1WarehouseRackQuery,
  usePutApiV1WarehouseRackByRackIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import RackForm from "./form";
import { CreateRackValidator, RackRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: WarehouseLocationRackDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [loadLocationRack] = useLazyGetApiV1WarehouseRackQuery();

  const [editRack, { isLoading }] = usePutApiV1WarehouseRackByRackIdMutation();

  const { data } = useGetApiV1CollectionByItemTypeQuery({
    itemType: COLLECTION_TYPES.WarehouseLocation,
  });

  const locationOptions = data?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  const defaultLocation = {
    label: details?.warehouseLocation?.name as string,
    value: details?.warehouseLocation?.id as string,
  };

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RackRequestDto>({
    resolver: CreateRackValidator,
    mode: "all",
    defaultValues: {
      name: details.name as string,
      description: details.description as string,
      locationId: defaultLocation,
    },
  });

  const onSubmit = async (data: RackRequestDto) => {
    try {
      const payload = {
        ...data,
      } satisfies CreateWarehouseLocationRackRequest;
      await editRack({
        rackId: details.id as string,
        createWarehouseLocationRackRequest: payload,
      });
      toast.success("Rack updated successfully");
      loadLocationRack({
        page: 1,
        pageSize: 10,
      });
      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Rack</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <RackForm
            register={register}
            control={control}
            errors={errors}
            locationOptions={locationOptions}
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
              <span>Update Rack</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;

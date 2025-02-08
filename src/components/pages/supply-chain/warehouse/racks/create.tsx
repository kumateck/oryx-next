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
  useGetApiV1CollectionByItemTypeQuery,
  useLazyGetApiV1WarehouseRackQuery,
  usePostApiV1WarehouseByLocationIdRackMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import RackForm from "./form";
import { CreateRackValidator, RackRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [loadWarehouseLocationRacks] = useLazyGetApiV1WarehouseRackQuery();
  const [createWarehouseLocationRack, { isLoading }] =
    usePostApiV1WarehouseByLocationIdRackMutation();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RackRequestDto>({
    resolver: CreateRackValidator,
    mode: "all",
  });

  const { data } = useGetApiV1CollectionByItemTypeQuery({
    itemType: COLLECTION_TYPES.WarehouseLocation,
  });

  const locationOptions = data?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  const onSubmit = async (data: RackRequestDto) => {
    try {
      const payload = {
        ...data,
      } satisfies CreateWarehouseLocationRackRequest;
      await createWarehouseLocationRack({
        locationId: data?.locationId.value,
        createWarehouseLocationRackRequest: payload,
      });
      toast.success("Rack created successfully");
      loadWarehouseLocationRacks({
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
          <DialogTitle>Add Rack</DialogTitle>
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
              <span>Add Rack</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

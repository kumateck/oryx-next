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
import {
  CreateWarehouseRequest,
  WarehouseDto,
  WarehouseType,
  useLazyGetApiV1WarehouseQuery,
  usePutApiV1WarehouseByWarehouseIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import WarehousesForm from "./form";
import { CreateWarehouseValidator, WarehouseRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: WarehouseDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [loadWarehouses] = useLazyGetApiV1WarehouseQuery();

  const [createWarehouse, { isLoading }] =
    usePutApiV1WarehouseByWarehouseIdMutation();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<WarehouseRequestDto>({
    resolver: CreateWarehouseValidator,
    mode: "all",
    defaultValues: {
      name: details.name as string,
      description: details.description as string,
      type: details?.type?.toString() as unknown as WarehouseType,
    },
  });

  const onSubmit = async (data: WarehouseRequestDto) => {
    try {
      const payload = {
        ...data,
        type: data.type,
      } satisfies CreateWarehouseRequest;
      await createWarehouse({
        warehouseId: details.id as string,
        createWarehouseRequest: payload,
      });
      toast.success("Warehouse updated successfully");
      loadWarehouses({
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
          <DialogTitle>Edit Warehouse</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <WarehousesForm
            register={register}
            errors={errors}
            control={control}
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
              <span>Update Warehouse</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;

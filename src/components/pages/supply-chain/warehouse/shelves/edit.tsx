// import { useForm } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { COLLECTION_TYPES, InputTypes, Option } from "@/lib";
import {
  CreateWarehouseLocationShelfRequest,
  WarehouseLocationShelfDto,
  useGetApiV1CollectionByItemTypeQuery,
  useLazyGetApiV1WarehouseRackQuery,
  usePutApiV1WarehouseShelfByShelfIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateShelfValidator, ShelfRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: WarehouseLocationShelfDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [loadLocationRack] = useLazyGetApiV1WarehouseRackQuery();

  const [editRack, { isLoading }] =
    usePutApiV1WarehouseShelfByShelfIdMutation();

  const { data } = useGetApiV1CollectionByItemTypeQuery({
    itemType: COLLECTION_TYPES.WarehouseLocationRack,
  });

  const rackOptions = data?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  const defaultRack = {
    label: details?.warehouseLocationRack?.name as string,
    value: details?.warehouseLocationRack?.id as string,
  };

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ShelfRequestDto>({
    resolver: CreateShelfValidator,
    mode: "all",
    defaultValues: {
      name: details.name as string,
      description: details.description as string,
      rackId: defaultRack,
    },
  });

  const onSubmit = async (data: ShelfRequestDto) => {
    try {
      const payload = {
        ...data,
      } satisfies CreateWarehouseLocationShelfRequest;
      await editRack({
        shelfId: details.id as string,
        createWarehouseLocationShelfRequest: payload,
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
          <FormWizard
            config={[
              // {
              //   register: { ...register("code") },
              //   label: "Shelf Code",
              //   readOnly: true,
              //   required: true,
              //   description: (
              //     <span className="text-sm text-neutral-500">
              //       You can’t change the shelf code
              //     </span>
              //   ),
              //   placeholder: "Code will be generated",
              //   type: InputTypes.TEXT,
              //   errors: {
              //     message: errors.code?.message,
              //     error: !!errors.code,
              //   },
              // },
              {
                register: { ...register("name") },
                label: "Shelf Name",
                required: true,
                placeholder: "Enter Shelf Name",
                type: InputTypes.TEXT,

                errors: {
                  message: errors.name?.message,
                  error: !!errors.name,
                },
              },
              {
                label: "Rack",
                control,
                type: InputTypes.SELECT,
                name: "rackId",
                required: true,

                options: rackOptions,
                errors: {
                  message: errors.rackId?.message,
                  error: !!errors.rackId,
                },
              },
              {
                register: { ...register("description") },
                label: "Description",
                required: true,
                placeholder: "Enter Description",
                type: InputTypes.TEXT,

                errors: {
                  message: errors.description?.message,
                  error: !!errors.description,
                },
              },
            ]}
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

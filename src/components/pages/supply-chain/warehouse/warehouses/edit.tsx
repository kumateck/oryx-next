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
import { InputTypes } from "@/lib";
import {
  CreateWarehouseRequest,
  WarehouseDto,
  WarehouseType,
  useLazyGetApiV1WarehouseQuery,
  usePutApiV1WarehouseByWarehouseIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

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
          <FormWizard
            config={[
              // {
              //   register: { ...register("code") },
              //   label: "Warehouse Code",
              //   readOnly: true,
              //   required: true,
              //   description: (
              //     <span className="text-sm text-neutral-500">
              //       You can’t change the warehouse code
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
                label: "Type",
                control,
                type: InputTypes.RADIO,
                name: `type`,
                required: true,
                disabled: true,
                options: ["Storage", "Production"].map((option) => ({
                  label: option,
                  value: option,
                })),
                errors: {
                  message: errors?.type?.message || "",
                  error: !!errors?.type?.type,
                },
              },
              {
                register: { ...register("name") },
                label: "Name",
                placeholder: "Enter Name",
                type: InputTypes.TEXT,

                errors: {
                  message: errors.name?.message,
                  error: !!errors.name,
                },
              },
              {
                register: { ...register("description") },
                label: "Description",
                placeholder: "Enter Description",
                type: InputTypes.TEXTAREA,

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
              <span>Update Warehouse</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;

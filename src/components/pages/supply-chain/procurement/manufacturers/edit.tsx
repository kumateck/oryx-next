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
import { InputTypes, Option } from "@/lib";
import {
  CreateManufacturerRequest,
  ManufacturerDtoRead,
  PutApiV1ProcurementManufacturerByManufacturerIdApiArg,
  useGetApiV1MaterialQuery,
  useLazyGetApiV1MaterialQuery,
  usePutApiV1ProcurementManufacturerByManufacturerIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateManufacturerValidator, ManufacturerRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: ManufacturerDtoRead;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [loadMaterials] = useLazyGetApiV1MaterialQuery();
  const { data: materialResponse } = useGetApiV1MaterialQuery({
    page: 1,
    pageSize: 10000,
  });

  const [changeManufacturer, { isLoading }] =
    usePutApiV1ProcurementManufacturerByManufacturerIdMutation();

  const defaultMaterials = details?.materials?.map((item) => ({
    value: item.material?.id as string,
    label: item.material?.name as string,
  })) as Option[];

  const materials = materialResponse?.data;

  const materialOptions = materials?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ManufacturerRequestDto>({
    resolver: CreateManufacturerValidator,
    mode: "all",
    defaultValues: {
      name: details.name as string,
      address: details?.address as string,
      validityDate: details?.validityDate as string,
      materials: defaultMaterials,
    },
  });

  const onSubmit = async (data: ManufacturerRequestDto) => {
    try {
      const payload = {
        ...data,
        materials: data?.materials?.map((item) => {
          return {
            materialId: item.value,
          };
        }),
      } satisfies CreateManufacturerRequest;
      await changeManufacturer({
        manufacturerId: details.id as string,
        createManufacturerRequest: payload,
      } satisfies PutApiV1ProcurementManufacturerByManufacturerIdApiArg);
      toast.success("Material updated successfully");
      loadMaterials({
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
          <DialogTitle>Edit Manufacturer</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            config={[
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
                register: { ...register("address") },
                label: "Address",
                placeholder: "Enter Address",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.address?.message,
                  error: !!errors.address,
                },
              },
              {
                type: InputTypes.DATE,
                label: "Validity Date",
                name: `validityDate`,
                control,
                errors: {
                  message: errors.validityDate?.message,
                  error: !!errors.validityDate,
                },
                disabled: {
                  before: new Date(),
                },
              },
              {
                label: "Materials",
                control,
                type: InputTypes.MULTIPLE,
                name: "materials",
                required: true,
                placeholder: "Materials",
                defaultValue: defaultMaterials,
                options: materialOptions,
                errors: {
                  message: errors.materials?.message,
                  error: !!errors.materials,
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
              <span>Update Material</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;

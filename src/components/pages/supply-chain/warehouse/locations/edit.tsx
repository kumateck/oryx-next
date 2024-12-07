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
// import { COLLECTION_TYPES, InputTypes, Option } from "@/lib";
import { InputTypes } from "@/lib";
import {
  CreateWarehouseLocationRequest,
  WarehouseLocationDto,
  useLazyGetApiV1WarehouseLocationQuery,
  usePutApiV1WarehouseLocationByLocationIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateLocationValidator, LocationRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: WarehouseLocationDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [loadLocations] = useLazyGetApiV1WarehouseLocationQuery();

  const [createLocation, { isLoading }] =
    usePutApiV1WarehouseLocationByLocationIdMutation();
  // const { data } = useGetApiV1CollectionByItemTypeQuery({
  //   itemType: COLLECTION_TYPES.MaterialCategory,
  // });

  const defaultWarehouse = {
    label: details?.warehouse?.id as string,
    value: details?.warehouse?.id as string,
  };

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<LocationRequestDto>({
    resolver: CreateLocationValidator,
    mode: "all",
    defaultValues: {
      warehouseId: defaultWarehouse,
      description: details.description as string,
      location: details.description as string,
      floor: details.floorName as string,
    },
  });

  const onSubmit = async (data: LocationRequestDto) => {
    try {
      const payload = {
        ...data,
      } satisfies CreateWarehouseLocationRequest;
      await createLocation({
        locationId: details.id as string,
        createWarehouseLocationRequest: payload,
      });
      toast.success("Material updated successfully");
      loadLocations({
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
          <DialogTitle>Edit Material</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            config={[
              {
                register: { ...register("code") },
                label: "Material Code",
                readOnly: true,
                required: true,
                description: (
                  <span className="text-sm text-neutral-500">
                    You can’t change the product code
                  </span>
                ),
                placeholder: "Code will be generated",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.code?.message,
                  error: !!errors.code,
                },
              },
              // {
              //   label: "Kind",
              //   control,
              //   type: InputTypes.RADIO,
              //   name: `kind`,
              //   required: true,
              //   disabled: true,
              //   options: ["Raw", "Package"].map((option) => ({
              //     label: option,
              //     value: option,
              //   })),
              //   errors: {
              //     message: errors?.kind?.message || "",
              //     error: !!errors?.kind?.type,
              //   },
              // },
              // {
              //   label: "Material Category",
              //   control,
              //   type: InputTypes.SELECT,
              //   name: "materialCategoryId",
              //   required: true,
              //   defaultValue: defaultMaterialCategory,
              //   placeholder: "Material Category",
              //   options: materialCategoryOptions,
              //   errors: {
              //     message: errors.materialCategoryId?.message,
              //     error: !!errors.materialCategoryId,
              //   },
              // },
              // {
              //   register: { ...register("name") },
              //   label: "Name",
              //   placeholder: "Enter Name",
              //   type: InputTypes.TEXT,

              //   errors: {
              //     message: errors.name?.message,
              //     error: !!errors.name,
              //   },
              // },
              // {
              //   register: { ...register("pharmacopoeia") },
              //   label: "Pharmacopoeia",
              //   placeholder: "Enter Pharmacopoeia",
              //   type: InputTypes.TEXT,

              //   errors: {
              //     message: errors.pharmacopoeia?.message,
              //     error: !!errors.pharmacopoeia,
              //   },
              // },
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
              <span>Update Material</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;

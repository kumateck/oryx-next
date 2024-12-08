// import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { CODE_SETTINGS, COLLECTION_TYPES, InputTypes, Option } from "@/lib";
import {
  CreateWarehouseLocationRackRequest,
  useGetApiV1CollectionByItemTypeQuery,
  useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery,
  useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useLazyGetApiV1WarehouseLocationQuery,
  usePostApiV1WarehouseByLocationIdRackMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  ErrorResponse,
  GenerateCodeOptions,
  cn,
  generateCode,
  getFirstCharacter,
  isErrorResponse,
} from "@/lib/utils";

import { CreateRackValidator, RackRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [loadWarehouseLocations] = useLazyGetApiV1WarehouseLocationQuery();
  const [loadCodeSettings] =
    useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery();
  const [loadCodeMyModel] =
    useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery();

  const [createWarehouseLocationRack, { isLoading }] =
    usePostApiV1WarehouseByLocationIdRackMutation();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm<RackRequestDto>({
    resolver: CreateRackValidator,
    mode: "all",
  });

  const name = useWatch<RackRequestDto>({
    name: "name",
    control,
  }) as string;

  const location = useWatch<RackRequestDto>({
    name: "locationId",
    control,
  }) as string;

  const { data } = useGetApiV1CollectionByItemTypeQuery({
    itemType: COLLECTION_TYPES.WarehouseLocation,
  });

  useEffect(() => {
    handleLoadCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadCode = async () => {
    try {
      const getCodeSettings = await loadCodeSettings({
        modelType: CODE_SETTINGS.modelTypes.Warehouse,
      }).unwrap();

      const prefix = getCodeSettings?.prefix;
      const locationName = location || "";
      const codePrefix = `${prefix}${getFirstCharacter(name)}${getFirstCharacter(locationName)}`;

      const payload = {
        modelType: CODE_SETTINGS.modelTypes.Warehouse,
        prefix: codePrefix,
      };

      const res = await loadCodeMyModel(payload).unwrap();

      const generatePayload: GenerateCodeOptions = {
        maxlength: Number(getCodeSettings?.maximumNameLength),
        minlength: Number(getCodeSettings?.minimumNameLength),
        prefix: codePrefix,
        type: 0,
        seriesCounter: res + 1,
      };

      const code = generateCode(generatePayload);
      setValue("code", code);
    } catch (error) {
      console.error("Error generating code:", error);
    }
  };

  const warehouseLocationsOptions = data?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  const onSubmit = async (data: RackRequestDto) => {
    try {
      const payload = {
        ...data,
      } satisfies CreateWarehouseLocationRackRequest;
      await createWarehouseLocationRack({
        createWarehouseLocationRackRequest: payload,
        locationId: data?.locationId?.value,
      });
      toast.success("Rack created successfully");
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
          <DialogTitle>Add Rack</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            config={[
              {
                label: "Location",
                control,
                type: InputTypes.SELECT,
                name: "locationId",
                required: true,

                options: warehouseLocationsOptions,
                errors: {
                  message: errors.locationId?.message,
                  error: !!errors.locationId,
                },
              },
              {
                register: { ...register("name") },
                label: "Rack Name",
                required: true,
                placeholder: "Enter Rack Name",
                type: InputTypes.TEXT,

                errors: {
                  message: errors.name?.message,
                  error: !!errors.name,
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
              <span>Add Rack</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

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
  CreateWarehouseRequest,
  PostApiV1CollectionApiArg,
  useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery,
  useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useLazyGetApiV1WarehouseQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1WarehouseMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  ErrorResponse,
  GenerateCodeOptions,
  cn,
  generateCode,
  getFirstCharacter,
  isErrorResponse,
} from "@/lib/utils";

import { CreateShelfValidator, ShelfRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [loadWarehouses] = useLazyGetApiV1WarehouseQuery();
  const [loadCodeSettings] =
    useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery();
  const [loadCodeMyModel] =
    useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery();

  const [createWarehouse, { isLoading }] = usePostApiV1WarehouseMutation();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm<ShelfRequestDto>({
    resolver: CreateShelfValidator,
    mode: "all",
  });

  const name = useWatch<ShelfRequestDto>({
    name: "name",
    control,
  }) as string;

  const rack = useWatch<ShelfRequestDto>({
    name: "rack",
    control,
  }) as string;

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.UnitOfMeasure, COLLECTION_TYPES.ProductCategory],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (name && rack?.length > 0) {
      handleLoadCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, rack]);

  const handleLoadCode = async () => {
    try {
      const getCodeSettings = await loadCodeSettings({
        modelType: CODE_SETTINGS.modelTypes.Warehouse,
      }).unwrap();

      const prefix = getCodeSettings?.prefix;
      const locationName = rack || "";
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

  const categoryOptions = collectionResponse?.[
    COLLECTION_TYPES.ProductCategory
  ]?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];

  const onSubmit = async (data: ShelfRequestDto) => {
    try {
      const payload = {
        ...data,
      } satisfies CreateWarehouseRequest;
      await createWarehouse({
        createWarehouseRequest: payload,
      });
      toast.success("Material created successfully");
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
          <DialogTitle>Add Shelf</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            config={[
              // {
              //   label: "Kind",
              //   control,
              //   type: InputTypes.RADIO,
              //   name: `kind`,
              //   required: true,
              //   options: Object.entries(EMaterialKind)
              //     .filter(([, value]) => typeof value === "number")
              //     .map(([key, value]) => ({
              //       label: key, // "Raw" or "Package"
              //       value: value.toString(), // 0 or 1
              //     })),
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
              //   placeholder: "Material Category",
              //   options: materialCategoryOptions,
              //   errors: {
              //     message: errors.materialCategoryId?.message,
              //     error: !!errors.materialCategoryId,
              //   },
              // },

              {
                register: { ...register("code") },
                label: "Shelf Code",
                readOnly: true,
                required: true,
                description: (
                  <span className="text-sm text-neutral-500">
                    You can’t change the shelf code
                  </span>
                ),
                placeholder: "Code will be generated",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.code?.message,
                  error: !!errors.code,
                },
              },
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

                options: categoryOptions,
                errors: {
                  message: errors.rack?.message,
                  error: !!errors.rack,
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
              <span>Add Shelf</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

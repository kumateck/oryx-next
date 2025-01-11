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
import {
  CODE_SETTINGS,
  COLLECTION_TYPES,
  EMaterialKind,
  InputTypes,
  Option,
} from "@/lib";
import {
  CreateMaterialRequest,
  GetApiV1ConfigurationByModelTypeAndPrefixApiArg,
  NamingType,
  useGetApiV1CollectionByItemTypeQuery,
  useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery,
  useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useLazyGetApiV1MaterialQuery,
  usePostApiV1MaterialMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  ErrorResponse,
  GenerateCodeOptions,
  cn,
  generateCode,
  getFirstCharacter,
  isErrorResponse,
} from "@/lib/utils";

import { CreateMaterialValidator, MaterialRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [loadMaterials] = useLazyGetApiV1MaterialQuery();
  const [loadCodeSettings] =
    useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery();
  const [loadCodeMyModel] =
    useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery();

  const [createMaterial, { isLoading }] = usePostApiV1MaterialMutation();
  const { data } = useGetApiV1CollectionByItemTypeQuery({
    itemType: COLLECTION_TYPES.MaterialCategory,
  });
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm<MaterialRequestDto>({
    resolver: CreateMaterialValidator,
    mode: "all",
  });

  const kindString = useWatch<MaterialRequestDto>({
    name: "kind",
    control,
  });
  const kind = Number(kindString) as EMaterialKind;

  const name = useWatch<MaterialRequestDto>({
    name: "name",
    control,
  }) as string;
  const category = useWatch<MaterialRequestDto>({
    name: "materialCategoryId",
    control,
  }) as Option;

  useEffect(() => {
    if (
      (kind === EMaterialKind.Raw && name) ||
      (kind === EMaterialKind.Package && category)
    ) {
      handleLoadCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, name, category]);
  const handleLoadCode = async () => {
    const getCodeSettings = await loadCodeSettings({
      modelType:
        kind === EMaterialKind.Raw
          ? CODE_SETTINGS.modelTypes.RawMaterial
          : CODE_SETTINGS.modelTypes.PackageMaterial,
    }).unwrap();

    const prefix = getCodeSettings?.prefix;

    const codePrefix =
      kind === EMaterialKind.Raw
        ? prefix + getFirstCharacter(name)
        : prefix + getFirstCharacter(category?.label);

    const payload = {
      modelType:
        kind === EMaterialKind.Raw
          ? CODE_SETTINGS.modelTypes.RawMaterial
          : CODE_SETTINGS.modelTypes.PackageMaterial,
      prefix: codePrefix,
    } as GetApiV1ConfigurationByModelTypeAndPrefixApiArg;
    const res = await loadCodeMyModel(payload).unwrap();
    const generatePayload: GenerateCodeOptions = {
      maxlength: Number(getCodeSettings?.maximumNameLength),
      minlength: Number(getCodeSettings?.minimumNameLength),
      prefix: codePrefix,
      type: getCodeSettings?.namingType as NamingType,
      seriesCounter: res + 1,
    };
    const code = await generateCode(generatePayload);
    setValue("code", code);
  };

  const materialCategoryOptions = data?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  const onSubmit = async (data: MaterialRequestDto) => {
    try {
      const payload = {
        ...data,
        materialCategoryId: data?.materialCategoryId?.value,
        kind: data?.kind,
      } satisfies CreateMaterialRequest;
      await createMaterial({
        createMaterialRequest: payload,
      });
      toast.success("Material created successfully");
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
          <DialogTitle>Add Material</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            config={[
              {
                label: "Kind",
                control,
                type: InputTypes.RADIO,
                name: `kind`,
                required: true,

                options: Object.entries(EMaterialKind)
                  .filter(([, value]) => typeof value === "number")
                  .map(([key, value]) => ({
                    label: key, // "Raw" or "Package"
                    value: value.toString(), // 0 or 1
                  })),
                errors: {
                  message: errors?.kind?.message || "",
                  error: !!errors?.kind?.type,
                },
              },
              {
                label: "Material Category",
                control,
                type: InputTypes.SELECT,
                name: "materialCategoryId",
                required: true,
                placeholder: "Material Category",
                options: materialCategoryOptions,
                errors: {
                  message: errors.materialCategoryId?.message,
                  error: !!errors.materialCategoryId,
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
              <span>Save</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

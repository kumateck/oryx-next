// import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
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
import { CODE_SETTINGS, COLLECTION_TYPES, EMaterialKind, Option } from "@/lib";
import {
  CreateMaterialRequest,
  GetApiV1ConfigurationByModelTypeAndPrefixApiArg,
  MaterialKind,
  NamingType,
  useGetApiV1CollectionByItemTypeQuery,
  useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery,
  useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  usePostApiV1MaterialMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import {
  ErrorResponse,
  GenerateCodeOptions,
  cn,
  generateCode,
  getFirstCharacter,
  isErrorResponse,
} from "@/lib/utils";

import MaterialForm from "./form";
import { CreateMaterialValidator, MaterialRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  kind?: EMaterialKind;
}
const Create = ({ isOpen, onClose, kind }: Props) => {
  const dispatch = useDispatch();
  const [loadCodeSettings] =
    useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery();
  const [loadCodeMyModel] =
    useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery();

  const [createMaterial, { isLoading }] = usePostApiV1MaterialMutation();
  const { data } = useGetApiV1CollectionByItemTypeQuery({
    itemType: COLLECTION_TYPES.MaterialCategory,
    materialKind: kind,
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
    defaultValues: {
      kind: kind?.toString() as unknown as MaterialKind,
    },
  });

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

      dispatch(commonActions.setTriggerReload());

      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  useEffect(() => {
    if (kind === EMaterialKind.Package) {
      setValue("pharmacopoeia", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Material</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <MaterialForm
            register={register}
            control={control}
            categoryOptions={materialCategoryOptions}
            errors={errors}
            kind={kind}
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

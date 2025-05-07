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
import { COLLECTION_TYPES, EMaterialKind, Option } from "@/lib";
import {
  CreateMaterialRequest,
  MaterialDto,
  MaterialKind,
  useGetApiV1CollectionByItemTypeQuery,
  usePutApiV1MaterialByMaterialIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import MaterialForm from "./form";
import { CreateMaterialValidator, MaterialRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: MaterialDto;
  kind?: EMaterialKind;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const dispatch = useDispatch();
  const [createMaterial, { isLoading }] =
    usePutApiV1MaterialByMaterialIdMutation();
  const { data } = useGetApiV1CollectionByItemTypeQuery({
    itemType: COLLECTION_TYPES.MaterialCategory,
    materialKind: details.kind,
  });

  const defaultMaterialCategory = {
    label: details?.materialCategory?.name as string,
    value: details?.materialCategory?.id as string,
  };

  const defaultValues = {
    name: details.name as string,
    description: details.description as string,
    materialCategoryId: defaultMaterialCategory,
    pharmacopoeia: details.pharmacopoeia as string,
    kind: details?.kind?.toString() as unknown as MaterialKind,
    code: details.code as string,
    // reorderLevel: details.reOrderLevel as number,
  };
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
    defaultValues,
  });

  const kindString = useWatch<MaterialRequestDto>({
    name: "kind",
    control,
  });
  const kind = Number(kindString) as EMaterialKind;

  const materialCategoryOptions = data?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  const onSubmit = async (data: MaterialRequestDto) => {
    try {
      const payload = {
        ...data,
        materialCategoryId: data?.materialCategoryId?.value,
        kind: data.kind,
      } satisfies CreateMaterialRequest;
      await createMaterial({
        materialId: details.id as string,
        createMaterialRequest: payload,
      });
      toast.success("Material updated successfully");
      dispatch(commonActions.setTriggerReload());

      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  useEffect(() => {
    if (kind === EMaterialKind.Packing) {
      setValue("pharmacopoeia", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Material</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <MaterialForm
            register={register}
            control={control}
            categoryOptions={materialCategoryOptions}
            errors={errors}
            kind={kind}
            defaultValues={defaultValues}
          />

          {/* <FormWizard
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
                onModal: true,
                defaultValue: defaultMaterialCategory,
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
            ]}
          />
          {kind === EMaterialKind.Package && (
            <FormWizard
              config={[
                {
                  register: { ...register("pharmacopoeia") },
                  label: "Pharmacopoeia",
                  placeholder: "Enter Pharmacopoeia",
                  type: InputTypes.TEXT,
                  readOnly: kind === EMaterialKind.Package ? true : false,
                  errors: {
                    message: errors.pharmacopoeia?.message,
                    error: !!errors.pharmacopoeia,
                  },
                },
              ]}
            />
          )}
          <FormWizard
            config={[
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
          /> */}
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

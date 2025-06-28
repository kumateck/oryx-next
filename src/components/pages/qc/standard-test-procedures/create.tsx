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
  AuditModules,
  cn,
  CODE_SETTINGS,
  ErrorResponse,
  isErrorResponse,
  Option,
} from "@/lib";
import React from "react";
import { useForm } from "react-hook-form";
import { StandardTestForm } from "./form";
import { EMaterialKind } from "@/lib";
import {
  CreateMaterialStandardTestProcedureRequest,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  useGetApiV1MaterialQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePostApiV1MaterialStpsMutation,
  PostApiV1MaterialStpsApiArg,
} from "@/lib/redux/api/openapi.generated";
import {
  CreateStandardTestProcedureDto,
  StandardTestProcedureValidator,
} from "./types";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  kind?: EMaterialKind;
};

export const Create = ({ isOpen, kind, onClose }: Props) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateStandardTestProcedureDto>({
    resolver: StandardTestProcedureValidator,
  });

  //get materials
  const { data: materials } = useGetApiV1MaterialQuery({
    page: 1,
    pageSize: 1000,
    kind: kind || EMaterialKind.Raw,
    module: AuditModules.warehouse.name,
    subModule: AuditModules.warehouse.materials,
  });
  const [createStandardTestProcedure, { isLoading }] =
    usePostApiV1MaterialStpsMutation();
  const [uploadAttachment] = usePostApiV1FileByModelTypeAndModelIdMutation();

  //fuction fro creating standard test procedure
  const onSubmit = async (data: CreateStandardTestProcedureDto) => {
    try {
      const payload = {
        stpNumber: data.stpNumber,
        materialId: data.materialId.value,
        description: data?.description,
      } as CreateMaterialStandardTestProcedureRequest;
      // 1. Create the standard test procedure
      const standardTestProcedureId = await createStandardTestProcedure({
        module: AuditModules.settings.name,
        subModule: AuditModules.settings.standardTestProcedure,
        createMaterialStandardTestProcedureRequest: payload,
      } as PostApiV1MaterialStpsApiArg).unwrap();
      toast.success("STP created successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
      //upload attachment if any
      if (standardTestProcedureId && data?.attachments?.length > 0) {
        const files = Array.isArray(data.attachments)
          ? data.attachments
          : Array.from(data.attachments);
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file, file.name);
        });
        // Upload the files
        await uploadAttachment({
          modelType: CODE_SETTINGS.modelTypes.MaterialStandardTestProcedure,
          modelId: standardTestProcedureId,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to create STP",
      );
    }
  };
  const data = materials?.data;
  const materialOptions = data?.map((material) => {
    return {
      label: material.name,
      value: material.id,
    };
  }) as Option[];

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Standard Test</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <StandardTestForm
            errors={errors}
            register={register}
            control={control}
            materialsOptions={materialOptions}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={"default"}
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Save</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

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
  CodeModelTypes,
  ErrorResponse,
  isErrorResponse,
  Option,
} from "@/lib";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StandardTestForm } from "./form";
import { EMaterialKind } from "@/lib";
import {
  CreateMaterialStandardTestProcedureRequest,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePostApiV1MaterialStpsMutation,
  PostApiV1MaterialStpsApiArg,
  useLazyGetApiV1ConfigurationByModelTypeCountQuery,
  useLazyGetApiV1MaterialQuery,
} from "@/lib/redux/api/openapi.generated";
import {
  CreateStandardTestProcedureDto,
  StandardTestProcedureValidator,
} from "./types";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import { generateSTPNumber, getSTPPrefix } from "@/lib/batch-gen";

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
    setValue,
  } = useForm<CreateStandardTestProcedureDto>({
    resolver: StandardTestProcedureValidator,
  });
  const [loadCountConfig] = useLazyGetApiV1ConfigurationByModelTypeCountQuery();

  //get materials
  const [loadMaterials, { isLoading: isLoadingMaterials }] =
    useLazyGetApiV1MaterialQuery();
  const loadDataOrSearchMaterials = async (
    searchQuery: string,
    page: number,
  ) => {
    const res = await loadMaterials({
      searchQuery,
      kind: kind || EMaterialKind.Raw,
      module: AuditModules.warehouse.name,
      subModule: AuditModules.warehouse.materials,
      page,
    }).unwrap();
    const response = {
      options: res?.data?.map((equipment) => ({
        label: equipment?.name,
        value: equipment.id,
      })) as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };
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
      toast.success("STP created successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to create STP",
      );
    }
  };

  useEffect(() => {
    handleGenerateStpNumber(Number(kind));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  const handleGenerateStpNumber = async (kind: EMaterialKind) => {
    try {
      const warehouse = "QCD/STP";
      const type = kind === EMaterialKind.Raw ? "RM" : "PM";

      const prefix = getSTPPrefix(warehouse, type);
      const countConfigResponse = await loadCountConfig({
        modelType: CodeModelTypes.MaterialSTPNumber,
        prefix,
      }).unwrap();
      const serial = countConfigResponse + 1;
      const code = generateSTPNumber({ warehouse, type, serial });

      setValue("stpNumber", code);
    } catch (error) {
      console.log(error);
    }
  };

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
            isLoadingMaterials={isLoadingMaterials}
            fetchMaterials={loadDataOrSearchMaterials}
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

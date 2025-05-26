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
  PostApiV1FileByModelTypeAndModelIdApiArg,
  useGetApiV1MaterialQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePutApiV1MaterialStpsByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { useForm } from "react-hook-form";
import {
  CreateStandardTestProcedureDto,
  StandardTestProcedureValidator,
} from "./types";
import { StandardTestForm } from "./form";
import {
  AuditModules,
  cn,
  CODE_SETTINGS,
  ErrorResponse,
  isErrorResponse,
  Option,
} from "@/lib";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  detailts: CreateStandardTestProcedureDto;
  id: string;
};

export const Edit = ({ isOpen, id, onClose, detailts }: Props) => {
  const [updatetMaterialSTPMutation, { isLoading }] =
    usePutApiV1MaterialStpsByIdMutation();
  const [uploadAttachment] = usePostApiV1FileByModelTypeAndModelIdMutation();
  const dispatch = useDispatch();

  //useForm hook
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStandardTestProcedureDto>({
    resolver: StandardTestProcedureValidator,
    mode: "all",
    defaultValues: {
      stpNumber: detailts.stpNumber,
      materialId: detailts.materialId,
      description: detailts.description,
    },
  });

  //get materials
  const { data: materials } = useGetApiV1MaterialQuery({
    page: 1,
    pageSize: 1000,
    module: AuditModules.warehouse.name,
    subModule: AuditModules.warehouse.materials,
  });
  //format to match the select component options
  const data = materials?.data;
  const materialOptions = data?.map((material) => {
    return {
      label: material.name,
      value: material.id,
    };
  }) as Option[];

  //function for editing standard test procedure
  const onSubmit = async (data: CreateStandardTestProcedureDto) => {
    try {
      const payload = {
        stpNumber: data.stpNumber,
        materialId: data.materialId.value,
        description: data.description,
      };
      //call api to save changes
      await updatetMaterialSTPMutation({
        id,
        createMaterialStandardTestProcedureRequest: payload,
        module: AuditModules.settings.name,
        subModule: AuditModules.settings.standardTestProcedure,
      }).unwrap();
      toast.success("Standard test procedure updated successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      if (id && data?.attachments) {
        //upload attachment if any
        const files = Array.isArray(data.attachments)
          ? data.attachments
          : Array.from(data.attachments);
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file, file.name);
        });
        // Upload the files
        await uploadAttachment({
          modelType: CODE_SETTINGS.modelTypes.StandardTestProcedure,
          modelId: id,
          module: AuditModules.settings.name,
          subModule: AuditModules.settings.standardTestProcedure,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to update STP",
      );
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Standard Test Procedure</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <StandardTestForm
            register={register}
            control={control}
            errors={errors}
            materialsOptions={materialOptions}
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Icon
                name={isLoading ? "Loader" : "Plus"}
                className={cn("mr-2", { isLoading: "animate-spin" })}
              />
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

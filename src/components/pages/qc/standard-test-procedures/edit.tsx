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
  useLazyGetApiV1MaterialQuery,
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
  EMaterialKind,
  ErrorResponse,
  isErrorResponse,
  Option,
} from "@/lib";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  details: CreateStandardTestProcedureDto;
  id: string;
};

export const Edit = ({ isOpen, id, onClose, details }: Props) => {
  const [updatetMaterialSTPMutation, { isLoading }] =
    usePutApiV1MaterialStpsByIdMutation();
  const [uploadAttachment] = usePostApiV1FileByModelTypeAndModelIdMutation();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const kind = searchParams.get("kind") as unknown as EMaterialKind;

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
      stpNumber: details.stpNumber,
      materialId: details.materialId,
      description: details.description,
    },
  });

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
          modelType: CODE_SETTINGS.modelTypes.MaterialStandardTestProcedure,
          modelId: id,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
      toast.success("Standard test procedure updated successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
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
            fetchMaterials={loadDataOrSearchMaterials}
            isLoadingMaterials={isLoadingMaterials}
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

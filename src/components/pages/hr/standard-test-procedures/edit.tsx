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
  useGetApiV1MaterialQuery,
  usePutApiV1StandardTestProceduresByIdMutation,
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
  ErrorResponse,
  isErrorResponse,
  Option,
} from "@/lib";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  detailts: CreateStandardTestProcedureDto;
  id: string;
};

export const Edit = ({ isOpen, id, onClose, detailts }: Props) => {
  const [editStandardTestProcedureMutation, { isLoading }] =
    usePutApiV1StandardTestProceduresByIdMutation();

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
      await editStandardTestProcedureMutation({
        id,
        createStandardTestProcedureRequest: payload,
        module: AuditModules.settings.name,
        subModule: AuditModules.settings.standardTestProcedure,
      }).unwrap();
      toast.success("Standard test procedure updated successfully");
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
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

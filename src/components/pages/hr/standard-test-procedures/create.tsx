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
  ErrorResponse,
  isErrorResponse,
  Option,
} from "@/lib";
import React from "react";
import { useForm } from "react-hook-form";
import { StandardTestForm } from "./form";
import {
  CreateStandardTestProcedureRequest,
  useGetApiV1MaterialQuery,
  usePostApiV1StandardTestProceduresMutation,
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
};

export const Create = ({ isOpen, onClose }: Props) => {
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
    module: AuditModules.warehouse.name,
    subModule: AuditModules.warehouse.materials,
  });
  const [createStandardTestProcedure, { isLoading }] =
    usePostApiV1StandardTestProceduresMutation();

  //fuction fro creating standard test procedure
  const onSubmit = async (data: CreateStandardTestProcedureDto) => {
    try {
      const payload = {
        stpNumber: data.stpNumber,
        materialId: data.materialId.value,
        description: data?.description,
      } as CreateStandardTestProcedureRequest;
      await createStandardTestProcedure({
        module: AuditModules.settings.name,
        subModule: AuditModules.settings.standardTestProcedure,
        createStandardTestProcedureRequest: payload,
      }).unwrap();
      toast.success("STP createde succeffuly");
      dispatch(commonActions.unSetTriggerReload());
      onClose();
      reset();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
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
          <DialogFooter>
            <DialogFooter className="justify-end gap-4 py-6">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant={"default"}
                type="submit"
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

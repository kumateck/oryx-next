import { useForm } from "react-hook-form";
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
import { AuditModules, Option } from "@/lib";
import {
  LeaveTypeDto,
  useGetApiV1DesignationQuery,
  usePutApiV1LeaveTypeByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateLeaveTypeValidator, LeaveTypeRequestDto } from "./types";
import LeaveTypeForm from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: LeaveTypeDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [editLeaveType, { isLoading }] = usePutApiV1LeaveTypeByIdMutation();

  const defaultDesignations =
    details.designations?.map((dept) => ({
      label: dept.name ?? "",
      value: dept.id,
    })) || [];
  const dispatch = useDispatch();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<LeaveTypeRequestDto>({
    resolver: CreateLeaveTypeValidator,
    mode: "all",
    defaultValues: {
      name: details.name as string,
      isPaid: details.isPaid as boolean,
      designationIds: defaultDesignations,
      deductFromBalance: details.deductFromBalance as boolean,
      maxDuration: details.numberOfDays,
    },
  });

  const { data: designationsResponse } = useGetApiV1DesignationQuery({
    page: 1,
    pageSize: 1000,
    module: AuditModules.management.name,
    subModule: AuditModules.management.designationManagement,
  });

  const designationData = designationsResponse?.data;
  const designationsOptions = designationData?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  }) as Option[];

  const onSubmit = async (data: LeaveTypeRequestDto) => {
    try {
      const payload = {
        name: data.name,
        isPaid: data.isPaid,
        designationList: data.designationIds.map((d) => d.value),
        numberOfDays: data.maxDuration,
        isActive: data.deductFromBalance,
        deductFromBalance: data.deductFromBalance,
      };
      await editLeaveType({
        id: details.id as string,
        createLeaveTypeRequest: payload,
        module: AuditModules.management.name,
        subModule: AuditModules.management.leaveTypeConfiguration,
      }).unwrap();
      toast.success("Leave Type updated successfully");
      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Designation</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <LeaveTypeForm
            register={register}
            control={control}
            errors={errors}
            designationsOptions={designationsOptions}
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
              <span>Save Change</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;

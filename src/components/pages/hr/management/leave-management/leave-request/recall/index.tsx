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
import { AuditModules } from "@/lib";
import {
  CreateLeaveRecallRequest,
  LeaveRequestDto,
  usePutApiV1LeaveRequestRecallMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { cn, ErrorResponse, isErrorResponse } from "@/lib/utils";

import { RecallValidator, RecallRequestDto } from "./types";

import RecallForm from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: LeaveRequestDto;
}

const Recall = ({ isOpen, onClose, details }: Props) => {
  const dispatch = useDispatch();
  const [createLeaveRecall, { isLoading }] =
    usePutApiV1LeaveRequestRecallMutation();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RecallRequestDto>({
    resolver: RecallValidator,
    mode: "all",
    defaultValues: {
      name: details.employee?.firstName + " " + details.employee?.lastName,
      staffNumber: (details.employee?.staffNumber as string) || "-",
      departmentId: {
        value: details.employee?.id as string,
        label: details.employee?.department?.name as string,
      },
    },
  });

  const onSubmit = async (data: RecallRequestDto) => {
    try {
      const payload = {
        employeeId: details.employee?.id as string,
        recallDate: data.returnDate.toISOString(),
        recallReason: data.justification,
      } satisfies CreateLeaveRecallRequest;

      await createLeaveRecall({
        createLeaveRecallRequest: payload,
        module: AuditModules.management.name,
        subModule: AuditModules.management.leaveManagement,
      }).unwrap();

      toast.success("Leave Recalled successfully");

      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Staff Leave Recall Form</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <RecallForm register={register} control={control} errors={errors} />
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
              <span>Save Changes</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Recall;

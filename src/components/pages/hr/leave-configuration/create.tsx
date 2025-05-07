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
import { Option } from "@/lib";
import {
  CreateLeaveTypeRequest,
  useGetApiV1DesignationQuery,
  useLazyGetApiV1LeaveTypeQuery,
  usePostApiV1LeaveTypeMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import LeaveTypeForm from "./form";
import { CreateLeaveTypeValidator, LeaveTypeRequestDto } from "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Create = ({ isOpen, onClose }: Props) => {
  const [loadLeaveTypes] = useLazyGetApiV1LeaveTypeQuery();
  const [createLeaveType, { isLoading }] = usePostApiV1LeaveTypeMutation();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<LeaveTypeRequestDto>({
    resolver: CreateLeaveTypeValidator,
    mode: "all",
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: LeaveTypeRequestDto) => {
    try {
      const payload = {
        name: data.name,
        isPaid: data.isPaid,
        designationList: data.designationIds.map((d) => d.value),
        numberOfDays: data.maxDuration,
        isActive: data.deductFromBalance,
        deductFromBalance: data.deductFromBalance,
      } satisfies CreateLeaveTypeRequest;
      console.log(payload);

      await createLeaveType({
        createLeaveTypeRequest: payload,
      }).unwrap();

      toast.success("Leave type created successfully");
      loadLeaveTypes({ page: 1, pageSize: 10 });
      reset();
      onClose();
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const { data: designationResponse } = useGetApiV1DesignationQuery({
    page: 1,
    pageSize: 1000,
  });

  const designationData = designationResponse?.data;
  const designationsOptions = designationData?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  }) as Option[];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Type Configuration</DialogTitle>
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

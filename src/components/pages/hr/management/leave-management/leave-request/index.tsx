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
import { CODE_SETTINGS, LeaveCategories, Option } from "@/lib";
import {
  CreateLeaveRequest,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  PostApiV1LeaveRequestApiArg,
  RequestCategory,
  useGetApiV1EmployeeQuery,
  useGetApiV1LeaveTypeQuery,
  useLazyGetApiV1LeaveRequestQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePostApiV1LeaveRequestMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { cn, ErrorResponse, isErrorResponse, splitWords } from "@/lib/utils";

import { CreateLeaveValidator, LeaveRequestDto } from "./types";
import LeaveRequestForm from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LeaveRequest = ({ isOpen, onClose }: Props) => {
  const [loadLeaveRequests] = useLazyGetApiV1LeaveRequestQuery();
  const [createLeaveRequest, { isLoading }] =
    usePostApiV1LeaveRequestMutation();
  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<LeaveRequestDto>({
    resolver: CreateLeaveValidator,
    mode: "all",
  });
  const dispatch = useDispatch();

  const selectedCategory = useWatch({
    control,
    name: "leaveCategory",
  });

  const isExitPass =
    selectedCategory?.value === String(LeaveCategories.ExitPassRequest);
  const isLeaveOrAbsence = [
    String(LeaveCategories.LeaveRequest),
    String(LeaveCategories.AbsenceRequest),
  ].includes(selectedCategory?.value);

  const onSubmit = async (data: LeaveRequestDto) => {
    try {
      const payload = {
        leaveTypeId: data.leaveTypeId?.value as string,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate?.toISOString() as string,
        employeeId: data.employeeId.value,
        contactPerson: data.contactPerson ?? "-",
        contactPersonNumber: data.contactPersonNumber ?? "-",
        requestCategory: parseInt(
          data.leaveCategory.value,
        ) as unknown as RequestCategory,
        justification: data.justification,
      } satisfies CreateLeaveRequest;

      const leaveRequestId = await createLeaveRequest({
        createLeaveRequest: payload,
      } as PostApiV1LeaveRequestApiArg).unwrap();

      if (leaveRequestId) {
        const formData = new FormData();
        // Ensure attachments are an array
        const attachmentsArray = Array.isArray(data.attachments)
          ? data.attachments
          : Array.from(data.attachments); // Convert FileList to an array

        attachmentsArray.forEach((attachment: File) => {
          formData.append("files", attachment, attachment.name);
        });

        await uploadAttachment({
          modelType: CODE_SETTINGS.modelTypes.LeaveRequest,
          modelId: leaveRequestId,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
      toast.success("Leave Request created successfully");
      reset();
      onClose();
      loadLeaveRequests({ page: 1, pageSize: 10 });
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const { data: employeesResponse } = useGetApiV1EmployeeQuery({
    page: 1,
    pageSize: 40,
  });

  const employees = employeesResponse?.data ?? [];

  const employeeOptions = employees?.map((item) => {
    return {
      label: item.firstName + " " + item.lastName,
      value: item?.id,
    };
  }) as Option[];

  const { data: leaveTypesResponse } = useGetApiV1LeaveTypeQuery({
    page: 1,
    pageSize: 40,
  });

  const leaveTypes = leaveTypesResponse?.data ?? [];

  const leaveTypesOptions = leaveTypes?.map((item) => {
    return {
      label: item.name,
      value: item?.id,
    };
  }) as Option[];

  const categoryOptions = Object.entries(LeaveCategories)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: splitWords(key),
      value: String(value),
    }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Staff Leave Request Form</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <LeaveRequestForm
            register={register}
            control={control}
            errors={errors}
            employeeOptions={employeeOptions}
            leaveTypesOptions={leaveTypesOptions}
            categoryOptions={categoryOptions}
            isExitPass={isExitPass}
            isLeaveOrAbsence={isLeaveOrAbsence}
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
                name={
                  isLoading || isUploadingAttachment ? "LoaderCircle" : "Plus"
                }
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

export default LeaveRequest;

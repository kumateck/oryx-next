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
import { AuditModules, CODE_SETTINGS, LeaveCategories, Option } from "@/lib";
import {
  CreateLeaveRequest,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  PostApiV1LeaveRequestApiArg,
  RequestCategory,
  useGetApiV1EmployeeQuery,
  useGetApiV1LeaveTypeQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePostApiV1LeaveRequestMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { cn, ErrorResponse, isErrorResponse, splitWords } from "@/lib/utils";

import { CreateLeaveValidator, LeaveRequestDto } from "./types";
import LeaveRequestForm from "./form";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  selectedCategory: LeaveCategories;
  onClose: () => void;
}

const LeaveRequest = ({
  isOpen,
  onClose,
  selectedCategory: category,
}: Props) => {
  const dispatch = useDispatch();
  console.log(category, "this is the category");

  const [createLeaveRequest, { isLoading: creating }] =
    usePostApiV1LeaveRequestMutation();
  const [uploadAttachment, { isLoading: uploading }] =
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
    defaultValues: {
      leaveCategory: splitWords(LeaveCategories[category]),
    },
  });

  const isExitPass =
    category.toString() === LeaveCategories.ExitPassRequest.toString();
  const isOfficialDuty =
    category.toString() === LeaveCategories.OfficialDutyRequest.toString();
  const isLeaveOrAbsence = [
    LeaveCategories.LeaveRequest,
    LeaveCategories.AbsenceRequest,
  ].includes(category);

  const onSubmit = async (data: LeaveRequestDto) => {
    try {
      // 1. Create the leave request
      const payload = {
        leaveTypeId: data.leaveTypeId?.value as string,
        startDate: data.startDate ? data.startDate.toISOString() : "",
        endDate: data.endDate?.toISOString() as string,
        employeeId: data.employeeId.value,
        contactPerson: data.contactPerson ?? "-",
        contactPersonNumber: data.contactPersonNumber ?? "0554290614",
        destination: data.destination ?? "-",
        requestCategory: parseInt(
          data?.leaveCategory ?? "0",
        ) as RequestCategory,
        justification: data.justification,
      } satisfies CreateLeaveRequest;

      const leaveRequestId = await createLeaveRequest({
        createLeaveRequest: payload,
        module: AuditModules.management.name,
        subModule: AuditModules.management.leaveManagement,
      } as PostApiV1LeaveRequestApiArg).unwrap();

      dispatch(commonActions.setTriggerReload());
      toast.success("Leave Request created successfully");
      if (leaveRequestId && data.attachments) {
        const files = Array.isArray(data.attachments)
          ? data.attachments
          : Array.from(data.attachments);

        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file, file.name);
        });

        await uploadAttachment({
          modelType: CODE_SETTINGS.modelTypes.LeaveRequest,
          modelId: leaveRequestId,
          body: formData,
          module: AuditModules.general.name,
          subModule: AuditModules.general.fileUpload,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
      reset();
      onClose();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to create leave request. Try again",
      );
    }
  };

  // fetch employee + leave-type options as before...
  const { data: employeesResponse } = useGetApiV1EmployeeQuery({
    page: 1,
    pageSize: 40,
    module: AuditModules.management.name,
    subModule: AuditModules.management.employeeManagement,
  });
  const employeeOptions = (employeesResponse?.data || []).map((e) => ({
    label: `${e.firstName} ${e.lastName}`,
    value: e.id,
  })) as Option[];

  const { data: leaveTypesResponse } = useGetApiV1LeaveTypeQuery({
    page: 1,
    pageSize: 40,
    module: AuditModules.management.name,
    subModule: AuditModules.management.leaveTypeConfiguration,
  });
  const leaveTypesOptions = (leaveTypesResponse?.data || []).map((lt) => ({
    label: lt.name,
    value: lt.id,
  })) as Option[];

  useEffect(() => {
    if (errors) {
      console.log(errors, "errors in useEffect");
    }
  }, [errors]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {splitWords(LeaveCategories[category])} Form
          </DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <LeaveRequestForm
            register={register}
            control={control}
            errors={errors}
            employeeOptions={employeeOptions}
            leaveTypesOptions={leaveTypesOptions}
            isExitPass={isExitPass}
            isOfficialDuty={isOfficialDuty}
            isLeaveOrAbsence={isLeaveOrAbsence}
          />

          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="submit"
              variant="default"
              disabled={creating || uploading}
              className="flex items-center gap-2"
            >
              <Icon
                name={creating || uploading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": creating || uploading,
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

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
import { AuditModules, LeaveCategories, Option } from "@/lib";
import {
  CreateLeaveRequest,
  LeaveRequestDto,
  PutApiV1LeaveRequestByIdApiArg,
  RequestCategory,
  useGetApiV1EmployeeQuery,
  useGetApiV1LeaveTypeQuery,
  usePutApiV1LeaveRequestByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { cn, ErrorResponse, isErrorResponse, splitWords } from "@/lib/utils";

import { CreateLeaveValidator, LeaveRequestDto as LeaveRequest } from "./types";
import LeaveRequestForm from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: LeaveRequestDto;
}

const Edit = ({ isOpen, onClose, details }: Props) => {
  const dispatch = useDispatch();
  const [updateLeaveRequest, { isLoading }] =
    usePutApiV1LeaveRequestByIdMutation();

  const defaultEmployee = {
    label: `${details?.employee?.firstName} ${details?.employee?.lastName}`,
    value: details?.employee?.id as string,
  };

  const defaultCategory =
    splitWords(LeaveCategories[details.requestCategory ?? 0]) || "";

  const defaultLeaveType = {
    label: details?.leaveType?.name as string,
    value: details?.leaveType?.id as string,
  };

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<LeaveRequest>({
    resolver: CreateLeaveValidator,
    mode: "all",
    defaultValues: {
      employeeId: defaultEmployee,
      leaveCategory: defaultCategory,
      leaveTypeId: defaultLeaveType,
      startDate: new Date(details.startDate as string),
      endDate: new Date(details.endDate as string),
      justification: details.justification as string,
      contactPerson: details.contactPerson as string,
      contactPersonNumber: details.contactPersonNumber as string,
    },
  });

  const onSubmit = async (data: LeaveRequest) => {
    try {
      const payload = {
        leaveTypeId: data.leaveTypeId?.value as string,
        startDate: data.startDate ? data.startDate.toISOString() : "",
        endDate: data.endDate?.toISOString() as string,
        employeeId: data.employeeId.value,
        contactPerson: data.contactPerson as string,
        contactPersonNumber: data.contactPersonNumber as string,
        requestCategory: Number(details.requestCategory) as RequestCategory,
        justification: data.justification,
      } satisfies CreateLeaveRequest;

      const exitPastOrOfficialDutyPayload = {
        leaveTypeId: data.leaveTypeId?.value as string,
        startDate: data?.startDate ? data.startDate.toISOString() : "",
        endDate: data?.endDate ? data.endDate.toISOString() : "",
        employeeId: data.employeeId.value,
        destination: data.destination ?? "-",
        requestCategory: Number(details.requestCategory) as RequestCategory,
        justification: data.justification,
      } satisfies CreateLeaveRequest;

      const leaveRequestId = await updateLeaveRequest({
        createLeaveRequest:
          isExitPass || isOfficialDuty
            ? exitPastOrOfficialDutyPayload
            : payload,
        id: details.id as string,
        module: AuditModules.management.name,
        subModule: AuditModules.management.leaveManagement,
      } as PutApiV1LeaveRequestByIdApiArg).unwrap();

      if (leaveRequestId) {
        // const formData = new FormData();
        // // Ensure attachments are an array
        // const attachmentsArray = Array.isArray(data.attachments)
        //   ? data.attachments
        //   : Array.from(data.attachments); // Convert FileList to an array
        // attachmentsArray.forEach((attachment: File) => {
        //   formData.append("files", attachment, attachment.name);
        // });
        // await uploadAttachment({
        //   modelType: CODE_SETTINGS.modelTypes.ShipmentDocument,
        //   modelId: leaveRequestId,
        //   body: formData,
        // } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
      toast.success(
        `${splitWords(LeaveCategories[category])} leave request updated successfully`,
      );

      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const { data: employeesResponse } = useGetApiV1EmployeeQuery({
    page: 1,
    pageSize: 40,
    module: AuditModules.management.name,
    subModule: AuditModules.management.employeeManagement,
  });

  const employees = employeesResponse?.data ?? [];
  const category = details?.requestCategory as LeaveCategories;

  const employeeOptions = employees?.map((item) => {
    return {
      label: item.firstName + " " + item.lastName,
      value: item?.id,
    };
  }) as Option[];

  const { data: leaveTypesResponse } = useGetApiV1LeaveTypeQuery({
    page: 1,
    pageSize: 40,
    module: AuditModules.management.name,
    subModule: AuditModules.management.leaveTypeConfiguration,
  });

  const leaveTypes = leaveTypesResponse?.data ?? [];

  const leaveTypesOptions = leaveTypes?.map((item) => {
    return {
      label: item.name,
      value: item?.id,
    };
  }) as Option[];

  const isExitPass =
    category.toString() === LeaveCategories.ExitPassRequest.toString();
  const isOfficialDuty =
    category.toString() === LeaveCategories.OfficialDutyRequest.toString();
  const isLeaveOrAbsence = [
    LeaveCategories.LeaveRequest,
    LeaveCategories.AbsenceRequest,
  ].includes(category);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>
            Edit {splitWords(LeaveCategories[category])} Form
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

export default Edit;

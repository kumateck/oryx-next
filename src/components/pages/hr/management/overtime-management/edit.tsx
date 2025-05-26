import { useForm } from "react-hook-form";
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
  CreateOvertimeRequest,
  OvertimeRequestDtoRead,
  useGetApiV1DepartmentQuery,
  useGetApiV1EmployeeDepartmentsByIdQuery,
  useLazyGetApiV1OvertimeRequestsQuery,
  usePutApiV1OvertimeRequestsByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateOvertimeValidator, OvertimeRequestDto } from "./types";
import OvertimeForm from "./form";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: OvertimeRequestDtoRead;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const dispatch = useDispatch();
  const defaultDepartment = {
    label: details?.department?.name as string,
    value: details?.department?.id as string,
  };

  // const defaultEmployees =
  //   details.employees?.map((emp) => ({
  //     label: emp.firstName + " " + emp.lastName,
  //     value: emp.id,
  //   })) || [];

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm<OvertimeRequestDto>({
    resolver: CreateOvertimeValidator,
    mode: "all",
    defaultValues: {
      code: details.code as string,
      overtimeDate: new Date(details.overtimeDate as string),
      departmentId: defaultDepartment,
      startTime: details.startTime as string,
      endTime: details.endTime as string,
      // employeeIds: defaultEmployees,
    },
  });
  const [loadOvertimeRequest] = useLazyGetApiV1OvertimeRequestsQuery();

  const [editOvertimeRequest, { isLoading }] =
    usePutApiV1OvertimeRequestsByIdMutation();

  // const defaultDesignations =
  //   details.designations?.map((dept) => ({
  //     label: dept.name ?? "",
  //     value: dept.id,
  //   })) || [];

  const pageSize = 30;
  const page = 1;

  const { data: departmentResults } = useGetApiV1DepartmentQuery({
    page,
    pageSize,
  });

  const departments = departmentResults?.data ?? [];
  const departmentOptions = departments?.map((department) => ({
    label: department?.name,
    value: department.id,
  })) as Option[];

  const selectedDepartmentId = watch("departmentId")?.value;

  const { data: employeeResultsById } = useGetApiV1EmployeeDepartmentsByIdQuery(
    {
      id: selectedDepartmentId,
    },
  );

  const employeeOptions = employeeResultsById?.map((employee) => ({
    label: employee?.firstName + " " + employee?.lastName,
    value: employee.id,
  })) as Option[];

  const onSubmit = async (data: OvertimeRequestDto) => {
    try {
      const payload = {
        code: data.code as string,
        overtimeDate: data.overtimeDate.toISOString(),
        startTime: data.startTime,
        endTime: data.endTime,
        departmentId: data.departmentId.value,
        // totalNotExceeded: data.totalNotExceeded,
        employeeIds: data.employeeIds.map((e) => e.value),
        justification: data.justification,
      } satisfies CreateOvertimeRequest;
      await editOvertimeRequest({
        id: details.id as string,
        createOvertimeRequest: {
          ...payload,
        },
      }).unwrap();
      toast.success("Overtime request updated successfully");
      dispatch(commonActions.setTriggerReload());
      loadOvertimeRequest({
        page: 1,
        pageSize: 10,
      });
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
          <DialogTitle>Edit Overtime Request</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <OvertimeForm
            register={register}
            control={control}
            errors={errors}
            departmentOptions={departmentOptions}
            employeeOptions={employeeOptions}
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

"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
} from "@/components/ui";
import {
  EMaterialKind,
  EmployeeType,
  ErrorResponse,
  Option,
  isErrorResponse,
} from "@/lib";
import {
  EmployeeDto,
  useGetApiV1DepartmentQuery,
  useGetApiV1DesignationQuery,
  useGetApiV1UserQuery,
  usePutApiV1EmployeeByIdAssignMutation,
} from "@/lib/redux/api/openapi.generated";

import AssignUserForm from "./form";
import { EmployeeInfoRequestDto, EmployeeInfoValidator } from "./type";

interface AssignLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  selectedEmployee: EmployeeDto | null;
  kind?: EMaterialKind;
}

const UserDialog = ({
  open,
  onOpenChange,
  onSuccess,
  selectedEmployee,
}: AssignLocationDialogProps) => {
  const defaultDepartment = useMemo(
    () => ({
      label: selectedEmployee?.department?.name as string,
      value: selectedEmployee?.department?.id as string,
    }),
    [selectedEmployee?.department?.name, selectedEmployee?.department?.id],
  );

  const defaultDesignation = useMemo(
    () => ({
      label: selectedEmployee?.designation?.name as string,
      value: selectedEmployee?.designation?.id as string,
    }),
    [selectedEmployee?.designation?.name, selectedEmployee?.designation?.id],
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeInfoRequestDto>({
    resolver: EmployeeInfoValidator,
    mode: "onSubmit",
    defaultValues: {
      name: selectedEmployee?.fullName as string,
      email: selectedEmployee?.email as string,
      type: selectedEmployee?.type?.toString() as unknown as EmployeeType,
      departmentId: defaultDepartment,
      designationId: defaultDesignation,
      staffId: selectedEmployee?.staffNumber as string,
    },
  });
  const [assignUser, { isLoading }] = usePutApiV1EmployeeByIdAssignMutation();
  console.log("Employee Type", selectedEmployee?.type);
  const pageSize = 30;
  const page = 1;

  const { data: departmentResults } = useGetApiV1DepartmentQuery({
    page,
    pageSize,
  });

  const { data: designationResults } = useGetApiV1DesignationQuery({
    page,
    pageSize,
  });

  const { data: userResults } = useGetApiV1UserQuery({
    page,
    pageSize,
  });
  const departments = departmentResults?.data ?? [];
  const designations = designationResults?.data ?? [];
  const users = userResults?.data ?? [];

  useEffect(() => {
    if (open && selectedEmployee) {
      reset({
        name: selectedEmployee.fullName as string,
        email: selectedEmployee.email as string,
        type: selectedEmployee.type?.toString() as unknown as EmployeeType,
        departmentId: defaultDepartment,
        designationId: defaultDesignation,
        staffId: selectedEmployee.staffNumber as string,
      });
    }
  }, [open, selectedEmployee, reset, defaultDepartment, defaultDesignation]);

  const departmentOptions = departments?.map((department) => ({
    label: department?.name,
    value: department.id,
  })) as Option[];

  const designationOptions = designations?.map((designation) => ({
    label: designation?.name,
    value: designation.id,
  })) as Option[];

  const userOptions = users?.map((user) => ({
    label: `${user?.firstName} ${user?.lastName} `,
    value: user.id,
  })) as Option[];

  const onSubmit = async (data: EmployeeInfoRequestDto) => {
    try {
      if (!selectedEmployee) {
        toast.error("No employee selected");
        return;
      }
      console.log("Data", data);

      const payload = {
        designationId: data.designationId?.value,
        departmentId: data.departmentId?.value,
        staffId: data.staffId,
        reportingManagerId: data.reportingManagerId?.value,
      };

      await assignUser({
        id: selectedEmployee.id as string,
        assignEmployeeDto: payload,
      }).unwrap();

      toast.success("Employee assigned successfully");
      onSuccess();
      handleClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const handleClose = () => {
    reset(); // Reset form values
    onOpenChange(false);
  };

  useEffect(() => {
    if (!open) reset(); // Reset form when closing
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[80vh] min-h-[400px] max-w-2xl flex-col">
        <DialogTitle>Edit Employee Info</DialogTitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto">
            <AssignUserForm
              control={control}
              register={register}
              errors={errors}
              departmentOptions={departmentOptions}
              designationOptions={designationOptions}
              userOptions={userOptions}
            />
          </div>

          {/* Fixed footer */}
          <div className="sticky bottom-0 bg-background pt-4">
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Icon name="Plus" className="h-4 w-4" />
                <span>{isLoading ? "Assigning..." : "Assign"}</span>
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;

// import { useForm } from "react-hook-form";
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
  CreateWarehouseLocationRackRequest,
  WarehouseLocationRackDto,
  useGetApiV1DepartmentQuery,
  useGetApiV1EmployeeQuery,
  useLazyGetApiV1WarehouseRackQuery,
  usePutApiV1WarehouseRackByRackIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateRackValidator, RackRequestDto } from "./types";
import OvertimeForm from "./form";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: WarehouseLocationRackDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [loadLocationRack] = useLazyGetApiV1WarehouseRackQuery();

  const [editRack, { isLoading }] = usePutApiV1WarehouseRackByRackIdMutation();

  // const defaultDesignations =
  //   details.designations?.map((dept) => ({
  //     label: dept.name ?? "",
  //     value: dept.id,
  //   })) || [];

  const defaultLocation = {
    label: details?.warehouseLocation?.name as string,
    value: details?.warehouseLocation?.id as string,
  };
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

  const { data: employeeResults } = useGetApiV1EmployeeQuery({
    page,
    pageSize,
  });

  const employees = employeeResults?.data ?? [];
  const employeeOptions = employees?.map((employee) => ({
    label: employee?.firstName + " " + employee?.lastName,
    value: employee.id,
  })) as Option[];

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RackRequestDto>({
    resolver: CreateRackValidator,
    mode: "all",
    defaultValues: {
      name: details.name as string,
      description: details.description as string,
      locationId: defaultLocation,
    },
  });

  const onSubmit = async (data: RackRequestDto) => {
    try {
      const payload = {
        ...data,
      } satisfies CreateWarehouseLocationRackRequest;
      await editRack({
        rackId: details.id as string,
        createWarehouseLocationRackRequest: payload,
      });
      toast.success("Rack updated successfully");
      loadLocationRack({
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
          <DialogTitle>Edit Rack</DialogTitle>
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

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
import {
  CreateOvertimeRequest,
  NamingType,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useGetApiV1DepartmentQuery,
  useGetApiV1EmployeeDepartmentsByIdQuery,
  useLazyGetApiV1OvertimeRequestsQuery,
  usePostApiV1OvertimeRequestsMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  ErrorResponse,
  GenerateCodeOptions,
  cn,
  generateCode,
  isErrorResponse,
} from "@/lib/utils";

import { CreateOvertimeValidator, OvertimeRequestDto } from "./types";
import OvertimeForm from "./form";
import { CODE_SETTINGS, Option } from "@/lib";
import { useEffect } from "react";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const [loadOvertimeRequests, { isFetching }] =
    useLazyGetApiV1OvertimeRequestsQuery();
  const [createOvertimeRequest, { isLoading }] =
    usePostApiV1OvertimeRequestsMutation();

  const pageSize = 30;
  const page = 1;

  const { data: departmentResults } = useGetApiV1DepartmentQuery({
    page,
    pageSize,
  });

  const [loadDataforCodes] = useLazyGetApiV1OvertimeRequestsQuery();

  const departments = departmentResults?.data ?? [];
  const departmentOptions = departments?.map((department) => ({
    label: department?.name,
    value: department.id,
  })) as Option[];

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
    watch,
  } = useForm<OvertimeRequestDto>({
    resolver: CreateOvertimeValidator,
    mode: "all",
    defaultValues: {
      startTime: "00:00 AM",
      endTime: "00:00 AM",
    },
  });

  const selectedDepartmentId = watch("departmentId")?.value;

  // const { data: employeeResults } = useGetApiV1EmployeeQuery({
  //   page,
  //   pageSize,
  //   department: selectedDepartmentId,
  // });

  const { data: employeeResultsById } = useGetApiV1EmployeeDepartmentsByIdQuery(
    {
      id: selectedDepartmentId,
    },
  );

  const employeeOptions = employeeResultsById?.map((employee) => ({
    label: employee?.firstName + " " + employee?.lastName,
    value: employee.id,
  })) as Option[];

  const { data: codeConfig } =
    useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
      modelType: CODE_SETTINGS.modelTypes.Overtime,
    });

  useEffect(() => {
    loadCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeConfig]);
  const loadCodes = async () => {
    //loadDataforCodes
    const generatePayload: GenerateCodeOptions = {
      maxlength: Number(codeConfig?.maximumNameLength),
      minlength: Number(codeConfig?.minimumNameLength),
      prefix: codeConfig?.prefix as string,
      type: codeConfig?.namingType as NamingType,
    };
    const productsResponse = await loadDataforCodes({
      page: 1,
      pageSize: 1,
    }).unwrap();

    const products = productsResponse?.totalRecordCount ?? 0;
    generatePayload.seriesCounter = products + 1;
    const code = await generateCode(generatePayload);
    setValue("code", code);
  };

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
      await createOvertimeRequest({
        createOvertimeRequest: {
          ...payload,
        },
      }).unwrap();
      toast.success("Overtime request created successfully");
      dispatch(commonActions.setTriggerReload());
      loadOvertimeRequests({
        page: 1,
        pageSize: 10,
      });
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Staff Overtime Request</DialogTitle>
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

            <Button
              variant={"default"}
              className="flex items-center gap-2"
              disabled={isLoading || isFetching}
            >
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading || isFetching,
                })}
              />
              <span>Save</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

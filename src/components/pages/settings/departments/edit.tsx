// import { useForm } from "react-hook-form";
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
import { IsYesorNo } from "@/lib";
import {
  CreateDepartmentRequest,
  DepartmentDto,
  useGetApiV1DepartmentQuery,
  usePutApiV1DepartmentByDepartmentIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import DepartmentForm from "./form";
import { CreateDepartmentValidator, DepartmentRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: DepartmentDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const dispatch = useDispatch();
  const [editDepartment, { isLoading }] =
    usePutApiV1DepartmentByDepartmentIdMutation();
  const { data: departments } = useGetApiV1DepartmentQuery({
    page: 1,
    pageSize: 1000,
  });

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<DepartmentRequestDto>({
    resolver: CreateDepartmentValidator,
    mode: "all",
    defaultValues: {
      description: details.description as string,
      name: details.name as string,
      code: details.code as string,
      type: details.type?.toString() as unknown as IsYesorNo,
      parentDepartmentId: {
        value: details?.parentDepartment?.id as string,
        label: details?.parentDepartment?.name as string,
      },
    },
  });

  const onSubmit = async (data: DepartmentRequestDto) => {
    try {
      const payload = {
        ...data,
        parentDepartmentId: data.parentDepartmentId?.value,
      } satisfies CreateDepartmentRequest;

      await editDepartment({
        departmentId: details.id as string,
        createDepartmentRequest: payload,
      });
      toast.success("Department updated successfully");
      dispatch(commonActions.setTriggerReload());
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  const departmentOptions =
    departments?.data?.map((department) => {
      return {
        value: department.id as string,
        label: department.name as string,
      };
    }) || [];
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <DepartmentForm
            control={control}
            register={register}
            departmentOptions={departmentOptions}
            errors={errors}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button
              disabled={isLoading}
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              disabled={isLoading}
              variant={"default"}
              className="flex items-center gap-2"
            >
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Update Material</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;

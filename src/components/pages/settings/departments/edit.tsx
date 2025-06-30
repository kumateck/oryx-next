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
    },
  });

  const onSubmit = async (data: DepartmentRequestDto) => {
    try {
      const payload = {
        ...data,
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
            errors={errors}
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
              <span>Update Material</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;

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
  CreateDesignationRequest,
  useGetApiV1DepartmentQuery,
  useLazyGetApiV1DesignationQuery,
  usePostApiV1DesignationMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import DesignationForm from "./form";
import { CreateDesignationValidator, DesignationRequestDto } from "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Create = ({ isOpen, onClose }: Props) => {
  const [loadDesignations] = useLazyGetApiV1DesignationQuery();
  const [createDesignation, { isLoading }] = usePostApiV1DesignationMutation();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<DesignationRequestDto>({
    resolver: CreateDesignationValidator,
    mode: "all",
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: DesignationRequestDto) => {
    try {
      const payload = {
        name: data.name,
        description: data.description || "",
        departmentIds: data.departmentIds.map((d) => d.value),
      } satisfies CreateDesignationRequest;

      await createDesignation({
        createDesignationRequest: payload,
      });

      toast.success("Designation created successfully");
      loadDesignations({ page: 1, pageSize: 10 });
      reset();
      onClose();
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const { data: departmentsResponse } = useGetApiV1DepartmentQuery({
    page: 1,
    pageSize: 1000,
  });

  const departmentData = departmentsResponse?.data;
  const departmentsOptions = departmentData?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  }) as Option[];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Designation</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <DesignationForm
            register={register}
            control={control}
            errors={errors}
            departmentOptions={departmentsOptions}
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

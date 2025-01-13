// import { useForm } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { InputTypes, Option } from "@/lib";
import {
  CreateDepartmentRequest,
  DepartmentDto,
  useGetApiV1WarehouseQuery,
  useLazyGetApiV1DepartmentQuery,
  usePutApiV1DepartmentByDepartmentIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateDepartmentValidator, DepartmentRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: DepartmentDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [loadDepartments] = useLazyGetApiV1DepartmentQuery();

  const [editDepartment, { isLoading }] =
    usePutApiV1DepartmentByDepartmentIdMutation();

  // const defaultWarehouse = {
  //   label: details?.warehouse?.name as string,
  //   value: details?.warehouse?.id as string,
  // };
  const defaultWarehouse = details?.warehouses?.map((item) => ({
    value: item.warehouse?.id as string,
    label: item.warehouse?.name as string,
  })) as Option[];
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
      warehouseIds: defaultWarehouse,
      description: details.description as string,
      name: details.name as string,
      code: details.code as string,
    },
  });

  const { data: result } = useGetApiV1WarehouseQuery({
    page: 1,
    pageSize: 100,
  });

  // const warehouse = useWatch<DepartmentRequestDto>({
  //   name: "warehouse",
  //   control,
  // }) as Option;

  //  useEffect(() => {
  //      const response = result?.data?.find((r) => r.id === warehouse?.value);
  //      const warehouseId = response?.id || "";

  //      if (warehouseId && warehouseId !== watch("warehouseIds")) {
  //        setValue("warehouseIds", warehouseIds);
  //      }
  //      // eslint-disable-next-line react-hooks/exhaustive-deps
  //    }, [warehouse, result, setValue]);

  const data = result?.data ?? [];
  const warehouseOptions = data?.map((item) => ({
    label: item?.name,
    value: item?.id,
  })) as Option[];
  console.log(data, "Racks");

  const onSubmit = async (data: DepartmentRequestDto) => {
    try {
      const payload = {
        ...data,
      } satisfies CreateDepartmentRequest;
      console.log("DepartmentID", details.id);
      await editDepartment({
        departmentId: details.id as string,
        createDepartmentRequest: payload,
      });
      toast.success("Department updated successfully");
      loadDepartments({
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
          <DialogTitle>Edit Department</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            config={[
              {
                register: { ...register("code") },
                label: "Department Code",
                readOnly: true,
                required: true,
                description: (
                  <span className="text-sm text-neutral-500">
                    You can’t change the department code
                  </span>
                ),
                placeholder: "Code will be generated",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.code?.message,
                  error: !!errors.code,
                },
              },
              {
                register: { ...register("name") },
                label: "Department Name",
                required: true,
                placeholder: "Enter New Department Name",
                type: InputTypes.TEXT,

                errors: {
                  message: errors.name?.message,
                  error: !!errors.name,
                },
              },
              {
                label: "Warehouse Select",
                control,
                type: InputTypes.MULTIPLE,
                onModal: true,
                name: "warehouse",
                required: true,

                options: warehouseOptions,
                errors: {
                  message: errors.warehouseIds?.message,
                  error: !!errors.warehouseIds,
                },
              },
              {
                register: { ...register("warehouseIds") },
                label: "Warehouse ID",
                readOnly: true,
                required: true,
                placeholder: "Warehouse ID will be automatically selected",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.warehouseIds?.message,
                  error: !!errors.warehouseIds,
                },
              },
              {
                register: { ...register("description") },
                label: "Description",
                required: true,
                placeholder: "Enter New Description",
                type: InputTypes.TEXT,

                errors: {
                  message: errors.description?.message,
                  error: !!errors.description,
                },
              },
            ]}
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

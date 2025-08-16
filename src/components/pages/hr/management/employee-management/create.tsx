import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon, // Icon,
} from "@/components/ui";
import { EmployeeType, Option, WarehouseType } from "@/lib";
import {
  // CreateWarehouseLocationRackRequest,
  useLazyGetApiV1WarehouseLocationQuery,
  // useLazyGetApiV1WarehouseRackQuery,
  usePostApiV1EmployeeRegisterMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse, splitWords } from "@/lib/utils";

import RackForm from "./form";
import { CreateEmployeeValidator, EmployeeRequestDto } from "./types";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  // const [loadEmployees] = useLazyGetApiV1WarehouseRackQuery();
  const [createEmployee, { isLoading }] =
    usePostApiV1EmployeeRegisterMutation();

  const dispatch = useDispatch();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<EmployeeRequestDto>({
    resolver: CreateEmployeeValidator,
    mode: "all",
    defaultValues: {
      employees: [
        {
          employeeType: {
            label: "",
            value: "",
          },
          email: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employees",
  });

  const employmeeTypeOptions = Object.entries(EmployeeType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: String(value),
    }));

  const onSubmit = async (data: EmployeeRequestDto) => {
    try {
      const payload = {
        emailList: data.employees.map((emp) => ({
          email: emp.email,
          employeeType: parseInt(
            emp.employeeType.value,
          ) as unknown as EmployeeType,
        })),
      };
      await createEmployee({
        onboardEmployeeDto: payload,
      }).unwrap();
      toast.success("Employee(s) registered successfully");
      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const [
    loadLocations,
    { isFetching: isFetchingLocation, isLoading: isLoadingLocation },
  ] = useLazyGetApiV1WarehouseLocationQuery();
  const loadDataOrSearch = async (searchQuery: string, page: number) => {
    const res = await loadLocations({
      searchQuery,
      page,
    }).unwrap();
    const options = res?.data?.map((item) => ({
      label:
        item.name +
        `(${splitWords(WarehouseType[item.warehouse?.type as number])})`,
      value: item.id,
    })) as Option[];

    const response = {
      options,
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <DialogContent className="max-w-3xl">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <RackForm
            register={register}
            control={control}
            errors={errors}
            fetchOptions={loadDataOrSearch}
            isLoading={isLoadingLocation || isFetchingLocation}
            fields={fields}
            append={append}
            remove={remove}
            employmeeTypeOptions={employmeeTypeOptions}
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
              <span>Save</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

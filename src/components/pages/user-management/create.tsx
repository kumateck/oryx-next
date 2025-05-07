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
  useGetApiV1EmployeeQuery,
  useGetApiV1RoleQuery,
  useLazyGetApiV1UserQuery,
  usePostApiV1EmployeeUserMutation, // CreateUserRequest,
  // usePostApiV1UserMutation,
} from "@/lib/redux/api/openapi.generated";
import { cn, ErrorResponse, isErrorResponse } from "@/lib/utils";

import { CreateUserValidator, UserRequestDto } from "./types";
import UserForm from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [loadUsers] = useLazyGetApiV1UserQuery();
  const [createUser, { isLoading }] = usePostApiV1EmployeeUserMutation();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<UserRequestDto>({
    resolver: CreateUserValidator,
    mode: "all",
  });

  const onSubmit = async (data: UserRequestDto) => {
    try {
      console.log(data);
      const payload = {
        employeeId: data.employeeId.value,
        roleName: data.roleId.value,
      };
      await createUser({
        employeeUserDto: payload,
      }).unwrap();
      toast.success("User created successfully");
      loadUsers({
        page: 1,
        pageSize: 10,
      });
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const { data: employeesResponse } = useGetApiV1EmployeeQuery({
    page: 1,
    pageSize: 100,
  });

  const employees = employeesResponse?.data ?? [];
  const employeeOptions = employees?.map((item) => {
    return {
      label: item.firstName + " " + item.lastName,
      value: item?.id,
    };
  }) as Option[];

  const { data: rolesResponse } = useGetApiV1RoleQuery();

  const roleOptions = rolesResponse?.map((item) => {
    return {
      label: item.displayName,
      value: item?.name,
    };
  }) as Option[];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <UserForm
            register={register}
            control={control}
            errors={errors}
            roleOptions={roleOptions}
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
              <span>Save</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

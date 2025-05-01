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
  UpdateUserRoleRequest,
  useGetApiV1EmployeeQuery,
  useGetApiV1RoleQuery,
  useLazyGetApiV1UserQuery,
  usePutApiV1UserRoleByIdMutation,
  UserWithRoleDto, // CreateUserRequest,
  // usePostApiV1UserMutation,
} from "@/lib/redux/api/openapi.generated";
import { cn, ErrorResponse, isErrorResponse } from "@/lib/utils";

import { CreateUserValidator, UserRequestDto } from "./types";
import EditRoleForm from "./edit-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: UserWithRoleDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [loadUsers] = useLazyGetApiV1UserQuery();
  const [createUser, { isLoading }] = usePutApiV1UserRoleByIdMutation();
  const defaultEmployee = {
    label: (details?.firstName + " " + details.lastName) as string,
    value: details?.id as string,
  };

  const defaultRole = {
    label: details?.roles?.[0].name as string,
    value: details?.roles?.[0].id as string,
  };

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<UserRequestDto>({
    resolver: CreateUserValidator,
    mode: "all",
    defaultValues: {
      employeeId: defaultEmployee,
      roleId: defaultRole,
    },
  });

  const onSubmit = async (data: UserRequestDto) => {
    try {
      console.log(data);
      const payload = {
        roleNames: [data.roleId.value],
      } satisfies UpdateUserRoleRequest;
      await createUser({
        updateUserRoleRequest: payload,
        id: details.id as string,
      }).unwrap();
      toast.success("User updated successfully");
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
      label: item.fullName,
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
          <EditRoleForm
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

export default Edit;

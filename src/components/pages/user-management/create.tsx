import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
  EmployeeDtoRead,
  useGetApiV1EmployeeQuery,
  useGetApiV1RoleQuery,
  // useLazyGetApiV1UserQuery,
  usePostApiV1EmployeeUserMutation, // CreateUserRequest,
  // usePostApiV1UserMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  cn,
  ErrorResponse,
  fullname,
  getInitials,
  isErrorResponse,
} from "@/lib/utils";

import { CreateUserValidator, UserRequestDto } from "./types";
import UserForm from "./form";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [user, setUser] = useState<EmployeeDtoRead | null>(null);

  const dispatch = useDispatch();
  const [createUser, { isLoading }] = usePostApiV1EmployeeUserMutation();

  const {
    register,
    control,
    setValue,
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
        roleId: data.roleId.value,
      };
      await createUser({
        employeeUserDto: payload,
      }).unwrap();
      toast.success("User created successfully");
      dispatch(commonActions.setTriggerReload());
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const { data: employeesResponse } = useGetApiV1EmployeeQuery({
    page: 1,
    pageSize: 1000,
  });
  const employees = employeesResponse?.data ?? [];

  const { data: rolesResponse } = useGetApiV1RoleQuery({});

  const roleOptions = rolesResponse?.map((item) => {
    return {
      label: item.displayName,
      value: item?.id,
    };
  }) as Option[];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          {user && (
            <Avatar className="rounded-lg size-16">
              <AvatarImage src={user?.avatar ?? ""} alt="@evilrabbit" />
              <AvatarFallback>
                {getInitials(
                  fullname(user?.firstName ?? "", user?.lastName ?? ""),
                )}
              </AvatarFallback>
            </Avatar>
          )}
        </DialogHeader>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <UserForm
            register={register}
            control={control}
            setUser={setUser}
            setValue={setValue}
            errors={errors}
            roleOptions={roleOptions}
            employees={employees}
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

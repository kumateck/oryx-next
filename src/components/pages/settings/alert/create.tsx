import { Icon } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AlertForm from "./form";
import {
  CreateAlertRequest,
  usePostApiV1AlertMutation,
  useGetApiV1RoleQuery,
  useLazyGetApiV1UserRoleByRoleIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { useForm } from "react-hook-form";
import { CreateAlertDto, CreateAlertDtoValidator } from "./types";
import { useEffect, useState } from "react";
import { Option } from "@/lib";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

interface CreateAlertProps {
  open: boolean;
  onClose: () => void;
}
export function CreateAlert({ open, onClose }: CreateAlertProps) {
  const [createAlert, { isLoading }] = usePostApiV1AlertMutation();
  const [usersOptions, setUsersOptions] = useState<Option[]>([]);
  const { data: rolesData } = useGetApiV1RoleQuery({});
  const dispatch = useDispatch();
  const [getUsersByRoleId] = useLazyGetApiV1UserRoleByRoleIdQuery();
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<CreateAlertDto>({
    resolver: CreateAlertDtoValidator,
  });

  const onSubmit = async (data: CreateAlertDto) => {
    const payload: CreateAlertRequest = {
      title: data.title,
      notificationType: data.notificationType,
      roleIds: data.roleIds.map((role) => role.value),
      userIds: data.userIds.map((user) => user.value),
      alertTypes: data.alertType,
      timeFrame: data.timeFrame,
    };
    await createAlert({
      createAlertRequest: payload,
    });
    dispatch(commonActions.unSetTriggerReload());
  };
  // Watch the roleIds to fetch users when roles change
  const roleIds = watch("roleIds");
  // If roleIds change, fetch users for the first role
  useEffect(() => {
    if (!roleIds || roleIds.length === 0) {
      setUsersOptions([]);
      return;
    }
    fetchUsersForRoles(roleIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleIds, getUsersByRoleId]);

  //watch all values of the form
  const watchAllFields = watch();

  useEffect(() => {
    console.log("Form Values Changed:", watchAllFields);
  }, [watchAllFields]);

  //function to fetch users for all selected roles
  const fetchUsersForRoles = async (
    roleIds: { value: string; label: string }[],
  ) => {
    const users: Option[] = [];
    for (const roleId of roleIds) {
      const { data } = await getUsersByRoleId({ roleId: roleId.value });
      if (data) {
        users.push(
          ...data
            .filter((user) => typeof user.id === "string" && user.id)
            .map((user) => ({
              value: user.id as string,
              label: `${user.firstName} ${user.lastName}` as string,
            })),
        );
      }
    }
    setUsersOptions(users);
  };

  const roleOptions =
    rolesData?.map((role) => ({
      value: role.id as string,
      label: role.name as string,
    })) || [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Alert</DialogTitle>
          </DialogHeader>
          <AlertForm
            errors={errors}
            register={register}
            control={control}
            roleOptions={roleOptions}
            usersOptions={usersOptions}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">
              {isLoading && <Icon name="LoaderCircle" />} <span>Save</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

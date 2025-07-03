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
  NotificationType,
  useGetApiV1RoleQuery,
  useLazyGetApiV1UserRoleByRoleIdQuery,
  usePutApiV1AlertByAlertIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { useForm } from "react-hook-form";
import { CreateAlertDto, CreateAlertDtoValidator } from "./types";
import { AlertType, Option } from "@/lib";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";

interface CreateAlertProps {
  open: boolean;
  onClose: () => void;
  details: CreateAlertDto;
  id: string;
}
export function EditAlert({ open, onClose, details, id }: CreateAlertProps) {
  const [editAlert, { isLoading }] = usePutApiV1AlertByAlertIdMutation();
  const [usersOptions, setUsersOptions] = useState<Option[]>([]);
  const [getUsersByRoleId] = useLazyGetApiV1UserRoleByRoleIdQuery();
  const dispatch = useDispatch();
  console.log("EditAlert", details);
  const { data: rolesData, isLoading: isLoadingRoles } = useGetApiV1RoleQuery(
    {},
  );
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<CreateAlertDto>({
    resolver: CreateAlertDtoValidator,
    // defaultValues: { ...details },
  });

  const onSubmit = async (data: CreateAlertDto) => {
    try {
      const payload: CreateAlertRequest = {
        title: data.title,
        notificationType: data.notificationType.value as NotificationType,
        roleIds: data.roleIds.map((role) => role.value),
        userIds: data.userIds.map((user) => user.value),
        alertTypes: data.alertType.map((type) => type.value as AlertType),
        timeFrame: data.timeFrame,
      };
      await editAlert({
        alertId: id,
        createAlertRequest: payload,
      });
      toast.success("Alert edited successfully");
      onClose();
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      console.error("Error editing alert:", error);
      toast.error("Failed to edit alert");
    }
  };
  console.log("EditAlert", rolesData);
  // Watch the roleIds to fetch users when roles change
  const roleIds = watch("roleIds");
  const debouncedRoleIds = useDebounce(roleIds, 500);
  // If roleIds change, fetch users for the first role
  useEffect(() => {
    if (!debouncedRoleIds || debouncedRoleIds.length === 0) {
      setUsersOptions([]);
      return;
    }
    //delay for 3 seconds
    fetchUsersForRoles(debouncedRoleIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRoleIds, getUsersByRoleId]);

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
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="py-4">
            <DialogTitle>Edit Alert</DialogTitle>
          </DialogHeader>
          <AlertForm
            errors={errors}
            register={register}
            control={control}
            roleOptions={roleOptions}
            usersOptions={usersOptions}
          />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading || isLoadingRoles} type="submit">
              {isLoading && <Icon name="LoaderCircle" />}{" "}
              <span>Save changes</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

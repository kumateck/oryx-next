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
  AlertType,
  CreateAlertRequest,
  NotificationType,
  useGetApiV1RoleQuery,
  useGetApiV1UserQuery,
  usePutApiV1AlertByAlertIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { useForm } from "react-hook-form";
import { CreateAlertDto, CreateAlertDtoValidator } from "./types";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

interface CreateAlertProps {
  open: boolean;
  onClose: () => void;
  details: CreateAlertDto;
  id: string;
  isUpdateRecipient?: boolean;
}
//TODO: COMPLETE THIS PAGE
export function AlertRecipient({
  open,
  onClose,
  details,
  id,
  isUpdateRecipient,
}: CreateAlertProps) {
  const [editAlert, { isLoading }] = usePutApiV1AlertByAlertIdMutation();
  const { data: usersData } = useGetApiV1UserQuery({});
  const dispatch = useDispatch();
  console.log("EditAlert", details);
  const { data: rolesData, isLoading: isLoadingRoles } = useGetApiV1RoleQuery(
    {},
  );
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<CreateAlertDto>({
    resolver: CreateAlertDtoValidator,
    defaultValues: {
      alertType: details.alertType,
      title: details.title,
      notificationType: details.notificationType,
      roleIds: details.roleIds,
      userIds: details.userIds,
      timeFrame: details.timeFrame?.split(" ")[0],
    },
  });

  const onSubmit = async (data: CreateAlertDto) => {
    try {
      const payload: CreateAlertRequest = {
        title: data.title,
        notificationType: data.notificationType.value as NotificationType,
        roleIds: data?.roleIds?.map((role) => role.value) || [],
        userIds: data?.userIds?.map((user) => user.value) || [],
        alertTypes: data.alertType.map(
          (type) => Number(type.value) as AlertType,
        ),
        timeFrame: data.timeFrame,
      };
      await editAlert({
        alertId: id,
        createAlertRequest: payload,
      }).unwrap();
      toast.success("Alert edited successfully");
      onClose();
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      console.error("Error editing alert:", error);
      toast.error("Failed to edit alert");
    }
  };

  // formatted roles data to match the expected format
  const roleOptions =
    rolesData?.map((role) => ({
      value: role.id as string,
      label: role.name as string,
    })) || [];
  //Formated users data to match the expected format
  const usersOptions =
    usersData?.data?.map((user) => ({
      value: user.id as string,
      label: `${user.firstName} ${user.lastName}` as string,
    })) || [];

  const alertType =
    (details?.roleIds?.length ?? 0) > 0
      ? "roles"
      : (details?.userIds?.length ?? 0) > 0
        ? "users"
        : "roles";

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
            isUpdateRecipient={isUpdateRecipient}
            alertType={alertType}
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

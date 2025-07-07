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
  NotificationType,
  AlertType,
  useGetApiV1UserQuery,
} from "@/lib/redux/api/openapi.generated";
import { useForm } from "react-hook-form";
import { CreateAlertDto, CreateAlertDtoValidator } from "./types";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import { ErrorResponse, isErrorResponse } from "@/lib";
import { toast } from "sonner";

interface CreateAlertProps {
  open: boolean;
  onClose: () => void;
  alertType: "roles" | "users";
}
export function CreateAlert({ open, onClose, alertType }: CreateAlertProps) {
  const [createAlert, { isLoading }] = usePostApiV1AlertMutation();
  const { data: rolesData } = useGetApiV1RoleQuery({});
  const dispatch = useDispatch();
  const { data: usersData } = useGetApiV1UserQuery({});
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateAlertDto>({
    resolver: CreateAlertDtoValidator,
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
        timeFrame: data.timeFrame?.split(" ")[0],
      };
      const result = await createAlert({
        createAlertRequest: payload,
      });
      if (!result.error) {
        onClose();
        toast.success("Alert created successfully");
        // Reset the form
        reset();
        dispatch(commonActions.unSetTriggerReload());
        return;
      }
      console.log("Error creating alert:", result.error);
      toast.error("Failed to create alert");
    } catch (error) {
      console.log("Error creating alert:", error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const roleOptions =
    rolesData?.map((role) => ({
      value: role.id as string,
      label: role.name as string,
    })) || [];
  const usersOptions =
    usersData?.data?.map((user) => ({
      value: user.id as string,
      label: `${user.firstName} ${user.lastName}` as string,
    })) || [];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="py-4">
            <DialogTitle>New Alert</DialogTitle>
          </DialogHeader>
          <AlertForm
            alertType={alertType}
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
            <Button disabled={isLoading} type="submit">
              {isLoading && <Icon name="LoaderCircle" />} <span>Save</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
  useGetApiV1RoleQuery,
  usePutApiV1AlertByAlertIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { useForm } from "react-hook-form";
import { CreateAlertDto, CreateAlertDtoValidator } from "./types";
import { Option } from "@/lib";

interface CreateAlertProps {
  open: boolean;
  onClose: () => void;
  details: CreateAlertDto;
  alertId: string;
}
export function EditAlert({
  open,
  onClose,
  details,
  alertId,
}: CreateAlertProps) {
  const [editAlert, { isLoading }] = usePutApiV1AlertByAlertIdMutation();
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
    defaultValues: { ...details },
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
    await editAlert({
      alertId: alertId,
      createAlertRequest: payload,
    });
  };
  console.log("EditAlert", rolesData);
  const roleOptions =
    (rolesData?.map((role) => ({
      value: role.id as string,
      label: role.name as string,
    })) as Option[]) || [];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Alert</DialogTitle>
          </DialogHeader>
          <AlertForm
            errors={errors}
            register={register}
            control={control}
            roleOptions={roleOptions}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading || isLoadingRoles} type="submit">
              {isLoading && <Icon name="LoaderCircle" />}{" "}
              <span>Save changes</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

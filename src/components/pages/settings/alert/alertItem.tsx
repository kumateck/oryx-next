import {
  Button,
  ConfirmDeleteDialog,
  DropdownMenuItem,
  Icon,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import {
  AlertDto,
  useDeleteApiV1AlertByIdMutation,
  usePutApiV1AlertByIdToggleDisableMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  alertTypeLabels,
  CreateAlertDto,
  NotificationTypeLabels,
} from "./types";
import { ErrorResponse, isErrorResponse, NotificationType } from "@/lib";
import { TableMenuAction } from "@/shared/table-menu";
import { useState } from "react";
import { EditAlert } from "./edit";
import { format } from "date-fns";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

interface AlertItemProps {
  alert: AlertDto;
}

export const AlertItem = ({ alert }: AlertItemProps) => {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openAddRecipient, setOpenAddRecipient] = useState(false);
  const [deleteAlert] = useDeleteApiV1AlertByIdMutation({});

  const [selectedAlert, setSelectedAlert] = useState<CreateAlertDto>(
    {} as CreateAlertDto,
  );
  const [toggleAlert] = usePutApiV1AlertByIdToggleDisableMutation({});
  const dispatch = useDispatch();

  return (
    <div
      key={alert.id}
      className="grid w-full grid-cols-12 rounded-lg shadow-md px-2 py-3 bg-white"
    >
      {open && (
        <EditAlert
          open={open}
          onClose={() => setOpen(false)}
          id={alert.id as string}
          details={selectedAlert}
        />
      )}
      {openAddRecipient && (
        <EditAlert
          open={openAddRecipient}
          onClose={() => setOpenAddRecipient(false)}
          id={alert.id as string}
          details={selectedAlert}
          isUpdateRecipient={true}
        />
      )}
      {isDelete && (
        <ConfirmDeleteDialog
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={async () => {
            try {
              const result = await deleteAlert({ id: alert.id as string });
              if (!result.error) {
                toast.success("Alert deleted successfully");
                // Reset the form
                dispatch(commonActions.unSetTriggerReload());
                return;
              }
              console.log("Error deleting alert:", result.error);
              toast.error("Failed to delete alert");
            } catch (error) {
              toast.error(isErrorResponse(error as ErrorResponse)?.description);
            } finally {
              setIsDelete(false);
            }
          }}
        />
      )}
      <div className="col-span-3 place-content-center">
        <div className="flex w-full items-center gap-2">
          <Switch
            onClick={async () => {
              try {
                await toggleAlert({ id: alert.id as string });
                toast.success(
                  `Alert ${alert.isDisabled ? "enabled" : "disabled"} successfully`,
                );
                dispatch(commonActions.setTriggerReload());
              } catch (error) {
                console.error("Error toggling alert:", error);
                toast.error("Failed to toggle alert");
              }
            }}
            checked={!alert.isDisabled}
            className="h-4 w-7"
          />
          <span className="ml-1 capitalize text-sm">
            {
              NotificationTypeLabels[
                alert?.notificationType as NotificationType
              ]
            }
          </span>
        </div>
      </div>
      <div className="col-span-4 place-content-center">
        <div className="flex items-center justify-start">
          <Icon name="User" className="size-4 text-gray-600" />
          <div className="ml-1 flex items-center capitalize text-sm">
            {alert.roles && alert.roles.length ? alert.roles[0].name : ""}
            {alert.roles && alert.roles.length > 1 && (
              <span className="text-gray-500 flex items-center justify-center w-fit">
                <span>+</span> {alert.roles.length - 1}
              </span>
            )}
            {alert.users && alert.users.length
              ? `${alert.users[0].firstName} ${alert.users[0].lastName}`
              : ""}
            {alert.users && alert.users.length > 1 && (
              <span className="text-gray-500 flex items-center justify-center w-fit">
                <span>+</span> {alert.users.length - 1}
              </span>
            )}
            {alert?.users?.length === 0 && alert?.roles?.length === 0 && (
              <span className="text-gray-500 text-sm">No recipients</span>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-2 place-content-center">
        <div className="flex items-center justify-start">
          <Icon name="Calendar" className="size-4 text-gray-600" />
          {/* TODO: add alert frequency when needed */}
          <span className="ml-1 capitalize text-sm">
            {alert?.createdAt
              ? format(alert.createdAt, "MMMM do, yyyy")
              : "N/A"}
          </span>
        </div>
      </div>
      <div className="col-span-2 place-content-center">
        <div className="flex items-center justify-start">
          <Icon name="SendHorizontal" className="size-4  text-gray-600" />
          <div className="ml-2 capitalize text-sm space-x-2">
            {alert?.alertTypes?.map((type) => (
              <span key={type}>
                {alertTypeLabels[type]?.split("-").join(" ")}
              </span>
            )) || "N/A"}
          </div>
        </div>
      </div>
      <div className="col-span-1 place-content-center">
        <TableMenuAction>
          {!alert.isConfigurable && (
            <DropdownMenuItem asChild>
              <Button
                onClick={() => {
                  setSelectedAlert({
                    title: alert.title as string,
                    notificationType: {
                      value: alert.notificationType as NotificationType,
                      label:
                        NotificationTypeLabels[
                          alert.notificationType as NotificationType
                        ],
                    },
                    roleIds: (alert.roles ?? []).map((role) => ({
                      value: role.id as string,
                      label: role.name as string,
                    })),
                    userIds: (alert?.users ?? []).map((user) => ({
                      value: user.id as string,
                      label: `${user.firstName} ${user.lastName}` as string,
                    })),
                    alertType: (alert.alertTypes ?? [])
                      .map((type) => ({
                        value: String(type),
                        label: alertTypeLabels[type],
                      }))
                      .slice(0, 2),
                    timeFrame: alert.timeFrame ?? "",
                  });
                  setOpenAddRecipient(true);
                }}
                variant="ghost"
                className="w-full px-2 flex items-center justify-start"
              >
                <Icon name="RefreshCw" className="h-5 w-5 cursor-pointer" />
                <span className="">Add or remove recipients</span>
              </Button>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Button
              disabled={!alert.isConfigurable}
              onClick={() => {
                setSelectedAlert({
                  title: alert.title as string,
                  notificationType: {
                    value: alert.notificationType as NotificationType,
                    label:
                      NotificationTypeLabels[
                        alert.notificationType as NotificationType
                      ],
                  },
                  roleIds: (alert.roles ?? []).map((role) => ({
                    value: role.id as string,
                    label: role.name as string,
                  })),
                  userIds: (alert?.users ?? []).map((user) => ({
                    value: user.id as string,
                    label: `${user.firstName} ${user.lastName}` as string,
                  })),
                  alertType: (alert.alertTypes ?? [])
                    .map((type) => ({
                      value: String(type),
                      label: alertTypeLabels[type],
                    }))
                    .slice(0, 2), // Limit to 2 alert types
                  timeFrame: alert.timeFrame ?? "",
                });
                setOpen(true);
              }}
              variant="ghost"
              className="w-full px-2 flex items-center justify-start"
            >
              <Icon name="Pencil" className="h-5 w-5 cursor-pointer" />
              <span className="">Edit</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  className="w-full"
                  disabled={!alert.isDisabled || !alert.isConfigurable}
                  onClick={() => setIsDelete(true)}
                >
                  <Icon name="Trash" className="h-5 w-5 cursor-pointer" />
                  <span className="">Delete</span>
                </Button>
              </TooltipTrigger>
              {(!alert.isDisabled || !alert.isConfigurable) && (
                <TooltipContent
                  side="bottom"
                  className="bg-orange-100 w-72 flex"
                >
                  <Icon name="Info" className="text-orange-600 size-5 mr-2" />
                  <span className="text-orange-600 font-medium">
                    {!alert.isDisabled
                      ? "This Alert cannot be deleted because it is currently active."
                      : "This Alert cannot be deleted because it is configured in the system."}
                  </span>
                  <Icon
                    name="X"
                    className="text-orange-600 size-5 ml-auto cursor-pointer"
                  />
                </TooltipContent>
              )}
            </Tooltip>
          </DropdownMenuItem>
        </TableMenuAction>
      </div>
    </div>
  );
};

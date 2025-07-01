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
import { AlertDto } from "@/lib/redux/api/openapi.generated";
import { alertTypeLabels, NotificationTypeLabels } from "./types";
import { AlertType, NotificationType } from "@/lib";
import { TableMenuAction } from "@/shared/table-menu";
import { useState } from "react";
import { EditAlert } from "./edit";
import { format } from "date-fns";

interface AlertItemProps {
  alert: AlertDto;
}

export const AlertItem = ({ alert }: AlertItemProps) => {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  return (
    <div
      key={alert.id}
      className="grid w-full grid-cols-12 rounded-lg shadow-md px-2 py-3 bg-white"
    >
      {open && (
        <EditAlert
          open={open}
          onClose={() => setOpen(false)}
          details={{
            title: alert.title as string,
            notificationType: alert.notificationType as NotificationType,
            roleIds: (alert.roles ?? []).map((role) => {
              return {
                value: role.id as string,
                label: role.name as string,
              };
            }),
            userIds: (alert.users ?? []).map((user) => ({
              value: user.id as string,
              label: `${user.firstName} ${user.lastName}` as string,
            })),
            alertType: (alert.alertTypes ?? []).map(
              (type) => type as AlertType,
            ),
            timeFrame: alert.timeFrame as string,
          }}
          alertId={alert.id as string}
        />
      )}
      {isDelete && (
        <ConfirmDeleteDialog
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={async () => {
            //TODO: Implement delete alert functionality
          }}
        />
      )}
      <div className="col-span-4 place-content-center">
        <div className="flex w-full items-center">
          <Switch checked={alert.isDisabled} className="h-4 w-7" />
          <span className="ml-1 capitalize text-sm">
            {
              NotificationTypeLabels[
                alert?.notificationType as NotificationType
              ]
            }
          </span>
        </div>
      </div>
      <div className="col-span-2 place-content-center">
        <div className="flex items-center justify-start">
          <Icon name="User" className="size-4 text-gray-600" />
          <span className="ml-1 capitalize text-sm">
            {alert.roles && alert.roles.length
              ? alert.roles[0].name
              : "No Role"}
            {alert.roles && alert.roles.length > 1 && (
              <div className="text-gray-500 flex items-center justify-center w-fit">
                ,<span>+</span> {alert.roles.length - 1}
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="col-span-3 place-content-center">
        <div className="flex items-center justify-start">
          <Icon name="Calendar" className="size-4 text-gray-600" />
          {/* TODO: add alert frequency */}
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
          <div className="ml-2 capitalize text-sm space-x-1">
            {alert?.alertTypes?.map((type) => (
              <span key={type}>{alertTypeLabels[type]}</span>
            )) || "N/A"}
          </div>
        </div>
      </div>
      <div className="col-span-1 place-content-center">
        <TableMenuAction>
          <DropdownMenuItem>
            <Button
              onClick={() => setOpen(true)}
              variant="ghost"
              className="p-1"
            >
              <Icon name="Pencil" className="h-5 w-5 cursor-pointer" />
              <span className="">Edit</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Tooltip delayDuration={0}>
              <TooltipTrigger disabled={alert.isDisabled} asChild>
                <Button
                  variant="ghost"
                  className="p-1"
                  disabled={alert.isDisabled}
                  onClick={() => setIsDelete(true)}
                >
                  <Icon name="Trash" className="h-5 w-5 cursor-pointer" />
                  <span className="">Delete</span>
                </Button>
              </TooltipTrigger>
              {alert.isDisabled && (
                <TooltipContent
                  side="bottom"
                  className="bg-orange-100 w-72 flex"
                >
                  <Icon name="Info" className="text-orange-600 size-5 mr-2" />
                  <span className="text-orange-600 font-medium">
                    This Alert cannot be deleted because it is currently active.
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

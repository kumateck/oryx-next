import {
  Button,
  DropdownMenuItem,
  Icon,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { AlertDto } from "@/lib/redux/api/openapi.generated";
import { alertTypeLabels, NotificationTypeLabels } from "./types";
import { NotificationType } from "@/lib";
import { TableMenuAction } from "@/shared/table-menu";

interface AlertItemProps {
  alert: AlertDto;
}

export const AlertItem = ({ alert }: AlertItemProps) => {
  return (
    <div
      key={alert.id}
      className="grid w-full grid-cols-12 rounded-lg shadow-md px-2 py-3 bg-white"
    >
      <div className="col-span-3 place-content-center">
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
      <div className="col-span-4 place-content-center">
        <div className="flex items-center justify-start">
          <Icon name="User" className="size-5 text-gray-600" />
          <span className="ml-1 capitalize text-sm">{alert.title}</span>
        </div>
      </div>
      <div className="col-span-3 place-content-center">
        <div className="flex items-center justify-start">
          <Icon name="User" className="size-5 text-gray-600" />
          <span className="ml-1 capitalize text-sm">{alert.title}</span>
        </div>
      </div>
      <div className="col-span-1 place-content-center">
        <div className="flex items-center justify-start">
          <Icon name="SendHorizontal" className="size-5  text-gray-600" />
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
            <Button variant="ghost" className="p-1">
              <Icon name="Pencil" className="h-5 w-5 cursor-pointer" />
              <span className="">Edit</span>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Tooltip delayDuration={0}>
              <TooltipTrigger disabled={alert.isDisabled} asChild>
                <Button>
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

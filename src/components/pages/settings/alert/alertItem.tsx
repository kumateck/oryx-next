import {
  Icon,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { AlertDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { alertTypeLabels, NotificationTypeLabels } from "./types";
import { NotificationType } from "@/lib";

interface AlertItemProps {
  alert: AlertDto;
}

export const AlertItem = ({ alert }: AlertItemProps) => {
  return (
    <div
      key={alert.id}
      className="grid w-full grid-cols-11 rounded-lg shadow-md px-2 py-3 bg-white"
    >
      <div className="col-span-2 place-content-center">
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
      <div className="col-span-3 place-content-center">
        <div className="flex items-center justify-start">
          <Icon name="User" className="size-5 text-gray-600" />
          <span className="ml-1 capitalize text-sm">{alert.title}</span>
        </div>
      </div>
      <div className="col-span-1 place-content-center">
        <div className="flex items-center justify-start">
          <Icon name="Clock" className="size-5 text-gray-600" />
          <span className="ml-1 capitalize text-sm">{alert.timeFrame}</span>
        </div>
      </div>
      <div className="col-span-2 place-content-center">
        <div className="flex items-center justify-start">
          <Icon name="Calendar" className="size-5 text-gray-600" />
          <span className="ml-1 text-sm">
            {alert.createdAt && format(alert?.createdAt, "MMM dd, yyyy")}
          </span>
        </div>
      </div>
      <div className="col-span-2 place-content-center">
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
        <div className="flex items-center justify-end">
          <Icon name="Pencil" className="size-5 cursor-pointer" />
          <Tooltip delayDuration={0}>
            <TooltipTrigger disabled={alert.isDisabled} asChild>
              <Icon
                name="Trash"
                className="text-red-500 ml-2 size-5 cursor-pointer"
              />
            </TooltipTrigger>
            {!alert.isDisabled && (
              <TooltipContent side="bottom" className="bg-orange-100 w-72 flex">
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
        </div>
      </div>
    </div>
  );
};

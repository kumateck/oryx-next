import { Icon, Switch } from "@/components/ui";
import { AlertDto } from ".";
import { format } from "date-fns";

interface AlertItemProps {
  alert: AlertDto;
}

export const AlertItem = ({ alert }: AlertItemProps) => {
  return (
    <div key={alert.id} className="grid w-full grid-cols-11 rounded-lg shadow-md px-2 py-3 bg-white">
      <div className="col-span-2">
        <div className="flex w-full items-center">
          <Switch checked={alert.isDisabled} className="h-4 w-7" />
          <span className="ml-2 capitalize text-sm font-medium">
            {alert.modelType}
          </span>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex items-center justify-start">
          <Icon name="User" className="size-4 text-gray-600" />
          <span className="ml-1 capitalize text-sm">{`${alert.createdBy.firstName} ${alert.createdBy.lastName}`}</span>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex items-center justify-start">
          <Icon name="Clock" className="size-4 text-gray-600" />
          <span className="ml-1 capitalize text-sm">{alert.timeFrame}</span>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex items-center justify-start">
          <Icon name="Calendar" className="size-4 text-gray-600" />
          <span className="ml-1 text-sm">
            {format(alert.createdAt, "MMM dd, yyyy")}
          </span>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex items-center justify-start">
          <Icon name="SendHorizontal" className="size-4 text-gray-600" />
          <span className="ml-1 capitalize text-sm">{alert.alertType}</span>
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex items-center justify-end">
          <Icon name="Pencil" className="size-5 cursor-pointer" />
          <Icon name="Trash" className="text-red-500 ml-2 size-5 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

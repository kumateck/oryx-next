import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

// type Props = React.ComponentProps<typeof Calendar>;
type Props = React.ComponentProps<typeof Calendar> & {
  open: boolean;
  onToggle: () => void;
};
export function DatePicker(props: Props): JSX.Element {
  return (
    <Popover open={props.open}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => props.onToggle()}
          className={cn(
            "h-10 w-full justify-between border-gray-300 bg-white px-3 py-2.5 text-left font-normal",
            !props.selected && "text-muted-foreground",
            props.className,
          )}
          size="sm"
          variant="outline"
        >
          <div className="text-muted-foreground text-sm">
            {props.selected ? (
              format(new Date(props.selected as unknown as string), "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </div>
          <CalendarIcon className="mr-0 h-4 w-4 text-primary-500" size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="my-2 w-fit bg-white p-0"
      >
        <Calendar
          captionLayout="dropdown-buttons"
          fromYear={1900}
          initialFocus
          toYear={new Date().getFullYear()}
          {...props}
        />
        <div className="px-3">
          <hr className="" />
        </div>
        <div className="flex gap-3 p-5">
          <Button
            onClick={() => props.onToggle()}
            className="flex-grow"
            variant="outline"
          >
            Cancel
          </Button>
          <Button onClick={() => props.onToggle()} className="flex-grow">
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

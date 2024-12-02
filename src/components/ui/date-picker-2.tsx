import { format } from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Calendar2, CalendarProps2 } from "./calendar-2";
import { Icon } from "./icon";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Separator } from "./separator";

interface Props extends CalendarProps2 {
  className?: string;
  open: boolean;
  onToggle: () => void;
}
export function DatePicker2(props: Props): JSX.Element {
  return (
    // <Popover>
    //   <PopoverTrigger asChild className="">
    //     <Input
    //       readOnly
    //       value={
    //         value
    //           ? format(new Date(value as unknown as string), "PPP")
    //           : "Pick a date"
    //       }
    //       suffix="CalendarDays"
    //       className={className}
    //     />
    //   </PopoverTrigger>
    //   <PopoverContent
    //     className="w-full "
    //     sideOffset={0}
    //     align="start"
    //     alignOffset={0}
    //   >
    //     <Calendar2 className={"group"} value={value} onChange={onChange} />
    //   </PopoverContent>
    // </Popover>
    <Popover open={props.open}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => props.onToggle()}
          className={cn(
            "h-10 w-full justify-between border-gray-300 bg-white px-3 py-2.5 text-left font-normal",
            !props.value && "text-muted-foreground",
            props.className,
          )}
          size="sm"
          variant="outline"
        >
          <div className="text-muted-foreground text-sm">
            {props.value ? (
              format(new Date(props.value as unknown as string), "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </div>
          <Icon
            name="CalendarDays"
            className="mr-0 h-4 w-4 text-primary-500"
            size={20}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        alignOffset={0}
        sideOffset={0}
        side="bottom"
        align="start"
        className="my-2 w-fit bg-white p-2"
      >
        <Calendar2 {...props} />
        <div className="px-3">
          <Separator className="my-2" />
        </div>
        <div className="flex justify-end gap-3 pt-2">
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

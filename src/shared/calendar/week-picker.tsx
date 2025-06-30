import React, { useState } from "react";

import {
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  eachDayOfInterval,
  format,
  subWeeks,
  addWeeks,
} from "date-fns";

import { cn } from "@/lib"; // optional if using a utility for merging classNames
import {
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TheAduseiCalendar,
} from "@/components/ui";

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}
export default function WeekPicker({ selectedDate, setSelectedDate }: Props) {
  const weekRange = eachDayOfInterval({
    start: startOfWeek(selectedDate, { weekStartsOn: 1 }),
    end: endOfWeek(selectedDate, { weekStartsOn: 1 }),
  });

  const isInWeek = (date: Date) =>
    isWithinInterval(date, {
      start: weekRange[0],
      end: weekRange[6],
    });

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month" && isInWeek(date)) {
      return "bg-primary-default text-white rounded-md";
    }
    return "";
  };
  const handlePrevWeek = () => setSelectedDate(subWeeks(selectedDate, 1));
  const handleNextWeek = () => setSelectedDate(addWeeks(selectedDate, 1));

  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-md mx-auto p-4">
      <div className={cn("items-center justify-center gap-2 flex")}>
        <button
          onClick={handlePrevWeek}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Previous week"
        >
          <Icon name="ChevronLeft" />
        </button>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <p
              className=" text-base  text-neutral-dark font-semibold  cursor-pointer"
              onClick={() => setOpen(true)}
            >
              {format(weekRange[0], "MMM d")} –{" "}
              {format(weekRange[6], "MMM d, yyyy")}
            </p>
          </PopoverTrigger>
          <PopoverContent className="my-2 w-fit bg-white p-2" align="start">
            <TheAduseiCalendar
              onClickDay={(value: Date) => {
                setSelectedDate(value);
                setOpen(false);
              }}
              value={selectedDate}
              tileClassName={tileClassName}
              calendarType="iso8601" // Week starts on Monday
              next2Label={null}
              prev2Label={null}
            />
          </PopoverContent>
        </Popover>
        <button
          onClick={handleNextWeek}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Next week"
        >
          <Icon name="ChevronRight" />
        </button>
      </div>
    </div>
  );
}

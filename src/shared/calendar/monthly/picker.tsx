import React, { useState } from "react";

import {
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  format,
  subMonths,
  addMonths,
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

export default function MonthPicker({ selectedDate, setSelectedDate }: Props) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);

  const isInMonth = (date: Date) =>
    isWithinInterval(date, {
      start: monthStart,
      end: monthEnd,
    });

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month" && isInMonth(date)) {
      return "bg-primary-default text-white rounded-md";
    }
    return "";
  };

  const handlePrevMonth = () => setSelectedDate(subMonths(selectedDate, 1));
  const handleNextMonth = () => setSelectedDate(addMonths(selectedDate, 1));

  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className={cn("items-center justify-center gap-2 flex")}>
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Previous month"
        >
          <Icon name="ChevronLeft" />
        </button>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <p
              className="text-base text-neutral-dark font-semibold cursor-pointer"
              onClick={() => setOpen(true)}
            >
              {format(selectedDate, "MMMM yyyy")}
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
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Next month"
        >
          <Icon name="ChevronRight" />
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import WeekPicker from "../week-picker";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import { cn } from "@/lib";

type ShiftType = "Morning Shift" | "Afternoon Shift" | "Night Shift";

const shifts: ShiftType[] = ["Morning Shift", "Afternoon Shift", "Night Shift"];

const defaultTasks: string[] = [
  "Filling",
  "Preparation",
  "Sealing",
  "Packaging - Factory Hands",
  "Re-Work",
  "Dispensing",
];

const getColor = (task: string): string => {
  const map: Record<string, string> = {
    Filling: "bg-primary-default",
    Preparation: "bg-gold-default",
    Sealing: "bg-success-default",
    "Packaging - Factory Hands": "bg-warning-default",
    "Re-Work": "bg-danger-default",
    Dispensing: "bg-platinum-default text-black",
  };
  return map[task] || "bg-neutral-default";
};

const WeeklyFullCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<Dayjs[]>([]);

  // Recalculate the week range when selectedDate changes
  useEffect(() => {
    const selected = dayjs(selectedDate);
    const start = selected.startOf("week"); // Monday by ISO with isoWeek plugin
    const end = selected.endOf("week");

    const range: Dayjs[] = [];
    let current = start;
    while (current.isBefore(end) || current.isSame(end, "day")) {
      range.push(current);
      current = current.add(1, "day");
    }

    setDateRange(range);
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="p-4">
      <WeekPicker
        selectedDate={selectedDate}
        setSelectedDate={handleDateSelect}
      />
      {/* Calendar Grid */}
      <ScrollableWrapper>
        <div
          className="grid border border-neutral-input text-sm rounded-md"
          style={{
            gridTemplateColumns: `120px repeat(${dateRange.length}, minmax(150px, 1fr))`,
          }}
        >
          {/* Header */}
          <div className="bg-primary-default text-white font-semibold p-2 rounded-tl-md">
            Shift Type
          </div>
          {dateRange.map((date, idx) => (
            <div
              key={date.toString()}
              className={cn(
                "bg-primary-default text-white font-semibold  p-2 text-center",
                {
                  "rounded-tr-md": idx === dateRange.length - 1,
                },
              )}
            >
              {date.format("dddd")} <br /> {date.format("D MMM, YYYY")}
            </div>
          ))}

          {/* Rows */}
          {shifts.map((shift) => (
            <React.Fragment key={shift}>
              <div className="border border-neutral-input p-2 font-medium bg-white">
                {shift}
              </div>
              {dateRange.map((date) => (
                <div
                  key={`${shift}-${date}`}
                  className="border border-neutral-input p-2 space-y-2 min-h-[100px] bg-white"
                >
                  {defaultTasks.map((task) => (
                    <div
                      key={task}
                      className={`text-sm px-2 py-1 rounded cursor-pointer text-white ${getColor(task)}`}
                    >
                      {task}
                    </div>
                  ))}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </ScrollableWrapper>
    </div>
  );
};

export default WeeklyFullCalendar;

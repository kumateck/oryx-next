import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import WeekPicker from "../week-picker";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import { cn, fullname } from "@/lib";
import { Icon, ToolTipLists } from "@/components/ui";
import AssignShiftSchedule from "./add";
import { ShiftDefault } from "./add/types";
import {
  ShiftAssignmentDto,
  ShiftScheduleDtoRead,
  ShiftTypeDto,
  useLazyGetApiV1ShiftSchedulesByScheduleIdViewQuery,
} from "@/lib/redux/api/openapi.generated";
import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

// type ShiftType = "Morning Shift" | "Afternoon Shift" | "Night Shift";

// const shifts: ShiftType[] = ["Morning Shift", "Afternoon Shift", "Night Shift"];

// const defaultTasks: string[] = [
//   "Filling",
//   "Preparation",
//   "Sealing",
//   "Packaging - Factory Hands",
//   "Re-Work",
//   "Dispensing",
// ];

// const getColor = (task: string): string => {
//   const map: Record<string, string> = {
//     Filling: "bg-primary-default",
//     Preparation: "bg-gold-default",
//     Sealing: "bg-success-default",
//     "Packaging - Factory Hands": "bg-warning-default",
//     "Re-Work": "bg-danger-default",
//     Dispensing: "bg-platinum-default text-black",
//   };
//   return map[task] || "bg-neutral-default";
// };

interface CalendarGridProps {
  scheduleId: string;
  schedule?: ShiftScheduleDtoRead; // Replace with actual type if available
}

// interface CalendarGridProps {
//   scheduleId: string;
//   schedule?: ShiftScheduleDtoRead;
// }

const WeeklyFullCalendar: React.FC<CalendarGridProps> = ({
  scheduleId,
  schedule,
}) => {
  const [dateRange, setDateRange] = useState<Dayjs[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [
    selectedWeekScheduleAssignmentView,
    setSelectedWeekScheduleAssignmentView,
  ] = useState<ShiftAssignmentDto[] | undefined>(undefined);
  const [selectedShift, setSelectedShift] = useState<ShiftDefault | undefined>(
    undefined,
  );

  const [loadScheduleView] =
    useLazyGetApiV1ShiftSchedulesByScheduleIdViewQuery();

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

    loadWeeklySchedule(selectedDate);

    setDateRange(range);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const loadWeeklySchedule = async (selectedDate: Date) => {
    const weekRange = eachDayOfInterval({
      start: startOfWeek(selectedDate, { weekStartsOn: 1 }),
      end: endOfWeek(selectedDate, { weekStartsOn: 1 }),
    });
    console.log(weekRange, "Week Range");
    try {
      const response = await loadScheduleView({
        scheduleId,

        startDate: weekRange[0].toISOString(),
        endDate: weekRange[6].toISOString(),
      }).unwrap();

      setSelectedWeekScheduleAssignmentView(response);
    } catch (error) {
      console.error("Error loading weekly schedule:", error);
      // Handle error appropriately, e.g., show a notification or alert
    }
  };
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddTask = (date: Dayjs, shift: ShiftTypeDto) => {
    const payload = {
      schedule: {
        label: schedule?.scheduleName as string,
        value: scheduleId,
      },
      type: {
        label: shift.shiftName as string,
        value: shift.id as string,
      },
      scheduleDate: date.toDate().toISOString(), // Convert Dayjs to native Date and then to ISO string
    };
    setSelectedShift(() => payload);
    setIsOpen(true);
    // console.log(payload, "payload");
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-4">
      <WeekPicker
        selectedDate={selectedDate}
        setSelectedDate={handleDateSelect}
      />
      {isOpen && (
        <AssignShiftSchedule
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultValues={selectedShift}
        />
      )}
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

          {/* Rows: use shiftTypes */}
          {schedule?.shiftType?.map((shift) => (
            <React.Fragment key={shift.id}>
              <div className="border border-neutral-input p-2 font-medium bg-white">
                {shift.shiftName} <br />
                <small className="text-xs text-gray-500">
                  {shift.startTime} - {shift.endTime}
                </small>
              </div>
              {dateRange.map((date) => {
                // Optional: filter shifts by applicableDays if you want
                // dayjs day() returns 0 (Sunday) to 6 (Saturday)
                const dayIndex = date.day();
                const isApplicable = shift?.applicableDays?.includes(dayIndex);
                if (!isApplicable) {
                  return (
                    <div
                      key={`${shift.id}-${date.toString()}`}
                      className="border border-neutral-input p-2 min-h-[100px] bg-neutral-200"
                    >
                      <small className="text-gray-400">Not applicable</small>
                    </div>
                  );
                }

                return (
                  <div
                    key={`${shift.id}-${date.toString()}`}
                    className="border relative border-neutral-input p-2 min-h-[100px] bg-white"
                  >
                    <div className="flex gap-2">
                      <div className="space-y-2">
                        {selectedWeekScheduleAssignmentView?.map(
                          (task, tid) => {
                            const sameDate = dayjs(task.scheduleDate).isSame(
                              date,
                              "day",
                            );
                            const sameShiftType =
                              task.shiftType?.shiftTypeId === shift.id;
                            if (sameDate && sameShiftType) {
                              return (
                                <ToolTipLists
                                  key={tid}
                                  component={
                                    <div
                                      key={task?.shiftCategory?.id}
                                      className={`text-sm inline-block px-2 py-1 rounded cursor-pointer text-white bg-primary-default`}
                                    >
                                      {task.shiftCategory?.name}
                                    </div>
                                  }
                                >
                                  <ul>
                                    {task.employees?.map((emp, emx) => (
                                      <li key={emx}>
                                        {fullname(
                                          emp?.firstName as string,
                                          emp.lastName as string,
                                        )}
                                        {emp?.staffNumber && (
                                          <span>({emp?.staffNumber})</span>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </ToolTipLists>
                              );
                            }
                            return null;
                          },
                        )}
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => handleAddTask(date, shift)}
                        >
                          <Icon name="Plus" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </ScrollableWrapper>
    </div>
  );
};

export default WeeklyFullCalendar;

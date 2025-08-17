import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekOfYear);

import MonthPicker from "./picker"; // Assuming you have a month picker component
import ScrollableWrapper from "@/shared/scroll-wrapper";
import { cn, fullname } from "@/lib";
import { ToolTipLists } from "@/components/ui";

import {
  ShiftAssignmentDto,
  ShiftScheduleDtoRead,
  useLazyGetApiV1ShiftSchedulesByScheduleIdViewQuery,
} from "@/lib/redux/api/openapi.generated";

interface CalendarGridProps {
  scheduleId: string;
  schedule?: ShiftScheduleDtoRead;
}

interface WeekRange {
  weekNumber: number;
  startDate: Dayjs;
  endDate: Dayjs;
  label: string;
}

interface CategoryGroup {
  categoryId: string;
  categoryName: string;
  startDate: Dayjs;
  endDate: Dayjs;
  assignmentDays: number;
  employees: any[];
  assignments: ShiftAssignmentDto[];
}

const MonthlyWeeklyCalendar: React.FC<CalendarGridProps> = ({
  scheduleId,
  schedule,
}) => {
  const [weekRanges, setWeekRanges] = useState<WeekRange[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [allScheduleAssignments, setAllScheduleAssignments] = useState<
    ShiftAssignmentDto[]
  >([]);

  const [loadScheduleView] =
    useLazyGetApiV1ShiftSchedulesByScheduleIdViewQuery();

  // Set selectedMonth to schedule.startDate when schedule loads
  useEffect(() => {
    if (schedule?.startDate) {
      setSelectedMonth(new Date(schedule.startDate));
    }
  }, [schedule?.startDate]);

  // Load the full schedule range data when component mounts or schedule changes
  useEffect(() => {
    if (schedule?.startDate && schedule?.endDate) {
      loadFullScheduleRange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule?.startDate, schedule?.endDate, scheduleId]);

  // Recalculate the week ranges when selectedMonth changes
  useEffect(() => {
    const selected = dayjs(selectedMonth);
    const monthStart = selected.startOf("month");
    const monthEnd = selected.endOf("month");

    // Get the first week that includes any day of the month
    const firstWeekStart = monthStart.startOf("week");
    // Get the last week that includes any day of the month
    const lastWeekEnd = monthEnd.endOf("week");

    const weeks: WeekRange[] = [];
    let current = firstWeekStart;

    while (
      current.isBefore(lastWeekEnd) ||
      current.isSame(lastWeekEnd, "day")
    ) {
      const weekEnd = current.endOf("week");
      const weekNumber = current.week();

      // Create a more descriptive label for the week
      const startDay = current.format("MMM D");
      const endDay = weekEnd.format("MMM D");
      const label = `Week ${weekNumber} (${startDay} - ${endDay})`;

      weeks.push({
        weekNumber,
        startDate: current,
        endDate: weekEnd,
        label,
      });

      current = current.add(1, "week");
    }

    setWeekRanges(weeks);
  }, [selectedMonth]);

  const loadFullScheduleRange = async () => {
    if (!schedule?.startDate || !schedule?.endDate) return;

    try {
      const response = await loadScheduleView({
        scheduleId,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
      }).unwrap();

      setAllScheduleAssignments(response || []);
    } catch (error) {
      console.error("Error loading full schedule range:", error);
      // Handle error appropriately, e.g., show a notification or alert
    }
  };

  const handleMonthSelect = (month: Date) => {
    setSelectedMonth(month);
  };

  // Get assignments for a specific week range and shift type
  const getAssignmentsForWeekAndShift = (
    weekRange: WeekRange,
    shiftId: string,
  ) => {
    return allScheduleAssignments.filter((assignment) => {
      const assignmentDate = dayjs(assignment.scheduleDate);
      const isInWeek =
        assignmentDate.isSameOrAfter(weekRange.startDate, "day") &&
        assignmentDate.isSameOrBefore(weekRange.endDate, "day");
      const sameShiftType = assignment.shiftType?.shiftTypeId === shiftId;
      return isInWeek && sameShiftType;
    });
  };

  // NEW: Group assignments by category for a week
  const getCategoryGroupsForWeek = (
    weekRange: WeekRange,
    shiftId: string,
  ): CategoryGroup[] => {
    const assignments = getAssignmentsForWeekAndShift(weekRange, shiftId);

    // Group by category ID
    const categoryMap = new Map<string, ShiftAssignmentDto[]>();

    assignments.forEach((assignment) => {
      const categoryId = assignment.shiftCategory?.id || "uncategorized";
      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, []);
      }
      categoryMap.get(categoryId)?.push(assignment);
    });

    // Convert to CategoryGroup objects
    const categoryGroups: CategoryGroup[] = [];

    categoryMap.forEach((categoryAssignments, categoryId) => {
      // Get all dates for this category
      const dates = categoryAssignments.map((a) => dayjs(a.scheduleDate));
      const startDate = dates.reduce((min, date) =>
        date.isBefore(min) ? date : min,
      );
      const endDate = dates.reduce((max, date) =>
        date.isAfter(max) ? date : max,
      );

      // Get unique employees for this category
      const uniqueEmployees = new Map();
      categoryAssignments.forEach((assignment) => {
        assignment.employees?.forEach((emp) => {
          if (emp?.employeeId) {
            uniqueEmployees.set(emp.employeeId, emp);
          }
        });
      });

      const categoryName =
        categoryAssignments[0]?.shiftCategory?.name || "Uncategorized";

      categoryGroups.push({
        categoryId,
        categoryName,
        startDate,
        endDate,
        assignmentDays: dates.length,
        employees: Array.from(uniqueEmployees.values()),
        assignments: categoryAssignments,
      });
    });

    return categoryGroups;
  };

  // Format date range for display
  const formatDateRange = (startDate: Dayjs, endDate: Dayjs): string => {
    if (startDate.isSame(endDate, "day")) {
      return startDate.format("MMM D");
    } else {
      return `${startDate.format("MMM D")} - ${endDate.format("MMM D")}`;
    }
  };

  // Check if a week range intersects with the schedule range
  const isWeekInScheduleRange = (weekRange: WeekRange) => {
    if (!schedule?.startDate || !schedule?.endDate) return false;

    const scheduleStart = dayjs(schedule.startDate);
    const scheduleEnd = dayjs(schedule.endDate);

    // Check if week overlaps with schedule range
    return (
      weekRange.startDate.isSameOrBefore(scheduleEnd, "day") &&
      weekRange.endDate.isSameOrAfter(scheduleStart, "day")
    );
  };

  // Check if shift is applicable for any day in the week
  const isShiftApplicableForWeek = (weekRange: WeekRange, shift: any) => {
    if (!shift?.applicableDays?.length) return true;

    // Check each day of the week to see if shift is applicable
    let current = weekRange.startDate;
    while (
      current.isBefore(weekRange.endDate) ||
      current.isSame(weekRange.endDate, "day")
    ) {
      const dayIndex = current.day();
      if (shift.applicableDays.includes(dayIndex)) {
        return true;
      }
      current = current.add(1, "day");
    }
    return false;
  };

  return (
    <div className="p-4">
      <MonthPicker
        selectedDate={selectedMonth}
        setSelectedDate={handleMonthSelect}
      />

      <ScrollableWrapper>
        <div
          className="grid border border-neutral-input text-sm rounded-md"
          style={{
            gridTemplateColumns: `150px repeat(${weekRanges.length}, minmax(200px, 1fr))`,
          }}
        >
          {/* Header */}
          <div className="bg-primary-default text-white font-semibold p-2 rounded-tl-md">
            Shift Type
          </div>
          {weekRanges.map((week, idx) => (
            <div
              key={week.weekNumber}
              className={cn(
                "bg-primary-default text-white font-semibold p-2 text-center",
                {
                  "rounded-tr-md": idx === weekRanges.length - 1,
                },
              )}
            >
              <div className="text-xs">Week {week.weekNumber}</div>
              <div className="text-xs mt-1">
                {week.startDate.format("MMM D")} -{" "}
                {week.endDate.format("MMM D")}
              </div>
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
              {weekRanges.map((week) => {
                // Check if week is within schedule range
                const isInScheduleRange = isWeekInScheduleRange(week);

                // Check if shift is applicable for any day in this week
                const isApplicable = isShiftApplicableForWeek(week, shift);

                // If not in schedule range, show empty cell
                if (!isInScheduleRange) {
                  return (
                    <div
                      key={`${shift.id}-${week.weekNumber}`}
                      className="border border-neutral-input p-2 min-h-[120px] bg-gray-50"
                    >
                      <small className="text-gray-400">
                        Outside schedule range
                      </small>
                    </div>
                  );
                }

                // If not applicable for any day in the week, show not applicable
                if (!isApplicable) {
                  return (
                    <div
                      key={`${shift.id}-${week.weekNumber}`}
                      className="border border-neutral-input p-2 min-h-[120px] bg-neutral-200"
                    >
                      <small className="text-gray-400">Not applicable</small>
                    </div>
                  );
                }

                // Get category groups for this week and shift
                const categoryGroups = getCategoryGroupsForWeek(
                  week,
                  shift.id as string,
                );

                return (
                  <div
                    key={`${shift.id}-${week.weekNumber}`}
                    className="border relative border-neutral-input p-2 min-h-[120px] flex flex-col bg-white"
                  >
                    <div className="space-y-2 flex flex-col justify-start items-start">
                      {categoryGroups.map((categoryGroup, idx) => (
                        <div key={idx} className="w-full">
                          <div className="text-xs text-gray-600 font-medium mb-1">
                            {formatDateRange(
                              categoryGroup.startDate,
                              categoryGroup.endDate,
                            )}
                          </div>
                          <ToolTipLists
                            component={
                              <div className="text-xs inline-block px-2 py-1 rounded cursor-pointer text-white bg-primary-default">
                                {categoryGroup.categoryName} (
                                {categoryGroup.assignmentDays}{" "}
                                {categoryGroup.assignmentDays === 1
                                  ? "day"
                                  : "days"}
                                )
                              </div>
                            }
                          >
                            <div>
                              <div className="font-semibold mb-2">
                                {categoryGroup.categoryName}
                              </div>
                              <div className="text-sm mb-2">
                                Period:{" "}
                                {formatDateRange(
                                  categoryGroup.startDate,
                                  categoryGroup.endDate,
                                )}
                              </div>
                              <div className="text-sm mb-2">
                                Assignment Days: {categoryGroup.assignmentDays}
                              </div>
                              <div className="text-sm font-medium mb-1">
                                Assigned Employees (
                                {categoryGroup.employees.length}):
                              </div>
                              <ul className="text-sm">
                                {categoryGroup.employees.map((emp, emx) => (
                                  <li key={emx}>
                                    {fullname(
                                      emp?.firstName as string,
                                      emp.lastName as string,
                                    )}
                                    {emp?.staffNumber && (
                                      <span> ({emp?.staffNumber})</span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </ToolTipLists>
                        </div>
                      ))}
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

export default MonthlyWeeklyCalendar;

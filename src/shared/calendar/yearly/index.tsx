import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekOfYear);

import YearPicker from "./picker"; // Assuming you save the YearPicker component
import ScrollableWrapper from "@/shared/scroll-wrapper";
import { cn, fullname } from "@/lib";
import { ToolTipLists } from "@/components/ui";

import {
  ShiftAssignmentDto,
  ShiftScheduleDtoRead,
  useLazyGetApiV1ShiftSchedulesByScheduleIdViewQuery,
} from "@/lib/redux/api/openapi.generated";

interface YearlyCalendarProps {
  scheduleId: string;
  schedule?: ShiftScheduleDtoRead;
}

interface MonthRange {
  month: number;
  year: number;
  monthName: string;
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

const YearlyCalendar: React.FC<YearlyCalendarProps> = ({
  scheduleId,
  schedule,
}) => {
  const [monthRanges, setMonthRanges] = useState<MonthRange[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [allScheduleAssignments, setAllScheduleAssignments] = useState<
    ShiftAssignmentDto[]
  >([]);

  const [loadScheduleView] =
    useLazyGetApiV1ShiftSchedulesByScheduleIdViewQuery();

  // Set selectedYear to schedule.startDate year when schedule loads
  useEffect(() => {
    if (schedule?.startDate) {
      setSelectedYear(dayjs(schedule.startDate).year());
    }
  }, [schedule?.startDate]);

  // Load the full schedule range data when component mounts or schedule changes
  useEffect(() => {
    if (schedule?.startDate && schedule?.endDate) {
      loadFullScheduleRange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule?.startDate, schedule?.endDate, scheduleId]);

  // Generate month ranges for the selected year
  useEffect(() => {
    const months: MonthRange[] = [];

    for (let month = 0; month < 12; month++) {
      const monthStart = dayjs()
        .year(selectedYear)
        .month(month)
        .startOf("month");
      const monthEnd = dayjs().year(selectedYear).month(month).endOf("month");

      months.push({
        month: month + 1,
        year: selectedYear,
        monthName: monthStart.format("MMMM"),
        startDate: monthStart,
        endDate: monthEnd,
        label: monthStart.format("MMM YYYY"),
      });
    }

    setMonthRanges(months);
  }, [selectedYear]);

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
    }
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  // Get assignments for a specific month range and shift type
  const getAssignmentsForMonthAndShift = (
    monthRange: MonthRange,
    shiftId: string,
  ) => {
    return allScheduleAssignments.filter((assignment) => {
      const assignmentDate = dayjs(assignment.scheduleDate);
      const isInMonth =
        assignmentDate.isSameOrAfter(monthRange.startDate, "day") &&
        assignmentDate.isSameOrBefore(monthRange.endDate, "day");
      const sameShiftType = assignment.shiftType?.shiftTypeId === shiftId;
      return isInMonth && sameShiftType;
    });
  };

  // Group assignments by category for a month and shift
  const getCategoryGroupsForMonthAndShift = (
    monthRange: MonthRange,
    shiftId: string,
  ): CategoryGroup[] => {
    const assignments = getAssignmentsForMonthAndShift(monthRange, shiftId);

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

    // Sort by start date
    return categoryGroups.sort((a, b) =>
      a.startDate.isBefore(b.startDate) ? -1 : 1,
    );
  };

  // Format date range for display
  const formatDateRange = (startDate: Dayjs, endDate: Dayjs): string => {
    if (startDate.isSame(endDate, "day")) {
      return startDate.format("D");
    } else if (startDate.month() === endDate.month()) {
      return `${startDate.format("D")}-${endDate.format("D")}`;
    } else {
      return `${startDate.format("MMM D")} - ${endDate.format("MMM D")}`;
    }
  };

  // Check if a month range intersects with the schedule range
  const isMonthInScheduleRange = (monthRange: MonthRange) => {
    if (!schedule?.startDate || !schedule?.endDate) return false;

    const scheduleStart = dayjs(schedule.startDate);
    const scheduleEnd = dayjs(schedule.endDate);

    // Check if month overlaps with schedule range
    return (
      monthRange.startDate.isSameOrBefore(scheduleEnd, "day") &&
      monthRange.endDate.isSameOrAfter(scheduleStart, "day")
    );
  };

  // Check if shift is applicable for any day in the month
  const isShiftApplicableForMonth = (monthRange: MonthRange, shift: any) => {
    if (!shift?.applicableDays?.length) return true;

    // Check each day of the month to see if shift is applicable
    let current = monthRange.startDate;
    while (
      current.isBefore(monthRange.endDate) ||
      current.isSame(monthRange.endDate, "day")
    ) {
      const dayIndex = current.day();
      if (shift.applicableDays.includes(dayIndex)) {
        return true;
      }
      current = current.add(1, "day");
    }
    return false;
  };

  const shiftTypes = schedule?.shiftType || [];

  return (
    <div className="p-4">
      {/* Year Picker */}
      <YearPicker
        selectedYear={selectedYear}
        setSelectedYear={handleYearChange}
      />

      <ScrollableWrapper>
        <div
          className="grid border border-neutral-input text-sm rounded-md pb-12"
          style={{
            gridTemplateColumns: `150px repeat(${shiftTypes.length}, minmax(200px, 1fr))`,
          }}
        >
          {/* Header Row */}
          <div className="bg-primary-default text-white font-semibold p-2 rounded-tl-md">
            Month / Year
          </div>
          {shiftTypes.map((shift, idx) => (
            <div
              key={shift.id}
              className={cn(
                "bg-primary-default text-white font-semibold p-2 text-center",
                {
                  "rounded-tr-md": idx === shiftTypes.length - 1,
                },
              )}
            >
              <div className="text-xs font-bold">{shift.shiftName}</div>
              <div className="text-xs mt-1">
                {shift.startTime} - {shift.endTime}
              </div>
            </div>
          ))}

          {/* Rows: months as rows, shift types as columns */}
          {monthRanges.map((month) => (
            <React.Fragment key={`${month.year}-${month.month}`}>
              {/* Month header cell */}
              <div className="border border-neutral-input p-2 font-medium bg-white">
                <div className="text-sm font-bold">{month.monthName}</div>
                <div className="text-xs text-gray-500">{month.year}</div>
              </div>

              {/* Shift type cells for this month */}
              {shiftTypes.map((shift) => {
                // Check if month is within schedule range
                const isInScheduleRange = isMonthInScheduleRange(month);

                // Check if shift is applicable for any day in this month
                const isApplicable = isShiftApplicableForMonth(month, shift);

                // If not in schedule range, show empty cell
                if (!isInScheduleRange) {
                  return (
                    <div
                      key={`${month.year}-${month.month}-${shift.id}`}
                      className="border border-neutral-input p-2 min-h-[120px] bg-gray-50"
                    >
                      <small className="text-gray-400">
                        Outside schedule range
                      </small>
                    </div>
                  );
                }

                // If not applicable for any day in the month, show not applicable
                if (!isApplicable) {
                  return (
                    <div
                      key={`${month.year}-${month.month}-${shift.id}`}
                      className="border border-neutral-input p-2 min-h-[120px] bg-neutral-200"
                    >
                      <small className="text-gray-400">Not applicable</small>
                    </div>
                  );
                }

                // Get category groups for this month and shift
                const categoryGroups = getCategoryGroupsForMonthAndShift(
                  month,
                  shift.id as string,
                );

                return (
                  <div
                    key={`${month.year}-${month.month}-${shift.id}`}
                    className="border relative border-neutral-input p-1 min-h-[120px] flex flex-col bg-white"
                  >
                    <div className="space-y-1 flex flex-col justify-start items-start">
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
                              <div className="text-xs inline-block px-2 py-1 rounded cursor-pointer text-white bg-primary-default max-w-full">
                                <div className="truncate">
                                  {categoryGroup.categoryName}
                                </div>
                                <div className="text-xs">
                                  ({categoryGroup.assignmentDays}d,{" "}
                                  {categoryGroup.employees.length}p)
                                </div>
                              </div>
                            }
                          >
                            <div>
                              <div className="font-semibold mb-2">
                                {categoryGroup.categoryName}
                              </div>
                              <div className="text-sm mb-2">
                                <strong>Period:</strong>{" "}
                                {formatDateRange(
                                  categoryGroup.startDate,
                                  categoryGroup.endDate,
                                )}
                              </div>
                              <div className="text-sm mb-2">
                                <strong>Assignment Days:</strong>{" "}
                                {categoryGroup.assignmentDays}
                              </div>
                              <div className="text-sm mb-2">
                                <strong>Total Employees:</strong>{" "}
                                {categoryGroup.employees.length}
                              </div>
                              <div className="text-sm font-medium mb-1">
                                Assigned Employees:
                              </div>
                              <ul className="text-sm max-h-32 overflow-y-auto">
                                {categoryGroup.employees.map((emp, emx) => (
                                  <li key={emx}>
                                    •{" "}
                                    {fullname(
                                      emp?.firstName as string,
                                      emp.lastName as string,
                                    )}
                                    {emp?.staffNumber && (
                                      <span className="text-gray-500">
                                        {" "}
                                        ({emp?.staffNumber})
                                      </span>
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

export default YearlyCalendar;

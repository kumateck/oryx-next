// // import React, { useEffect, useState } from "react";
// // import dayjs, { Dayjs } from "dayjs";

// // import WeekPicker from "../week-picker";
// // import ScrollableWrapper from "@/shared/scroll-wrapper";
// // import { cn, fullname } from "@/lib";
// // import { ToolTipLists } from "@/components/ui";

// // import {
// //   ShiftAssignmentDto,
// //   ShiftScheduleDtoRead,
// //   useLazyGetApiV1ShiftSchedulesByScheduleIdViewQuery,
// // } from "@/lib/redux/api/openapi.generated";
// // import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

// // interface CalendarGridProps {
// //   scheduleId: string;
// //   schedule?: ShiftScheduleDtoRead; // Replace with actual type if available
// // }

// // const WeeklyFullCalendar: React.FC<CalendarGridProps> = ({
// //   scheduleId,
// //   schedule,
// // }) => {
// //   const [dateRange, setDateRange] = useState<Dayjs[]>([]);
// //   const [selectedDate, setSelectedDate] = useState<Date>(new Date());

// //   const [
// //     selectedWeekScheduleAssignmentView,
// //     setSelectedWeekScheduleAssignmentView,
// //   ] = useState<ShiftAssignmentDto[] | undefined>(undefined);

// //   const [loadScheduleView] =
// //     useLazyGetApiV1ShiftSchedulesByScheduleIdViewQuery();

// //   // Recalculate the week range when selectedDate changes
// //   useEffect(() => {
// //     const selected = dayjs(selectedDate);
// //     const start = selected.startOf("week"); // Monday by ISO with isoWeek plugin
// //     const end = selected.endOf("week");

// //     const range: Dayjs[] = [];
// //     let current = start;
// //     while (current.isBefore(end) || current.isSame(end, "day")) {
// //       range.push(current);
// //       current = current.add(1, "day");
// //     }

// //     loadWeeklySchedule(selectedDate);

// //     setDateRange(range);

// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [selectedDate]);

// //   const loadWeeklySchedule = async (selectedDate: Date) => {
// //     const weekRange = eachDayOfInterval({
// //       start: startOfWeek(selectedDate, { weekStartsOn: 1 }),
// //       end: endOfWeek(selectedDate, { weekStartsOn: 1 }),
// //     });

// //     try {
// //       const response = await loadScheduleView({
// //         scheduleId,

// //         startDate: weekRange[0].toISOString(),
// //         endDate: weekRange[6].toISOString(),
// //       }).unwrap();

// //       setSelectedWeekScheduleAssignmentView(response);
// //     } catch (error) {
// //       console.error("Error loading weekly schedule:", error);
// //       // Handle error appropriately, e.g., show a notification or alert
// //     }
// //   };
// //   const handleDateSelect = (date: Date) => {
// //     setSelectedDate(date);
// //   };

// //   return (
// //     <div className="p-4">
// //       <WeekPicker
// //         selectedDate={selectedDate}
// //         setSelectedDate={handleDateSelect}
// //       />

// //       <ScrollableWrapper>
// //         <div
// //           className="grid border border-neutral-input text-sm rounded-md"
// //           style={{
// //             gridTemplateColumns: `120px repeat(${dateRange.length}, minmax(150px, 1fr))`,
// //           }}
// //         >
// //           {/* Header */}
// //           <div className="bg-primary-default text-white font-semibold p-2 rounded-tl-md">
// //             Shift Type
// //           </div>
// //           {dateRange.map((date, idx) => (
// //             <div
// //               key={date.toString()}
// //               className={cn(
// //                 "bg-primary-default text-white font-semibold  p-2 text-center",
// //                 {
// //                   "rounded-tr-md": idx === dateRange.length - 1,
// //                 },
// //               )}
// //             >
// //               {date.format("dddd")} <br /> {date.format("D MMM, YYYY")}
// //             </div>
// //           ))}

// //           {/* Rows: use shiftTypes */}
// //           {schedule?.shiftType?.map((shift) => (
// //             <React.Fragment key={shift.id}>
// //               <div className="border border-neutral-input p-2 font-medium bg-white">
// //                 {shift.shiftName} <br />
// //                 <small className="text-xs text-gray-500">
// //                   {shift.startTime} - {shift.endTime}
// //                 </small>
// //               </div>
// //               {dateRange.map((date) => {
// //                 // Optional: filter shifts by applicableDays if you want
// //                 // dayjs day() returns 0 (Sunday) to 6 (Saturday)
// //                 const dayIndex = date.day();
// //                 const isApplicable = shift?.applicableDays?.includes(dayIndex);

// //                 if (!isApplicable) {
// //                   return (
// //                     <div
// //                       key={`${shift.id}-${date.toString()}`}
// //                       className="border border-neutral-input p-2 min-h-[100px] bg-neutral-200"
// //                     >
// //                       <small className="text-gray-400">Not applicable</small>
// //                     </div>
// //                   );
// //                 }

// //                 return (
// //                   <div
// //                     key={`${shift.id}-${date.toString()}`}
// //                     className="border relative border-neutral-input p-2 min-h-[100px] bg-white"
// //                   >
// //                     <div className="flex gap-2 justify-between">
// //                       <div className="space-y-2">
// //                         {selectedWeekScheduleAssignmentView?.map(
// //                           (task, tid) => {
// //                             const sameDate = dayjs(task.scheduleDate).isSame(
// //                               date,
// //                               "day",
// //                             );
// //                             const sameShiftType =
// //                               task.shiftType?.shiftTypeId === shift.id;
// //                             if (sameDate && sameShiftType) {
// //                               return (
// //                                 <ToolTipLists
// //                                   key={tid}
// //                                   component={
// //                                     <div
// //                                       key={task?.shiftCategory?.id}
// //                                       className={`text-sm inline-block px-2 py-1 rounded cursor-pointer text-white bg-primary-default`}
// //                                     >
// //                                       {task.shiftCategory?.name}
// //                                     </div>
// //                                   }
// //                                 >
// //                                   <ul>
// //                                     {task.employees?.map((emp, emx) => (
// //                                       <li key={emx}>
// //                                         {fullname(
// //                                           emp?.firstName as string,
// //                                           emp.lastName as string,
// //                                         )}
// //                                         {emp?.staffNumber && (
// //                                           <span>({emp?.staffNumber})</span>
// //                                         )}
// //                                       </li>
// //                                     ))}
// //                                   </ul>
// //                                 </ToolTipLists>
// //                               );
// //                             }
// //                             return null;
// //                           },
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </React.Fragment>
// //           ))}
// //         </div>
// //       </ScrollableWrapper>
// //     </div>
// //   );
// // };

// // export default WeeklyFullCalendar;

// import React, { useEffect, useState } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// dayjs.extend(isSameOrAfter);
// dayjs.extend(isSameOrBefore);

// import WeekPicker from "../week-picker";
// import ScrollableWrapper from "@/shared/scroll-wrapper";
// import { cn, fullname } from "@/lib";
// import { ToolTipLists } from "@/components/ui";

// import {
//   ShiftAssignmentDto,
//   ShiftScheduleDtoRead,
//   useLazyGetApiV1ShiftSchedulesByScheduleIdViewQuery,
// } from "@/lib/redux/api/openapi.generated";

// interface CalendarGridProps {
//   scheduleId: string;
//   schedule?: ShiftScheduleDtoRead;
// }

// const WeeklyFullCalendar: React.FC<CalendarGridProps> = ({
//   scheduleId,
//   schedule,
// }) => {
//   const [dateRange, setDateRange] = useState<Dayjs[]>([]);
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [allScheduleAssignments, setAllScheduleAssignments] = useState<
//     ShiftAssignmentDto[]
//   >([]);

//   const [loadScheduleView] =
//     useLazyGetApiV1ShiftSchedulesByScheduleIdViewQuery();

//   // Load the full schedule range data when component mounts or schedule changes
//   useEffect(() => {
//     if (schedule?.startDate && schedule?.endDate) {
//       loadFullScheduleRange();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [schedule?.startDate, schedule?.endDate, scheduleId]);

//   // Recalculate the week range when selectedDate changes
//   useEffect(() => {
//     // const loadedStartDate = dayjs(schedule?.startDate);
//     // setSelectedDate(() => new Date(dayjs(schedule?.startDate).format()));
//     const selected = dayjs(selectedDate);
//     const start = selected.startOf("week");
//     const end = selected.endOf("week");

//     const range: Dayjs[] = [];
//     let current = start;
//     while (current.isBefore(end) || current.isSame(end, "day")) {
//       range.push(current);
//       current = current.add(1, "day");
//     }

//     setDateRange(range);
//   }, [selectedDate]);

//   const loadFullScheduleRange = async () => {
//     if (!schedule?.startDate || !schedule?.endDate) return;

//     try {
//       const response = await loadScheduleView({
//         scheduleId,
//         startDate: schedule.startDate,
//         endDate: schedule.endDate,
//       }).unwrap();

//       setAllScheduleAssignments(response || []);
//     } catch (error) {
//       console.error("Error loading full schedule range:", error);
//       // Handle error appropriately, e.g., show a notification or alert
//     }
//   };

//   const handleDateSelect = (date: Date) => {
//     setSelectedDate(date);
//   };

//   // Get assignments for a specific date and shift type
//   const getAssignmentsForDateAndShift = (date: Dayjs, shiftId: string) => {
//     return allScheduleAssignments.filter((assignment) => {
//       const sameDate = dayjs(assignment.scheduleDate).isSame(date, "day");
//       const sameShiftType = assignment.shiftType?.shiftTypeId === shiftId;
//       return sameDate && sameShiftType;
//     });
//   };

//   // Check if a date is within the schedule range
//   const isDateInScheduleRange = (date: Dayjs) => {
//     if (!schedule?.startDate || !schedule?.endDate) return false;

//     const scheduleStart = dayjs(schedule.startDate);
//     const scheduleEnd = dayjs(schedule.endDate);

//     return (
//       date.isSameOrAfter(scheduleStart, "day") &&
//       date.isSameOrBefore(scheduleEnd, "day")
//     );
//   };

//   return (
//     <div className="p-4">
//       <WeekPicker
//         selectedDate={selectedDate}
//         setSelectedDate={handleDateSelect}
//       />

//       <ScrollableWrapper>
//         <div
//           className="grid border border-neutral-input text-sm rounded-md"
//           style={{
//             gridTemplateColumns: `120px repeat(${dateRange.length}, minmax(150px, 1fr))`,
//           }}
//         >
//           {/* Header */}
//           <div className="bg-primary-default text-white font-semibold p-2 rounded-tl-md">
//             Shift Type
//           </div>
//           {dateRange.map((date, idx) => (
//             <div
//               key={date.toString()}
//               className={cn(
//                 "bg-primary-default text-white font-semibold p-2 text-center",
//                 {
//                   "rounded-tr-md": idx === dateRange.length - 1,
//                 },
//               )}
//             >
//               {date.format("dddd")} <br /> {date.format("D MMM, YYYY")}
//             </div>
//           ))}

//           {/* Rows: use shiftTypes */}
//           {schedule?.shiftType?.map((shift) => (
//             <React.Fragment key={shift.id}>
//               <div className="border border-neutral-input p-2 font-medium bg-white">
//                 {shift.shiftName} <br />
//                 <small className="text-xs text-gray-500">
//                   {shift.startTime} - {shift.endTime}
//                 </small>
//               </div>
//               {dateRange.map((date) => {
//                 // Check if date is within schedule range
//                 const isInScheduleRange = isDateInScheduleRange(date);

//                 // Optional: filter shifts by applicableDays if you want
//                 const dayIndex = date.day();
//                 const isApplicable = shift?.applicableDays?.includes(dayIndex);

//                 // If not in schedule range, show empty cell
//                 if (!isInScheduleRange) {
//                   return (
//                     <div
//                       key={`${shift.id}-${date.toString()}`}
//                       className="border border-neutral-input p-2 min-h-[100px] bg-gray-50"
//                     >
//                       <small className="text-gray-400">
//                         Outside schedule range
//                       </small>
//                     </div>
//                   );
//                 }

//                 // If not applicable day, show not applicable
//                 if (!isApplicable) {
//                   return (
//                     <div
//                       key={`${shift.id}-${date.toString()}`}
//                       className="border border-neutral-input p-2 min-h-[100px] bg-neutral-200"
//                     >
//                       <small className="text-gray-400">Not applicable</small>
//                     </div>
//                   );
//                 }

//                 // Get assignments for this date and shift
//                 const assignments = getAssignmentsForDateAndShift(
//                   date,
//                   shift.id as string,
//                 );

//                 return (
//                   <div
//                     key={`${shift.id}-${date.toString()}`}
//                     className="border relative border-neutral-input p-2 min-h-[100px] bg-white"
//                   >
//                     <div className="flex gap-2 justify-between">
//                       <div className="space-y-2">
//                         {assignments.map((assignment, aid) => (
//                           <ToolTipLists
//                             key={aid}
//                             component={
//                               <div className="text-sm inline-block px-2 py-1 rounded cursor-pointer text-white bg-primary-default">
//                                 {assignment.shiftCategory?.name}
//                               </div>
//                             }
//                           >
//                             <ul>
//                               {assignment.employees?.map((emp, emx) => (
//                                 <li key={emx}>
//                                   {fullname(
//                                     emp?.firstName as string,
//                                     emp.lastName as string,
//                                   )}
//                                   {emp?.staffNumber && (
//                                     <span> ({emp?.staffNumber})</span>
//                                   )}
//                                 </li>
//                               ))}
//                             </ul>
//                           </ToolTipLists>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </React.Fragment>
//           ))}
//         </div>
//       </ScrollableWrapper>
//     </div>
//   );
// };

// export default WeeklyFullCalendar;

import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

import WeekPicker from "../week-picker";
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

const WeeklyFullCalendar: React.FC<CalendarGridProps> = ({
  scheduleId,
  schedule,
}) => {
  const [dateRange, setDateRange] = useState<Dayjs[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [allScheduleAssignments, setAllScheduleAssignments] = useState<
    ShiftAssignmentDto[]
  >([]);

  const [loadScheduleView] =
    useLazyGetApiV1ShiftSchedulesByScheduleIdViewQuery();

  // Set selectedDate to schedule.startDate when schedule loads
  useEffect(() => {
    if (schedule?.startDate) {
      setSelectedDate(new Date(schedule.startDate));
    }
  }, [schedule?.startDate]);

  // Load the full schedule range data when component mounts or schedule changes
  useEffect(() => {
    if (schedule?.startDate && schedule?.endDate) {
      loadFullScheduleRange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule?.startDate, schedule?.endDate, scheduleId]);

  // Recalculate the week range when selectedDate changes
  useEffect(() => {
    const selected = dayjs(selectedDate);
    const start = selected.startOf("week");
    const end = selected.endOf("week");

    const range: Dayjs[] = [];
    let current = start;
    while (current.isBefore(end) || current.isSame(end, "day")) {
      range.push(current);
      current = current.add(1, "day");
    }

    setDateRange(range);
  }, [selectedDate]);

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

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Get assignments for a specific date and shift type
  const getAssignmentsForDateAndShift = (date: Dayjs, shiftId: string) => {
    return allScheduleAssignments.filter((assignment) => {
      const sameDate = dayjs(assignment.scheduleDate).isSame(date, "day");
      const sameShiftType = assignment.shiftType?.shiftTypeId === shiftId;
      return sameDate && sameShiftType;
    });
  };

  // Check if a date is within the schedule range
  const isDateInScheduleRange = (date: Dayjs) => {
    if (!schedule?.startDate || !schedule?.endDate) return false;

    const scheduleStart = dayjs(schedule.startDate);
    const scheduleEnd = dayjs(schedule.endDate);

    return (
      date.isSameOrAfter(scheduleStart, "day") &&
      date.isSameOrBefore(scheduleEnd, "day")
    );
  };

  return (
    <div className="p-4">
      <WeekPicker
        selectedDate={selectedDate}
        setSelectedDate={handleDateSelect}
      />

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
                "bg-primary-default text-white font-semibold p-2 text-center",
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
                // Check if date is within schedule range
                const isInScheduleRange = isDateInScheduleRange(date);

                // Optional: filter shifts by applicableDays if you want
                const dayIndex = date.day();
                const isApplicable = shift?.applicableDays?.includes(dayIndex);

                // If not in schedule range, show empty cell
                if (!isInScheduleRange) {
                  return (
                    <div
                      key={`${shift.id}-${date.toString()}`}
                      className="border border-neutral-input p-2 min-h-[100px] bg-gray-50"
                    >
                      <small className="text-gray-400">
                        Outside schedule range
                      </small>
                    </div>
                  );
                }

                // If not applicable day, show not applicable
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

                // Get assignments for this date and shift
                const assignments = getAssignmentsForDateAndShift(
                  date,
                  shift.id as string,
                );

                return (
                  <div
                    key={`${shift.id}-${date.toString()}`}
                    className="border relative border-neutral-input p-2 min-h-[100px] flex flex-col bg-white"
                  >
                    <div className="space-y-2 flex flex-col justify-start items-start">
                      {assignments.map((assignment, aid) => (
                        <ToolTipLists
                          key={aid}
                          component={
                            <div className="text-sm inline-block px-2 py-1 rounded cursor-pointer text-white bg-primary-default">
                              {assignment.shiftCategory?.name}
                            </div>
                          }
                        >
                          <ul>
                            {assignment.employees?.map((emp, emx) => (
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
                        </ToolTipLists>
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

export default WeeklyFullCalendar;

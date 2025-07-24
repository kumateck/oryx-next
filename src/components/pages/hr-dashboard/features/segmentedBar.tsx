import { HrDashboardDtoRead } from "@/lib/redux/api/openapi.generated";

interface Props {
  data: HrDashboardDtoRead;
}
export const SegmentedBar = ({ data }: Props) => {
  const totalEmployees =
    (data?.attendanceStats?.numberOfAbsentEmployees ?? 0) +
    (data?.attendanceStats?.numberOfPresentEmployees ?? 0);
  const attendedPercentage =
    totalEmployees > 0
      ? ((data.attendanceStats?.numberOfPresentEmployees ?? 0) /
          totalEmployees) *
        100
      : 0;

  const absentPercentage =
    totalEmployees > 0
      ? ((data.attendanceStats?.numberOfAbsentEmployees ?? 0) /
          totalEmployees) *
        100
      : 0;
  return (
    <div className="space-y-2 w-full">
      {/* Actual stacked bar */}
      <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden flex">
        <div
          className="bg-red-600 h-full"
          style={{
            width: `${absentPercentage}%`,
          }}
        ></div>
        <div
          className="bg-blue-600 h-full"
          style={{
            width: `${attendedPercentage}%`,
          }}
        ></div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-600 rounded-full inline-block" />
          Absence
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-blue-600 rounded-full inline-block" />
          Attendance
        </div>
      </div>
    </div>
  );
};

export const SegmentedBar = () => {
  return (
    <div className="space-y-2">
      {/* Actual stacked bar */}
      <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden flex">
        <div className="bg-orange-600 h-full" style={{ width: "5%" }}></div>
        <div className="bg-red-600 h-full" style={{ width: "2%" }}></div>
        <div className="bg-blue-600 h-full" style={{ width: "90%" }}></div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-orange-600 rounded-full inline-block" />
          Leave
        </div>
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

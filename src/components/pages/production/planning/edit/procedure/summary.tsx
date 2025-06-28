import React from "react";
import { RoutingRequestDto } from "./types";
interface Props {
  summary: RoutingRequestDto;
}
const Summary = ({ summary }: Props) => {
  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm space-y-4 text-sm text-gray-700">
      <div className="flex items-center gap-4">
        {/* Operation takes up the remaining space */}
        <div className="flex flex-1 min-w-0 gap-2 flex-wrap items-center">
          <span className="font-semibold">Operation:</span>
          <span className="truncate">{summary?.operationId?.label || "—"}</span>
        </div>

        {/* Dot separator */}
        <div className="size-2 bg-neutral-dark rounded-sm shrink-0"></div>

        {/* Estimated Time stays on one line, no wrapping */}
        <div className="flex gap-2 items-center whitespace-nowrap">
          <span className="font-semibold">Estimated Time:</span>
          <span>{summary?.estimatedTime || "—"}</span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <span className="font-semibold  mb-1">Work Centers:</span>
        <div className="flex flex-wrap gap-2">
          {summary?.workCenters?.length ? (
            summary.workCenters.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
              >
                {item.label}
              </span>
            ))
          ) : (
            <span className="text-gray-400">—</span>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <span className="font-semibold  mb-1">Resources:</span>
        <div className="flex flex-wrap gap-2">
          {summary?.resources?.length ? (
            summary.resources.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs"
              >
                {item.label}
              </span>
            ))
          ) : (
            <span className="text-gray-400">—</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;

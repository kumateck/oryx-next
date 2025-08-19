import React from "react";
import { cn } from "@/lib/utils";
import { EmployeeMovementReportDtoRead } from "@/lib/redux/api/openapi.generated";

interface TableRowData {
  data: EmployeeMovementReportDtoRead;
}
export function Table({ data }: TableRowData) {
  console.log("Table data:", data);
  return (
    <div className="overflow-x-auto rounded-t-lg">
      <table className="min-w-full border border-gray-200 text-center">
        <thead className="bg-primary-default rounded-t-md text-white">
          <tr>
            <th rowSpan={2} className="p-2 border">
              Department
            </th>
            <th colSpan={5} className="p-2 border">
              Permanent Staff
            </th>
            <th colSpan={5} className="p-2 border">
              Casual Staff
            </th>
          </tr>
          <tr>
            {["New", "TR", "Resign", "TERM", "S.D/V.D"].map((header) => (
              <th key={`perm-${header}`} className="p-2 font-normal text-sm">
                {header}
              </th>
            ))}
            {["New", "TR", "Resign", "TERM", "S.D/V.D"].map((header) => (
              <th key={`casual-${header}`} className="p-2 text-sm font-normal">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.departments?.map((row, idx) => (
            <tr
              key={idx}
              className={cn(idx % 2 === 0 ? "bg-gray-50" : "bg-white")}
            >
              <td className="p-2 font-medium text-start border">
                {row.departmentName}
              </td>
              <td className="p-2 border">{row.permanentNew}</td>
              <td className="p-2 border">{row.permanentTermination}</td>
              <td className="p-2 border">{row.permanentResignation}</td>
              <td className="p-2 border">{row.permanentTermination}</td>
              <td className="p-2 border">{row.permanentSDVP}</td>
              <td className="p-2 border">{row.casualNew}</td>
              <td className="p-2 border">{row.casualTermination}</td>
              <td className="p-2 border">{row.casualResignation}</td>
              <td className="p-2 border">{row.casualTermination}</td>
              <td className="p-2 border">{row.casualSDVP}</td>
            </tr>
          ))}
        </tbody>
        {data?.departments && data.departments.length > 0 ? (
          <tfoot className="bg-gray-100 font-bold">
            <tr>
              <td className="py-2 px-4 border">TOTAL</td>
              <td colSpan={5} className="py-2 px-4 border text-center">
                {data?.totals?.totalPermanent || 0}
              </td>
              <td colSpan={5} className="py-2 px-4 border text-center">
                {data?.totals?.totalCasual || 0}
              </td>
            </tr>
          </tfoot>
        ) : (
          <tfoot className="bg-gray-100 font-bold">
            <tr>
              <td colSpan={11} className=" p-4 border text-center">
                No data available
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

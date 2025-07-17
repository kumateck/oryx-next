import React from "react";
import { cn } from "@/lib/utils";

const data = [
  {
    department: "Benjamin Botwe Factory",
    permanent: { new: 5, tr: 5, resign: 5, term: 5, sdvd: 7 },
    casual: { new: 5, tr: 5, resign: 5, term: 5, sdvd: 7 },
  },
  {
    department: "Quality Control",
    permanent: { new: 5, tr: 5, resign: 5, term: 5, sdvd: 7 },
    casual: { new: 5, tr: 5, resign: 5, term: 5, sdvd: 7 },
  },
];
function StaffSummaryTable() {
  return (
    <div>
      <div>
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
                  <th
                    key={`perm-${header}`}
                    className="p-2 font-normal text-sm"
                  >
                    {header}
                  </th>
                ))}
                {["New", "TR", "Resign", "TERM", "S.D/V.D"].map((header) => (
                  <th
                    key={`casual-${header}`}
                    className="p-2 text-sm font-normal"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  className={cn(idx % 2 === 0 ? "bg-gray-50" : "bg-white")}
                >
                  <td className="p-2 font-medium text-start border">
                    {row.department}
                  </td>
                  <td className="p-2 border">{row.permanent.new}</td>
                  <td className="p-2 border">{row.permanent.tr}</td>
                  <td className="p-2 border">{row.permanent.resign}</td>
                  <td className="p-2 border">{row.permanent.term}</td>
                  <td className="p-2 border">{row.permanent.sdvd}</td>
                  <td className="p-2 border">{row.casual.new}</td>
                  <td className="p-2 border">{row.casual.tr}</td>
                  <td className="p-2 border">{row.casual.resign}</td>
                  <td className="p-2 border">{row.casual.term}</td>
                  <td className="p-2 border">{row.casual.sdvd}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 font-bold">
              <tr>
                <td className="py-2 px-4 border">TOTAL</td>
                <td colSpan={5} className="py-2 px-4 border text-center">
                  26
                </td>
                <td colSpan={5} className="py-2 px-4 border text-center">
                  26
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="">
      <h1 className="text-2xl font-bold mb-4">Staff Summary</h1>
      <StaffSummaryTable />
    </main>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import { StaffTurnoverReportDtoRead } from "@/lib/redux/api/openapi.generated";

interface Props {
  data: StaffTurnoverReportDtoRead;
}

export default function TurnoverReportTable({ data }: Props) {
  const departmentSummaries = data.departmentSummaries ?? [];

  const allExitReasons = Array.from(
    new Set(
      departmentSummaries.flatMap((d) =>
        d.exitReasons ? Object.keys(d.exitReasons) : [],
      ),
    ),
  );

  return (
    <div>
      <Table>
        <TableHeader className="bg-blue-700 text-white">
          <TableRow>
            <TableHead className="text-white text-left">Department</TableHead>
            {allExitReasons.map((reason, i) => (
              <TableHead key={i} className="text-center text-white capitalize">
                {reason}
              </TableHead>
            ))}
            <TableHead className="text-center text-white">
              Total Leavers
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departmentSummaries?.length > 0 ? (
            departmentSummaries.map((row, i) => (
              <TableRow key={i} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {row.departmentName ?? "-"}
                </TableCell>
                {allExitReasons.map((reason, j) => (
                  <TableCell key={j} className="text-center">
                    {row.exitReasons?.[reason] ?? 0}
                  </TableCell>
                ))}
                <TableCell className="text-center font-semibold">
                  {row.totalLeavers ?? 0}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={allExitReasons.length + 2}
                className="text-center text-lg py-10"
              >
                No data available
              </TableCell>
            </TableRow>
          )}

          {/* Totals Row */}
          {departmentSummaries.length > 0 && (
            <TableRow className="bg-gray-100 font-bold">
              <TableCell>Total</TableCell>
              {allExitReasons.map((reason, j) => (
                <TableCell key={j} className="text-center">
                  {departmentSummaries.reduce(
                    (acc, d) => acc + (d.exitReasons?.[reason] ?? 0),
                    0,
                  )}
                </TableCell>
              ))}
              <TableCell className="text-center">
                {data.grandTotalLeavers ?? 0}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-4 p-3 border rounded bg-gray-50 w-full ">
        <p className="font-medium">
          Overall Turnover Rate:{" "}
          <span className="font-bold ml-2">{data.turnoverRate ?? 0}%</span>
        </p>
        <p>
          Grand Total Leavers:{" "}
          <span className="font-bold ml-2">{data.grandTotalLeavers ?? 0}</span>
        </p>
      </div>
    </div>
  );
}

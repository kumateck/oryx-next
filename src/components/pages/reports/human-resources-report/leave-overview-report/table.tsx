import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { StaffLeaveSummaryReportDtoRead } from "@/lib/redux/api/openapi.generated";

interface Props {
  data: StaffLeaveSummaryReportDtoRead;
}

export default function LeaveEntitlementTable({ data }: Props) {
  const totals = {
    staffDueForLeave:
      data.departments?.reduce(
        (acc, d) =>
          acc +
          (typeof d.staffDueForLeave === "number" ? d.staffDueForLeave : 0),
        0,
      ) ?? 0,
    totalLeaveEntitlement:
      data.departments?.reduce(
        (acc, d) =>
          acc +
          (typeof d.totalLeaveEntitlement === "number"
            ? d.totalLeaveEntitlement
            : 0),
        0,
      ) ?? 0,
    daysUsed:
      data.departments?.reduce(
        (acc, d) => acc + (typeof d.daysUsed === "number" ? d.daysUsed : 0),
        0,
      ) ?? 0,
    daysLeft:
      data.departments?.reduce(
        (acc, d) => acc + (typeof d.daysLeft === "number" ? d.daysLeft : 0),
        0,
      ) ?? 0,
  };

  const percentUsed =
    totals.totalLeaveEntitlement > 0
      ? Math.round((totals.daysUsed / totals.totalLeaveEntitlement) * 100)
      : 0;
  const percentLeft =
    totals.totalLeaveEntitlement > 0
      ? Math.round((totals.daysLeft / totals.totalLeaveEntitlement) * 100)
      : 0;

  return (
    <Table>
      <TableHeader className="bg-blue-700 text-white">
        <TableRow>
          <TableHead className="text-left text-white">Department</TableHead>
          <TableHead className="text-center text-white">Staff Due</TableHead>
          <TableHead className="text-center text-white">
            Total Entitlement
          </TableHead>
          <TableHead className="text-center text-white">Days Used</TableHead>
          <TableHead className="text-center text-white">Days Left</TableHead>
          <TableHead className="text-center text-white">% Used</TableHead>
          <TableHead className="text-center text-white">% Left</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.departments?.map((row, i) => (
          <TableRow key={i} className="hover:bg-gray-50">
            <TableCell className="font-medium">{row.departmentName}</TableCell>
            <TableCell className="text-center">
              {row.staffDueForLeave}
            </TableCell>
            <TableCell className="text-center">
              {row.totalLeaveEntitlement}
            </TableCell>
            <TableCell className="text-center">{row.daysUsed}</TableCell>
            <TableCell className="text-center">{row.daysLeft}</TableCell>
            <TableCell className="text-center">{row.percentUsed}%</TableCell>
            <TableCell className="text-center">{row.percentLeft}%</TableCell>
          </TableRow>
        ))}

        {/* Totals Row */}
        <TableRow className="bg-gray-100 font-bold">
          <TableCell>Total</TableCell>
          <TableCell className="text-center">
            {totals.staffDueForLeave}
          </TableCell>
          <TableCell className="text-center">
            {totals.totalLeaveEntitlement}
          </TableCell>
          <TableCell className="text-center">{totals.daysUsed}</TableCell>
          <TableCell className="text-center">{totals.daysLeft}</TableCell>
          <TableCell className="text-center">{percentUsed}%</TableCell>
          <TableCell className="text-center">{percentLeft}%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

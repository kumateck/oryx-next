import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

export default function LeaveStatsTable() {
  const data = [
    { department: "Pharmacy", total: 25, onLeave: 3, leavePercent: "12%" },
    { department: "Production", total: 40, onLeave: 5, leavePercent: "12.5%" },
    { department: "Sales", total: 15, onLeave: 1, leavePercent: "6.7%" },
    { department: "HR", total: 10, onLeave: 2, leavePercent: "20%" },
    { department: "QC (Quality)", total: 12, onLeave: 0, leavePercent: "0%" },
  ];

  const totals = {
    totalEmployees: 102,
    totalOnLeave: 11,
    avgPercent: "10.8%",
  };

  return (
    <div className="rounded-xl border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="text-white">
            <TableHead className="w-[200px]">Department</TableHead>
            <TableHead>Total Employees</TableHead>
            <TableHead>On Leave</TableHead>
            <TableHead>Leave %</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i} className="hover:bg-gray-50">
              <TableCell className="font-medium">{row.department}</TableCell>
              <TableCell>{row.total}</TableCell>
              <TableCell>{row.onLeave}</TableCell>
              <TableCell>{row.leavePercent}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell className="font-bold">Total</TableCell>
            <TableCell className="font-bold">{totals.totalEmployees}</TableCell>
            <TableCell className="font-bold">{totals.totalOnLeave}</TableCell>
            <TableCell className="font-bold">{totals.avgPercent}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

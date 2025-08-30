import React from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    department: "Production",
    totalEmployees: 45,
    presentDays: 860,
    absentDays: 140,
  },
  {
    department: "Quality Ctrl",
    totalEmployees: 20,
    presentDays: 370,
    absentDays: 30,
  },
  { department: "Sales", totalEmployees: 15, presentDays: 270, absentDays: 30 },
  { department: "HR", totalEmployees: 10, presentDays: 190, absentDays: 10 },
  { department: "IT", totalEmployees: 12, presentDays: 220, absentDays: 20 },
];

const totals = data.reduce(
  (acc, curr) => {
    acc.totalEmployees += curr.totalEmployees;
    acc.presentDays += curr.presentDays;
    acc.absentDays += curr.absentDays;
    return acc;
  },
  { totalEmployees: 0, presentDays: 0, absentDays: 0 },
);

export default function AttendanceTable() {
  return (
    <div>
      <div className="rounded-t-lg">
        <table className="min-w-full border border-gray-200 text-center">
          <TableHeader className="bg-blue-700">
            <TableRow className="text-white text-center">
              <TableHead className="text-white text-left">Department</TableHead>
              <TableHead className="border">Total Employees</TableHead>
              <TableHead className="border">Present Days</TableHead>
              <TableHead className="border">Absent Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <TableCell className="text-left font-medium">
                  {row.department}
                </TableCell>
                <TableCell className="text-start">
                  {row.totalEmployees}
                </TableCell>
                <TableCell className="text-start">{row.presentDays}</TableCell>
                <TableCell className="text-start">{row.absentDays}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-100 font-bold text-center">
              <TableCell className="text-left">TOTAL</TableCell>
              <TableCell className="text-start">
                {totals.totalEmployees}
              </TableCell>
              <TableCell className="text-start">{totals.presentDays}</TableCell>
              <TableCell className="text-start">{totals.absentDays}</TableCell>
            </TableRow>
          </TableBody>
        </table>
      </div>
    </div>
  );
}

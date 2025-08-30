import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

export function DailyAttendanceOverview() {
  const data = [
    {
      id: "E001",
      name: "John Doe",
      dept: "Sales",
      checkIn: "08:55 AM",
      checkOut: "05:05 PM",
      status: "Present",
    },
    {
      id: "E002",
      name: "Jane Smith",
      dept: "HR",
      checkIn: "09:10 AM",
      checkOut: "05:00 PM",
      status: "Present",
    },
    {
      id: "E003",
      name: "Mike Lee",
      dept: "IT",
      checkIn: "08:50 AM",
      checkOut: "04:55 PM",
      status: "Present",
    },
    {
      id: "E004",
      name: "Sarah Kim",
      dept: "Finance",
      checkIn: "-",
      checkOut: "-",
      status: "Absent",
    },
    {
      id: "E005",
      name: "Alex Wong",
      dept: "Sales",
      checkIn: "09:05 AM",
      checkOut: "05:15 PM",
      status: "Present",
    },
  ];

  const totalEmployees = data.length;
  const presentCount = data.filter((d) => d.status === "Present").length;
  const absentCount = data.filter((d) => d.status === "Absent").length;

  return (
    <div>
      <div className="rounded-t-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-700 text-white font-medium">
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Check-In</TableHead>
              <TableHead>Check-Out</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.dept}</TableCell>
                <TableCell>{row.checkIn}</TableCell>
                <TableCell>{row.checkOut}</TableCell>
                <TableCell
                  className={
                    row.status === "Present"
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-bold">
                Totals
              </TableCell>
              <TableCell>{totalEmployees} Employees</TableCell>
              <TableCell colSpan={2}>{presentCount} Present</TableCell>
              <TableCell>{absentCount} Absent</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

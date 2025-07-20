import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    department: "Benjamin Botwe Factory",
    staffDueLeave: 5,
    totalLeave1: 7,
    totalLeave2: 7,
    term: 5,
    sdvd: 7,
  },
  {
    department: "Quality Control",
    staffDueLeave: 5,
    totalLeave1: 7,
    totalLeave2: 7,
    term: 5,
    sdvd: 7,
  },
  {
    department: "Quality Assurance",
    staffDueLeave: 5,
    totalLeave1: 2,
    totalLeave2: 2,
    term: 5,
    sdvd: 2,
  },
];

export default function StaffTotalReport() {
  return (
    <div className="">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-600 text-white">
              <TableHead
                rowSpan={2}
                className="text-white border text-lg font-medium"
              >
                Department
              </TableHead>
              <TableHead colSpan={3} className="text-white border text-center">
                Permanent Staff
              </TableHead>
              <TableHead colSpan={2} className="text-white border text-center">
                Casual Staff
              </TableHead>
            </TableRow>
            <TableRow className="bg-blue-600 text-white">
              <TableHead className="text-white">Staff Due for Leave</TableHead>
              <TableHead className="text-white border">Total Leave</TableHead>
              <TableHead className="text-white border">Total Leave</TableHead>
              <TableHead className="text-white border">TERM</TableHead>
              <TableHead className="text-white border">S.D/V.D</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, idx) => (
              <TableRow
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <TableCell className="font-semibold">
                  {item.department}
                </TableCell>
                <TableCell>{item.staffDueLeave}</TableCell>
                <TableCell>{item.totalLeave1}</TableCell>
                <TableCell>{item.totalLeave2}</TableCell>
                <TableCell>{item.term}</TableCell>
                <TableCell>{item.sdvd}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot className="bg-gray-100 font-bold">
            <tr>
              <td className="py-2 px-4 border">TOTAL</td>
              <td className="py-2 px-4 border">26</td>
              <td className="py-2 px-4 border">9</td>
              <td className="py-2 px-4 border">9</td>
              <td className="py-2 px-4 border">26</td>
              <td className="py-2 px-4 border">358</td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
}

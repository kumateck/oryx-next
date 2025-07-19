import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StaffTotalReportRead } from "@/lib/redux/api/openapi.generated";

export default function StaffTotalReport({
  data,
}: {
  data: StaffTotalReportRead;
}) {
  return (
    <div className="">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-600 text-white">
              <TableHead
                // rowSpan={2}
                className="text-white font-medium"
              >
                Department
              </TableHead>
              <TableHead
                // colSpan={2}
                className="text-white font-medium"
              >
                Permanent Staff
              </TableHead>
              <TableHead
                // colSpan={2}
                className="text-white font-medium"
              >
                Casual Staff
              </TableHead>
              <TableHead className="text-white font-medium">Total</TableHead>
            </TableRow>
            {/* <TableRow className="bg-blue-600 text-white">
              <TableHead className="text-white">Male</TableHead>
              <TableHead className="text-white border">Femail</TableHead>
              <TableHead className="text-white border">Mail</TableHead>
              <TableHead className="text-white border">Femail</TableHead>
              <TableHead rowSpan={2} className="text-white border">
                Total
              </TableHead>
            </TableRow> */}
          </TableHeader>
          <TableBody>
            {data?.departments?.map((item, idx) => (
              <TableRow
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <TableCell className="font-medium p-2 px-4">
                  {item.department}
                </TableCell>
                <TableCell className="p-2 px-4">
                  {item.totalPermanentStaff}
                </TableCell>
                <TableCell className="p-2 px-4">
                  {item.totalCasualStaff}
                </TableCell>
                <TableCell className="p-2 px-4">{item.totalStaff}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot className="bg-gray-50 font-bold">
            <tr>
              <td rowSpan={2} className="py-2 px-4 ">
                TOTAL
              </td>
              <td className="py-2 px-4 ">{data.totals?.totalPermanentStaff}</td>
              <td className="py-2 px-4 ">{data.totals?.totalCasualStaff}</td>
              <td className="py-2 px-4 ">{data.totals?.totalStaff}</td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="py-2 bg-gray-100 font-semibold text-xl px-4 text-center"
              >
                {data.totals?.totalStaff}
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
}

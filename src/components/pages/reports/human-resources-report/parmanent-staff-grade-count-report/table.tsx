import React from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { PermanentStaffGradeReportDtoRead } from "@/lib/redux/api/openapi.generated";

interface Props {
  data: PermanentStaffGradeReportDtoRead;
}
export default function DepartmentTable({ data }: Props) {
  return (
    <div>
      <div className="rounded-t-lg">
        <table className="min-w-full border border-gray-200 text-center">
          <TableHeader className="bg-blue-700">
            <TableRow className=" text-white text-center">
              <TableHead rowSpan={2} className=" text-white text-left">
                Department
              </TableHead>
              <TableHead colSpan={2} className="border">
                Senior Management
              </TableHead>
              <TableHead colSpan={2} className="border">
                Senior Staff
              </TableHead>
              <TableHead colSpan={2} className="border">
                Junior Staff
              </TableHead>
            </TableRow>
            <TableRow className=" text-white -mt-1 text-center">
              <TableHead className="border">Male</TableHead>
              <TableHead className="border">Female</TableHead>
              <TableHead className="border">Male</TableHead>
              <TableHead className="border">Female</TableHead>
              <TableHead className="border">Male</TableHead>
              <TableHead className="border">Female</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.departments?.map((row, i) => (
              <TableRow key={i} className="text-center">
                <TableCell className="text-left font-medium">
                  {row.department}
                </TableCell>
                <TableCell className="text-center">
                  {row.seniorMgtMale}
                </TableCell>
                <TableCell className="text-center">
                  {row.seniorMgtFemale}
                </TableCell>
                <TableCell className="text-center">
                  {row.seniorStaffMale}
                </TableCell>
                <TableCell className="text-center">
                  {row.seniorStaffFemale}
                </TableCell>
                <TableCell className="text-center">
                  {row.juniorStaffMale}
                </TableCell>
                <TableCell className="text-center">
                  {row.juniorStaffFemale}
                </TableCell>
              </TableRow>
            ))}
            {data?.departments && data.departments.length > 0 ? (
              <>
                <TableRow className="bg-gray-100 font-bold text-center">
                  <TableCell rowSpan={2} className="text-center">
                    TOTAL
                  </TableCell>
                  <TableCell className="text-center">
                    {data.totals?.seniorMgtMale}
                  </TableCell>
                  <TableCell className="text-center">
                    {data.totals?.seniorMgtFemale}
                  </TableCell>
                  <TableCell className="text-center">
                    {data.totals?.seniorStaffMale}
                  </TableCell>
                  <TableCell className="text-center">
                    {data.totals?.seniorStaffFemale}
                  </TableCell>
                  <TableCell className="text-center">
                    {data.totals?.juniorStaffMale}
                  </TableCell>
                  <TableCell className="text-center">
                    {data.totals?.juniorStaffFemale}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 font-bold text-center">
                  <TableCell
                    colSpan={6}
                    className="text-center text-2xl font-semibold"
                  >
                    {data.totals?.total}
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center p-4 text-lg">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </table>
      </div>
    </div>
  );
}

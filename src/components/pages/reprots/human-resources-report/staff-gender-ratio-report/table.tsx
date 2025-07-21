import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StaffGenderRatioReportRead } from "@/lib/redux/api/openapi.generated";

export default function StaffAndGenderRatioReportTable({
  data,
}: {
  data?: StaffGenderRatioReportRead;
}) {
  return (
    <div>
      <Table>
        <TableHeader className="bg-primary-default">
          <TableRow className=" text-white text-center">
            <TableHead
              rowSpan={2}
              className="border px-4 font-medium text-lg text-left"
            >
              Department
            </TableHead>
            <TableHead className="p-2 border text-center" colSpan={2}>
              Permanant Staff
            </TableHead>
            <TableHead className="p-2 border text-center" colSpan={2}>
              Casual Staff
            </TableHead>
            {/* <TableHead className="border" colSpan={2}>
              NSS
            </TableHead>
            <TableHead className="border" colSpan={2}>
              Annex
            </TableHead> */}
            <TableHead className="p-2 border text-center" colSpan={2}>
              Total
            </TableHead>
          </TableRow>
          <TableRow className=" text-white border rounded-t-none text-center">
            <TableHead className="p-2 border">Male</TableHead>
            <TableHead className="p-2 border">Female</TableHead>
            <TableHead className="p-2 border">Male</TableHead>
            <TableHead className="p-2 border">Female</TableHead>
            <TableHead className="p-2 border">Male</TableHead>
            {/* <TableHead className=" p-2">Female</TableHead>
            <TableHead className=" p-2">Male</TableHead>
            <TableHead className=" p-2">Female</TableHead>
            <TableHead className=" p-2">Male</TableHead> */}
            <TableHead className="p-2 border">Female</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.departments?.map((row, i) => {
            return (
              <TableRow key={i} className="text-center">
                <TableCell className="text-left p-2 font-medium">
                  {row.department}
                </TableCell>
                <TableCell className="p-2">
                  {row.numberOfPermanentMale}
                </TableCell>
                <TableCell className="p-2">
                  {row.numberOfPermanentFemale}
                </TableCell>
                <TableCell className="p-2">{row.numberOfCasualMale}</TableCell>
                <TableCell className="p-2">
                  {row.numberOfPermanentFemale}
                </TableCell>
                {/* <TableCell className="p-2">{row.nss.male}</TableCell>
                <TableCell className="p-2">{row.nss.female}</TableCell>
                <TableCell className="p-2">{row.annex.male}</TableCell>
                <TableCell className="p-2">{row.annex.female}</TableCell> */}
                <TableCell className="p-2">{row.totalMales}</TableCell>
                <TableCell className="p-2">{row.totalFemales}</TableCell>
              </TableRow>
            );
          })}
          {}
          {data?.departments?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center p-4 text-lg">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            <TableRow className="bg-gray-100 p-2 font-bold text-center">
              <TableCell className="text-left p-2">TOTAL</TableCell>
              <TableCell className="p-2">
                {data?.totals?.numberOfPermanentMale}
              </TableCell>
              <TableCell className="p-2">
                {data?.totals?.numberOfPermanentFemale}
              </TableCell>
              <TableCell className="p-2">
                {data?.totals?.numberOfCasualMale}
              </TableCell>
              <TableCell className="p-2">
                {data?.totals?.numberOfCasualFemale}
              </TableCell>
              {/* <TableCell className="p-2">{total.nss.male}</TableCell>
            <TableCell className="p-2">{total.nss.female}</TableCell>
            <TableCell className="p-2">{total.annex.male}</TableCell>
            <TableCell className="p-2">{total.annex.female}</TableCell> */}
              <TableCell className="p-2">{data?.totals?.totalMales}</TableCell>
              <TableCell className="p-2">
                {data?.totals?.totalFemales}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

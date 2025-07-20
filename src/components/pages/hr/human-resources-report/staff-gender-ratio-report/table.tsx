import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const departments = [
  "Benjamin Botwe Factory",
  "Quality Control",
  "Quality Assurance",
  "Corquaye Factory",
  "Engineering",
  "Finance",
  "Nyoabge Factory",
  "R&D",
  "Supply Chain",
  "Environment Health & Safety",
];

const data = departments.map((name, i) => ({
  department: name,
  permanent: { male: 5 - (i % 3), female: 7 - (i % 3) },
  casual: { male: 5 - (i % 3), female: 7 - (i % 3) },
  nss: { male: 5 - (i % 3), female: 7 - (i % 3) },
  annex: { male: 5 - (i % 3), female: 7 - (i % 3) },
}));

const total = data.reduce(
  (acc, curr) => {
    acc.permanent.male += curr.permanent.male;
    acc.permanent.female += curr.permanent.female;
    acc.casual.male += curr.casual.male;
    acc.casual.female += curr.casual.female;
    acc.nss.male += curr.nss.male;
    acc.nss.female += curr.nss.female;
    acc.annex.male += curr.annex.male;
    acc.annex.female += curr.annex.female;
    return acc;
  },
  {
    permanent: { male: 0, female: 0 },
    casual: { male: 0, female: 0 },
    nss: { male: 0, female: 0 },
    annex: { male: 0, female: 0 },
  },
);

export default function StaffAndGenderRatioReportTable() {
  return (
    <div>
      <Table>
        <TableHeader className="bg-primary-default">
          <TableRow className=" text-white text-center">
            <TableHead
              rowSpan={2}
              className="border font-medium text-lg text-left"
            >
              Department
            </TableHead>
            <TableHead className="border" colSpan={2}>
              Permanant Staff
            </TableHead>
            <TableHead className="border" colSpan={2}>
              Casual Staff
            </TableHead>
            <TableHead className="border" colSpan={2}>
              NSS
            </TableHead>
            <TableHead className="border" colSpan={2}>
              Annex
            </TableHead>
            <TableHead className="border" colSpan={2}>
              Total
            </TableHead>
          </TableRow>
          <TableRow className=" text-white rounded-t-none text-center">
            <TableHead className="border p-2">Male</TableHead>
            <TableHead className="border p-2">Female</TableHead>
            <TableHead className="border p-2">Male</TableHead>
            <TableHead className="border p-2">Female</TableHead>
            <TableHead className="border p-2">Male</TableHead>
            <TableHead className="border p-2">Female</TableHead>
            <TableHead className="border p-2">Male</TableHead>
            <TableHead className="border p-2">Female</TableHead>
            <TableHead className="border p-2">Male</TableHead>
            <TableHead className="border p-2">Female</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => {
            const totalMale =
              row.permanent.male +
              row.casual.male +
              row.nss.male +
              row.annex.male;
            const totalFemale =
              row.permanent.female +
              row.casual.female +
              row.nss.female +
              row.annex.female;
            return (
              <TableRow key={i} className="text-center">
                <TableCell className="text-left p-2 font-medium">
                  {row.department}
                </TableCell>
                <TableCell className="p-2">{row.permanent.male}</TableCell>
                <TableCell className="p-2">{row.permanent.female}</TableCell>
                <TableCell className="p-2">{row.casual.male}</TableCell>
                <TableCell className="p-2">{row.casual.female}</TableCell>
                <TableCell className="p-2">{row.nss.male}</TableCell>
                <TableCell className="p-2">{row.nss.female}</TableCell>
                <TableCell className="p-2">{row.annex.male}</TableCell>
                <TableCell className="p-2">{row.annex.female}</TableCell>
                <TableCell className="p-2">{totalMale}</TableCell>
                <TableCell className="p-2">{totalFemale}</TableCell>
              </TableRow>
            );
          })}
          <TableRow className="bg-gray-100 p-2 font-bold text-center">
            <TableCell className="text-left p-2">TOTAL</TableCell>
            <TableCell className="p-2">{total.permanent.male}</TableCell>
            <TableCell className="p-2">{total.permanent.female}</TableCell>
            <TableCell className="p-2">{total.casual.male}</TableCell>
            <TableCell className="p-2">{total.casual.female}</TableCell>
            <TableCell className="p-2">{total.nss.male}</TableCell>
            <TableCell className="p-2">{total.nss.female}</TableCell>
            <TableCell className="p-2">{total.annex.male}</TableCell>
            <TableCell className="p-2">{total.annex.female}</TableCell>
            <TableCell className="p-2">
              {total.permanent.male +
                total.casual.male +
                total.nss.male +
                total.annex.male}
            </TableCell>
            <TableCell className="p-2">
              {total.permanent.female +
                total.casual.female +
                total.nss.female +
                total.annex.female}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

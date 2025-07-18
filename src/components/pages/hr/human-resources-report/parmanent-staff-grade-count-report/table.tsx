import React from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

// const data = [
//   {
//     department: "Benjamin Botwe Factory",
//     permanent: { new: 5, tr: 5, resign: 5, term: 5, sdvd: 7 },
//     casual: { new: 5, tr: 5, resign: 5, term: 5, sdvd: 7 },
//   },
//   {
//     department: "Quality Control",
//     permanent: { new: 5, tr: 5, resign: 5 },
//     casual: { new: 5, tr: 5, resign: 5, term: 5, sdvd: 7 },
//   },
// ];
// export function Table() {
//   return (
//     <div>
//       <div>
//         <div className="overflow-x-auto rounded-t-lg">
//           <table className="min-w-full border border-gray-200 text-center">
//             <thead className="bg-primary-default rounded-t-md text-white">
//               <tr>
//                 <th rowSpan={2} className="p-2 border">
//                   Department
//                 </th>
//                 <th colSpan={2} className="p-2 border">
//                   Senior Managements
//                 </th>
//                 <th colSpan={2} className="p-2 border">
//                   Senior Staff
//                 </th>
//                 <th colSpan={2} className="p-2 border">
//                   Junior Staff
//                 </th>
//               </tr>
//               <tr>
//                 {["Male", "Female"].map((header) => (
//                   <th
//                     key={`perm-${header}`}
//                     className="p-2 font-normal text-sm"
//                   >
//                     {header}
//                   </th>
//                 ))}
//                 {["Male", "Female"].map((header) => (
//                   <th
//                     key={`casual-${header}`}
//                     className="p-2 text-sm font-normal"
//                   >
//                     {header}
//                   </th>
//                 ))}
//                 {["Male", "Female"].map((header) => (
//                   <th
//                     key={`casual-${header}`}
//                     className="p-2 text-sm font-normal"
//                   >
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, idx) => (
//                 <tr
//                   key={idx}
//                   className={cn(idx % 2 === 0 ? "bg-gray-50" : "bg-white")}
//                 >
//                   <td className="p-2 font-medium text-start border">
//                     {row.department}
//                   </td>
//                   <td className="p-2 border">{row.permanent.new}</td>
//                   <td className="p-2 border">{row.permanent.tr}</td>
//                   <td className="p-2 border">{row.permanent.resign}</td>
//                   <td className="p-2 border">{row.permanent.term}</td>
//                   <td className="p-2 border">{row.permanent.sdvd}</td>
//                   <td className="p-2 border">{row.casual.new}</td>
//                   <td className="p-2 border">{row.casual.tr}</td>
//                   <td className="p-2 border">{row.casual.resign}</td>
//                   <td className="p-2 border">{row.casual.term}</td>
//                   <td className="p-2 border">{row.casual.sdvd}</td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot className="bg-gray-100 font-bold">
//               <tr>
//                 <td className="py-2 px-4 border">TOTAL</td>
//                 <td colSpan={5} className="py-2 px-4 border text-center">
//                   26
//                 </td>
//                 <td colSpan={5} className="py-2 px-4 border text-center">
//                   26
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

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

const data2 = departments.map((name, i) => ({
  department: name,
  seniorManagement: { male: 5 - (i % 3), female: 7 - (i % 3) },
  seniorStaff: { male: 5 - (i % 3), female: 7 - (i % 3) },
  juniorStaff: { male: 5 - (i % 3), female: 7 - (i % 3) },
}));

const total = data2.reduce(
  (acc, curr) => {
    acc.seniorManagement.male += curr.seniorManagement.male;
    acc.seniorManagement.female += curr.seniorManagement.female;
    acc.seniorStaff.male += curr.seniorStaff.male;
    acc.seniorStaff.female += curr.seniorStaff.female;
    acc.juniorStaff.male += curr.juniorStaff.male;
    acc.juniorStaff.female += curr.juniorStaff.female;
    return acc;
  },
  {
    seniorManagement: { male: 0, female: 0 },
    seniorStaff: { male: 0, female: 0 },
    juniorStaff: { male: 0, female: 0 },
  },
);

export default function DepartmentTable() {
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
            {data2.map((row, i) => (
              <TableRow key={i} className="text-center">
                <TableCell className="text-left font-medium">
                  {row.department}
                </TableCell>
                <TableCell className="text-center">
                  {row.seniorManagement.male}
                </TableCell>
                <TableCell className="text-center">
                  {row.seniorManagement.female}
                </TableCell>
                <TableCell className="text-center">
                  {row.seniorStaff.male}
                </TableCell>
                <TableCell className="text-center">
                  {row.seniorStaff.female}
                </TableCell>
                <TableCell className="text-center">
                  {row.juniorStaff.male}
                </TableCell>
                <TableCell className="text-center">
                  {row.juniorStaff.female}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-100 font-bold text-center">
              <TableCell rowSpan={2} className="text-center">
                TOTAL
              </TableCell>
              <TableCell className="text-center">
                {total.seniorManagement.male}
              </TableCell>
              <TableCell className="text-center">
                {total.seniorManagement.female}
              </TableCell>
              <TableCell className="text-center">
                {total.seniorStaff.male}
              </TableCell>
              <TableCell className="text-center">
                {total.seniorStaff.female}
              </TableCell>
              <TableCell className="text-center">
                {total.juniorStaff.male}
              </TableCell>
              <TableCell className="text-center">
                {total.juniorStaff.female}
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-100 font-bold text-center">
              <TableCell
                colSpan={6}
                className="text-center text-2xl font-semibold"
              >
                {total.juniorStaff.female}
              </TableCell>
            </TableRow>
          </TableBody>
        </table>
      </div>
    </div>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { MaterialDto } from "@/lib/redux/api/openapi.generated";
import Image from "next/image";
import React, { RefObject } from "react";
import logo from "@/assets/oryx_logo_dark.png";

interface Props {
  data: MaterialDto[];
  ref: RefObject<HTMLTableElement | null>;
}
function PrintTable({ data, ref }: Props) {
  return (
    <Table ref={ref} className=" overflow-visible h-auto">
      <TableHeader>
        <TableRow>
          <TableHead colSpan={5} className="bg-white py-4">
            <div className="flex justify-end">
              <Image
                className="block"
                src={logo}
                alt="logo"
                width={130}
                height={130}
              />
            </div>
          </TableHead>
        </TableRow>
        <TableRow className="bg-blue-600 text-white">
          <TableHead className="text-white font-medium">SR Name</TableHead>
          <TableHead className="text-white font-medium">
            Material Name
          </TableHead>
          <TableHead className="text-white font-medium">Category</TableHead>
          <TableHead className="text-white font-medium">Code</TableHead>
          <TableHead className="text-white font-medium">
            Pharmacopoeia
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.map((item, idx) => (
          <TableRow
            key={idx}
            className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
          >
            <TableCell className="font-medium p-2 px-4">
              {item.alphabet ?? "N/A"}
            </TableCell>
            <TableCell className="p-2 px-4">{item?.name ?? "N/A"}</TableCell>
            <TableCell className="p-2 px-4">
              {item?.materialCategory?.name}
            </TableCell>
            <TableCell className="p-2 px-4">{item?.code ?? "N/A"}</TableCell>
            <TableCell className="p-2 px-4">
              {item?.pharmacopoeia ?? "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {!data ||
        (data?.length <= 0 && (
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={5} className="p-4 text-center">
                No data available
              </td>
            </tr>
          </tfoot>
        ))}
    </Table>
  );
}

export default PrintTable;

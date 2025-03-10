import { format } from "date-fns";

import { ProductBillOfMaterialDto } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";

interface IProps {
  data?: ProductBillOfMaterialDto;
  // title?: string;
}

export const Bom = ({ data }: IProps) => {
  if (!data) {
    return <div>No Data</div>;
  }

  const billOfMaterial = data?.billOfMaterial;
  const version = billOfMaterial?.version;
  const effectiveDate = data?.effectiveDate as string;
  const isActive = billOfMaterial?.isActive;
  const items = billOfMaterial?.items;
  return (
    <div className="space-y-4">
      {/* <span className="block text-2xl font-bold">{title}</span> */}
      <div>
        <span>Version: {version}</span> |{" "}
        <span>
          Effective Date:{" "}
          {effectiveDate ? format(effectiveDate, "MMMM dd, yyyy") : ""}
        </span>{" "}
        | <span> Is Active: {isActive ? "Yes" : "No"}</span>
      </div>
      <ListsTable
        columns={[
          {
            accessorKey: "order",
            header: "Order",
            cell: (info) => info.row.original.order,
          },
          {
            accessorKey: "material",
            header: "Material Name",
            cell: (info) => info.row.original.material?.name,
          },
          {
            accessorKey: "materialtype",
            header: "Material Type",
            cell: (info) => info.row.original.materialType?.name,
          },
          {
            accessorKey: "baseQuantity",
            header: "Base Quantity",
            cell: (info) => info.row.original.baseQuantity,
          },
          {
            accessorKey: "uom",
            header: "Unit of Measure",
            cell: (info) => info.row.original.baseUoM,
          },
          {
            accessorKey: "casNumber",
            header: "CAS Number",
          },
          {
            accessorKey: "grade",
            header: "Grade",
          },
          // {
          //   accessorKey: "function",
          //   header: "Function",
          // },
        ]}
        data={items ?? []}
      />
    </div>
  );
};

import { ProductPackageDto } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";

interface IProps {
  data: ProductPackageDto[];
}

export const Packaging = ({ data }: IProps) => {
  if (data?.length === 0) {
    return <div>No Data</div>;
  }
  return (
    <div>
      <ListsTable
        columns={[
          // {
          //   accessorKey: "packageType",
          //   header: "Material",
          //   cell: (info) => info.row.original.packageType?.name,
          // },
          {
            accessorKey: "materialName",
            header: "Material Name",
            cell: (info) => info.row.original.material?.name,
          },
          // {
          //   accessorKey: "materialType",
          //   header: "Material Type",
          //   cell: (info) => info.row.original.material?.type,
          // },
          {
            accessorKey: "baseQuantity",
            header: "Base Quantity",
            cell: (info) => info.row.original.baseQuantity,
          },
          {
            accessorKey: "uom",
            header: "Unit of Measure",
            cell: (info) => info.row.original.baseUoM?.name,
          },
          {
            accessorKey: "materialThickness",
            header: "Material Thickness",
          },
          {
            accessorKey: "otherStandards",
            header: "Other Standards",
          },
        ]}
        data={data}
      />
    </div>
  );
};

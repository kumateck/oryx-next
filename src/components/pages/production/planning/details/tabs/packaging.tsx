import { ListsTable } from "@/app/shared/datatable";
import { ProductPackageDto } from "@/lib/redux/api/openapi.generated";

interface IProps {
  data: ProductPackageDto[];
}

export const Packaging = ({ data }: IProps) => {
  if (!data) {
    return <div>No Data</div>;
  }
  return (
    <div>
      <ListsTable
        columns={[
          {
            accessorKey: "packageType",
            header: "Material",
            cell: (info) => info.row.original.packageType?.name,
          },
          {
            accessorKey: "material",
            header: "Material",
            cell: (info) => info.row.original.material?.name,
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

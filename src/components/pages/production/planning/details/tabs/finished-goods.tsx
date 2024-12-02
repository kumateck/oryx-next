import { ListsTable } from "@/app/shared/datatable";
import { FinishedProductDto } from "@/lib/redux/api/openapi.generated";

interface IProps {
  data: FinishedProductDto[];
}

export const FinishedGoods = ({ data }: IProps) => {
  if (!data) {
    return <div>No Data</div>;
  }
  return (
    <div>
      <ListsTable
        columns={[
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "uom",
            header: "Unit of Measurement",
            cell: (info) => info.row.original.uoM?.name,
          },
          {
            accessorKey: "dosageForm",
            header: "Dosage Form",
          },
          {
            accessorKey: "standardCost",
            header: "Cost",
          },
          {
            accessorKey: "sellingPrice",
            header: "Selling Price",
          },
        ]}
        data={data}
      />
    </div>
  );
};

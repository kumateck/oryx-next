import { RouteDtoRead } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";

interface IProps {
  data?: RouteDtoRead[];
}

export const Procedure = ({ data }: IProps) => {
  if (data?.length === 0) {
    return <div>No Data</div>;
  }

  return (
    <div>
      <ListsTable
        columns={[
          {
            accessorKey: "order",
            header: "Order",
            cell: (info) => info.row.original.order,
          },
          {
            accessorKey: "operation",
            header: "Operation",
            cell: (info) => info.row.original.operation,
          },
          {
            accessorKey: "workCenter",
            header: "Work Center",
            cell: (info) => info.row.original.workCenters,
          },
          {
            accessorKey: "estimatedTime",
            header: "Estimated Time",
            cell: (info) => info.row.original.estimatedTime,
          },
          {
            accessorKey: "resources",
            header: "Resources",
            cell: (info) => info.row.original.resources,
          },
        ]}
        data={data ?? []}
      />
    </div>
  );
};

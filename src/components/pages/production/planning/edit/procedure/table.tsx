import { DraggableTable } from "@/app/shared/datatable";

import { getColumns } from "./columns";
import { RoutingRequestDto } from "./types";

interface Props {
  lists: RoutingRequestDto[];
  setItems: React.Dispatch<React.SetStateAction<RoutingRequestDto[]>>;
}

const TableForData = ({ lists, setItems }: Props) => {
  const columns = getColumns(setItems);

  return (
    <div className="flex justify-center">
      <DraggableTable
        columns={columns}
        data={
          lists?.map((item, idx) => {
            return {
              ...item,
              order: idx + 1,
              id: (idx + 1).toString(),
            };
          }) || []
        }
        setItems={setItems}
      />
    </div>
  );
};

export default TableForData;

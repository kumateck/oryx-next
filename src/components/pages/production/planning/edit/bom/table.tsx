"use client";

import { DraggableTable } from "@/shared/datatable";

import { getColumns } from "./columns";
import { BomRequestDto } from "./types";

interface Props {
  lists: BomRequestDto[];
  setItems: React.Dispatch<React.SetStateAction<BomRequestDto[]>>;
}
const TableForData = ({ lists, setItems }: Props) => {
  const columns = getColumns(setItems, lists);

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

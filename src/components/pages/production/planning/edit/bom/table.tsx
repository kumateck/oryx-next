import { DraggableTable } from "@/shared/datatable";

import { getColumns } from "./columns";
import { BomRequestDto } from "./types";
import React from "react";

interface Props {
  items: BomRequestDto[];
  onUpdateItem: (index: number, updatedItem: BomRequestDto) => boolean;
  onRemoveItem: (index: number) => void;
  existingItems: BomRequestDto[];
}

const TableForData = ({
  items,
  onUpdateItem,
  onRemoveItem,
  existingItems,
}: Props) => {
  const columns = getColumns(onUpdateItem, onRemoveItem, existingItems);
  const [oldItems, setItems] = React.useState<BomRequestDto[]>(items);
  const tableData = items.map((item, idx) => ({
    ...item,
    order: idx + 1,
    id: (idx + 1).toString(),
    index: idx,
  }));

  console.log(oldItems);

  // const handleReorder = (
  //   reorderedItems: (BomRequestDto & { index: number })[],
  // ) => {
  //   // Handle reordering if needed
  //   // You might need to update the parent form state here
  // };

  return (
    <div className="flex justify-center">
      <DraggableTable columns={columns} data={tableData} setItems={setItems} />
    </div>
  );
};

export default TableForData;

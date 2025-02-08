import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DraggableTableContainer from "./container";

interface DatatableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}
const DraggableTable = <TData,>({ data, columns }: DatatableProps<TData>) => {
  return (
    <div className="w-full">
      <DndProvider backend={HTML5Backend}>
        <DraggableTableContainer data={data} columns={columns} />
      </DndProvider>
    </div>
  );
};

export default DraggableTable;

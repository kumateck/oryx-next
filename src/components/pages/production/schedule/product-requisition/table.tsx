import { RowSelectionState } from "@tanstack/react-table";
import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui";
import { ProductionScheduleProcurementDto } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./column";

interface Props {
  title: string;
  data: ProductionScheduleProcurementDto[];
  rowSelection: RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  action?: React.ReactNode;
}
const TableCard = ({
  title,
  data,
  rowSelection,
  setRowSelection,
  action,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <PageTitle title={title} />
          <div>{action}</div>
        </div>
      </CardHeader>
      <CardContent>
        <ListsTable
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          columns={columns}
          data={data}
        />
      </CardContent>
    </Card>
  );
};

export default TableCard;

import { RowSelectionState } from "@tanstack/react-table";
import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui";
import { EMaterialKind } from "@/lib";
import { ProductionScheduleProcurementDto } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { pColumns, rColumns } from "./column";

interface Props {
  title: string;
  data: ProductionScheduleProcurementDto[];
  rowSelection: RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  action?: React.ReactNode;
  type: EMaterialKind;
}
const TableCard = ({
  title,
  data,
  rowSelection,
  setRowSelection,
  action,
  type,
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
          columns={type === EMaterialKind.Raw ? rColumns : pColumns}
          data={data}
        />
      </CardContent>
    </Card>
  );
};

export default TableCard;

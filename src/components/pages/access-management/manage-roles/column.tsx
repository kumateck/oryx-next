import { ColumnDef } from "@tanstack/react-table";

import ToolCell from "./tool-cell";

import { RoleDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<RoleDto>[] = [
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  /*{
    accessorKey: "name",
    header: "Display Name",
    cell: ({ row }) => <div>{row.original.displayName}</div>,
  },*/

  {
    id: "tools",
    header: "Action",
    enableHiding: false,
    meta: { omitRowClick: true, pin: "right" },
    cell: ({ row }) => {
      const roleId = row.original.id as string;
      return (
        <div className="flex items-center gap-2">
          <ToolCell roleId={roleId} />
        </div>
      );
    },
  },
];

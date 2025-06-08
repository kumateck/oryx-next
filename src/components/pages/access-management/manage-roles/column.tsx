import { ColumnDef } from "@tanstack/react-table";

import ToolCell from "./tool-cell";

import { RoleDto } from "@/lib/redux/api/openapi.generated";
import { RoleType, splitWords } from "@/lib";

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
    accessorKey: "type",
    header: "Role Type",
    cell: ({ row }) => (
      <div>{splitWords(RoleType[row.original.type as RoleType])}</div>
    ),
  },
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

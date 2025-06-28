import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui";

type TableCheckboxOptions<T> = {
  /**
   * Return `true` to disable this row’s checkbox (both individual and bulk select).
   */
  disableRow?: (rowData: T) => boolean;
};

export function TableCheckbox<T extends object>(
  options?: TableCheckboxOptions<T>,
): ColumnDef<T> {
  return {
    id: "select",
    header: ({ table }) => {
      const { rows } = table.getRowModel();

      // Determine if there is *any* row that is disabled
      const anyRowDisabled = rows.some(
        (row) => options?.disableRow?.(row.original) ?? false,
      );

      return (
        <div className="pr-3">
          <Checkbox
            className="border-neutral-50 data-[state=checked]:bg-neutral-100 data-[state=checked]:text-neutral-900"
            checked={getHeaderCheckboxState(table, options)}
            // If at least one row is disabled, disable "select all"
            disabled={anyRowDisabled}
            onCheckedChange={(value) => {
              // Only run "toggleSelected" logic if not disabled
              if (!anyRowDisabled) {
                rows.forEach((row) => {
                  const rowIsDisabled =
                    options?.disableRow?.(row.original) ?? false;
                  if (!rowIsDisabled) {
                    row.toggleSelected(!!value);
                  }
                });
              }
            }}
            aria-label="Select all"
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const rowIsDisabled = options?.disableRow?.(row.original) ?? false;
      return (
        <div className="pr-3">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            disabled={rowIsDisabled}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  };
}

/**
 * Helper to compute whether the table header checkbox
 * should be checked, unchecked, or indeterminate,
 * based on the *non-disabled* rows.
 */
function getHeaderCheckboxState<T>(
  table: any,
  options?: TableCheckboxOptions<T>,
) {
  const { rows } = table.getRowModel();
  const selectableRows = rows.filter(
    (row: any) => !(options?.disableRow?.(row.original) ?? false),
  );

  if (selectableRows.length === 0) {
    return false;
  }

  const allSelected = selectableRows.every((row: any) => row.getIsSelected());
  const someSelected = selectableRows.some((row: any) => row.getIsSelected());

  if (allSelected) {
    return true;
  } else if (someSelected) {
    return "indeterminate";
  } else {
    return false;
  }
}

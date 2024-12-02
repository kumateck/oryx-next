import { TableBody, TableCell, TableRow } from "@/components/ui";
import { Skeleton } from "@/components/ui";

interface IProps {
  columns?: number;
  rows?: number;
  avatarInColumns?: number[];
  avatarProps?: string;
}
const TableRowSkeleton = (props: IProps) => {
  const { columns = 1, rows = 10, avatarInColumns = [], avatarProps } = props;

  return (
    <TableBody className="bg-white">
      {Array.from(new Array(rows), (_, i) => i + 0).map((row) => (
        <TableRow key={`row-${row}`}>
          {Array.from(new Array(columns), (_, i) => i + 0).map((col) => (
            <TableCell key={`col-${col}`}>
              <div className="flex flex-auto items-center gap-2">
                {avatarInColumns.includes(col) ? (
                  <div>
                    <Skeleton className={avatarProps} />
                  </div>
                ) : null}
                <Skeleton className="h-7 w-full bg-neutral-200" />
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableRowSkeleton;

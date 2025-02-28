import { MaterialStatus, cn, getStatusColor } from "@/lib";

interface Props {
  status: MaterialStatus;
  className?: string;
}
const TableBadge = ({ status, className }: Props) => {
  return (
    <div
      className={cn(
        `${getStatusColor(status)} inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 text-center text-sm`,
        className,
      )}
    >
      <span>{MaterialStatus[status]}</span>
    </div>
  );
};

export default TableBadge;

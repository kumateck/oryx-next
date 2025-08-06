// import { MaterialStatus, cn, getStatusColor, splitWords } from "@/lib";

// interface Props {
//   status: MaterialStatus;
//   className?: string;
// }
// const TableBadge = ({ status, className }: Props) => {
//   return (
//     <div
//       className={cn(
//         `${getStatusColor(status)} inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 text-center text-sm`,
//         className,
//       )}
//     >
//       <span>{splitWords(MaterialStatus[status])}</span>
//     </div>
//   );
// };

// export default TableBadge;
import { cn, getStatusColor, splitWords } from "@/lib";

interface TableBadgeProps<T extends Record<number | string, string | number>> {
  status: T[keyof T]; // allow passing the value of the enum
  statusEnum: T;
  className?: string;
}

const TableBadge = <T extends Record<number | string, string | number>>({
  status,
  statusEnum,
  className,
}: TableBadgeProps<T>) => {
  const numericStatus = Number(status); // for getStatusColor
  const label = splitWords(statusEnum[numericStatus] as string); // e.g. "Under Test"

  return (
    <div
      className={cn(
        `${getStatusColor(numericStatus)} inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 text-center text-sm`,
        className,
      )}
    >
      <span>{label}</span>
    </div>
  );
};

export default TableBadge;

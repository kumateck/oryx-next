import { cn, splitWords } from "@/lib";
import React from "react";

// interface Props {
//   label: string;
//   colorClass: string;
// }
// const StatusBadge = ({ label, colorClass }: Props) => {
//   return (
//     <div
//       className={cn(
//         `rounded-full px-2 py-1 w-fit text-center border`,
//         colorClass,
//       )}
//     >
//       {splitWords(label)}
//     </div>
//   );
// };

// export default StatusBadge;

// ============================================================================
// COMPONENTS
// ============================================================================

interface StatusBadgeProps {
  label: string;
  colorClass?: string;
  style?: React.CSSProperties;
}

const StatusBadge = ({ label, colorClass, style }: StatusBadgeProps) => {
  return (
    <div
      className={cn(
        "rounded-full px-2 py-1 w-fit text-center text-xs font-medium",
        colorClass,
      )}
      style={style}
    >
      {splitWords(label)}
    </div>
  );
};

export default StatusBadge;

import { cn } from "@/lib/utils";

import { Icon, LucideIconProps } from "../../icon";

export interface ToolbarButtonProps {
  icon: LucideIconProps;
  onClick?: () => void;
  isActive?: boolean;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ToolbarButton = ({
  icon,
  onClick,
  isActive,
  onMouseDown,
}: ToolbarButtonProps) => {
  return (
    <button
      onMouseDown={onMouseDown}
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80",
        {
          "bg-neutral-200/80": isActive,
        },
      )}
    >
      <Icon name={icon} className="text-primary-600 size-5" />
    </button>
  );
};

export default ToolbarButton;

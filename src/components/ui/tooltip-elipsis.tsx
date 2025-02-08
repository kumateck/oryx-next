import { cn } from "@/lib";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface Props {
  className?: string;
  title: string;
}

export const ToolTipEllipsis = ({ className, title }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span
            className={cn(
              "inline-block max-w-[10ch] overflow-hidden text-ellipsis whitespace-nowrap capitalize",
              className,
            )}
          >
            {title}
          </span>
        </TooltipTrigger>
        <TooltipContent className="z-50">{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

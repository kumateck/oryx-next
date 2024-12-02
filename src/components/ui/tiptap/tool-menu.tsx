import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

interface ToolTipMenuItemProps {
  message: string;
  children: React.ReactNode;
}
const ToolTipMenuItem = ({ message, children }: ToolTipMenuItemProps) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent>
            <p>{message}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ToolTipMenuItem;

import { ScrollArea } from "@/components/ui";
import { cn } from "@/lib";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const ScrollablePageWrapper = ({ children, className }: Props) => {
  return (
    <ScrollArea className="h-container-scroll-height w-full overflow-auto">
      <div className={cn("pb-20", className)}>{children}</div>
    </ScrollArea>
  );
};

export default ScrollablePageWrapper;

import { useRouter } from "next/navigation";
import { DragSourceMonitor, useDrag } from "react-dnd";

import { AvatarStack } from "@/components/ui";
import { cn, getInitials, routes } from "@/lib";

import { CardItemProps, DragItem } from "./type";
import { format } from "date-fns";

export const CardItem: React.FC<CardItemProps> = ({ step, columnId }) => {
  const router = useRouter();
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: step.id, fromColumn: columnId } as DragItem,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className="mb-2 cursor-move space-y-1 rounded-2xl bg-white p-2 shadow-md"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => router.push(routes.viewBoard(step.activityId))}
    >
      <div>
        <span className="text-xs text-neutral-hover">
          {step.createdAt
            ? format(step.createdAt, "eee, MMMM do, yyyy 'at' h:mm a")
            : ""}
        </span>
      </div>
      <div className="inline-flex rounded-2xl bg-primary-default px-1.5 text-white">
        <span className="text-xs">{step.batchNumber}</span>
      </div>
      <div className="space-y-5">
        <span className="block text-sm font-semibold"> {step.productName}</span>
        <div className="flex items-center justify-between">
          {step?.images && (
            <AvatarStack
              spacing={"sm"}
              avatarClass="h-8 w-8"
              fallbackClass={cn("bg-neutral-input text-neutral-dark text-xs")}
              avatars={step?.images?.map((item) => ({
                name: getInitials(item?.name),
                fullname: item?.name,
                url: item?.url,
              }))}
            />
          )}

          <span className="block text-xs font-normal text-neutral-default">
            {step.scheduleCode}
          </span>
        </div>
      </div>
    </div>
  );
};

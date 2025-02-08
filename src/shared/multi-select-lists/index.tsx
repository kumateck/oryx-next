import React from "react";

import { ToolTipEllipsis, ToolTipLists } from "@/components/ui";
import { Option, cn } from "@/lib";

interface Props {
  lists: Option[];
  className?: string;
}
const MultiSelectListViewer = ({ lists, className }: Props) => {
  const [first, ...rest] = lists;
  return (
    <div>
      {lists && (
        <div className="flex items-center justify-start gap-4">
          <ToolTipEllipsis
            title={first?.label}
            className={cn("max-w-[8ch]", className)}
          />
          {rest.length > 0 && (
            <ToolTipLists
              component={
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-bg p-1 text-neutral-dark shadow-sm">
                  <span className="text-xs font-normal">+{rest.length}</span>
                </div>
              }
            >
              <ul>
                {rest?.map((item, idx) => <li key={idx}>{item?.label}</li>)}
              </ul>
            </ToolTipLists>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectListViewer;

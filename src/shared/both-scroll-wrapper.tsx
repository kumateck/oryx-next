import React, { useEffect, useRef, useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui";
import { cn } from "@/lib";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BothScrollableWrapper = ({ children, className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [availableHeight, setAvailableHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newHeight = window.innerHeight - rect.top;
        setAvailableHeight(newHeight);
      }
    };

    // Initial height calculation
    updateHeight();

    // Update height on window resize
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div ref={containerRef} className={cn("", className)}>
      <ScrollArea
        // Apply the dynamic height style
        style={{ maxHeight: availableHeight }}
        className="w-96 "
      >
        {/* Enable horizontal scrolling by ensuring the content can expand */}
        <div className="w-max min-w-full">{children}</div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default BothScrollableWrapper;

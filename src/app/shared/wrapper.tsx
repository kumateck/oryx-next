"use client";

import { cn } from "@/lib";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const StepWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 bg-white px-10 py-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default StepWrapper;

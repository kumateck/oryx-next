"use client";

import { Card, CardContent } from "@/components/ui";
import { cn } from "@/lib";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const StepWrapper = ({ children, className }: Props) => {
  return (
    <Card>
      <CardContent className={cn("py-4", className)}>{children}</CardContent>
    </Card>
  );
};

export default StepWrapper;

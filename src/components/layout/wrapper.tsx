import React from "react";

import { cn } from "@/lib";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const PageWrapper = ({ children, className }: Props) => {
  return <div className={cn("p-5", className)}>{children}</div>;
};

export default PageWrapper;

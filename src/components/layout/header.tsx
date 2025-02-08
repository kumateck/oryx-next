import React, { ReactNode } from "react";

import { cn } from "@/lib";

// import { HEADER_HEIGHT_CLASS } from "@/lib/constants";

interface HeaderProps {
  headerStart?: ReactNode;
  headerEnd?: ReactNode;
  headerMiddle?: ReactNode;
  className?: string;
  container?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const {
    headerStart,
    headerEnd,
    headerMiddle,
    className,

    // container
  } = props;

  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center gap-2 border-b bg-neutral-lightAlt px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
        className,
      )}
    >
      <div className="flex w-full">
        <div className="w-full max-w-96"> {headerStart}</div>
      </div>
      {headerMiddle && (
        <div className="header-action header-action-end">{headerMiddle}</div>
      )}
      <div className="header-action header-action-end">{headerEnd}</div>
    </header>
  );
};

export default Header;

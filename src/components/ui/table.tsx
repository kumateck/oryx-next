import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & { normalTable?: boolean }
>(({ className, normalTable, ...props }, ref) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [calculatedHeight, setCalculatedHeight] = React.useState<number>(0);

  // calculate the height when ref is available
  // the height should be calculated based on 100vh - parents's other children heights
  React.useEffect(() => {
    if (wrapperRef.current) {
      const parentElement = wrapperRef.current.parentElement;

      if (parentElement) {
        // Calculate the height of all siblings excluding the table-wrapper
        const siblingElements = Array.from(parentElement.children).filter(
          (el) => el !== wrapperRef.current,
        );

        const siblingHeight = siblingElements.reduce((acc, el) => {
          return acc + el.clientHeight;
        }, 0);

        // Calculate available height for the table-wrapper
        const availableHeight =
          window.innerHeight -
          siblingHeight -
          65 /* header */ -
          36 * 2 /* page padding */ -
          50; /* unknown height */
        setCalculatedHeight(availableHeight);
      }
    }
  }, [normalTable, wrapperRef]);

  return (
    <div
      id="table-wrapper"
      ref={wrapperRef}
      className="w-full overflow-auto px-2"
      style={{
        height: normalTable ? "" : `${calculatedHeight}px`,
      }}
    >
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm shadow-sm", className)}
        {...props}
      />
    </div>
  );
});
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-0 transition-colors hover:bg-neutral-hover data-[state=selected]:bg-primary-selected",
      className,
    )}
    {...props}
  />
));

TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "text-muted-foreground text-primary-500 sticky top-0 h-12 bg-primary-default px-3 py-2 text-left align-middle font-medium first:rounded-tl-md last:rounded-tr-md hover:bg-primary-default [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-3 py-2 align-middle",
      "[&:has(>a[data-no-padding=true])]:!px-0 [&:has(>a[data-no-padding=true])]:!py-0 [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("text-muted-foreground mt-4 text-sm", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

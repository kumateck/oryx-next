// import Fuse from "fuse.js";
// import { useEffect, useState } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Option } from "@/lib/constants";
// import { cn } from "@/lib/utils";
// import { Button } from "../button";
// import { Icon } from "../icon";
// import { Input } from "../input";
// export type SearchableDropdownProps = {
//   className?: string;
//   placeholder?: string;
//   options: Option[];
//   searchPlaceholder?: string;
//   onChange?: (option: Option) => void;
//   defaultValue?: Option;
//   menuItemComponent?: React.FC<{
//     option: Option;
//     isSelected?: boolean;
//   }>;
//   prefix?: React.ReactNode;
//   value?: Option;
// };
// const fuseOptions = {
//   isCaseSensitive: false,
//   includeMatches: false,
//   threshold: 0.3,
//   keys: ["value", "label"],
// };
// export function PaginatedSelect(props: SearchableDropdownProps) {
//   const [selectedOptions, setSelectedOptions] = useState(props.defaultValue);
//   useEffect(() => {
//     if (props.defaultValue) setSelectedOptions(props.defaultValue);
//   }, [props.defaultValue]);
//   const fuse = new Fuse(props.options ?? [], fuseOptions);
//   const [searchValue, setSearchValue] = useState("");
//   const results = fuse?.search(searchValue);
//   const resultLists = results?.map((result) => result?.item);
//   // const filteredOptions = resultLists.length > 0 ? resultLists : props.options;
//   const filteredOptions =
//     resultLists.length > 0
//       ? resultLists
//       : searchValue
//         ? resultLists
//         : props.options;
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <Popover open={isOpen} onOpenChange={setIsOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="button"
//           type="button"
//           size={"sm"}
//           className={cn(
//             "relative w-full justify-start rounded-md border-neutral-input bg-white px-3 text-sm text-neutral-dark shadow-none hover:border-b-2 hover:border-b-primary-default hover:bg-white",
//             props.className,
//           )}
//         >
//           <span
//             className={cn(
//               "overflow-hidden truncate whitespace-nowrap text-left",
//               "inline-block w-[calc(100%-2rem)]", // Adjust width to account for the icon
//             )}
//             title={selectedOptions?.label || props.placeholder} // Tooltip for truncated text
//           >
//             {selectedOptions?.label || props.placeholder}
//           </span>
//           <div
//             className={cn(
//               "absolute right-3 flex h-full items-center justify-center",
//               isOpen && "text-black",
//             )}
//           >
//             <Icon
//               name="ChevronDown"
//               size={20}
//               className="text-neutral-secondary"
//             />
//           </div>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent
//         onWheel={(event) => event.stopPropagation()}
//         align="start"
//         className="h-fit w-fit space-y-2 overflow-auto px-3 py-2"
//       >
//         <Input
//           value={searchValue}
//           prefix="Search"
//           //   className="bg-neutral-100"
//           placeholder={props.searchPlaceholder || "Search"}
//           //   prefixClass={"w-4 h-4 text-muted-foreground"}
//           onChange={(event) => setSearchValue(event.target.value)}
//         />
//         <div className="flex max-h-72 flex-col gap-0 overflow-y-auto">
//           {filteredOptions?.map((op, idx) => (
//             <div
//               key={idx}
//               className="w-full cursor-pointer"
//               onClick={() => {
//                 if (props.onChange) props.onChange(op);
//                 setSelectedOptions(op);
//                 setIsOpen(false);
//               }}
//             >
//               {props.menuItemComponent ? (
//                 <props.menuItemComponent
//                   option={op}
//                   isSelected={op.value === selectedOptions?.value}
//                 />
//               ) : (
//                 <div
//                   className={cn(
//                     "font-Medium flex h-fit w-full gap-1.5 rounded-sm px-3 py-2 text-sm",
//                     op.value === selectedOptions?.value &&
//                       "bg-neutral-lightAlt font-medium",
//                   )}
//                 >
//                   {props.prefix && props.prefix}
//                   {op.label}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }
import { useEffect, useRef, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Option } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Button } from "../button";
import { Icon } from "../icon";
import { Input } from "../input";

export type FetchOptionsResult = {
  items: Option[];
  hasNextPage: boolean;
};

export type SearchableDropdownProps = {
  className?: string;
  placeholder?: string;
  onChange?: (option: Option) => void;
  defaultValue?: Option;
  menuItemComponent?: React.FC<{
    option: Option;
    isSelected?: boolean;
  }>;
  prefix?: React.ReactNode;
  value?: Option;
  searchPlaceholder?: string;

  // The function we'll call to request data
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
};

export function PaginatedSelect(props: SearchableDropdownProps) {
  const {
    className,
    placeholder = "Select an item...",
    defaultValue,
    onChange,
    // menuItemComponent,
    prefix,
    searchPlaceholder = "Search...",
    fetchOptions,
  } = props;

  // Controlled states
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    defaultValue,
  );
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);

  // For controlling infinite scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 1) Load fresh data whenever searchValue changes
  useEffect(() => {
    let isCancelled = false;

    async function loadInitialData() {
      setIsLoading(true);
      setPage(1);
      // We start from page=1 with a new search
      try {
        const { items, hasNextPage: nextPage } = await fetchOptions(
          searchValue,
          1,
        );
        if (!isCancelled) {
          setOptions(items);
          setHasNextPage(nextPage);
          setPage(1); // after load, page is 1
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadInitialData();

    return () => {
      isCancelled = true;
    };
  }, [searchValue, fetchOptions]);

  // 2) Infinite scroll: load more when near bottom
  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    if (isLoading || !hasNextPage) return;

    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    // If user is within 150px of the bottom, load next page
    if (scrollHeight - scrollTop - clientHeight < 150) {
      setIsLoading(true);
      const newPage = page + 1;
      try {
        const { items, hasNextPage: nextPage } = await fetchOptions(
          searchValue,
          newPage,
        );
        setOptions((prev) => [...prev, ...items]);
        setHasNextPage(nextPage);
        setPage(newPage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 3) Selecting an option
  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onChange?.(option);
    setIsOpen(false);
  };

  // 4) If parent changes defaultValue, reflect it
  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="button"
          type="button"
          size={"sm"}
          className={cn(
            "relative w-full justify-start rounded-md border-neutral-input bg-white px-3 text-sm text-neutral-dark shadow-none",
            "hover:border-b-2 hover:border-b-primary-default hover:bg-white",
            className,
          )}
        >
          <span
            className={cn(
              "overflow-hidden truncate whitespace-nowrap text-left",
              "inline-block w-[calc(100%-2rem)]",
            )}
            title={selectedOption?.label || placeholder}
          >
            {selectedOption?.label || placeholder}
          </span>
          <div className="absolute right-3 flex h-full items-center justify-center">
            <Icon
              name="ChevronDown"
              size={20}
              className="text-neutral-secondary"
            />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="h-fit w-[220px] space-y-2 px-3 py-2"
        onWheel={(event) => event.stopPropagation()}
      >
        {/* Search bar */}
        <Input
          value={searchValue}
          prefix="Search"
          placeholder={searchPlaceholder}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {/* Scrollable list */}
        <div
          ref={scrollContainerRef}
          className="max-h-72 overflow-auto"
          onScroll={handleScroll}
        >
          {/* Show a placeholder if no items and not loading */}
          {!isLoading && options.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">
              No results found
            </div>
          )}

          {options.map((op, idx) => {
            const isSelected = op.value === selectedOption?.value;
            return (
              <div
                key={`${op.value}-${idx}`}
                onClick={() => handleSelect(op)}
                className="cursor-pointer"
              >
                {/* {menuItemComponent ? (
                  {props.menuItemComponent && (
                    <props.menuItemComponent option={op} isSelected={isSelected} />
                  )}
                ) : ( */}
                <div
                  className={cn(
                    "flex w-full gap-1.5 rounded-sm px-3 py-2 text-sm",
                    isSelected && "bg-neutral-lightAlt font-medium",
                  )}
                >
                  {prefix && prefix}
                  {op.label}
                </div>
                {/* )} */}
              </div>
            );
          })}

          {/* Show loading indicator at bottom if fetching */}
          {isLoading && (
            <div className="flex justify-center py-2 text-sm text-gray-500">
              Loading...
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

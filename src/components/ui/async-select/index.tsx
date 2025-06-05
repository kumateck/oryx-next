import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Option } from "@/lib";
import { cn } from "@/lib/utils";

import { Button } from "../button";
import { Icon } from "../icon";
import { Input } from "../input";

export interface FetchOptionsResult {
  options: Option[];
  hasNext: boolean;
  hasPrevious: boolean;
}

export type SearchableDropdownProps = {
  isLoading: boolean;
  className?: string;
  placeholder?: string;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
  searchPlaceholder?: string;
  onChange?: (option: Option) => void;
  defaultValue?: Option;
  menuItemComponent?: React.FC<{
    option: Option;
    isSelected?: boolean;
  }>;
  prefix?: React.ReactNode;
  value?: Option;
  reloadTrigger?: boolean; // Optional prop to trigger reload
  setReloadTrigger?: (value: boolean) => void; // Callback to reset reloadTrigger
};

export function AsyncSelect(props: SearchableDropdownProps) {
  const [selectedOptions, setSelectedOptions] = useState(props.defaultValue);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const [fetchOptionsResult, setFetchOptionsResult] =
    useState<FetchOptionsResult | null>(null);
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const fetchNextPage = () => {
    setPage(page + 1);
  };
  const fetchPreviousPage = () => {
    setPage(page - 1);
  };
  useEffect(() => {
    if (props.defaultValue) setSelectedOptions(props.defaultValue);
  }, [props.defaultValue]);

  useEffect(() => {
    loadOptions(debouncedSearchTerm, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearchTerm]);

  useEffect(() => {
    if (props.reloadTrigger) {
      loadOptions(debouncedSearchTerm, 1); // Reset to page 1 and reload
      props.setReloadTrigger?.(false); // Reset reloadTrigger after fetching
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reloadTrigger]);

  const loadOptions = async (search: string, page = 1) => {
    const result = await props.fetchOptions(search, page);
    setFetchOptionsResult(result);
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="button"
          type="button"
          size={"sm"}
          className={cn(
            "relative w-full justify-start rounded-2xl border-neutral-input bg-white px-3 text-sm text-neutral-dark shadow-none hover:border-b-2 hover:border-b-primary-default hover:bg-white",
            props.className,
          )}
        >
          <span
            className={cn(
              "overflow-hidden truncate whitespace-nowrap text-left",
              "inline-block w-[calc(100%-2rem)]", // Adjust width to account for the icon
            )}
            title={selectedOptions?.label || props.placeholder} // Tooltip for truncated text
          >
            {selectedOptions?.label || props.placeholder}
          </span>
          <div
            className={cn(
              "absolute right-3 flex h-full items-center justify-center",
              isOpen && "text-black",
            )}
          >
            <Icon
              name="ChevronDown"
              size={20}
              className="text-neutral-secondary"
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onWheel={(event) => event.stopPropagation()}
        align="start"
        className="h-fit w-fit space-y-2 overflow-auto px-3 py-2"
      >
        <div className="flex items-center justify-between gap-4">
          <Input
            value={searchValue}
            prefix="Search"
            //   className="bg-neutral-100"
            placeholder={props.searchPlaceholder || "Search"}
            //   prefixClass={"w-4 h-4 text-muted-foreground"}
            onChange={(event) => {
              setPage(1);
              setSearchValue(event.target.value);
            }}
            suffix={props?.isLoading ? "LoaderCircle" : "Check"}
            suffixClass={cn(" text-primary-default", {
              "animate-spin": props.isLoading,
              "opacity-0": !props.isLoading,
            })}
          />
          <div className="flex items-center gap-0.5">
            <button
              disabled={!fetchOptionsResult?.hasPrevious}
              onClick={fetchPreviousPage}
              className="disabled:cursor-not-allowed disabled:text-neutral-hover"
            >
              <Icon name="ChevronLeft" />
            </button>
            <button
              disabled={!fetchOptionsResult?.hasNext}
              onClick={fetchNextPage}
              className="disabled:cursor-not-allowed disabled:text-neutral-hover"
            >
              <Icon name="ChevronRight" />
            </button>
          </div>
        </div>
        <div className="flex max-h-72 flex-col gap-0 overflow-y-auto">
          {/* {props?.isLoading && (
            <Icon name="LoaderCircle" className="animate-spin" />
          )} */}
          {fetchOptionsResult?.options?.map((op, idx) => (
            <div
              key={idx}
              className="w-full cursor-pointer"
              onClick={() => {
                if (props.onChange) props.onChange(op);
                setSelectedOptions(op);
                setIsOpen(false);
              }}
            >
              {props.menuItemComponent ? (
                <props.menuItemComponent
                  option={op}
                  isSelected={op.value === selectedOptions?.value}
                />
              ) : (
                <div
                  className={cn(
                    "font-Medium flex h-fit w-full gap-1.5 rounded-2xl px-3 py-2 text-sm",
                    op.value === selectedOptions?.value &&
                      "bg-neutral-lightAlt font-medium",
                  )}
                >
                  {props.prefix && props.prefix}
                  {op.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

import Fuse from "fuse.js";
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

export type SearchableDropdownProps = {
  className?: string;
  placeholder?: string;
  options: Option[];
  searchPlaceholder?: string;
  onChange?: (option: Option) => void;
  defaultValue?: Option;
  menuItemComponent?: React.FC<{
    option: Option;
    isSelected?: boolean;
  }>;
  prefix?: React.ReactNode;
  value?: Option;
  handleCreateNew?: (input: string) => void;
  isBtnLoading?: boolean;
};

const fuseOptions = {
  isCaseSensitive: false,
  includeMatches: false,
  threshold: 0.3,
  keys: ["value", "label"],
};
export function SpecialAddSelect(props: SearchableDropdownProps) {
  const [selectedOptions, setSelectedOptions] = useState(props.defaultValue);

  useEffect(() => {
    if (props.defaultValue) setSelectedOptions(props.defaultValue);
  }, [props.defaultValue]);

  const fuse = new Fuse(props.options ?? [], fuseOptions);

  const [searchValue, setSearchValue] = useState("");

  const results = fuse?.search(searchValue);
  const resultLists = results?.map((result) => result?.item);
  // const filteredOptions = resultLists.length > 0 ? resultLists : props.options;
  const filteredOptions =
    resultLists.length > 0
      ? resultLists
      : searchValue
        ? resultLists
        : props.options;

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
            "relative w-full justify-start rounded-md border-neutral-input bg-white px-3 text-sm text-neutral-dark shadow-none hover:border-b-2 hover:border-b-primary-default hover:bg-white",
            props.className,
          )}
        >
          {selectedOptions?.label || props.placeholder}
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
        <Input
          value={searchValue}
          prefix="Search"
          //   className="bg-neutral-100"
          placeholder={props.searchPlaceholder || "Search"}
          //   prefixClass={"w-4 h-4 text-muted-foreground"}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <div className="flex max-h-72 flex-col gap-0 overflow-y-auto">
          {filteredOptions?.map((op, idx) => (
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
                    "font-Medium flex h-fit w-full gap-1.5 rounded-sm px-3 py-2 text-sm",
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
        {searchValue && filteredOptions.length === 0 && (
          <Button
            className="flex w-full items-center gap-2"
            onClick={() => {
              if (props.handleCreateNew) props.handleCreateNew(searchValue);
            }}
          >
            {props.isBtnLoading && (
              <Icon name="LoaderCircle" className="animate-spin" />
            )}
            Add New
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}

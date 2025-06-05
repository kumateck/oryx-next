import React, { useEffect, useState } from "react";

import { Option, cleanArrayObject, cn } from "@/lib";

import { Checkbox } from "../checkbox";
import { Input } from "../input";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { SpecialInput } from "./input";
import { useDebounce } from "@uidotdev/usehooks";
import { FetchOptionsResult, SearchableDropdownProps } from "../async-select";
import { Icon } from "../icon";

export interface BaseProps {
  classNames?: string;
  placeholder?: string;
  searchPlaceholder?: string;
}

type OmittedProps = Omit<
  SearchableDropdownProps,
  "onChange" | "defaultValue" | "value"
>;
interface SpecialDropdownProps extends OmittedProps {
  defaultValue: Option[];
  onChange?: (option: Option[]) => void;
  coverTriggerWidth?: boolean;
  classNames?: string;
  value?: Option[];
}

export const AsyncMultiSelect = (props: SpecialDropdownProps) => {
  const [selectedOptions, setSelectedOptions] = useState(props.defaultValue);
  const [searchValue, setSearchValue] = useState("");

  const [page, setPage] = useState(1);
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
    loadOptions(debouncedSearchTerm, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearchTerm]);

  const loadOptions = async (search: string, page = 1) => {
    const result = await props.fetchOptions(search, page);
    setFetchOptionsResult(result);
  };
  // Update state when defaultValue changes
  useEffect(() => {
    if (props.defaultValue) {
      setSelectedOptions(cleanArrayObject(props.defaultValue));
    }
  }, [props.defaultValue]);

  // Updated handler that avoids state updates during render
  const handleCheckboxChange = (item: { label: string; value: string }) => {
    const newSelectedOptions = selectedOptions.some(
      (opt) => opt.value === item.value,
    )
      ? selectedOptions.filter((opt) => opt.value !== item.value)
      : [...selectedOptions, item];

    setSelectedOptions(newSelectedOptions);

    if (props.onChange) {
      props.onChange(newSelectedOptions);
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger className="w-full p-0 py-0">
          <SpecialInput
            placeholder={props.placeholder}
            classNames={props.classNames}
            selectedOptions={selectedOptions}
            onValueChange={handleCheckboxChange}
          />
        </PopoverTrigger>
        <PopoverContent
          onWheel={(event) => event.stopPropagation()}
          align="start"
          className="h-fit w-fit space-y-2 overflow-auto px-3 py-2"
        >
          <div className="flex items-center justify-between gap-4">
            <Input
              value={searchValue}
              placeholder={props.searchPlaceholder || "Search"}
              onChange={(event) => setSearchValue(event.target.value)}
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

          <ul className="flex max-h-72 flex-col gap-0 overflow-y-auto">
            {fetchOptionsResult?.options?.map((item, index) => (
              <li
                key={index}
                onClick={() => handleCheckboxChange(item)}
                className={cn(
                  "group flex cursor-pointer items-center gap-2 bg-white px-4 py-2 hover:bg-neutral-300",
                  {
                    "bg-neutral-lightAlt": selectedOptions.some(
                      (opt) => opt.value === item.value,
                    ),
                  },
                )}
              >
                <Checkbox
                  onClick={(e) => e.stopPropagation()}
                  value={item.value}
                  checked={selectedOptions.some(
                    (opt) => opt.value === item.value,
                  )}
                  onCheckedChange={() => handleCheckboxChange(item)}
                />
                <Label className="text-sm">{item.label}</Label>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

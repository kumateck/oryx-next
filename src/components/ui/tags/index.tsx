"use client";

import Fuse from "fuse.js";
import _ from "lodash";
import { useState } from "react";

import {
  Button,
  Icon,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { Option } from "@/lib/constants";

interface Props {
  options: Option[];
  selections: Option[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  isLoading?: boolean;
}
export const AttachTags = ({
  options,
  selections,
  setSelectedOptions,
  isLoading,
}: Props) => {
  const fuseOptions = {
    isCaseSensitive: false,
    includeMatches: false,
    threshold: 0,
    keys: ["value", "label"],
  };

  const fuse = new Fuse(options, fuseOptions);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Change the pattern
  const results = fuse.search(searchTerm);
  const resultLists = results?.map((result) => result.item);
  const optionsLists = resultLists.length > 0 ? resultLists : options;

  return (
    <div className="w-full">
      <ul className="flex w-full flex-wrap gap-2">
        <li>
          <Popover>
            <PopoverTrigger className="w-full p-0 py-0">
              <Button
                type="button"
                variant="default"
                // size="xs"
                className="flex items-center gap-2 rounded-full px-2.5 py-0.5"
              >
                <span>Add Tag</span>
                <Icon name="Plus" className="h-4 w-4 text-white" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80 overflow-hidden p-3">
              <div className="pb-2">
                <Input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  prefix="Search"
                  prefixClass="w-5 h-5 text-neutral-500"
                  className="w-full border border-neutral-300 bg-neutral-100"
                  placeholder="Search Tags"
                />
              </div>
              <div className="">
                {isLoading && (
                  <Icon name="LoaderCircle" className="animate-spin" />
                )}
                <ul className="brand-scrollbar h-full max-h-56 overflow-auto">
                  {(_.isEmpty(selections)
                    ? optionsLists
                    : _.filter(
                        optionsLists,
                        (itemA) =>
                          !_.some(
                            selections,
                            (itemB) => itemA.value === itemB.value,
                          ),
                      )
                  )?.map((item, index) => (
                    <li
                      onClick={() => {
                        if (!selections.includes(item)) {
                          setSelectedOptions([...selections, item]);
                        }
                      }}
                      key={index}
                      className="flex cursor-pointer gap-1.5 rounded-sm px-4 py-2 text-sm font-normal text-primary-600 hover:bg-neutral-300"
                    >
                      <Icon name="Tag" className="h-5 w-5" />
                      <span>{item?.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        {selections?.map((item, index) => (
          <li key={index}>
            <div className="flex h-8 items-center justify-center gap-2 rounded-3xl border border-neutral-300 bg-white px-2.5 py-0.5">
              <span className="font-Medium text-sm text-neutral-700">
                {item.label}
              </span>
              <Icon
                name="X"
                className="h-4 w-4 cursor-pointer text-neutral-500"
                onClick={() =>
                  setSelectedOptions(
                    selections.filter(
                      (selection) => selection.value !== item.value,
                    ),
                  )
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

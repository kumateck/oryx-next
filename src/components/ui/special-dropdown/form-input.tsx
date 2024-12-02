import { useEffect, useRef, useState } from "react";

import { Option } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { BaseProps } from ".";
import { Icon } from "../icon";

interface FormInputProps extends BaseProps {
  selectedOptions: Option[];
  onValueChange: (item: Option) => void;
}
const FormInput = ({
  selectedOptions,
  classNames,
  placeholder,
  onValueChange,
}: FormInputProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const hiddenListRef = useRef<HTMLUListElement>(null);
  const [overflowValue, setOverflowValue] = useState(0);
  const [listCount, setListCount] = useState(0);
  const [cWidth, setCWidth] = useState(0);
  const [itemWidths, setItemWidths] = useState<number[]>([]);

  useEffect(() => {
    const containerWidth = listRef?.current?.offsetWidth || 0;
    let totalWidth = 0;
    let count = 0;
    const items = listRef?.current?.children as HTMLCollectionOf<HTMLElement>;
    const itemsH = hiddenListRef?.current
      ?.children as HTMLCollectionOf<HTMLElement>;
    const widthsSet: Set<number> = new Set();

    for (let i = 0; i < itemsH?.length; i++) {
      const itemWidth =
        itemsH[i].offsetWidth +
        parseFloat(window.getComputedStyle(itemsH[i]).marginRight);
      widthsSet.add(itemWidth);
    }
    for (let i = 0; i < items?.length; i++) {
      const itemWidth =
        items[i].offsetWidth +
        parseFloat(window.getComputedStyle(items[i]).marginRight);
      totalWidth += itemWidth;

      if (totalWidth > containerWidth) {
        break;
      } else {
        count++;
      }
    }
    setListCount(count);
    setItemWidths([...widthsSet]);
    setOverflowValue(count);
    setCWidth(containerWidth);
  }, [selectedOptions]);

  const finalTotalWidth = itemWidths.reduce((a, b) => a + b, 0);

  return (
    <div className="h-full">
      <div className="h-0 w-0">
        <ul
          ref={hiddenListRef}
          className="flex w-4/5 items-center gap-1 overflow-hidden px-3 py-2"
        >
          {selectedOptions?.map((option, index) => (
            <li
              key={index}
              className="flex items-center gap-2 rounded-3xl bg-neutral-200 px-2.5 py-0.5 text-neutral-700"
            >
              <span className="whitespace-nowrap text-sm">{option.label}</span>
              <Icon
                name="X"
                className="h-4 w-4 text-neutral-700 hover:cursor-pointer"
                onClick={() => onValueChange(option)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div
        className={cn(
          "relative flex !h-10 w-full min-w-36 cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-sm border border-primary-500 p-0 hover:ring-4 hover:ring-secondary-500",
          classNames,
        )}
      >
        {selectedOptions.length === 0 ? (
          <div className="flex w-full justify-start px-3 py-2 text-neutral-500">
            <span className="text-left">{placeholder}</span>
          </div>
        ) : (
          <ul
            ref={listRef}
            className="relative flex w-4/5 items-center gap-1 overflow-hidden px-3 py-2"
          >
            {selectedOptions
              ?.slice(
                0,
                listCount === overflowValue && finalTotalWidth > cWidth
                  ? overflowValue
                  : selectedOptions.length,
              )
              ?.map((option, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 rounded-3xl bg-neutral-200 px-2.5 py-0.5 text-neutral-700"
                >
                  <span className="whitespace-nowrap text-sm">
                    {option.label}
                  </span>
                  <Icon
                    name="X"
                    className="h-4 w-4 text-neutral-700 hover:cursor-pointer"
                    onClick={() => onValueChange(option)}
                  />
                </li>
              ))}
          </ul>
        )}

        <div className="flex w-1/5 items-center justify-end gap-2 px-2">
          {listCount === overflowValue && finalTotalWidth > cWidth && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-500 p-1 shadow-sm">
              <span className="text-xs font-normal">
                +{selectedOptions.length - overflowValue}
              </span>
            </div>
          )}
          <div>
            <Icon name="ChevronDown" className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInput;

import React, { useState } from "react";

import { cn } from "@/lib"; // optional if using a utility for merging classNames
import { Icon, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

interface Props {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export default function YearPicker({ selectedYear, setSelectedYear }: Props) {
  const [open, setOpen] = useState(false);

  const handlePrevYear = () => setSelectedYear(selectedYear - 1);
  const handleNextYear = () => setSelectedYear(selectedYear + 1);

  // Generate year grid (3x4 = 12 years, with selected year in the middle)
  const generateYearGrid = () => {
    const years: number[] = [];
    const startYear = selectedYear - 5; // Show 5 years before

    for (let i = 0; i < 12; i++) {
      years.push(startYear + i);
    }
    return years;
  };

  const yearGrid = generateYearGrid();

  return (
    <div className="max-w-md mx-auto p-4">
      <div className={cn("items-center justify-center gap-2 flex")}>
        <button
          onClick={handlePrevYear}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Previous year"
        >
          <Icon name="ChevronLeft" />
        </button>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <p
              className="text-base text-neutral-dark font-semibold cursor-pointer"
              onClick={() => setOpen(true)}
            >
              {selectedYear}
            </p>
          </PopoverTrigger>
          <PopoverContent className="my-2 w-fit bg-white p-4" align="start">
            <div className="grid grid-cols-3 gap-2">
              {yearGrid.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setOpen(false);
                  }}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors",
                    {
                      "bg-primary-default text-white": year === selectedYear,
                      "text-gray-700": year !== selectedYear,
                    },
                  )}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Navigation buttons for year ranges */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => {
                  // Go back 12 years
                  const newSelectedYear = selectedYear - 12;
                  setSelectedYear(newSelectedYear);
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Previous 12 years"
              >
                <Icon name="ChevronsLeft" />
              </button>

              <span className="text-sm text-gray-600">
                {yearGrid[0]} - {yearGrid[yearGrid.length - 1]}
              </span>

              <button
                onClick={() => {
                  // Go forward 12 years
                  const newSelectedYear = selectedYear + 12;
                  setSelectedYear(newSelectedYear);
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Next 12 years"
              >
                <Icon name="ChevronsRight" />
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <button
          onClick={handleNextYear}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Next year"
        >
          <Icon name="ChevronRight" />
        </button>
      </div>
    </div>
  );
}

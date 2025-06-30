import React, { useEffect, useState } from "react";

import { Button, Input, PopoverClose } from "@/components/ui";
import { cn, formatClock, parseClock } from "@/lib";

interface Props {
  onChange: (option: string | undefined) => void;
  value: string;
}
export const ClockInput = ({ onChange, value }: Props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [light, setLight] = useState(true);

  const handleHoursChange = (values: number) => {
    const newHours = values;
    setHours(newHours);
    emitChange(newHours, minutes, light);
  };

  const handleMinutesChange = (values: number) => {
    const newMinutes = values;
    setMinutes(newMinutes);
    emitChange(hours, newMinutes, light);
  };

  const handleLightChange = (value: boolean) => {
    setLight(value);
    emitChange(hours, minutes, value);
  };

  const resetTimeSelection = () => {
    setHours(0);
    setMinutes(0);
    setLight(true); // optionally reset to AM
    emitChange(0, 0, true);
  };

  // Update emitChange to accept params
  const emitChange = (
    h: number = hours,
    m: number = minutes,
    l: boolean = light,
  ) => {
    const timeString = formatClock(h, m, l);
    onChange(timeString);
  };

  useEffect(() => {
    if (!value) return;
    const parsed = parseClock(value);
    setHours(parsed.hours);
    setMinutes(parsed.minutes);
    setLight(parsed.light);
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4 h-full">
        <div className="flex flex-col gap-1.5 h-full">
          <span className="text-xs text-neutral-dark font-semibold">
            Enter Time:
          </span>
          <div className=" flex gap-2 items-center">
            <div>
              <Input
                value={hours}
                className="h-16 text-3xl text-center font-black"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;

                  // Strip non-numeric characters
                  let sanitized = input.value.replace(/[^0-9]/g, "");

                  // Convert to number and clamp to max=23
                  let value = parseInt(sanitized, 10);

                  if (!isNaN(value)) {
                    if (value > 23) value = 23;
                    if (value < 0) value = 0;
                    sanitized = String(value);
                  }

                  input.value = sanitized;
                }}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value)) handleHoursChange(value);
                }}
              />
              <span className="text-xs text-neutral-dark">Hour</span>
            </div>
            <span className="text-3xl font-bold text-black">:</span>
            <div>
              <Input
                value={minutes}
                className="h-16 text-3xl text-center font-black"
                type="text"
                inputMode="numeric"
                maxLength={2}
                pattern="[0-9]*"
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;

                  // Strip non-numeric characters
                  let sanitized = input.value.replace(/[^0-9]/g, "");

                  // Convert to number and clamp to max=23
                  let value = parseInt(sanitized, 10);

                  if (!isNaN(value)) {
                    if (value > 59) value = 59;
                    if (value < 0) value = 0;
                    sanitized = String(value);
                  }

                  input.value = sanitized;
                }}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value)) handleMinutesChange(value);
                }}
              />
              <span className="text-xs text-neutral-dark">Minute</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end h-full">
          <div className="rounded-md border border-neutral-secondary overflow-hidden h-14">
            <ul className="flex flex-col h-full items-center justify-center">
              <li
                className={cn(
                  "  hover:cursor-pointer h-full w-full",
                  !light && "bg-white text-neutral-dark",
                  light && "bg-primary-default text-white",
                )}
                onClick={() => handleLightChange(true)}
              >
                <span className="text-sm font-black px-2">AM</span>
              </li>
              <li
                className={cn(
                  " hover:cursor-pointer h-full w-full",
                  light && "bg-white text-neutral-dark",
                  !light && "bg-primary-default text-white",
                )}
                onClick={() => handleLightChange(false)}
              >
                <span className="text-sm font-black px-2">PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-end gap-3 pt-4">
          <PopoverClose asChild>
            <Button
              onClick={() => {
                resetTimeSelection();
              }}
              variant="outline"
            >
              Cancel
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button>Apply</Button>
          </PopoverClose>
        </div>
      </div>
    </div>
  );
};

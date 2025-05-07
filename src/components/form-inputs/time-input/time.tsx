// import React, { useState } from "react";
// import {
//   Button,
//   Label,
//   PopoverClose,
//   Separator,
//   Slider,
// } from "@/components/ui";
// import { cn, formatClock } from "@/lib";
// interface Props {
//   onChange: (option: string | undefined) => void;
// }
// export const TimeInput = ({ onChange }: Props) => {
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [light, setLight] = useState(true);
//   const handleHoursChange = (values: number[]) => {
//     setHours(values[0]);
//     onChange(formatClock(values[0], minutes, light));
//   };
//   const handleMinutesChange = (values: number[]) => {
//     setMinutes(values[0]);
//     onChange(formatClock(hours, values[0], light));
//   };
//   const handleLightChange = (light: boolean) => {
//     setLight(light);
//     onChange(formatClock(hours, minutes, light));
//   };
//   const resetTimeSelection = () => {
//     setMinutes(0);
//     setHours(0);
//     onChange(formatClock(0, 0, light));
//   };
//   return (
//     <div className="space-y-2">
//       <div className="flex items-center justify-between gap-4">
//         <div className="text-xl font-normal">
//           <span>{hours.toString().padStart(2, "0")}</span>
//           <span>:</span>
//           <span>{minutes.toString().padStart(2, "0")}</span>
//           <span>{light ? "AM" : "PM"}</span>
//         </div>
//         <div>
//           <div className="rounded-lg border border-neutral-secondary p-0.5">
//             <ul className="flex gap-x-0.5">
//               <li
//                 className={cn(
//                   "rounded-lg px-2 hover:cursor-pointer",
//                   !light && "bg-white text-neutral-dark",
//                   light && "bg-neutral-dark text-white",
//                 )}
//                 onClick={() => handleLightChange(true)}
//               >
//                 <span className="text-sm">AM</span>
//               </li>
//               <li
//                 className={cn(
//                   "rounded-lg px-2 hover:cursor-pointer",
//                   light && "bg-white text-neutral-dark",
//                   !light && "bg-neutral-dark text-white",
//                 )}
//                 onClick={() => handleLightChange(false)}
//               >
//                 <span className="text-sm">PM</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <Separator className="bg-neutral-hover" />
//       <div className="space-y-3">
//         <Label className="text-sm text-black">Hours:</Label>
//         <Slider
//           max={12}
//           step={1}
//           value={[hours]}
//           onValueChange={handleHoursChange}
//         />
//         <div className="flex justify-between text-neutral-secondary">
//           <span>00</span>
//           <span>06</span>
//           <span>12</span>
//         </div>
//       </div>
//       <div className="space-y-3 pt-2">
//         <Label className="text-sm text-black">Minutes:</Label>
//         <Slider
//           max={59}
//           step={1}
//           value={[minutes]}
//           onValueChange={handleMinutesChange}
//         />
//         <div className="flex justify-between text-neutral-secondary">
//           <span>00</span>
//           <span>30</span>
//           <span>59</span>
//         </div>
//       </div>
//       <div>
//         <Separator className="bg-neutral-200" />
//         <div className="flex justify-end gap-3 pt-4">
//           <PopoverClose asChild>
//             <Button
//               onClick={() => {
//                 resetTimeSelection();
//               }}
//               variant="outline"
//             >
//               Cancel
//             </Button>
//           </PopoverClose>
//           <PopoverClose asChild>
//             <Button>Apply</Button>
//           </PopoverClose>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";

import {
  Button,
  Label,
  PopoverClose,
  Separator,
  Slider,
} from "@/components/ui";
import { cn, formatClock, parseClock } from "@/lib";

interface Props {
  onChange: (option: string | undefined) => void;
  showDays?: boolean;
  value: string;
}
export const TimeInput = ({ onChange, showDays, value }: Props) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [light, setLight] = useState(true);

  // console.log(days, "days");
  const handleDaysChange = (values: number[]) => {
    const newDays = values[0];
    setDays(newDays);
    emitChange(hours, minutes, light, newDays);
  };

  const handleHoursChange = (values: number[]) => {
    const newHours = values[0];
    setHours(newHours);
    emitChange(newHours, minutes, light, days);
  };

  const handleMinutesChange = (values: number[]) => {
    const newMinutes = values[0];
    setMinutes(newMinutes);
    emitChange(hours, newMinutes, light, days);
  };

  const handleLightChange = (value: boolean) => {
    setLight(value);
    emitChange(hours, minutes, value, days);
  };

  const resetTimeSelection = () => {
    setDays(0);
    setHours(0);
    setMinutes(0);
    setLight(true); // optionally reset to AM
    emitChange(0, 0, true, 0);
  };

  // Update emitChange to accept params
  const emitChange = (
    h: number = hours,
    m: number = minutes,
    l: boolean = light,
    d: number = days,
  ) => {
    const timeString = formatClock(h, m, l, d);
    onChange(timeString);
  };

  useEffect(() => {
    if (!value) return;
    const parsed = parseClock(value);
    setDays(parsed.days);
    setHours(parsed.hours);
    setMinutes(parsed.minutes);
    setLight(parsed.light);
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <div className="text-xl font-normal">
          {showDays && days > 0 && <span>{days}d </span>}
          <span>{hours.toString().padStart(2, "0")}</span>
          <span>:</span>
          <span>{minutes.toString().padStart(2, "0")}</span>
          <span>{light ? "AM" : "PM"}</span>
        </div>
        <div>
          <div className="rounded-lg border border-neutral-secondary p-0.5">
            <ul className="flex gap-x-0.5">
              <li
                className={cn(
                  "rounded-lg px-2 hover:cursor-pointer",
                  !light && "bg-white text-neutral-dark",
                  light && "bg-neutral-dark text-white",
                )}
                onClick={() => handleLightChange(true)}
              >
                <span className="text-sm">AM</span>
              </li>
              <li
                className={cn(
                  "rounded-lg px-2 hover:cursor-pointer",
                  light && "bg-white text-neutral-dark",
                  !light && "bg-neutral-dark text-white",
                )}
                onClick={() => handleLightChange(false)}
              >
                <span className="text-sm">PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Separator className="bg-neutral-hover" />
      {showDays && (
        <div className="space-y-3">
          <Label className="text-sm text-black">Days:</Label>
          <Slider
            max={30}
            step={1}
            value={[days]}
            onValueChange={handleDaysChange}
          />
          <div className="flex justify-between text-neutral-secondary">
            <span>0</span>
            <span>15</span>
            <span>30</span>
          </div>
        </div>
      )}
      <div className="space-y-3">
        <Label className="text-sm text-black">Hours:</Label>
        <Slider
          max={12}
          step={1}
          value={[hours]}
          onValueChange={handleHoursChange}
        />
        <div className="flex justify-between text-neutral-secondary">
          <span>00</span>
          <span>06</span>
          <span>12</span>
        </div>
      </div>
      <div className="space-y-3 pt-2">
        <Label className="text-sm text-black">Minutes:</Label>
        <Slider
          max={59}
          step={1}
          value={[minutes]}
          onValueChange={handleMinutesChange}
        />
        <div className="flex justify-between text-neutral-secondary">
          <span>00</span>
          <span>30</span>
          <span>59</span>
        </div>
      </div>
      <div>
        <Separator className="bg-neutral-200" />
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

import React from "react";

import { Button, Popover, PopoverContent } from "@/components/ui";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  // setDate:()=> c;
}
const ExpectedDate = ({ isOpen, onClose }: Props) => {
  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      <PopoverContent className="w-80">
        <div>Welcome</div>
        <div className="flex justify-end gap-2">
          <Button>Submit</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ExpectedDate;

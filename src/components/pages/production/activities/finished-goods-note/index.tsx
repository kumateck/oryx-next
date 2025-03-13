"use client";

import React, { useState } from "react";

import { Button, Icon } from "@/components/ui";

import Create from "./create";

function FinishedGoodsTransfer() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          type="button"
          variant={"secondary"}
          className="flex items-center gap-2"
        >
          <Icon name="Plus" className="h-4 w-4" />
          <span>Perform Activity</span>{" "}
        </Button>
      </div>

      <Create isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default FinishedGoodsTransfer;

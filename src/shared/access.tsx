import React from "react";

import { Option, cn } from "@/lib";

interface AccessTabsProps {
  type: number;
  handleTabClick: (tabType: number) => void;
  tabs: Option[];
  containerClassName?: string;
}
const AccessTabs = ({
  type,
  handleTabClick,
  tabs,
  containerClassName,
}: AccessTabsProps) => {
  return (
    <div>
      {
        <div
          className={cn(
            "flex h-10 w-48 items-center gap-1 space-x-1 rounded-full border border-neutral-input bg-white p-1",
            containerClassName,
          )}
        >
          {tabs?.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => handleTabClick(Number(tab.value))}
              className={`w-full rounded-full px-4 py-1 text-sm font-medium transition-all duration-300 ${
                Number(type) === Number(tab.value)
                  ? "h-full bg-primary-default text-white shadow-md"
                  : "text-neutral-default"
              }`}
            >
              {tab.label}
            </button>
          ))}
          {/* <button
            onClick={() => handleTabClick(SupplierType.Local)}
            className={`w-full rounded-full px-4 py-1 text-sm font-medium transition-all duration-300 ${
              Number(type) === SupplierType.Local
                ? "h-full bg-primary-default text-white shadow-md"
                : "text-neutral-default"
            }`}
          >
            {ProcurementType.Local}
          </button> */}
        </div>
      }
    </div>
  );
};

export default AccessTabs;

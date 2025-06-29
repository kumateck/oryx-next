"use client";
import React from "react";
import { settingCategories } from "./types";
import Link from "next/link";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import { Icon } from "@/components/ui";

const Settings = () => {
  return (
    <ScrollableWrapper className="p-3 space-y-6 w-full">
      <h1 className="text-3xl font-bold">System Settings</h1>
      <div className="space-y-10">
        {settingCategories.map((category) => (
          <div key={category.title} className="w-full">
            <div className="flex items-center gap-3 mb-2">
              <Icon
                name={category.icon}
                className="size-4 text-primary-default"
              />
              <h2 className="text-lg font-semibold text-neutral-dark">
                {category.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-5">
              {category.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="block rounded-xl border p-3 shadow-sm hover:shadow-md transition hover:bg-neutral-light"
                >
                  <div className="flex items-center gap-4">
                    <Icon name={item.icon} className="size-4" />
                    <span className="text-base font-medium text-neutral-dark">
                      {item.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollableWrapper>
  );
};

export default Settings;

"use client";
import React from "react";
import { settingCategories } from "./types";
import Link from "next/link";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import { Icon } from "@/components/ui";

const Settings = () => {
  return (
    <ScrollableWrapper className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Settings</h1>
      {settingCategories.map((category) => (
        <div key={category.title}>
          <div className="flex items-center gap-3 mb-4">
            <Icon
              name={category.icon}
              className="w-6 h-6 text-primary-default"
            />
            <h2 className="text-2xl font-semibold text-neutral-dark">
              {category.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {category.items.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block rounded-xl border p-5 shadow-sm hover:shadow-md transition hover:bg-neutral-light"
              >
                <div className="flex items-center gap-4">
                  <Icon name={item.icon} className="size-6" />
                  <span className="text-lg font-medium text-neutral-dark">
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </ScrollableWrapper>
  );
};

export default Settings;

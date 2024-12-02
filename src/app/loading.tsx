"use client";

import { Icon } from "@/components/ui";

export default function RootSpinner() {
  return (
    <div className="h-screen">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Icon
          name="LoaderCircle"
          className="h-10 w-10 animate-spin text-primary-500"
        />
      </div>
    </div>
  );
}

import { Metadata } from "next";

import { getPageTitle } from "@/lib/utils";

const PAGE_NAME = "Dashboard";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "Main Dashboard Page",
};

export { default } from "@/components/pages/dashboard";

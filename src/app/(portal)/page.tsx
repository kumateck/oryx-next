
import { getPageTitle } from "@/lib/utils";
import { Metadata } from "next";

const PAGE_NAME = "Dashboard";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "Main Dashboard Page",
};

export { default } from "@/components/pages/dashboard";

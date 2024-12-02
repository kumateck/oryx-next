import { Metadata } from "next";

import { getPageTitle } from "@/lib/utils";

const PAGE_NAME = "Code Settings";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "Code Settings Page",
};

export { default } from "@/components/pages/settings/code-settings";

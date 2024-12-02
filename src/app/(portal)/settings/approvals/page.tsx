import { Metadata } from "next";

import { getPageTitle } from "@/lib/utils";

const PAGE_NAME = "Approvals";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "Approvals Page",
};

export { default } from "@/components/pages/settings/approvals";

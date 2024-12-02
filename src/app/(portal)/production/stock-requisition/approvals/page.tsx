import { Metadata } from "next";

import { getPageTitle } from "@/lib/utils";

const PAGE_NAME = "Approval";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "Approval Page",
};

export { default } from "@/components/pages/production/stock-requisition/approvals";

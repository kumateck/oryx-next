import { Metadata } from "next";

import { getPageTitle } from "@/lib/utils";

const PAGE_NAME = "Warehouse Shelves";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "Shelves of the Racks of the Warehouse Locations",
};

export { default } from "@/components/pages/supply-chain/warehouse/shelves";

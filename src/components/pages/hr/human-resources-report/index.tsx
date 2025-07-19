"use client";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { hrCategoryReportItems } from "./types";
import { Icon } from "@/components/ui";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  return (
    <ScrollablePageWrapper>
      <div className="flex w-full items-center justify-between">
        <PageTitle title="Human Resources Report" />
      </div>
      <div className="mt-6">
        {hrCategoryReportItems.map((item) => (
          <div className="space-y-6 mb-8" key={item.title}>
            <h1 className="text-lg text-primary-default font-medium ">
              {item.title}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-5 mt-2">
              {item.items.map((reportItem) => (
                <div
                  key={reportItem.name}
                  onClick={() => router.push(reportItem.path)}
                  className="block cursor-pointer rounded-xl border p-4 shadow-sm hover:shadow-md transition hover:bg-neutral-light"
                >
                  <div className="flex items-center gap-4">
                    <Icon name={reportItem.icon} className="size-4" />
                    <span className="text-base font-medium text-neutral-dark">
                      {reportItem.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollablePageWrapper>
  );
}

export default Page;

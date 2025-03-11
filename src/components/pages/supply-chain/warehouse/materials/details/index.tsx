"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Icon } from "@/components/ui";
import { useGetApiV1MaterialByMaterialIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import StepWrapper from "@/shared/wrapper";

const ViewPage: React.FC = () => {
  const { id } = useParams();
  const materialId = id as string;
  const { data: singleDetailed } = useGetApiV1MaterialByMaterialIdQuery({
    materialId,
  });

  const router = useRouter();
  // const [activeTab, setActiveTab] = useState<string>(tablists[0]);
  return (
    <PageWrapper>
      <ScrollablePageWrapper className="space-y-8 pr-32">
        <div className="flex items-center justify-between">
          {/* Head */}
          <div
            className="group flex items-center gap-1 hover:cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <Icon name="ArrowLeft" className="h-5 w-5" />
            <div className="group-hover:underline">
              <PageTitle title={"Materials"} />
            </div>
          </div>
          {/* <Link href={routes.editPlanning(singleDetailed?.id as string)}>
            <div className="flex items-center gap-1 rounded-2xl border border-neutral-input bg-white px-3 py-1.5 text-neutral-secondary hover:bg-neutral-hover">
              <Icon name="Pencil" className="size-4" />
              <span className="text-sm">Edit</span>
            </div>
          </Link> */}
        </div>
        <StepWrapper className="w-full">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base font-normal text-primary-default">
                  {singleDetailed?.code}
                </span>
              </div>
              <span className="font-Medium block text-3xl text-neutral-secondary">
                {singleDetailed?.name}{" "}
              </span>
              <ul className="flex gap-2">
                <li>
                  <div className="rounded-3xl border border-neutral-input px-2 text-sm text-neutral-700">
                    {singleDetailed?.materialCategory?.name}
                  </div>
                </li>{" "}
                <li>
                  <div className="rounded-3xl border border-neutral-input px-2 text-sm text-neutral-700">
                    {singleDetailed?.pharmacopoeia}
                  </div>
                </li>
              </ul>
            </div>

            <div className="w-full space-y-2">
              <span className="block text-sm font-normal text-neutral-400">
                Description
              </span>
              <span className="block text-sm font-normal text-black">
                {singleDetailed?.description}
              </span>
            </div>
          </div>
        </StepWrapper>

        {/* <div>
          <div className="border-b border-neutral-200 text-center text-sm font-medium">
            <ul className="-mb-px flex flex-wrap">
              {tablists.map((tab, idx) => (
                <li
                  key={idx}
                  className="me-2 hover:cursor-pointer"
                  onClick={() => setActiveTab(tab)}
                >
                  <span
                    className={cn(
                      "inline-block rounded-t-lg border-b-2 border-transparent p-4 text-sm hover:border-neutral-300 hover:text-neutral-600",
                      {
                        "font-Bold border-primary-600 text-primary-500 p-4":
                          activeTab === tab,
                      },
                    )}
                  >
                    {tab}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full">
          {activeTab === "Active BOM" && (
            <Bom
              data={singleDetailed?.currentBillOfMaterial}
              title="Current Bill of Material"
            />
          )}

          {activeTab === "Packaging" && (
            <Packaging data={singleDetailed?.packages ?? []} />
          )}
          {activeTab === "Routing" && (
            <Routing data={singleDetailed?.routes ?? []} />
          )}
          {activeTab === "Outdated BOM" && (
            <OutdatedBom data={singleDetailed?.outdatedBillOfMaterials ?? []} />
          )}
        </div> */}
      </ScrollablePageWrapper>
    </PageWrapper>
  );
};

// const tablists = [
//   // "Finished Goods",
//   "Active BOM",
//   "Packaging",
//   "Routing",
//   "Outdated BOM",
// ];
export default ViewPage;

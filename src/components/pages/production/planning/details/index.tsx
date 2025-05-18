"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Icon } from "@/components/ui";
import { AuditModules, routes } from "@/lib";
import { useGetApiV1ProductByProductIdQuery } from "@/lib/redux/api/openapi.generated";
import { cn } from "@/lib/utils";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import StepWrapper from "@/shared/wrapper";

import { Bom, OutdatedBom, Packaging } from "./tabs";
import { Procedure } from "./tabs/procedure";

const ViewPage: React.FC = () => {
  const { id } = useParams();
  const { data: singleDetailed } = useGetApiV1ProductByProductIdQuery({
    productId: id as string,
    module: AuditModules.production.name,
    subModule: AuditModules.production.planning,
  });

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(tablists[0]);
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
              <PageTitle title={"Products"} />
            </div>
          </div>
          <Link href={routes.editPlanning(singleDetailed?.id as string)}>
            <div className="flex items-center gap-1 rounded-2xl border border-neutral-input bg-white px-3 py-1.5 text-neutral-secondary hover:bg-neutral-hover">
              <Icon name="Pencil" className="size-4" />
              <span className="text-sm">Edit</span>
            </div>
          </Link>
        </div>
        <StepWrapper className="w-full">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base font-normal text-primary-default">
                  {singleDetailed?.code}
                </span>
                <span className="text-sm font-normal text-neutral-default">
                  | Created on{" "}
                  {singleDetailed?.createdAt
                    ? format(singleDetailed?.createdAt, "MMM d, yyyy. h:mma")
                    : ""}
                </span>
                <span className="text-sm font-normal">
                  {" "}
                  | by: {singleDetailed?.createdBy?.name}
                </span>
              </div>
              <span className="font-Medium block text-3xl text-neutral-secondary">
                {singleDetailed?.name}{" "}
              </span>
              <ul className="flex gap-2">
                <li>
                  <div className="rounded-3xl border border-neutral-input px-2 text-sm text-neutral-700">
                    {singleDetailed?.category?.name}
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <PageTitle title={singleDetailed?.name as string} />

              <div className="grid grid-cols-3 text-sm">
                <div>
                  {/* Product Name */}
                  <div>
                    <span>Product Name: </span>
                    <span>{singleDetailed?.name}</span>
                  </div>
                  {/* Product Category */}
                  <div>
                    <span>Product Category: </span>
                    <span>{singleDetailed?.category?.name}</span>
                  </div>
                  {/* Packing Style */}
                  <div>
                    <span>Packing Style: </span>
                    <span>{singleDetailed?.packageStyle}</span>
                  </div>
                  {/* Filled Volume */}
                  <div>
                    <span>Filled Volume: </span>
                    <span>{singleDetailed?.filledWeight}</span>
                  </div>
                </div>

                <div>
                  {/* Storage Condition */}
                  <div>
                    <span>Storage Condition: </span>
                    <span>{singleDetailed?.storageCondition}</span>
                  </div>
                  {/* Primary Packaging Style */}
                  <div>
                    <span>Primary Packaging Style: </span>
                    <span>{singleDetailed?.primaryPackDescription}</span>
                  </div>
                  {/* Action & Use */}
                  <div>
                    <span>Action & Use: </span>
                    <span>{singleDetailed?.actionUse}</span>
                  </div>
                  {/* Shelf Life */}
                  <div>
                    <span>Shelf Life: </span>
                    <span>{singleDetailed?.shelfLife}</span>
                  </div>
                </div>

                {/* <div>

                      <div>
                        <span>Product Description:{' '}</span>
                        <span>{singleDetailed?.description}</span>
                      </div>

                      <div>
                        <span>Label Claims:{' '}</span>
                        <span>{singleDetailed?.}</span>
                      </div>
                    </div> */}
              </div>
            </div>
          </div>
        </StepWrapper>

        <div>
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
          {/* {activeTab === "Finished Goods" && (
            <FinishedGoods data={singleDetailed?.finishedProducts ?? []} />
          )} */}
          {activeTab === "Active BOM" && (
            <Bom
              data={singleDetailed?.currentBillOfMaterial}
              // title="Current Bill of Material"
            />
          )}
          {activeTab === "Outdated BOM" && (
            <OutdatedBom data={singleDetailed?.outdatedBillOfMaterials ?? []} />
          )}

          {activeTab === "Packaging" && (
            <Packaging data={singleDetailed?.packages ?? []} />
          )}
          {activeTab === "Procedure" && (
            <Procedure data={singleDetailed?.routes ?? []} />
          )}
        </div>
      </ScrollablePageWrapper>
    </PageWrapper>
  );
};

const tablists = [
  // "Finished Goods",
  "Active BOM",
  "Outdated BOM",
  "Packaging",
  "Procedure",
];
export default ViewPage;

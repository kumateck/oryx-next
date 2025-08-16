"use client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import {
  AuditModules,
  InventoryClassificationEnum,
  InventoryType,
} from "@/lib";
import { useLazyGetApiV1ItemsByIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import ItemsDetailsSkeleton from "./loadingSkeleton";

function Page() {
  const [loadItem, { data, isLoading }] = useLazyGetApiV1ItemsByIdQuery();
  const { id } = useParams();
  const router = useRouter();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    loadItem({
      id: id as string,
      module: AuditModules.extral.name,
      subModule: AuditModules.extral.service,
    }).unwrap();
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, triggerReload]);

  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const allImagesDoc = data?.attachments?.filter((att) => {
    const ext = att?.name?.split(".").pop()?.toLowerCase();
    return ext ? imageExtensions.includes(ext) : false;
  });
  const otherDocs = data?.attachments?.filter((att) => {
    const ext = att?.name?.split(".").pop()?.toLowerCase();
    return ext ? !imageExtensions.includes(ext) : false;
  });

  if (isLoading) {
    return <ItemsDetailsSkeleton />;
  }
  return (
    <ScrollablePageWrapper className="space-y-8">
      {data ? (
        <>
          <div className="flex items-center justify-between gap-2">
            <div className="flex cursor-pointer items-center gap-2">
              <Icon
                name="ArrowLeft"
                className="h-5 w-5 cursor-pointer"
                onClick={() => router.back()}
              />
              <PageTitle title="Service Details" />
            </div>
            <Button
              onClick={() =>
                router.push(`/extrals/general-inventory-config/${data.id}`)
              }
              className="flex items-center gap-2"
            >
              <Icon name="Pencil" className="h-4 w-4" />
              <span className="ml-2">Edit Service</span>
            </Button>
          </div>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Created On:</span>
                <span>
                  {data?.createdAt
                    ? format(new Date(data.createdAt), "MMMM dd, yyyy")
                    : "N/A"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <h3>{data.code ? data.code : "N/A"}</h3>
              <CardTitle className="text-lg font-semibold uppercase">
                {data.name}
              </CardTitle>
              <div className="grid place-items-start grid-cols-1 md:grid-cols-3 py-6 gap-4">
                <div>
                  <div className="col-span-1 flex items-center gap-2">
                    {" "}
                    <span className="text-gray-700 whitespace-nowrap">
                      Category:
                    </span>
                    <strong className="text-gray-900">
                      {
                        InventoryClassificationEnum[
                          data.classification as InventoryClassificationEnum
                        ]
                      }
                    </strong>
                  </div>
                  <div className="col-span-1 flex items-center gap-2">
                    {" "}
                    <span className="text-gray-700 whitespace-nowrap">
                      Reorder Level:
                    </span>
                    <strong className="text-gray-900">
                      {data.reorderLevel}
                    </strong>
                  </div>
                </div>
                <div>
                  <div className="col-span-1 flex items-center gap-2">
                    {" "}
                    <span className="text-gray-700 whitespace-nowrap">
                      Items Store{" "}
                    </span>
                    <strong className="text-gray-900">
                      {InventoryType[data.store as InventoryType]}
                    </strong>
                  </div>
                  <div className="col-span-1 flex items-center gap-2">
                    {" "}
                    <span className="text-gray-700 whitespace-nowrap">
                      Reorder Level:
                    </span>
                    <strong className="text-gray-900">
                      {data.minimumLevel}
                    </strong>
                  </div>
                </div>
                <div>
                  <div className="col-span-1 flex items-center gap-2">
                    {" "}
                    <span className="text-gray-700 whitespace-nowrap">
                      Classification:
                    </span>
                    <strong className="text-gray-900">
                      {
                        InventoryClassificationEnum[
                          data.classification as InventoryClassificationEnum
                        ]
                      }
                    </strong>
                  </div>
                  <div className="col-span-1 flex items-center gap-2">
                    {" "}
                    <span className="text-gray-700 whitespace-nowrap">
                      Maximum Level:
                    </span>
                    <strong className="text-gray-900">
                      {data.maximumLevel}
                    </strong>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold uppercase">
                Attachments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-2 sm:grid-cols-2 grid-cols-1">
                {allImagesDoc &&
                  allImagesDoc.length > 0 &&
                  allImagesDoc.map((att) => {
                    return (
                      <div
                        key={att.name}
                        className="flex w-full items-center gap-3 rounded-2xl border bg-neutral-50 "
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={att.link ?? ""}
                          alt={att.name ?? "Service Attachment"}
                          loading="lazy"
                          className="w-full min-h-40 md:min-h-48 h-full rounded-lg object-cover"
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-2 grid-cols-1">
                {otherDocs &&
                  otherDocs.length > 0 &&
                  otherDocs.map((att) => {
                    return (
                      <div
                        key={att.name}
                        className="flex w-full items-center gap-3 rounded-2xl border border-primary-default bg-neutral-50 px-4 py-4"
                      >
                        <div className="bg-secondary-500 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                          <Icon name="FileText" className="text-primary-500" />
                        </div>
                        <div className="flex w-full flex-col">
                          <span className="text-base text-neutral-900">
                            {att.name}
                          </span>
                          {/* <span className="text-sm text-neutral-500">{att.size}</span> */}
                        </div>
                      </div>
                    );
                  })}
              </div>
              {!data?.attachments ||
                (data?.attachments?.length === 0 && (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-gray-500">
                      No documents available.
                    </span>
                  </div>
                ))}
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-gray-500">No data available.</span>
        </div>
      )}
    </ScrollablePageWrapper>
  );
}

export default Page;

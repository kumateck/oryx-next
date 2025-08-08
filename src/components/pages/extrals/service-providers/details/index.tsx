"use client";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import { AuditModules } from "@/lib";
import { useLazyGetApiV1ServiceProvidersByIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Edit } from "../edit";
import { useSelector } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { ClientDatatable } from "@/shared/datatable";
import { columns } from "./columns";
import ServiceProviderDetailsSkeleton from "./loadingSkeleton";

function Page() {
  const [openEdit, setOpenEdit] = useState(false);
  const [loadServiceProviderDetails, { data, isLoading }] =
    useLazyGetApiV1ServiceProvidersByIdQuery();
  const { id } = useParams();
  const router = useRouter();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    loadServiceProviderDetails({
      id: id as string,
      module: AuditModules.extral.name,
      subModule: AuditModules.extral.serviceProviders,
    }).unwrap();
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, triggerReload]);

  //TODO: Handle loading state and error handling
  if (!isLoading) {
    return <ServiceProviderDetailsSkeleton />;
  }
  if (!data) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-lg text-neutral-500">No service details found.</p>
      </div>
    );
  }
  return (
    <ScrollablePageWrapper className="space-y-8">
      {openEdit && (
        <Edit
          isOpen={openEdit}
          onClose={() => setOpenEdit(false)}
          details={data}
        />
      )}
      <div className="flex items-center justify-between gap-2">
        <div className="flex cursor-pointer items-center gap-2">
          <Icon
            name="ArrowLeft"
            className="h-5 w-5 cursor-pointer"
            onClick={() => router.back()}
          />
          <PageTitle title="Service Provider Details" />
        </div>
        <Button
          onClick={() => setOpenEdit(true)}
          className="flex items-center gap-2"
        >
          <Icon name="Pencil" className="h-4 w-4" />
          <span className="ml-2">Edit Service Provider</span>
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
          {/* <h3>{data.code ? data.code : "N/A"}</h3> */}
          <CardTitle className="text-lg font-semibold uppercase">
            {data.name}
          </CardTitle>
          <div className="grid place-items-start grid-cols-1 md:grid-cols-4 py-6 gap-4">
            <div className="col-span-1 flex items-center gap-2">
              <div>
                <span className="text-gray-700">Service Provider Email:</span>
                <strong className="text-gray-900">
                  {data.email ? data.email : "N/A"}
                </strong>
              </div>
              <div>
                <span className="text-gray-700">Address:</span>
                <strong className="text-gray-900">
                  {data.address ? data.address : "N/A"}
                </strong>
              </div>
            </div>
            <div className="col-span-1 flex items-center gap-2">
              <div>
                <span className="text-gray-700">Contact Person:</span>
                <strong className="text-gray-900">
                  {/* TODO: Implement contact person display */}
                  {/* {data.contactPerson ? data.contactPerson : "N/A"} */}
                </strong>
              </div>
              <div>
                <span className="text-gray-700">Contact Number:</span>
                <strong className="text-gray-900">
                  {/* TODO: Implement contact number display */}
                  {/* {data.contactNumber ? data.contactNumber : "N/A"} */}
                </strong>
              </div>
            </div>
            <div className="col-span-2 w-full">
              <div>
                <span className="text-gray-700">Country:</span>
                <strong className="whitespace-pre-wrap text-gray-900">
                  {data.country?.name || "N/A"}
                </strong>
              </div>
              <div>
                <span className="text-gray-700">Currency:</span>
                <strong className="whitespace-pre-wrap text-gray-900">
                  {data.currency?.name || "N/A"}
                </strong>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold uppercase">
            Services
          </CardTitle>
          <CardDescription>
            List of services offered by the provider.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientDatatable
            data={data.services || []}
            columns={columns}
            isLoading={isLoading}
            normalTable={true}
          />
        </CardContent>
      </Card>
    </ScrollablePageWrapper>
  );
}

export default Page;

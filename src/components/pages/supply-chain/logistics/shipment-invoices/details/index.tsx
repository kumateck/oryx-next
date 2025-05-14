"use client";

import { useParams, useRouter } from "next/navigation";

import { Card, CardContent, CardTitle, Icon } from "@/components/ui";
import { useGetApiV1ProcurementShipmentInvoiceByIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import TableForData from "./table";
import { useEffect, useState } from "react";
import { useSelector } from "@/lib/redux/store";
import { findRecordWithAccess, PermissionKeys, Section } from "@/lib";
import NoAccess from "@/shared/no-access";

const ShipmentInvoiceDetails = () => {
  const { id } = useParams();
  const shipmentInvoiceId = id as string;
  const router = useRouter();
  const { data } = useGetApiV1ProcurementShipmentInvoiceByIdQuery({
    id: shipmentInvoiceId,
  });

  //Check Permision
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access
  const hasAccess = findRecordWithAccess(
    permissions,
    PermissionKeys.logistics.viewShipmentInvoice,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <ScrollablePageWrapper>
      <div
        className="group mb-2 flex items-center gap-1 hover:cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <Icon name="ArrowLeft" className="h-5 w-5" />
        <div className="group-hover:underline">
          <PageTitle title={"Shipment Invoice List"} />
        </div>
      </div>

      <div className="my-5 space-y-3">
        <Card className="my-8">
          <CardContent className="space-y-4 py-2">
            <div className="flex justify-start gap-4">
              <div className="w-full space-y-2">
                <span className="font-Medium block text-lg">
                  Shipment Invoice Information
                </span>
                <div className="grid w-full grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Shipment Invoice Code:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {data?.code}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Supplier Name:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {data?.supplier?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-3">
        <Card className="space-y-4 p-5">
          <CardTitle>
            <span className="text-sm text-gray-500">Invoice Items</span>
          </CardTitle>
          <TableForData lists={data?.items || []} setItemLists={() => {}} />
        </Card>
      </div>
    </ScrollablePageWrapper>
  );
};

export default ShipmentInvoiceDetails;

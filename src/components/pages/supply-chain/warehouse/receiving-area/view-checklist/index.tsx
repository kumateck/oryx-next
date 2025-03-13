"use client";

import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Card, CardContent, Icon } from "@/components/ui";
import {
  ChecklistBoolean,
  SupplierStatus,
  Units,
  convertToLargestUnit,
} from "@/lib";
import {
  SrDto,
  useGetApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklistQuery,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

function ViewChecklist() {
  const { id } = useParams();
  const materialId = id as string;
  const router = useRouter();
  const { data } =
    useGetApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklistQuery(
      { distributedMaterialId: materialId },
    );
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
          <PageTitle title={"Receiving Area"} />
        </div>
      </div>

      <Card>
        <CardContent className="py-4">
          <PageTitle title={data?.material?.name as string} />

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div>
                <span>Invoice Number: </span>
                <span className="font-bold">{data?.shipmentInvoice?.code}</span>
              </div>
              <div>
                <span>Supplier Name: </span>
                <span className="font-bold">{data?.supplier?.name}</span>
              </div>
              <div>
                <span>Manufacturer Name: </span>
                <span className="font-bold">{data?.manufacturer?.name}</span>
              </div>
            </div>
            <div>
              <div>
                <span>Supplier Status: </span>
                <span className="font-bold">
                  {
                    SupplierStatus[
                      data?.supplier
                        ?.status as unknown as keyof typeof SupplierStatus
                    ]
                  }
                </span>
              </div>
              <div>
                <span>Certificate of Analysis: </span>
                <span className="font-bold">{data?.supplier?.name}</span>
              </div>
              <div>
                <span>Condition of Consignment Carrier: </span>
                <span className="font-bold">
                  {
                    ChecklistBoolean[
                      data?.consignmentCarrierStatus as unknown as keyof typeof ChecklistBoolean
                    ]
                  }
                </span>
              </div>
            </div>
            <div>
              <div>
                <span>Intactness of containers/bags/shippers: </span>
                <span className="font-bold">
                  {
                    ChecklistBoolean[
                      data?.intactnessStatus as unknown as keyof typeof ChecklistBoolean
                    ]
                  }
                </span>
              </div>
              <div>
                <span>
                  Visible proper labelling of containers/bags/shippers:{" "}
                </span>
                <span className="font-bold">
                  {data?.visibleLabelling ? "True" : "False"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        {data?.materialBatches?.map((batch) => (
          <Card className="my-5" key={batch.id}>
            <CardContent className="py-4">
              <div className="grid grid-cols-3 text-sm">
                <div>
                  <div>
                    <span>Batch Number: </span>
                    <span className="font-bold">{batch.batchNumber}</span>
                  </div>
                  <div>
                    <span>Number of Bags: </span>
                    <span className="font-bold">
                      {batch.numberOfContainers}
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Quantity per Bag: </span>
                    <span className="font-bold">
                      {
                        convertToLargestUnit(
                          Number(batch.quantityPerContainer),
                          batch.uoM?.symbol as Units,
                        ).value
                      }
                      {
                        convertToLargestUnit(
                          Number(batch.quantityPerContainer),
                          batch.uoM?.symbol as Units,
                        ).unit
                      }
                    </span>
                  </div>
                  <div>
                    <span>Batch Quantity: </span>
                    <span className="font-bold">
                      {
                        convertToLargestUnit(
                          Number(batch.totalQuantity),
                          batch.uoM?.symbol as Units,
                        ).value
                      }
                      {
                        convertToLargestUnit(
                          Number(batch.totalQuantity),
                          batch.uoM?.symbol as Units,
                        ).unit
                      }
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Expiry Date: </span>
                    <span className="font-bold">
                      {batch?.expiryDate
                        ? format(new Date(batch?.expiryDate), "MMMM dd, yyyy")
                        : "-"}
                    </span>
                  </div>
                  <div>
                    <span>Manufacturing Date: </span>
                    <span className="font-bold">
                      {batch?.manufacturingDate
                        ? format(
                            new Date(batch?.manufacturingDate),
                            "MMMM dd, yyyy",
                          )
                        : "-"}
                    </span>
                  </div>
                  <div>
                    <span>Retest Date: </span>
                    <span className="font-bold">
                      {batch?.retestDate
                        ? format(new Date(batch?.retestDate), "MMMM dd, yyyy")
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-x-12 gap-y-2">
                {batch.sampleWeights?.map((weight: SrDto, i) => {
                  if (!weight) return null;
                  if (!weight.srNumber && !weight.grossWeight) return null;

                  return (
                    <div key={i} className="col-span-1 grid grid-cols-2 gap-2">
                      <span className="rounded-2xl border bg-white px-2 py-1 text-sm">
                        {weight.srNumber ?? "-"}
                      </span>
                      <span className="rounded-2xl border bg-white px-2 py-1 text-sm">
                        {weight.grossWeight ?? "-"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollablePageWrapper>
  );
}

export default ViewChecklist;

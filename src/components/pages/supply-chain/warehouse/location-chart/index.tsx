"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { ProductRequestDto } from "@/components/pages/production/planning/types";
import { Button, Card, CardTitle, Icon } from "@/components/ui";
import { InputTypes, Option } from "@/lib";
import {
  GrnDto,
  MaterialBatchDto,
  useGetApiV1WarehouseGrnByIdQuery,
  useGetApiV1WarehouseRackQuery,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import TableForData from "./table";

const GRNDetail = () => {
  const { id } = useParams();
  const grnId = id as string;
  const { data: grnResponse } = useGetApiV1WarehouseGrnByIdQuery({
    id: grnId,
  });

  const [packageLists, setPackageLists] = useState<MaterialBatchDto[]>([]);

  const { data: racks } = useGetApiV1WarehouseRackQuery({
    page: 1,
    pageSize: 100,
  });

  useEffect(() => {
    if (grnResponse) {
      const batchOptions = grnResponse.materialBatches?.map((item) => {
        const batchNumber = item?.batchNumber as string;

        const materialName = item?.checklist?.material?.name as string;

        const manufacturerName = item?.checklist?.manufacturer?.name as string;

        const invoiceNumber = item?.checklist?.shipmentInvoice?.code as string;

        const totalQuantity = item?.totalQuantity as number;

        const expiryDate = item.expiryDate;

        const manufacturingDate = item.dateReceived;

        const retestDate = item.dateReceived;

        const status = item.status;

        return {
          batchNumber,
          materialName,
          manufacturerName,
          invoiceNumber,
          totalQuantity,
          expiryDate,
          manufacturingDate,
          retestDate,
          status,
        };
      }) as GrnDto[];
      setPackageLists(batchOptions);
    }
  }, [grnResponse]);

  const {
    control,
    formState: { errors },
  } = useForm<ProductRequestDto>({
    mode: "all",
    defaultValues: {},
  });

  const rackOptions = racks?.data?.map((item) => ({
    label: `${item?.warehouseLocation?.name}-${item.name}`,
    value: item.id,
  })) as Option[];
  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <PageTitle title="Location Chart Record" />
        {/* <Card>
          <CardContent className="space-y-4 py-2">
            <div className="flex justify-start gap-4">
              <div className="w-full space-y-2">
                <span className="font-Medium block text-xl text-primary-default">
                  {grnResponse?.grnNumber}
                </span>
                <div className="grid w-full grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Carrier Name:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {grnResponse?.carrierName}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Vehicle Number:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {grnResponse?.vehicleNumber}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Remarks:{" "}
                    </span>
                    <span className="inline text-sm font-normal text-neutral-dark">
                      <TheAduseiEditorViewer
                        content={grnResponse?.remarks ?? ""}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <FormWizard
              className="w-full gap-x-10 gap-y-5 space-y-0"
              fieldWrapperClassName="flex-grow"
              config={[
                {
                  label: "Rack Number",
                  type: InputTypes.SELECT,
                  control: control as unknown as Control,
                  name: "categoryId",
                  required: true,
                  onModal: true,
                  placeholder: "Select Rack Number",
                  options: rackOptions,
                  errors,
                },
              ]}
            />
          </div>
          <div>
            <Button
              variant={"default"}
              className="flex items-center gap-2 bg-neutral-dark"
            >
              <Icon name="Printer" className="h-4 w-4" />
              <span>Print Chart</span>
            </Button>
          </div>
        </div>
        {/* <DragLists /> */}
        {/* {data?.products && data?.products?.length > 0 && (
          <Products scheduleId={scheduleId} products={data?.products ?? []} />
        )} */}
        <Card className="space-y-4 p-5">
          <CardTitle>Rack Number: G/01/A</CardTitle>
          <TableForData lists={packageLists} setItemLists={setPackageLists} />
        </Card>
        <Card className="space-y-4 p-5">
          <CardTitle>Rack Number: G/01/B</CardTitle>
          <TableForData lists={packageLists} setItemLists={setPackageLists} />
        </Card>
        <Card className="space-y-4 p-5">
          <CardTitle>Rack Number: G/01/C</CardTitle>
          <TableForData lists={packageLists} setItemLists={setPackageLists} />
        </Card>
      </div>
    </ScrollablePageWrapper>
  );
};

export default GRNDetail;

"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui";
import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
import {
  MaterialBatchDto,
  useGetApiV1WarehouseGrnByIdQuery,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";

import TableForData from "./table";

const GRNDetail = () => {
  const { id } = useParams();
  const grnId = id as string;
  const { data: grnResponse } = useGetApiV1WarehouseGrnByIdQuery({
    id: grnId,
  });

  const [packageLists, setPackageLists] = useState<MaterialBatchDto[]>([]);

  useEffect(() => {
    if (grnResponse?.materialBatches) {
      // Directly set the materialBatches array to state
      setPackageLists(grnResponse.materialBatches);
    }
  }, [grnResponse]);
  // console.log("Package List:::", packageLists);
  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <Card>
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
        </Card>

        <Card className="space-y-4 p-5">
          <CardTitle>GRN/GRA Items</CardTitle>
          <TableForData lists={packageLists} />
        </Card>
      </div>
    </ScrollablePageWrapper>
  );
};

export default GRNDetail;

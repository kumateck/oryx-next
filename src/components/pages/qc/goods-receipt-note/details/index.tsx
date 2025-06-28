"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Card, CardContent, CardTitle, Icon } from "@/components/ui";
import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
import {
  GrnDto,
  useLazyGetApiV1WarehouseGrnByIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch, useSelector } from "@/lib/redux/store";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import TableForData from "./table";

const GRNDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const grnId = id as string;
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [loadGrn, { isLoading }] = useLazyGetApiV1WarehouseGrnByIdQuery();

  const [grnDetails, setGrnDetails] = useState<GrnDto>();

  const router = useRouter();

  useEffect(() => {
    handleLoadGrn(grnId);
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grnId, triggerReload]);

  const handleLoadGrn = async (id: string) => {
    try {
      const response = await loadGrn({
        id,
      }).unwrap();
      setGrnDetails(response);
    } catch (error) {
      console.error("Error loading GRN", error);
    }
  };
  // console.log("Package List:::", packageLists);
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
          <PageTitle title={"GRN List"} />
        </div>
      </div>
      <div className="space-y-3">
        <Card>
          <CardContent className="space-y-4 py-2">
            <div className="flex justify-start gap-4">
              <div className="w-full space-y-2">
                <span className="font-Medium block text-xl text-primary-default">
                  {grnDetails?.grnNumber}
                </span>
                <div className="grid w-full grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Carrier Name:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {grnDetails?.carrierName}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Vehicle Number:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {grnDetails?.vehicleNumber}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Remarks:{" "}
                    </span>
                    <span className="inline text-sm font-normal text-neutral-dark">
                      <TheAduseiEditorViewer
                        content={grnDetails?.remarks ?? ""}
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
          <TableForData
            lists={grnDetails?.materialBatches ?? []}
            isLoading={isLoading}
          />
        </Card>
      </div>
    </ScrollablePageWrapper>
  );
};

export default GRNDetail;

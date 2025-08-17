"use client";
import PageWrapper from "@/components/layout/wrapper";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import StockRequisitionSkeleton from "./loadingSkeleton";
import {
  usePostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdMutation,
  useLazyGetApiV1ItemsStockRequisitionsByIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { isErrorResponse, ErrorResponse, cn } from "@/lib";
import { toast } from "sonner";

function Index() {
  const [loadStockRequisitionDetails, { data, isLoading }] =
    useLazyGetApiV1ItemsStockRequisitionsByIdQuery();
  const [IssueStockRequisition, { isLoading: isSubmitting }] =
    usePostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdMutation();
  // const [isIssue, setIsIssue] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  //TODO: replace with actual data fetching logic
  useEffect(() => {
    if (!id) return;
    loadStockRequisitionDetails({ id: id as string });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleIssue = async () => {
    console.log("Submitting issue:", data);
    try {
      await IssueStockRequisition({
        stockRequisitionId: id as string,
      }).unwrap();
      toast.success("Stock requisition issued successfully");
    } catch (error) {
      console.error("Error issuing stock requisition:", error);
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to issue stock requisition. Please try again.",
      );
    }
  };
  if (isLoading) {
    return <StockRequisitionSkeleton />;
  }
  return (
    <PageWrapper className="space-y-6">
      {/* {isIssue && (
        <Issue
          isOpen={isIssue}
          onClose={() => setIsIssue(false)}
          data={data as ItemDto}
          id={id as string}
        />
      )} */}
      {data && !isLoading ? (
        <>
          {" "}
          <div className="w-full flex items-center justify-between">
            <div className="w-fit flex items-center gap-2">
              <Icon
                name="ArrowLeft"
                onClick={() => router.back()}
                className="h-5 w-5 text-black hover:cursor-pointer"
              />
              <PageTitle title={`Stock Requisition Details`} />
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-1"
                variant={"success"}
                onClick={handleIssue}
              >
                <Icon
                  className={cn("h-4 w-4", {
                    "animate-spin": isSubmitting,
                  })}
                  name={isSubmitting ? "LoaderCircle" : "Check"}
                />
                <span>Issue</span>
              </Button>
              <Button
                className="flex items-center gap-2"
                variant={"destructive"}
                // onClick={() => setIsIssue(true)}
              >
                <Icon name="X" />
                <span>Reject</span>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <span className="text-xs bg-opacity-45 font-medium px-2 py-1 bg-gray-400 text-white w-fit rounded-full">
                Pending
              </span>
              <CardTitle className="font-bold text-gray-900">{id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3 grid-cols-1 w-full">
                <div className="flex gap-2 text-lg">
                  <span className="text-gray-500 whitespace-nowrap">
                    Requisition Date:
                  </span>
                  <span className="text-gray-800 whitespace-nowrap">
                    12 December, 2024
                  </span>
                </div>
                <div className="flex gap-2 text-lg">
                  <span className="text-gray-500 whitespace-nowrap">
                    Expected Delivery Date:
                  </span>
                  <span className="text-gray-800 whitespace-nowrap">
                    12 December, 2024
                  </span>
                </div>
                <div className="flex gap-2 text-lg">
                  <span className="text-gray-500 whitespace-nowrap">
                    Total Order Item(s):
                  </span>
                  <span className="text-gray-800">30</span>
                </div>
                <div className="flex gap-2 text-lg">
                  <span className="text-gray-500">Remarks:</span>
                  <span className="text-gray-800 whitespace-nowrap">
                    Low stock level
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-gray-900">
                Stock Requisition Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <span className="text-gray-500">No items found</span>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-56 w-full h-full">
          <span className="text-gray-600 text-lg"> Oops! No items found</span>
        </div>
      )}
    </PageWrapper>
  );
}

export default Index;

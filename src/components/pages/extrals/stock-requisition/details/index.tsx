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
import React, { useState } from "react";
import StockRequisitionSkeleton from "./loadingSkeleton";

function Index() {
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  //TODO: replace with actual data fetching logic
  const loading = false;
  console.log(isEdit);

  if (loading) {
    return <StockRequisitionSkeleton />;
  }
  return (
    <PageWrapper className="space-y-6">
      <div className="w-full flex items-center justify-between">
        <div className="w-fit flex items-center gap-2">
          <Icon
            name="ArrowLeft"
            onClick={() => router.back()}
            className="h-5 w-5 text-black hover:cursor-pointer"
          />
          <PageTitle title={`Stock Requisition Details`} />
        </div>
        <Button onClick={() => setIsEdit(true)}>Edit</Button>
      </div>
      <Card>
        <CardHeader>
          <span className="text-xs bg-opacity-45 font-medium px-2 py-1 bg-gray-400 text-white w-fit rounded-full">
            Pending
          </span>
          <CardTitle className="font-bold text-gray-900">{id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3 grid-cols-1 w-full">
            <div className="flex gap-2 text-lg">
              <span className="text-gray-500 whitespace-nowrap">
                Requisition Date:
              </span>
              <span className="text-gray-800">12 December, 2024</span>
            </div>
            <div className="flex gap-2 text-lg">
              <span className="text-gray-500 whitespace-nowrap">
                Expected Delivery Date:
              </span>
              <span className="text-gray-800">12 December, 2024</span>
            </div>
            <div className="flex gap-2 text-lg">
              <span className="text-gray-500 whitespace-nowrap">
                Total Order Item(s):
              </span>
              <span className="text-gray-800">30</span>
            </div>
            <div className="flex gap-2 text-lg">
              <span className="text-gray-500">Remarks:</span>
              <span className="text-gray-800">Low stock level</span>
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
    </PageWrapper>
  );
}

export default Index;

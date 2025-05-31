"use client";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { ListsTable } from "@/shared/datatable";
import { columns, SampleData } from "./columns";
import { CreateSampleMaterial } from "./create-sample";

function Page() {
  const [isCreate, setIsCreate] = useState(false);

  const router = useRouter();
  const { id } = useParams();
  const isLoading = false;
  const isFetching = false;

  const data: SampleData[] = [
    {
      id: "someid",
      expiryDate: new Date(),
      invoiceNumber: "200kg",
      batchNumber: "This is god",
      status: "Approved",
      manufacturerName: "name",
      manufacturingDate: new Date(),
      materialName: "Material One",
      quantity: 40,
      resetDate: new Date(),
    },
  ];
  console.log(id);
  return (
    <PageWrapper>
      {isCreate && (
        <CreateSampleMaterial
          isOpen={isCreate}
          onClose={() => setIsCreate(false)}
        />
      )}
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
      <div className="flex flex-col w-full gap-4">
        <ListsTable
          data={data}
          columns={columns}
          isLoading={isLoading || isFetching}
        />
        <Button onClick={() => setIsCreate(true)} className=" ml-auto">
          Sample Material
        </Button>
      </div>
    </PageWrapper>
  );
}

export default Page;

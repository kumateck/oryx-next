"use client";
import PageWrapper from "@/components/layout/wrapper";
import { useLazyGetApiV1MaterialSpecificationsByIdQuery } from "@/lib/redux/api/openapi.generated";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function Page() {
  const { id } = useParams();
  const [fetchMaterialSpecification, { data: materialData, isLoading }] =
    useLazyGetApiV1MaterialSpecificationsByIdQuery({});

  useEffect(() => {
    if (id) {
      fetchMaterialSpecification({ id: id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (isLoading) return null;
  console.log("Material Data", materialData);
  return <PageWrapper>Page</PageWrapper>;
}

export default Page;

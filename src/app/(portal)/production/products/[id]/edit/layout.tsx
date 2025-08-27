"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Icon } from "@/components/ui";
import { routes } from "@/lib";
import { useGetApiV1ProductByProductIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();
  const productId = id as string;
  const { data } = useGetApiV1ProductByProductIdQuery({
    productId,
  });

  const router = useRouter();
  return (
    <ScrollablePageWrapper className="w-full">
      <PageWrapper>
        <div className="flex items-center gap-1 pb-3">
          <Icon
            name="NotepadTextDashed"
            className="cursor-pointer text-neutral-dark hover:text-primary-pressed"
            onClick={() => router.push(routes.planning())}
          />
          <PageTitle title={data?.name ?? "Products"} />
        </div>
        {children}
      </PageWrapper>
    </ScrollablePageWrapper>
  );
};

export default Layout;

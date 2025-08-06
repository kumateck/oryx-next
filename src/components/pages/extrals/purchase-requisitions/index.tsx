"use client";

import { useState } from "react";
import PageWrapper from "@/components/layout/wrapper";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { columns } from "./column";
import { PermissionKeys } from "@/lib";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";
import { useRouter } from "next/navigation";
import Create from "./create";
import { Button, Icon } from "@/components/ui";

const Page = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const data = [];
  const { hasPermissionAccess } = useUserPermissions();
  // check permissions access
  const hasAccess = hasPermissionAccess(
    PermissionKeys.procurement.sendQuotationRequest,
  );

  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  console.log(page);

  return (
    <div>
      <Create isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <PageWrapper className="w-full space-y-2 py-1">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 ">
            <Icon
              name="ArrowLeft"
              className="h-5 w-5 text-black hover:cursor-pointer"
              onClick={() => {
                router.back();
              }}
            />
            <PageTitle title={"Purchase Requisition"} />
          </div>
          <div className="flex items-center justify-end gap-2">
            {hasPermissionAccess(PermissionKeys.procurement.createVendor) && (
              <Button
                variant="default"
                size={"sm"}
                onClick={() => setIsOpen(true)}
              >
                <Icon name="Plus" className="h-4 w-4" /> <span>Create</span>
              </Button>
            )}
          </div>
        </div>
        <ServerDatatable
          data={data}
          columns={columns}
          isLoading={false}
          setPage={setPage}
          setPageSize={setPageSize}
          meta={{
            pageIndex: 1,
            pageCount: 1,
            totalRecordCount: 0,
            numberOfPagesToShow: 1,
            startPageIndex: 1,
            stopPageIndex: 1,
            pageSize,
          }}
        />
      </PageWrapper>
    </div>
  );
};
export default Page;

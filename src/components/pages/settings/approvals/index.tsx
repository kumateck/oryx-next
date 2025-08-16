"use client";

import React from "react";

import { Button, Icon } from "@/components/ui";
import {
  useDeleteApiV1ApprovalByApprovalIdMutation,
  useGetApiV1ApprovalQuery,
} from "@/lib/redux/api/openapi.generated";

// import AddApproval from "./add-approval";
import ApprovalCard from "./card";
import Link from "next/link";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";
import { useUserPermissions } from "@/hooks/use-permission";
import { PermissionKeys } from "@/lib";
import NoAccess from "@/shared/no-access";
import PageTitle from "@/shared/title";
import { useRouter } from "next/navigation";
import ScrollablePageWrapper from "@/shared/page-wrapper";

const Page = () => {
  const router = useRouter();
  const { data: responseDto } = useGetApiV1ApprovalQuery({
    pageSize: 30,
    page: 1,
  });

  const [deleteApproval, { isLoading: isDeleteMutationLoading }] =
    useDeleteApiV1ApprovalByApprovalIdMutation();
  const approvals = responseDto?.data || [];

  const deleteHandler = async (id: string) => {
    try {
      await deleteApproval({
        approvalId: id,
      }).unwrap();
      toast.success("Deleted successfully");
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  // const [isOpen, setIsOpen] = React.useState(false);

  //check permission
  const { hasPermissionAccess } = useUserPermissions();
  if (!hasPermissionAccess(PermissionKeys.approvals.view)) {
    return <NoAccess />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            name="ArrowLeft"
            className="h-5 w-5 text-black hover:cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />

          <PageTitle title={"Approvals"} />
        </div>{" "}
        {hasPermissionAccess(
          PermissionKeys.approvals.createOrConfigureNewApproval,
        ) && (
          <Link href={"/settings/approvals/create"}>
            <Button>Create</Button>
          </Link>
        )}
      </div>
      {/* <AddApproval isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
      <ScrollablePageWrapper>
        <ul>
          {approvals.map((approval, idx) => (
            <li key={idx}>
              <ApprovalCard
                approval={approval}
                number={idx}
                isDeleteMutationLoading={isDeleteMutationLoading}
                deleteHandler={deleteHandler}
              />
            </li>
          ))}
        </ul>
      </ScrollablePageWrapper>
    </div>
  );
};

export default Page;

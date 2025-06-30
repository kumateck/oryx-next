"use client";

import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog } from "@/components/ui";
import { Icon } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { ErrorResponse, isErrorResponse, PermissionKeys } from "@/lib";
import {
  ConfigurationDto,
  useDeleteApiV1ConfigurationByConfigurationIdMutation,
  useGetApiV1ConfigurationQuery,
  useLazyGetApiV1ConfigurationQuery,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";

import CodeContainer from "./container";
import CreateCode from "./create";
import EditCode from "./edit";
import { useUserPermissions } from "@/hooks/use-permission";
import NoAccess from "@/shared/no-access";
import PageTitle from "@/shared/title";
import { useRouter } from "next/navigation";

function Codes() {
  const router = useRouter();
  const [pageSize] = useState(30);
  // const [page, setPage] = useState(1);
  const [deleteCode, { isLoading: isDeleteLoading }] =
    useDeleteApiV1ConfigurationByConfigurationIdMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [codeToEdit, setCodeToEdit] = useState<ConfigurationDto | null>(null);
  const { data: configResponse } = useGetApiV1ConfigurationQuery({
    // page:,
    pageSize,
  });
  const [loadCodes] = useLazyGetApiV1ConfigurationQuery();

  const codeLists = configResponse?.data;

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //       document.body.offsetHeight - 500
  //     ) {
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const onSelectEdit = (code: ConfigurationDto) => {
    setCodeToEdit(code);
    setIsEditOpen(true);
  };
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteCode({
        configurationId: codeToEdit?.id || "",
      }).unwrap();

      setCodeToEdit(null);
      toast.success("Code Deleted");
      loadCodes({
        page: 1,
        pageSize: 30,
      });
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  const { hasPermissionAccess } = useUserPermissions();
  const hasAccess = hasPermissionAccess(PermissionKeys.codeSettings.view);
  if (!hasAccess) {
    return <NoAccess />;
  }
  return (
    <div className="w-full pr-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <Icon
            name="ArrowLeft"
            className="h-5 w-5 text-black hover:cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />

          <PageTitle title={"Code Settings"} />
        </div>{" "}
        {hasPermissionAccess(PermissionKeys.codeSettings.addNewCodes) && (
          <Button
            type="button"
            onClick={() => setIsOpen(true)}
            variant="secondary"
            size="default"
            className="flex h-9 items-center gap-2"
          >
            <Icon name="Plus" className="text-primary-500 h-4 w-4" />
            <span>Create New Code</span>
          </Button>
        )}
      </div>
      <CreateCode isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <ScrollablePageWrapper className="pb-60">
        <div className="mt-6">
          <div className="flex w-full items-center justify-between rounded-2xl bg-primary-default px-4 py-2 font-bold text-white">
            <div>Model Type</div>
            <div>Naming Type</div>
            <div>Prefix</div>
            <div>Min Length</div>
            <div>Max Length</div>
            <div></div>
          </div>

          {codeLists?.map((codeGen: ConfigurationDto) => {
            return (
              <CodeContainer
                setCodeToEdit={onSelectEdit}
                key={codeGen.id}
                codeGen={codeGen}
                isDeleteLoading={
                  isDeleteLoading && codeToEdit?.id === codeGen.id
                }
                onDelete={() => {
                  setCodeToEdit(codeGen);
                  setIsDeleteOpen(true);
                }}
              />
            );
          })}
        </div>
      </ScrollablePageWrapper>
      {codeToEdit && (
        <EditCode
          details={codeToEdit}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
      {codeToEdit && (
        <ConfirmDeleteDialog
          open={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default Codes;

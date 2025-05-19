"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse, routes } from "@/lib";
import {
  CreateRouteRequest,
  PostApiV1ProductByProductIdRoutesApiArg,
  useLazyGetApiV1ProductByProductIdRoutesQuery,
  usePostApiV1ProductByProductIdRoutesMutation,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import StepWrapper from "@/shared/wrapper";

import Create from "./create";
import TableForData from "./table";
import { RoutingRequestDto } from "./types";

const Page = () => {
  const { id } = useParams();
  const productId = id as string;

  const [loadProcedure] = useLazyGetApiV1ProductByProductIdRoutesQuery();

  useEffect(() => {
    if (productId) {
      handleLoadProduct(productId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  const handleLoadProduct = async (productId: string) => {
    try {
      const procedureResponse = await loadProcedure({
        productId,
      }).unwrap();
      const defaultRouting = procedureResponse?.data?.map((r, idx) => ({
        ...r,
        idIndex: (idx + 1).toString(),
        resources: r.resources?.map((res) => {
          return {
            label: res.resource?.name as string,
            value: res.resource?.id as string,
          };
        }),
        operationId: {
          label: r.operation?.name as string,
          value: r.operation?.id as string,
        },
        workCenters: r.workCenters?.map((res) => {
          return {
            label: res.workCenter?.name as string,
            value: res.workCenter?.id as string,
          };
        }),
        responsibleRoles: r.responsibleRoles?.map((res) => {
          return {
            label: res?.role?.name as string,
            value: res?.role?.id as string,
          };
        }),
        responsibleUsers: r.responsibleUsers?.map((res) => {
          return {
            label: res?.user?.name as string,
            value: res.user?.id as string,
          };
        }),
      })) as RoutingRequestDto[];
      setItemLists(defaultRouting);
    } catch (error) {
      // toast.error(isErrorResponse(error as ErrorResponse)?.description);
      console.log(error);
    }
  };

  const [saveRouting, { isLoading }] =
    usePostApiV1ProductByProductIdRoutesMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [itemLists, setItemLists] = useState<RoutingRequestDto[]>([]);

  if (!productId) {
    return <div>Please Save a Product Info</div>;
  }
  const handleSave = async () => {
    try {
      await saveRouting({
        module: AuditModules.production.name,
        subModule: AuditModules.production.procedure,
        productId,
        body: itemLists?.map((item, idx) => ({
          estimatedTime: item.estimatedTime,
          order: idx + 1,
          operationId: item.operationId.value,
          resourceIds: item.resources?.map((item) => ({
            resourceId: item.value,
          })),
          responsibleUsers: item.responsibleUsers?.map((item) => ({
            userId: item.value,
          })),
          responsibleRoles: item.responsibleRoles?.map((item) => ({
            roleId: item.value,
          })),
          workCenters: item.workCenters?.map((item) => ({
            workCenterId: item.value,
          })),
          // workCenterId: item.workCenterId.value,
        })) as CreateRouteRequest[],
      } satisfies PostApiV1ProductByProductIdRoutesApiArg).unwrap();

      toast.success("Changes Saved");
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <div className="relative">
      <div className="absolute right-0 -mt-10">
        <div className="flex justify-end gap-4">
          <Link
            href={routes.editPlanningInfo()}
            className="hover:text-primary-500 underline"
          >
            Edit Info
          </Link>
          <Link
            href={routes.editPlanningBom()}
            className="hover:text-primary-500 underline"
          >
            Edit BOM
          </Link>
          <Link
            href={routes.editPlanningPackaging()}
            className="hover:text-primary-500 underline"
          >
            Edit Packaging
          </Link>
          <Link
            href={routes.editPackingOrder()}
            className="underline hover:text-primary-hover"
          >
            Packing Order Preparation
          </Link>
        </div>
      </div>
      <StepWrapper className="w-full pb-3">
        <div className="flex w-full justify-between">
          <PageTitle title="Procedure" />
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (itemLists?.length < 1) {
                  toast.error("Please add Routing items");
                  return;
                }
                handleSave();
              }}
              type="button"
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              ) : (
                <Icon name="Save" className="h-4 w-4" />
              )}
              <span>Save</span>{" "}
            </Button>
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
              type="button"
              variant={"secondary"}
              className="flex items-center gap-2"
            >
              <Icon name="Plus" className="h-4 w-4" />
              <span>Add New</span>{" "}
            </Button>
          </div>
        </div>
        <Create
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          setItemLists={setItemLists}
          productId={productId}
          itemLists={itemLists}
        />

        <div className="w-full py-6">
          <TableForData lists={itemLists} setItems={setItemLists} />
        </div>
      </StepWrapper>
    </div>
  );
};

export default Page;

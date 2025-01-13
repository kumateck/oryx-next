"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import StepWrapper from "@/app/shared/wrapper";
import { Button, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse, routes } from "@/lib";
import {
  CreateRouteRequest,
  PostApiV1ProductByProductIdRoutesApiArg,
  useGetApiV1ProductByProductIdQuery,
  usePostApiV1ProductByProductIdRoutesMutation,
} from "@/lib/redux/api/openapi.generated";

import Create from "./create";
import TableForData from "./table";
import { RoutingRequestDto } from "./types";

const Page = () => {
  const { id } = useParams();
  const productId = id as string;

  const { data: product } = useGetApiV1ProductByProductIdQuery({
    productId,
  });
  const defaultRouting = product?.routes?.map((r, idx) => ({
    ...r,
    idIndex: (idx + 1).toString(),
    resourceIds: r.resources?.map((res) => {
      return {
        label: res.name as string,
        value: res.id as string,
      };
    }),
    operationId: {
      label: r.operation?.name as string,
      value: r.operation?.id as string,
    },
    workCenterId: {
      label: r.workCenter?.name as string,
      value: r.workCenter?.id as string,
    },
  })) as RoutingRequestDto[];

  const [saveRouting, { isLoading }] =
    usePostApiV1ProductByProductIdRoutesMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [itemLists, setItemLists] = useState<RoutingRequestDto[]>([]);
  useEffect(() => {
    if (defaultRouting?.length > 0) {
      setItemLists(defaultRouting);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultRouting && defaultRouting?.length]);

  if (!productId) {
    return <div>Please Save a Product Info</div>;
  }
  const handleSave = async () => {
    try {
      await saveRouting({
        productId,
        body: itemLists?.map((item, idx) => ({
          estimatedTime: item.estimatedTime,
          order: idx + 1,
          operationId: item.operationId.value,
          resourceIds: item.resourceIds?.map((item) => item.value),
          workCenterId: item.workCenterId.value,
        })) as CreateRouteRequest[],
      } satisfies PostApiV1ProductByProductIdRoutesApiArg).unwrap();

      toast.success("Changes Saved");
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <div>
      <div className="flex justify-end gap-4">
        <Link
          href={routes.editPlanningInfo()}
          className="underline hover:text-primary-500"
        >
          Edit Info
        </Link>
        <Link
          href={routes.editPlanningBom()}
          className="underline hover:text-primary-500"
        >
          Edit BOM
        </Link>
        <Link
          href={routes.editPlanningPackaging()}
          className="underline hover:text-primary-500"
        >
          Edit Packaging
        </Link>
      </div>
      <StepWrapper className="w-full pb-3">
        <div className="flex w-full justify-between">
          <span className="font-Bold text-xl">
            {/* Manufacturing Resource Planning (MRP) */}
            Procedure
          </span>

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
              variant={"primary"}
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
        />

        <div className="w-full py-6">
          <TableForData
            lists={
              itemLists?.map((item, idx) => {
                return {
                  ...item,
                  idIndex: (idx + 1).toString(),
                };
              }) || []
            }
            setItems={setItemLists}
          />
        </div>
      </StepWrapper>
    </div>
  );
};

export default Page;

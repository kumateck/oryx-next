"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import StepWrapper from "@/app/shared/wrapper";
import { Button, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse, routes } from "@/lib";
import {
  useGetApiV1ProductByProductIdQuery,
  usePostApiV1BomMutation,
  usePutApiV1ProductByProductIdBomArchiveMutation,
} from "@/lib/redux/api/openapi.generated";

import Create from "./create";
import TableForData from "./table";
import { BomRequestDto } from "./types";

const BOM = () => {
  const { id } = useParams();
  const productId = id as string;
  const router = useRouter();
  const { data: product } = useGetApiV1ProductByProductIdQuery({
    productId,
  });

  const defaultBillOfMaterials =
    product?.currentBillOfMaterial?.billOfMaterial?.items?.map((bom, idx) => ({
      ...bom,
      idIndex: (idx + 1).toString(),
      componentMaterialId: {
        label: bom.componentMaterial?.name as string,
        value: bom.componentMaterial?.id as string,
      },
      materialTypeId: {
        label: bom.materialType?.name as string,
        value: bom.materialType?.id as string,
      },
    })) as BomRequestDto[];
  const [saveBom, { isLoading }] = usePostApiV1BomMutation();
  const [archiveBom, { isLoading: archiveLoading }] =
    usePutApiV1ProductByProductIdBomArchiveMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [itemLists, setItemLists] = useState<BomRequestDto[]>([]);

  useEffect(() => {
    if (defaultBillOfMaterials?.length > 0) {
      setItemLists(defaultBillOfMaterials);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultBillOfMaterials && defaultBillOfMaterials?.length]);
  // console.log(defaultBillOfMaterials, "defaultBillOfMaterials");
  // if (!productId) {
  //   return <div>Please Save a Product Info</div>;
  // }
  const handleSave = async () => {
    try {
      await saveBom({
        createBillOfMaterialRequest: {
          productId,
          items: itemLists?.map((item) => ({
            ...item,
            componentMaterialId: item.componentMaterialId.value,
            materialTypeId: item.materialTypeId.value,
            order: item.order,
          })),
        },
      }).unwrap();
      toast.success("BOM Saved");
      router.push(routes.editPlanningPackaging());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const handleArchiveBom = async () => {
    try {
      await archiveBom({ productId: productId as string }).unwrap();
      toast.success("BOM Archived");
      setItemLists([]);
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
          href={routes.editPlanningPackaging()}
          className="underline hover:text-primary-500"
        >
          Edit Packaging
        </Link>
        <Link
          href={routes.editPlanningProcedure()}
          className="underline hover:text-primary-500"
        >
          Edit Procedure
        </Link>
      </div>
      <StepWrapper className="w-full pb-3">
        <div className="flex w-full justify-between">
          <span className="font-Bold text-xl">BOM List</span>

          <div className="flex gap-2">
            <Button
              onClick={handleArchiveBom}
              type="button"
              variant={"outline"}
              className="flex items-center gap-2"
            >
              {archiveLoading ? (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              ) : (
                <Icon name="Recycle" className="h-4 w-4" />
              )}
              <span>Archive BOM</span>{" "}
            </Button>
            <Button
              onClick={() => {
                if (itemLists?.length < 1) {
                  toast.error("Please add BOM items");
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
              <span>Save Changes</span>{" "}
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
          itemLists={itemLists}
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

export default BOM;

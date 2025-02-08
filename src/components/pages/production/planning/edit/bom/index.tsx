"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse, routes } from "@/lib";
import {
  useGetApiV1ProductByProductIdQuery,
  usePostApiV1BomMutation,
  usePutApiV1ProductByProductIdBomArchiveMutation,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import StepWrapper from "@/shared/wrapper";

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
      materialId: {
        label: bom.material?.name as string,
        value: bom.material?.id as string,
      },
      materialTypeId: {
        label: bom.materialType?.name as string,
        value: bom.materialType?.id as string,
      },
      baseUoMId: {
        label: bom.baseUoM?.symbol as string,
        value: bom.baseUoM?.id as string,
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
            materialId: item.materialId.value,
            materialTypeId: item.materialTypeId.value,
            baseUoMId: item.baseUoMId.value,
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
    <div className="relative">
      <div className="absolute right-0 -mt-10">
        <div className="flex justify-end gap-4">
          <Link
            href={routes.editPlanningInfo()}
            className="underline hover:text-primary-hover"
          >
            Edit Info
          </Link>
          <Link
            href={routes.editPlanningPackaging()}
            className="underline hover:text-primary-hover"
          >
            Edit Packaging
          </Link>
          <Link
            href={routes.editPlanningProcedure()}
            className="underline hover:text-primary-hover"
          >
            Edit Procedure
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
          <PageTitle title="BOM List" />
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
          <TableForData lists={itemLists} setItems={setItemLists} />
        </div>
      </StepWrapper>
    </div>
  );
};

export default BOM;

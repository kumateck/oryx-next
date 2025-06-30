"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse, routes } from "@/lib";
import {
  PostApiV1ProductByProductIdPackagesApiArg,
  useLazyGetApiV1ProductByProductIdPackagesQuery,
  usePostApiV1ProductByProductIdPackagesMutation,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import StepWrapper from "@/shared/wrapper";

import Create from "./create";
// import Edit from "./edit";
import TableForData from "./table";
import { PackagingRequestDto } from "./types";

const Packaging = () => {
  const { id } = useParams();
  const productId = id as string;

  const [loadPacking] = useLazyGetApiV1ProductByProductIdPackagesQuery();
  useEffect(() => {
    if (productId) {
      handleLoadPacking(productId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleLoadPacking = async (productId: string) => {
    try {
      const response = await loadPacking({
        productId,
        module: AuditModules.production.name,
        subModule: AuditModules.production.packing,
      }).unwrap();

      // console.log(response);
      const defaultPackaging = response?.map((p, idx) => ({
        ...p,
        material: p.material
          ? {
              label: p.material?.name as string,
              value: p.material?.id as string,
            }
          : undefined,
        idIndex: (idx + 1).toString(),
        directLinkMaterial: p.directLinkMaterial
          ? {
              label: p.directLinkMaterial?.name as string,
              value: p.directLinkMaterial?.id as string,
            }
          : undefined,
      })) as PackagingRequestDto[];
      setItemLists(defaultPackaging);
    } catch (error) {
      console.log(error);
    }
  };

  const [savePackaging, { isLoading }] =
    usePostApiV1ProductByProductIdPackagesMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [itemLists, setItemLists] = useState<PackagingRequestDto[]>([]);

  if (!productId) {
    return <div>Please Save a Product Info</div>;
  }
  const handleSave = async () => {
    try {
      await savePackaging({
        module: AuditModules.production.name,
        subModule: AuditModules.production.packing,
        productId,
        body: itemLists?.map((item) => ({
          baseQuantity: item.baseQuantity,
          materialThickness: item.materialThickness,
          otherStandards: item.otherStandards,
          unitCapacity: item.unitCapacity,
          packingExcessMargin: item.packingExcessMargin,
          materialId: item.material.value,
          directLinkMaterialId: item.directLinkMaterial?.value,
        })),
      } satisfies PostApiV1ProductByProductIdPackagesApiArg).unwrap();
      toast.success("Packaging Saved");
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
            href={routes.editPlanningProcedure()}
            className="hover:text-primary-500 underline"
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
          <PageTitle title="Package List" />
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (itemLists?.length < 1) {
                  toast.error("Please add Packaging items");
                  return;
                }
                handleSave();
              }}
              type="button"
              variant={"default"}
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
          itemLists={itemLists}
        />

        <div className="w-full py-6">
          <TableForData lists={itemLists} setItemLists={setItemLists} />
        </div>
      </StepWrapper>
    </div>
  );
};

export default Packaging;

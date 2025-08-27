"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import { AuditModules, routes } from "@/lib";
import {
  PostApiV1ProductByProductIdPackingApiArg,
  useLazyGetApiV1ProductByProductIdPackingQuery,
  usePostApiV1ProductByProductIdPackingMutation,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import StepWrapper from "@/shared/wrapper";

import Create from "./create";
// import Edit from "./edit";
import TableForData from "./table";
import { PackingStyleRequestDto } from "./types";
import ThrowErrorMessage from "@/lib/throw-error";

const PackingStyle = () => {
  const { id } = useParams();
  const productId = id as string;

  const [loadPacking] = useLazyGetApiV1ProductByProductIdPackingQuery();
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
      }).unwrap();

      const defaultPacking = response?.map((p, idx) => ({
        id: p.id as string,
        name: p.name as string,
        description: p.description as string,
        packingLists: p.packingLists?.map((packing) => ({
          quantity: packing.quantity as number,
          uomId: {
            label: `${packing.uom?.name} (${packing.uom?.symbol})`,
            value: packing.uom?.id as string,
          },
        })),
        idIndex: (idx + 1).toString(),
      })) as PackingStyleRequestDto[];
      setItemLists(defaultPacking);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [savePackingStyle, { isLoading }] =
    usePostApiV1ProductByProductIdPackingMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [itemLists, setItemLists] = useState<PackingStyleRequestDto[]>([]);

  if (!productId) {
    return <div>Please Save a Product Info</div>;
  }
  const handleSave = async () => {
    try {
      await savePackingStyle({
        module: AuditModules.production.name,
        subModule: AuditModules.production.packingStyle,
        productId,
        body: itemLists?.map((item) => ({
          name: item.name,
          description: item.description,
          packingLists: item.packingLists?.map((packing) => ({
            uomId: packing.uomId?.value,
            quantity: packing.quantity,
          })),
        })),
      } satisfies PostApiV1ProductByProductIdPackingApiArg).unwrap();
      toast.success("Packign Style Saved");
    } catch (error) {
      ThrowErrorMessage(error);
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
            Info
          </Link>
          <Link
            href={routes.editPlanningBom()}
            className="hover:text-primary-500 underline"
          >
            BOM
          </Link>
          <Link
            href={routes.editPlanningPackaging()}
            className="underline hover:text-primary-hover"
          >
            Packaging
          </Link>
          <Link
            href={routes.editPlanningProcedure()}
            className="hover:text-primary-500 underline"
          >
            Procedure
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
          <PageTitle title="Packing Style" />
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (itemLists?.length < 1) {
                  toast.error("Please add Packing items");
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

export default PackingStyle;

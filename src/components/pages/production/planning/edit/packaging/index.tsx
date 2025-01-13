"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import StepWrapper from "@/app/shared/wrapper";
import { Button, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse, routes } from "@/lib";
import {
  PostApiV1ProductByProductIdPackagesApiArg,
  useGetApiV1ProductByProductIdQuery,
  usePostApiV1ProductByProductIdPackagesMutation,
} from "@/lib/redux/api/openapi.generated";

import Create from "./create";
// import Edit from "./edit";
import TableForData from "./table";
import { PackagingRequestDto } from "./types";

const Packaging = () => {
  const { id } = useParams();
  const productId = id as string;

  const { data: product } = useGetApiV1ProductByProductIdQuery({
    productId,
  });
  const defaultPackaging = product?.packages?.map((p, idx) => ({
    ...p,
    materialId: {
      label: p.material?.name as string,
      value: p.material?.id as string,
    },
    packageTypeId: {
      label: p.packageType?.name as string,
      value: p.packageType?.id as string,
    },
    idIndex: (idx + 1).toString(),
  })) as PackagingRequestDto[];

  const [savePackaging, { isLoading }] =
    usePostApiV1ProductByProductIdPackagesMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [itemLists, setItemLists] = useState<PackagingRequestDto[]>([]);

  useEffect(() => {
    if (defaultPackaging?.length > 0) {
      setItemLists(defaultPackaging);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPackaging && defaultPackaging?.length]);
  if (!productId) {
    return <div>Please Save a Product Info</div>;
  }
  const handleSave = async () => {
    try {
      await savePackaging({
        productId,
        body: itemLists?.map((item) => ({
          ...item,
          packageTypeId: item.packageTypeId.value,
          materialId: item.materialId.value,
        })),
      } satisfies PostApiV1ProductByProductIdPackagesApiArg).unwrap();
      toast.success("Packaging Saved");
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
          href={routes.editPlanningProcedure()}
          className="underline hover:text-primary-500"
        >
          Edit Procedure
        </Link>
      </div>
      <StepWrapper className="w-full pb-3">
        <div className="flex w-full justify-between">
          <span className="font-Bold text-xl">Packaging List</span>

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
          itemLists={itemLists}
        />

        <div className="w-full py-6">
          <TableForData
            setItemLists={setItemLists}
            lists={
              itemLists?.map((item, idx) => {
                return {
                  ...item,
                  idIndex: (idx + 1).toString(),
                };
              }) || []
            }
          />
        </div>
      </StepWrapper>
    </div>
  );
};

export default Packaging;

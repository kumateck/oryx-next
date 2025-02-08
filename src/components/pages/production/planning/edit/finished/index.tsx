"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  PostApiV1ProductByProductIdFinishedApiArg,
  usePostApiV1ProductByProductIdFinishedMutation,
} from "@/lib/redux/api/openapi.generated";
import StepWrapper from "@/shared/wrapper";

import Create from "./create";
// import Edit from "./edit";
import TableForData from "./table";
import { FinishedRequestDto } from "./types";

interface Props {
  productId?: string;
  finishedGoodsLists?: FinishedRequestDto[];
  loadProductById: () => void;
}
const FinishedGoods = ({
  productId,
  finishedGoodsLists,
  loadProductById,
}: Props) => {
  const [saveMutation, { isLoading }] =
    usePostApiV1ProductByProductIdFinishedMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [itemLists, setItemLists] = useState<FinishedRequestDto[]>(
    finishedGoodsLists ?? [],
  );
  if (!productId) {
    return <div>Please Save a Product Info</div>;
  }
  const handleSave = async () => {
    try {
      await saveMutation({
        productId,
        body: itemLists?.map((item) => ({
          ...item,
          uoMId: item.uoMId?.value,
        })),
      } satisfies PostApiV1ProductByProductIdFinishedApiArg).unwrap();

      toast.success("Products Saved");

      loadProductById();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <StepWrapper className="w-full pb-3">
      <div className="flex w-full justify-between">
        <span className="font-Bold text-xl">Finished Products</span>

        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (itemLists?.length < 1) {
                toast.error("Please add Product Info");
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
      />

      <div className="w-full py-6">
        <TableForData setItemLists={setItemLists} lists={itemLists || []} />
      </div>
    </StepWrapper>
  );
};

export default FinishedGoods;

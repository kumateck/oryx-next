import React from "react";

import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { ErrorResponse, isErrorResponse, Option } from "@/lib";

import {
  ProductionOrderProductsDto,
  usePostApiV1ProductionScheduleAllocateProductsMutation,
} from "@/lib/redux/api/openapi.generated";

import PharmaceuticalInventoryForm from "./test";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productionOrderId?: string;
  orderedProduct: ProductionOrderProductsDto[];
}

const OrderAllocation = ({
  isOpen,
  onClose,
  orderedProduct,
  productionOrderId,
}: Props) => {
  console.log(orderedProduct, "orderedProduct");
  const [saveMutation, { isLoading }] =
    usePostApiV1ProductionScheduleAllocateProductsMutation();

  // const [purchaseLists, setPurchaseLists] = useState<ExtendedOrderedProduct[]>(
  //   orderedProduct?.map((item) => ({
  //     ...item,
  //     quantity: 0,
  //   })),
  // );

  const onSubmit = async () => {
    try {
      await saveMutation({
        allocateProductionOrderRequest: {
          productionOrderId,
        },
      }).unwrap();

      toast.success("Allocation created successfully");
      onClose();
    } catch (error) {
      console.log(error, "error");
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  // console.log(generatedCode, "generatedCode");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Create New Allocation </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-end gap-4">
          <Button
            onClick={onClose}
            type="button"
            variant="outline"
            className="flex items-center gap-2"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => onSubmit()}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Icon name="LoaderCircle" className="animate-spin" />
            ) : (
              <Icon name="Save" />
            )}
            Save
          </Button>
        </div>
        <div className="py-5">
          <PharmaceuticalInventoryForm
            productOptions={
              orderedProduct?.map((item) => ({
                label: item.product?.name,
                value: item.product?.id,
              })) as Option[]
            }
          />
          {/* <TableForData
            lists={purchaseLists}
            setItemLists={setPurchaseLists}
            defaultColumns={getPurchaseColumns(setPurchaseLists)}
          /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderAllocation;

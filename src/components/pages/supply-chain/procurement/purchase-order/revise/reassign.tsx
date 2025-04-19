import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import {
  cn,
  convertToSmallestUnit,
  findSelectedQuotation,
  getLargestUnit,
  Option,
  Quotations,
  RevisionType,
  Units,
} from "@/lib";
import React, { useEffect, useState } from "react";
import { RevisionRequestDto } from "./type";
import { useParams } from "next/navigation";
import {
  useLazyGetApiV1RequisitionSourceMaterialPriceComparisonByMaterialQuery,
  usePostApiV1RequisitionSourceQuotationProcessPurchaseOrderMutation,
  usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseMutation,
} from "@/lib/redux/api/openapi.generated";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";
import EmptyState from "@/shared/empty";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: RevisionRequestDto;
  currency: Option;
}
const ReAssign = ({ isOpen, onClose, details }: Props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const purchaseOrderId = id as string;
  const [state, setState] = useState<Quotations[]>([]);

  const [loadPrices, { isLoading: isLoadingData, isFetching }] =
    useLazyGetApiV1RequisitionSourceMaterialPriceComparisonByMaterialQuery();
  const [saveProcess, { isLoading }] =
    usePostApiV1RequisitionSourceQuotationProcessPurchaseOrderMutation();

  // console.log(pricesComparision, "pricesComparision");
  const [saveMutation, { isLoading: isSaving }] =
    usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseMutation();

  const onSubmit = async () => {
    try {
      const payload = state as Quotations[];
      const qty = convertToSmallestUnit(
        details.quantity as number,
        getLargestUnit(details.uoM?.label as Units),
      );
      const items = [
        {
          uoMId: details.uoM?.value,
          materialId: details.material?.value,
          currencyId: details.currency?.value,
          type: RevisionType.ReassignSupplier,
          quantity: qty.value,
          price: details.price,
          purchaseOrderItemId: details.purchaseOrderItemId,
        },
      ];
      await Promise.all([
        saveMutation({
          purchaseOrderId: purchaseOrderId,
          body: items,
        }).unwrap(),

        saveProcess({
          body: findSelectedQuotation(payload),
        }).unwrap(),
      ]);
      toast.success("New Supplier Selected successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  const onChange = (value: string, index: number) => {
    setState((prev) => {
      return prev?.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            supplierQuotations: item?.supplierQuotations?.map((quote) => {
              if (quote.supplierId === value) {
                return {
                  ...quote,
                  selected: true,
                };
              }
              return {
                ...quote,
                selected: false,
              };
            }),
          };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    handleLoadPriceComparison(
      purchaseOrderId,
      details.material.value,
      details?.supplierId,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseOrderId, details.material.value, details?.supplierId]);

  const handleLoadPriceComparison = async (
    purchaseOrderId: string,
    materialId: string,
    providedSupplierId?: string,
  ) => {
    const response = await loadPrices({
      purchaseOrderId,
      materialId,
    }).unwrap();

    const prices = response?.map((item) => {
      return {
        materialCode: item?.material?.code,
        materialId: item?.material?.id,
        materialName: item?.material?.name,
        uomName: item?.uoM?.name,
        uomId: item?.uoM?.id,
        quantity: item?.quantity,
        supplierQuotations: item?.supplierQuotation
          ?.filter((p) => p?.supplier?.id !== providedSupplierId)
          ?.map((p) => {
            return {
              supplierId: p?.supplier?.id,
              sourceRequisitionId: p?.sourceRequisition?.id,
              supplierName: p?.supplier?.name,
              price: p?.price,
              selected: false,
            };
          }),
      };
    }) as Quotations[];
    setState(prices);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Re-Assign Supplier</DialogTitle>
          <DialogDescription>
            Material: {details.material.label}
          </DialogDescription>
        </DialogHeader>
        <div>
          <p className="py-5">Available Supplier Options</p>
          {isLoadingData || isFetching ? (
            <SkeletonLoadingPage />
          ) : (
            <div>
              {state?.length === 0 && <EmptyState />}
              {state?.map((price, idx) => (
                <RadioGroup
                  key={idx}
                  className="flex flex-wrap gap-4 "
                  onValueChange={(v) => onChange(v, idx)}
                >
                  {price?.supplierQuotations?.map((quote, index) => (
                    <div
                      key={index}
                      className={cn(
                        "rounded-2xl border p-4 transition hover:bg-stone-100",
                        {
                          "border-primary-default ring-primary-default bg-stone-100 shadow-2xl ring-1":
                            quote?.selected,
                        },
                      )}
                    >
                      <Label className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <RadioGroupItem
                            value={quote?.supplierId}
                            id="newPassport"
                            className="h-8 w-8"
                          >
                            <Icon
                              name="CheckCheck"
                              className="h-7 w-7 text-current"
                            />
                          </RadioGroupItem>
                        </div>
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold capitalize">
                            {quote?.supplierName}
                          </h3>
                          <p className="text-muted-foreground text-sm capitalize leading-normal">
                            {details?.currency?.label} {quote?.price}
                          </p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant={"outline"} onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={findSelectedQuotation(state).length === 0}
          >
            {(isSaving || isLoading) && (
              <Icon name="LoaderCircle" className="animate-spin" size={16} />
            )}
            <span>Save Changes</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReAssign;

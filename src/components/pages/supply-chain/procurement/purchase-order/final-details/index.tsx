import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import {
  COLLECTION_TYPES,
  ErrorResponse,
  Option,
  amountToWordsBritishStyle,
  isErrorResponse,
} from "@/lib";
import { useSelector } from "@/lib/redux/store";
import {
  PostApiV1CollectionApiArg,
  useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery,
  usePostApiV1CollectionMutation,
  usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation,
} from "@/lib/redux/api/openapi.generated";

import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import { getColumns } from "../details/columns";
import CreateSkeleton from "./skeleton";

import Form from "./form";
import { CreateFinalDetailsValidator, FinalDetailsRequestDto } from "./types";
import { ListsTable } from "@/shared/datatable";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  purchaseOrderId: string;
  onSuccess: () => void;
  currency: {
    symbol: string;
    name: string;
  };
  defaultValues: FinalDetailsRequestDto;
}

const Create = ({
  isOpen,
  onClose,
  purchaseOrderId,
  currency,
  defaultValues,
  onSuccess,
}: Props) => {
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);

  const [saveMutation, { isLoading }] =
    usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation();
  const [loadPO, { data, isLoading: isLoadingPO }] =
    useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery();

  useEffect(() => {
    loadPO({ purchaseOrderId }).unwrap();
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
  }, [purchaseOrderId, triggerReload, loadPO, dispatch]);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FinalDetailsRequestDto>({
    resolver: CreateFinalDetailsValidator,
    mode: "onSubmit",
    defaultValues,
  });

  const totalFobValue = watch("totalFobValue") || 0;
  const insuranceAmount = watch("insuranceAmount") || 0;
  const freight = watch("freight") || 0;

  useEffect(() => {
    const cifValue =
      Number(totalFobValue) + Number(insuranceAmount) + Number(freight);
    setValue("cifValue", cifValue);
  }, [totalFobValue, insuranceAmount, freight, setValue]);

  useEffect(() => {
    const calculatedCif =
      Number(watch("totalFobValue") || 0) +
      Number(watch("insuranceAmount") || 0) +
      Number(watch("freight") || 0);

    setValue("cifValue", calculatedCif);

    const amountInWords = amountToWordsBritishStyle(
      calculatedCif,
      currency.name,
    );
    setValue("amountInWords", amountInWords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency.name]);

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.TermsOfPayment, COLLECTION_TYPES.DeliveryMode],
    } as PostApiV1CollectionApiArg).unwrap();
  }, [loadCollection]);

  const termsOfPayment = collectionResponse?.[
    COLLECTION_TYPES.TermsOfPayment
  ]?.map((top) => ({
    label: top.name,
    value: top.id,
  })) as Option[];

  const deliveryMode = collectionResponse?.[COLLECTION_TYPES.DeliveryMode]?.map(
    (dm) => ({
      label: dm.name,
      value: dm.id,
    }),
  ) as Option[];

  const onSubmit = async (data: FinalDetailsRequestDto) => {
    try {
      await saveMutation({
        purchaseOrderId,
        updatePurchaseOrderRequest: {
          deliveryModeId: data.deliveryMode.value,
          termsOfPaymentId: data.termsOfPayment.value,
          totalFobValue: data.totalFobValue,
          totalCifValue: data.cifValue,
          seaFreight: data.freight,
          amountInFigures: data.amountInWords,
          insurance: data.insuranceAmount,
          estimatedDeliveryDate: data.estimatedDeliveryDate.toISOString(),
          proFormaInvoiceNumber: data.invoiceNumber,
        },
      }).unwrap();
      toast.success("Purchase Order updated successfully");
      onSuccess();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  if (isLoadingPO) {
    return <CreateSkeleton isOpen={isOpen} onClose={onClose} />;
  }

  // console.log(isOpen, "isOpen");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Purchase Order Final Details</DialogTitle>
        </DialogHeader>
        <div className="flex items-start gap-4">
          <div className="w-1/2">
            <div className="mb-5">
              <p className="text-lg">Purchase Order {data?.code}</p>
              <p className="text-gray-500">
                Supplier Name: {data?.supplier?.name}
              </p>
              <p className="text-gray-500">
                Supplier Contact: {data?.supplier?.contactNumber}
              </p>
            </div>
            <ListsTable
              data={data?.items ?? []}
              columns={getColumns(data?.supplier?.currency?.symbol ?? "")}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)} // <-- no need for e.preventDefault
            id="final-details"
            className="w-1/2"
          >
            <Form
              register={register}
              errors={errors}
              control={control}
              termsOfPayment={termsOfPayment}
              deliveryMode={deliveryMode}
              currency={currency.symbol}
            />
            <DialogFooter className="justify-end gap-4 py-6">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon name="Plus" className="h-4 w-4" />
                )}
                <span>Save changes</span>
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

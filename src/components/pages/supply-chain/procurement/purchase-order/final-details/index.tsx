import { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
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
  amountToWords,
  isErrorResponse, // numberToWords,
} from "@/lib";
import {
  PostApiV1CollectionApiArg,
  usePostApiV1CollectionMutation,
  usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation,
} from "@/lib/redux/api/openapi.generated";

// import { commonActions } from "@/lib/redux/slices/common";
import Form from "./form";
import { CreateFinalDetailsValidator, FinalDetailsRequestDto } from "./types";

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
  onSuccess,
  purchaseOrderId,
  currency,
  defaultValues,
}: Props) => {
  // const dispatch = useDispatch();
  const [saveMutation, { isLoading }] =
    usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
    watch,
  } = useForm<FinalDetailsRequestDto>({
    resolver: CreateFinalDetailsValidator,
    mode: "all",
    defaultValues,
  });

  // const cifValue = watch("cifValue") || 0;
  const totalFobValue = watch("totalFobValue") || 0;
  const insuranceAmount = watch("insuranceAmount") || 0;
  const freight = watch("freight") || 0;

  useEffect(() => {
    const cifValue =
      Number(totalFobValue) + Number(insuranceAmount) + Number(freight);
    setValue("cifValue", cifValue);
  }, [totalFobValue, insuranceAmount, freight, setValue]);

  useEffect(() => {
    // Calculate CIF value
    const calculatedCif =
      Number(watch("totalFobValue") || 0) +
      Number(watch("insuranceAmount") || 0) +
      Number(watch("freight") || 0);

    setValue("cifValue", calculatedCif);

    // Convert to words and set amountInFigures
    const amountInWords = amountToWords(calculatedCif, currency.name);
    setValue("amountInWords", amountInWords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    watch("totalFobValue"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    watch("insuranceAmount"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    watch("freight"),
    setValue,
  ]);

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.TermsOfPayment, COLLECTION_TYPES.DeliveryMode],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    console.log("data", data);
    try {
      await saveMutation({
        purchaseOrderId: purchaseOrderId,
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
      // dispatch(commonActions.setTriggerReload());
      onSuccess();
      reset();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase Order Final Details</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              <span>Save</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

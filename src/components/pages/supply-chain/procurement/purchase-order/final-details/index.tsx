import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
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
  isErrorResponse,
} from "@/lib";
import {
  PostApiV1CollectionApiArg,
  usePostApiV1CollectionMutation,
  usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

import Form from "./form";
import { CreateFinalDetailsValidator, FinalDetailsRequestDto } from "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  purchaseOrderId: string;
  onSuccess: () => void;
}
const Create = ({ isOpen, onClose, onSuccess, purchaseOrderId }: Props) => {
  const dispatch = useDispatch();
  const [saveMutation, { isLoading }] =
    usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FinalDetailsRequestDto>({
    resolver: CreateFinalDetailsValidator,
    mode: "all",
    // defaultValues,
  });

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
  ]?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];

  const deliveryMode = collectionResponse?.[COLLECTION_TYPES.DeliveryMode]?.map(
    (uom) => ({
      label: uom.name,
      value: uom.id,
    }),
  ) as Option[];

  const onSubmit = async (data: FinalDetailsRequestDto) => {
    try {
      await saveMutation({
        purchaseOrderId: purchaseOrderId,
        createPurchaseOrderRequest: {
          deliveryModeId: data.deliveryMode.value,
          termsOfPaymentId: data.termsOfPayment.value,
          totalFobValue: data.totalFobValue,
          totalCifValue: data.cifValue,
          seaFreight: data.freight,
          amountInFigures: data.amountInFigures,
          estimatedDeliveryDate: data.estimatedDeliveryDate.toISOString(),
        },
      });
      dispatch(commonActions.setTriggerReload());
      reset();
      onSuccess();
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
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              {isLoading ? (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              ) : (
                <Icon name="Plus" className="h-4 w-4" />
              )}
              <span>Save</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

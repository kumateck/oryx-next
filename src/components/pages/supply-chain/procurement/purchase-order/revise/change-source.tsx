import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import {
  convertToSmallestUnit,
  ErrorResponse,
  InputTypes,
  isErrorResponse,
  Option,
  RevisionType,
  SupplierType,
  Units,
} from "@/lib";
import React from "react";
import {
  CreateSuppliersValidator,
  RevisionRequestDto,
  SuppliersRequestDto,
} from "./type";
import { FormWizard } from "@/components/form-inputs";
import { Control, useForm } from "react-hook-form";
import {
  CreateSourceRequisitionRequest,
  PostApiV1RequisitionSourceApiArg,
  ProcurementSource,
  useGetApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialIdQuery,
  useGetApiV1ProcurementSupplierByMaterialIdAndTypeQuery,
  usePostApiV1RequisitionSourceMutation,
  usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { useParams } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: RevisionRequestDto;
  sourceType: SupplierType;
}
const ChangeSource = ({ isOpen, onClose, details, sourceType }: Props) => {
  const { id } = useParams();
  const purchaseOrderId = id as string;
  const [saveChangesMutation, { isLoading: isSaving }] =
    usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseMutation();

  const { data: requisitionId } =
    useGetApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialIdQuery(
      {
        purchaseOrderId,
        materialId: details.material.value,
      },
    );

  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SuppliersRequestDto>({
    resolver: CreateSuppliersValidator,
    mode: "all",
  });
  const [saveMutation, { isLoading }] = usePostApiV1RequisitionSourceMutation();
  const onSubmit = async (data: SuppliersRequestDto) => {
    try {
      const payload = {
        requisitionId,
        items: [
          {
            source: Number(sourceType) as ProcurementSource,
            materialId: details.material.value,
            quantity: convertToSmallestUnit(
              details.quantity,
              details.uoM.label as Units,
            ).value,
            suppliers: data.suppliers?.map((item) => {
              return {
                supplierId: item?.value,
              };
            }),
            uoMId: details.uoM.value,
          },
        ],
      } satisfies CreateSourceRequisitionRequest;
      // console.log(payload, "payload");
      await saveMutation({
        createSourceRequisitionRequest: payload,
      } as PostApiV1RequisitionSourceApiArg).unwrap();
      await saveChangesMutation({
        purchaseOrderId,
        body: [
          {
            uoMId: details.uoM.value,
            materialId: details.material?.value,
            currencyId: details.currency?.value,
            type: RevisionType.ChangeSource,
            quantity: details.quantity,
            price: details.price,
            purchaseOrderItemId: details.purchaseOrderItemId,
          },
        ],
      }).unwrap();
      toast.success("Sourcing created successfully");
      dispatch(commonActions.setTriggerReload());
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const { data } = useGetApiV1ProcurementSupplierByMaterialIdAndTypeQuery({
    materialId: details.material.value,
    type: sourceType as SupplierType,
  });
  const options = data?.map((supplier) => ({
    label: supplier.name,
    value: supplier.id,
  })) as Option[];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Change Supplier Source to{" "}
            {sourceType === SupplierType.Foreign ? "Foreign" : "Local"}
          </DialogTitle>
          <DialogDescription>
            Material: {details.material.label}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormWizard
            config={[
              {
                label: "Suppliers",
                control: control as unknown as Control,
                type: InputTypes.MULTI,
                name: `suppliers`,
                required: true,
                placeholder: "Select Suppliers",
                errors,
                options,
              },
            ]}
          />
          <DialogFooter>
            <Button variant={"outline"} type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button>
              {(isLoading || isSaving) && (
                <Icon name="LoaderCircle" className="animate-spin" />
              )}
              <span>Save Changes</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeSource;

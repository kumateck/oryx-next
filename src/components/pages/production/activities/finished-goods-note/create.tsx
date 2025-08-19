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
  AuditModules,
  COLLECTION_TYPES,
  ErrorResponse,
  Option,
  isErrorResponse,
} from "@/lib";
import {
  PostApiV1CollectionApiArg,
  useGetApiV1CollectionUomQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1ProductionScheduleFinishedGoodsTransferNoteMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

import Form from "./form";
import {
  CreateFinishedGoodsNoteValidator,
  FinishedGoodsNoteRequestDto,
} from "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  scheduleId: string;
  productId: string;
  batchManufacturingRecordId: string;
  productionActivityStepId: string;
  defaultValues: FinishedGoodsNoteRequestDto;
}
const Create = ({
  isOpen,
  onClose,
  defaultValues,
  batchManufacturingRecordId,
  productionActivityStepId,
}: Props) => {
  const dispatch = useDispatch();
  const [saveMutation, { isLoading }] =
    usePostApiV1ProductionScheduleFinishedGoodsTransferNoteMutation();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FinishedGoodsNoteRequestDto>({
    resolver: CreateFinishedGoodsNoteValidator,
    mode: "all",
    defaultValues,
  });
  const { data: packingUomResponse } = useGetApiV1CollectionUomQuery({
    isRawMaterial: false,
  });
  const packingUomOptions = packingUomResponse?.map((uom) => ({
    label: uom.symbol,
    value: uom.id,
  })) as Option[];

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.PackageStyle],
      module: AuditModules.general.name,
      subModule: AuditModules.general.collection,
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const packingStyleOptions = collectionResponse?.[
    COLLECTION_TYPES.PackageStyle
  ]?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];

  const onSubmit = async (data: FinishedGoodsNoteRequestDto) => {
    try {
      await saveMutation({
        module: AuditModules.production.name,
        subModule: AuditModules.production.goodsReceivedNotes,
        createFinishedGoodsTransferNoteRequest: {
          batchManufacturingRecordId,
          packageStyleId: data.packageStyle.value,
          productionActivityStepId: productionActivityStepId,
          quantityPerPack: Number(data.quantityPerPack),
          totalQuantity: Number(data.totalQuantityTransfer),
          uoMId: data.uom.value,
          qarNumber: data.qarNumber,
        },
      }).unwrap();
      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Finished Goods Transfer Number</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Form
            register={register}
            errors={errors}
            control={control}
            packingUomOptions={packingUomOptions}
            packingStyleOptions={packingStyleOptions}
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

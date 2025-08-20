import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { cn, CODE_SETTINGS } from "@/lib";
import { useFieldArray, useForm } from "react-hook-form";
import { MemoArdForm } from "./form";
import {
  MemoDtoRead,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePostApiV1ProcurementInventoryMemoTrustedVendorMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import ThrowErrorMessage from "@/lib/throw-error";
import { CreateMemoSchema, CreateMemoSchemaValidator } from "./types";
import { ListsTable } from "@/shared/datatable";
import { columns } from "./columns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: MemoDtoRead;
};

export const Create = ({ isOpen, onClose, data }: Props) => {
  const dispatch = useDispatch();

  const [createMemo, { isLoading }] =
    usePostApiV1ProcurementInventoryMemoTrustedVendorMutation();
  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateMemoSchema>({
    resolver: CreateMemoSchemaValidator,
    defaultValues: {
      body: data?.items?.map((item) => ({
        itemId: item.id as string,
        marketRequisitionVendorId: item?.vendor?.id as string,
        quantity: item?.quantity ?? 0,
        uoMId: item?.uoM?.id as string,
        vendorQuotationItemId: item?.vendor?.id as string,
        totalValue: item?.itemValue ?? 0,
        termsOfPayment: item?.termsOfPayment ?? "",
      })) as CreateMemoSchema["body"],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "body",
  });

  //fuction fro creating material analytical raw data
  const onSubmit = async (data: CreateMemoSchema) => {
    try {
      const payload = data.body.map((item) => ({
        itemId: item.itemId,
        marketRequisitionVendorId: item.marketRequisitionVendorId,
        quantity: item.quantity,
        uoMId: item.uoMId,
        vendorQuotationItemId: item.vendorQuotationItemId,
      }));
      const id = await createMemo({
        body: payload,
      }).unwrap();
      dispatch(commonActions.setTriggerReload());
      toast.success("Inventory created successfully");
      reset();
      onClose();
      if (id && data.attachments.length > 0) {
        const formData = new FormData();
        const attachmentsArray = Array.isArray(data.attachments)
          ? data.attachments
          : Array.from(data.attachments); // Convert FileList to an array
        attachmentsArray.forEach((attachment: File) => {
          formData.append("files", attachment, attachment.name);
        });

        await uploadAttachment({
          modelType: CODE_SETTINGS.modelTypes.Item,
          modelId: id as string,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle>Create Vendor Memo</DialogTitle>
          <div>
            <div className="flex items-center gap-2">
              <span>Memo Code:</span>
              <span className="font-semibold">{data?.code}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Vendor Name:</span>
              <span className="font-semibold">{`${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`}</span>
            </div>
          </div>
          <div>
            <ListsTable data={data?.items || []} columns={columns} />
            <div className="gap-2">
              <span>Total:</span>
              <span className="font-semibold">{data.totalValue}</span>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <MemoArdForm
            fields={fields}
            errors={errors}
            register={register}
            control={control}
          />
          <DialogFooter>
            <DialogFooter className="justify-end gap-4 py-6">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                type="submit"
                className="flex items-center gap-2"
              >
                <Icon
                  name={
                    isLoading || isUploadingAttachment ? "LoaderCircle" : "Plus"
                  }
                  className={cn("h-4 w-4", {
                    "animate-spin": isLoading,
                  })}
                />
                <span>Save</span>
              </Button>
            </DialogFooter>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

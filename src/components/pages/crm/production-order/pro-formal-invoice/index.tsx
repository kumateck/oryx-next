import {
  Dialog,
  DialogFooter,
  DialogHeader,
  Button,
  DialogContent,
  DialogTitle,
  Icon,
} from "@/components/ui";
import ProFormalInvoiceForm from "./form";
import { useForm, useFieldArray } from "react-hook-form";
import { CreateInvoiceSchema, CreateInvoiceSchemaValidator } from "./type";
import { isErrorResponse, ErrorResponse } from "@/lib";
import { usePostApiV1ProductionOrdersProformaInvoicesMutation } from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: CreateInvoiceSchema;
}
function CreateProFormalInvoice({ isOpen, onClose, details }: Props) {
  const [createProFormalInvoice, { isLoading }] =
    usePostApiV1ProductionOrdersProformaInvoicesMutation();

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateInvoiceSchema>({
    resolver: CreateInvoiceSchemaValidator,
    defaultValues: details,
  });

  const { fields } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = async (data: CreateInvoiceSchema) => {
    try {
      await createProFormalInvoice({
        createProformaInvoice: {
          productionOrderId: data.productionOrderId,
          products: data.products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      }).unwrap();
      toast.success("Pro-formal invoice created successfully");
      onClose();
      reset();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Error occurred while creating pro-formal invoice. Try again later.",
      );
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Pro-Formal Invoice</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProFormalInvoiceForm
            control={control}
            fields={fields}
            register={register}
            errors={errors}
          />
          <DialogFooter>
            <Button disabled={isLoading} type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex items-center gap-1"
              type="submit"
              disabled={isLoading}
            >
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={isLoading ? "animate-spin" : ""}
              />
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProFormalInvoice;

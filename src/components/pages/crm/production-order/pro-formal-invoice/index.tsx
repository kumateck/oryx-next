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
import { useForm } from "react-hook-form";
import { CreateInvoiceSchema, CreateInvoiceSchemaValidator } from "./type";
import { isErrorResponse, ErrorResponse, Option } from "@/lib";
import { usePostApiV1ProductionOrdersProformaInvoicesMutation } from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productionsOrderOpt: Option[];
}
function CreateProFormalInvoice({
  isOpen,
  onClose,
  productionsOrderOpt,
}: Props) {
  const [CreateProFormalInvoice, { isLoading }] =
    usePostApiV1ProductionOrdersProformaInvoicesMutation();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateInvoiceSchema>({
    resolver: CreateInvoiceSchemaValidator,
  });

  const onSubmit = (data: CreateInvoiceSchema) => {
    try {
      CreateProFormalInvoice({
        createProformaInvoice: {
          productionOrderId: data.productionOrderId.value,
          products: data.products.map((product) => ({
            productId: product.productId.value,
            quantity: product.quantity,
          })),
        },
      });
    } catch (error) {
      console.error(error);
      console.log(error);
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
            productionsOrderOpt={productionsOrderOpt}
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

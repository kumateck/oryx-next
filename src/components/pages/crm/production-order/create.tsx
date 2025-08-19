import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Icon,
} from "@/components/ui";
import { useEffect } from "react";
import Form from "./form";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CreateProductionSchemaOrders,
  CreateProductionSchemaOrdersValidator,
} from "./types";
import {
  useLazyGetApiV1CustomersQuery,
  useLazyGetApiV1ProductQuery,
  usePostApiV1ProductionOrdersMutation,
  useLazyGetApiV1ServicesQuery,
} from "@/lib/redux/api/openapi.generated";
import { isErrorResponse, ErrorResponse, Option, CODE_SETTINGS } from "@/lib";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { toast } from "sonner";
import { useCodeGen } from "@/lib/code-gen";

interface Props {
  open: boolean;
  onClose: () => void;
}
function CreateProductionOrder({ open, onClose }: Props) {
  const [loadCustomers, { isLoading: isLoadingCustomers }] =
    useLazyGetApiV1CustomersQuery();
  const [loadProducts, { data: products, isLoading: isLoadingProducts }] =
    useLazyGetApiV1ProductQuery();

  const [createProductionOrder, { isLoading: isCreating }] =
    usePostApiV1ProductionOrdersMutation();
  const [loadCodeModelCount, { isLoading: isLoadingCode }] =
    useLazyGetApiV1ServicesQuery();

  const dispatch = useDispatch();

  const loadDataOrSearchFCustomer = async (
    searchQuery: string,
    page: number,
  ) => {
    const res = await loadCustomers({
      searchQuery,
      page,
    }).unwrap();
    const response = {
      options: res?.data?.map((customer) => ({
        label: customer?.name,
        value: customer.id,
      })) as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };
  const loadDataOrSearchFProducts = async (
    searchQuery: string,
    page: number,
  ) => {
    const res = await loadProducts({
      searchQuery,
      page,
    }).unwrap();
    const response = {
      options: res?.data?.map((product) => ({
        label: product?.name,
        value: product.id,
      })) as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };
  useEffect(() => {
    append({
      totalOrderQuantity: 0,
      productId: {
        label: "",
        value: "",
      },
      price: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    handleSubmit,
    register,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateProductionSchemaOrders>({
    resolver: CreateProductionSchemaOrdersValidator,
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: "products",
  });

  //code configuration
  const setCodeToInput = (code: string) => {
    setValue("code", code ?? "");
  };
  const fetchCount = async () => {
    console.log("generating code now");
    const countResponse = await loadCodeModelCount({}).unwrap();
    return { totalRecordCount: countResponse?.totalRecordCount };
  };
  const { regenerateCode } = useCodeGen(
    CODE_SETTINGS.modelTypes.ProductionOrder,
    fetchCount,
    setCodeToInput,
  );
  useEffect(() => {
    regenerateCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: CreateProductionSchemaOrders) => {
    // Handle form submission
    try {
      await createProductionOrder({
        createProductionOrderRequest: {
          customerId: data.customerId.value,
          code: data.code,
          products: data.products.map((product) => ({
            productId: product.productId.value,
            totalOrderQuantity: Number(product.totalOrderQuantity),
          })),
        },
      }).unwrap();
      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
      toast.success("Production order created successfully");
    } catch (error) {
      console.log(error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  const handleProductChange = (index: number, selected: string) => {
    const product = products?.data?.find((p) => p.id === selected);
    if (product) {
      setValue(`products.${index}.price`, product?.price ?? 0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Product Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form
            append={append}
            isLoadingCode={isLoadingCode}
            remove={remove}
            fields={fields}
            fetchProducts={loadDataOrSearchFProducts}
            fetchCustomers={loadDataOrSearchFCustomer}
            loadingCustomers={isLoadingCustomers}
            loadingProducts={isLoadingProducts}
            control={control}
            register={register}
            handleProductChange={handleProductChange}
            errors={errors}
          />
          <DialogFooter>
            <Button disabled={isCreating} type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isCreating} type="submit">
              {isCreating ? (
                <Icon name="LoaderCircle" className="animate-spin h-4 w-4" />
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
}

export default CreateProductionOrder;

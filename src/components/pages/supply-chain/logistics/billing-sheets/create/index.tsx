"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import {
  CODE_SETTINGS,
  COLLECTION_TYPES,
  ErrorResponse,
  GenerateCodeOptions,
  Option,
  cn,
  generateCode,
  isErrorResponse,
} from "@/lib";
import {
  CreateBillingSheetRequest,
  NamingType,
  PostApiV1CollectionApiArg,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useGetApiV1ProcurementShipmentInvoiceQuery,
  useLazyGetApiV1CollectionByItemTypeQuery,
  useLazyGetApiV1ProcurementBillingSheetQuery,
  useLazyGetApiV1ProcurementShipmentInvoiceByIdQuery, // usePostApiV1CollectionByItemTypeMutation,
  usePostApiV1CollectionMutation,
  usePostApiV1ProcurementBillingSheetMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import BillingSheetForm from "./form";
import {
  BillingSheetRequestDto,
  CreateBillingSheetValidator,
  MaterialRequestDto,
} from "./types";

const CreateBillingSheet = () => {
  const router = useRouter();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<BillingSheetRequestDto>({
    resolver: CreateBillingSheetValidator,
    mode: "all",
  });

  const [materialLists, setMaterialLists] = useState<MaterialRequestDto[]>([]);
  const [invoiceOptions, setInvoiceOptions] = useState<Option[]>([]);
  const searchParams = useSearchParams();
  const invoiceIdFromQuery = searchParams.get("invoiceId");
  const [loadInvoice, { data: invoiceData }] =
    useLazyGetApiV1ProcurementShipmentInvoiceByIdQuery();
  const [loadDataforCodes] = useLazyGetApiV1ProcurementBillingSheetQuery();
  const [loadPackageCollection, { data: packingStyleResponse }] =
    useLazyGetApiV1CollectionByItemTypeQuery();
  const { data: invoicesResponse } = useGetApiV1ProcurementShipmentInvoiceQuery(
    {
      page: 1,
      pageSize: 100,
    },
  );
  const dispatch = useDispatch();
  // const [charge, setCharge] = useState('')
  const [createBillingSheet, { isLoading }] =
    usePostApiV1ProcurementBillingSheetMutation();
  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();
  // const [addCollectionItem] =
  //   usePostApiV1CollectionByItemTypeMutation();
  const { data: codeConfig } =
    useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
      modelType: CODE_SETTINGS.modelTypes.BillingSheet,
    });

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.Charge],
    } as PostApiV1CollectionApiArg).unwrap();

    loadPackageCollection({
      itemType: COLLECTION_TYPES.PackageStyle,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const createCharge = async () => {

  //     await addCollectionItem({
  //       createItemRequest: {
  //         name: charge,

  //       },
  //       itemType: COLLECTION_TYPES.Charge,
  //     }).unwrap();
  //   };

  const chargesOptions = collectionResponse?.[COLLECTION_TYPES.Charge]?.map(
    (charge) => ({
      label: charge.name,
      value: charge.id,
    }),
  ) as Option[];

  const packingStyleOptions = packingStyleResponse?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];

  const selectedInvoiceId = watch("invoiceId");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "charges",
  });
  const charges = useWatch<BillingSheetRequestDto>({
    control,
    name: "charges",
  });
  const totalCost = charges?.reduce((acc, charge) => {
    const cost = Number(charge.cost);
    return acc + (isNaN(cost) ? 0 : cost);
  }, 0);
  const supplierId = invoiceData?.supplier?.id ?? "";

  useEffect(() => {
    loadCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeConfig]);
  const loadCodes = async () => {
    //loadDataforCodes
    const generatePayload: GenerateCodeOptions = {
      maxlength: Number(codeConfig?.maximumNameLength),
      minlength: Number(codeConfig?.minimumNameLength),
      prefix: codeConfig?.prefix as string,
      type: codeConfig?.namingType as NamingType,
    };
    const productsResponse = await loadDataforCodes({
      page: 1,
      pageSize: 1,
    }).unwrap();

    const products = productsResponse?.totalRecordCount ?? 0;

    generatePayload.seriesCounter = products + 1;
    const code = await generateCode(generatePayload);
    setValue("code", code);
  };

  useEffect(() => {
    if (invoicesResponse?.data) {
      const options = invoicesResponse.data.map((item) => ({
        label: item.code as string,
        value: item.id as string,
      }));
      setInvoiceOptions(options);
    }
  }, [invoicesResponse]);

  const currencySymbol = invoicesResponse?.data?.map(
    (item) => item.supplier?.currency?.symbol as string,
  );
  const currencyData = invoicesResponse?.data?.map(
    (item) => item.supplier?.currency?.id as string,
  );

  const currency = currencySymbol?.[0] || "";
  const currencyId = currencyData?.[0] || "";

  useEffect(() => {
    const fetchInitialInvoice = async () => {
      if (invoiceIdFromQuery) {
        try {
          const res = await loadInvoice({ id: invoiceIdFromQuery }).unwrap();

          const exists = invoiceOptions.some((opt) => opt.value === res.id);
          if (!exists) {
            setInvoiceOptions((prev: Option[]) => [
              ...prev,
              { value: res.id as string, label: res.code as string },
            ]);
          }

          setValue("invoiceId", {
            value: res.id as string,
            label: res.code as string,
          });

          const payload = res.items?.map((item) => ({
            materialId: item.material?.id as string,
            uomId: item.uoM?.id as string,
            expectedQuantity: item.expectedQuantity as number,
            materialName: item.material?.name as string,
            uomName: item.uoM?.symbol as string,
            receivedQuantity: item.receivedQuantity as number,
            reason: item.reason as string,
            code: item.material?.code as string,
            costPrice: item.price?.toString(),
            manufacturer: item.manufacturer?.name as string,
            purchaseOrderCode: item?.purchaseOrder?.code as string,
            purchaseOrderId: item?.purchaseOrder?.id as string,
          })) as MaterialRequestDto[];
          setMaterialLists(payload);
        } catch {
          toast.error("Failed to load invoice");
        }
      }
    };
    fetchInitialInvoice();
  }, [invoiceIdFromQuery, loadInvoice, setValue, invoiceOptions]);

  useEffect(() => {
    if (selectedInvoiceId?.value) {
      loadInvoiceDetailsHandler(selectedInvoiceId.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInvoiceId]);

  const loadInvoiceDetailsHandler = async (id: string) => {
    const res = await loadInvoice({
      id,
    }).unwrap();

    const payload = res?.items?.map((item) => ({
      materialId: item.material?.id as string,
      uomId: item.uoM?.id as string,
      expectedQuantity: item.expectedQuantity as number,
      materialName: item.material?.name as string,
      uomName: item.uoM?.symbol as string,
      receivedQuantity: item.receivedQuantity as number,
      reason: item.reason as string,
      code: item.material?.code as string,
      costPrice: item.price?.toString(),
      manufacturer: item.manufacturer?.name as string,
      purchaseOrderCode: item?.purchaseOrder?.code as string,
      purchaseOrderId: item?.purchaseOrder?.id as string,
    })) as MaterialRequestDto[];
    setMaterialLists(payload);
  };

  const onSubmit = async (data: BillingSheetRequestDto) => {
    const payload = {
      code: data.code,
      billOfLading: data.billOfLading,
      expectedArrivalDate: data.expectedArrivalDate.toISOString(),
      freeTimeDuration: data.freeTimeDuration,
      containerNumber: data.containerNumber,
      numberOfPackages: data.numberOfPackages,
      packageDescription: data.numberOfPackages,
      freeTimeExpiryDate: data.freeTimeExpiryDate.toISOString(),
      demurrageStartDate: data.demurrageStartDate.toISOString(),
      invoiceId: data.invoiceId.value,
      supplierId: supplierId,
      containerPackageStyleId: data.uom.value,
      charges: data.charges.map((charge) => ({
        id: charge.description.value,
        amount: charge.cost,
        currencyId: currencyId,
      })),
    } satisfies CreateBillingSheetRequest;

    try {
      await createBillingSheet({ createBillingSheetRequest: payload }).unwrap();
      toast.success("Billing Sheet Created");
      reset();
      dispatch(commonActions.setTriggerReload());
      router.back();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <ScrollablePageWrapper>
      <PageTitle title="Create Billing Sheet" />
      <form className="mt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="secondary" onClick={router.back}>
            Cancel
          </Button>

          <Button variant={"default"} className="flex items-center gap-2">
            <Icon
              name={isLoading ? "LoaderCircle" : "Plus"}
              className={cn("h-4 w-4", {
                "animate-spin": isLoading,
              })}
            />
            <span>Create</span>{" "}
          </Button>
        </div>
        <BillingSheetForm
          register={register}
          control={control}
          errors={errors}
          fields={fields}
          remove={remove}
          append={append}
          invoiceOptions={invoiceOptions}
          packingStyleOptions={packingStyleOptions}
          chargesOptions={chargesOptions}
          materialLists={materialLists}
          setMaterialLists={setMaterialLists}
          currency={currency}
          totalCost={totalCost}
          // createCharge={createCharge}
        />
      </form>
    </ScrollablePageWrapper>
  );
};

export default CreateBillingSheet;

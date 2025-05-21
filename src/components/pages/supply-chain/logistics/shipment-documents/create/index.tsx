"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button, Card, CardContent, Icon } from "@/components/ui";
import {
  CODE_SETTINGS,
  ErrorResponse,
  GenerateCodeOptions,
  Option,
  PermissionKeys,
  Section,
  SupplierType,
  findRecordWithFullAccess,
  generateCode,
  isErrorResponse,
} from "@/lib";
import {
  CreateShipmentDocumentRequest,
  NamingType,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  PostApiV1ProcurementShipmentDocumentApiArg,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useGetApiV1ProcurementShipmentInvoiceUnattachedQuery,
  useLazyGetApiV1ProcurementShipmentDocumentQuery,
  useLazyGetApiV1ProcurementShipmentInvoiceByIdQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePostApiV1ProcurementShipmentDocumentMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { CreateShipmentValidator, ShipmentRequestDto } from "../types";
import DocumentForm from "./form";
import TableForData from "./table";
import { MaterialRequestDto } from "./type";
import { useSelector } from "@/lib/redux/store";
import NoAccess from "@/shared/no-access";

const Page = () => {
  const router = useRouter();
  const [saveMutation, { isLoading }] =
    usePostApiV1ProcurementShipmentDocumentMutation();
  const [loadDataforCodes] = useLazyGetApiV1ProcurementShipmentDocumentQuery();

  const { data: codeConfig } =
    useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
      modelType: CODE_SETTINGS.modelTypes.ShipmentDocument,
    });
  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();

  const [loadInvoice] = useLazyGetApiV1ProcurementShipmentInvoiceByIdQuery();

  const { data: invoicesResponse } =
    useGetApiV1ProcurementShipmentInvoiceUnattachedQuery({});

  const invoiceOptions = invoicesResponse
    ?.filter((s) => s.supplier?.type === SupplierType.Foreign)
    ?.map((item) => {
      return {
        label: item.code,
        value: item?.id,
      };
    }) as Option[];

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ShipmentRequestDto>({
    resolver: CreateShipmentValidator,
    mode: "all",
  });

  const invoiceIdOption = useWatch({
    control,
    name: "shipmentInvoiceId",
  });

  useEffect(() => {
    if (invoiceIdOption?.value) {
      loadInvoiceDetailsHandler(invoiceIdOption.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceIdOption]);

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
  const onSubmit = async (data: ShipmentRequestDto) => {
    const payload = {
      code: data.code,
      shipmentInvoiceId: data.shipmentInvoiceId.value,
    } satisfies CreateShipmentDocumentRequest;
    try {
      const shipmentId = await saveMutation({
        createShipmentDocumentRequest: payload,
      } as PostApiV1ProcurementShipmentDocumentApiArg).unwrap();

      if (shipmentId) {
        const formData = new FormData();
        // Ensure attachments are an array
        const attachmentsArray = Array.isArray(data.attachments)
          ? data.attachments
          : Array.from(data.attachments); // Convert FileList to an array

        attachmentsArray.forEach((attachment: File) => {
          formData.append("files", attachment, attachment.name);
        });

        await uploadAttachment({
          modelType: CODE_SETTINGS.modelTypes.ShipmentDocument,
          modelId: shipmentId,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
      toast.success("Shipment Document Created");
      router.push("/logistics/shipment-documents");
    } catch (error) {
      console.log(error, "errors");
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const [materialLists, setMaterialLists] = useState<MaterialRequestDto[]>([]);

  //Check Permision
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access
  const hasAccess = findRecordWithFullAccess(
    permissions,
    PermissionKeys.logistics.createBillingSheet,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <ScrollablePageWrapper className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex w-full items-center justify-between space-y-4">
          <PageTitle title="Create Shipment Document" />
          <div>
            <Button type="button" variant="secondary" onClick={router.back}>
              Cancel
            </Button>
            <Button>
              {(isLoading || isUploadingAttachment) && (
                <Icon name="LoaderCircle" className="animate-spin" />
              )}
              <span>Save Changes</span>
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className="p-5">
            <DocumentForm
              control={control}
              register={register}
              errors={errors}
              invoiceOptions={invoiceOptions}
            />
          </CardContent>
        </Card>
      </form>
      <div className="w-full space-y-4">
        <PageTitle title="Invoice Items" />
        <div className="">
          <TableForData lists={materialLists} setItemLists={setMaterialLists} />
        </div>
      </div>
    </ScrollablePageWrapper>
  );
};

export default Page;

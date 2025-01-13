"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import { Button, Card, CardContent, Icon } from "@/components/ui";
import {
  CODE_SETTINGS,
  ErrorResponse,
  GenerateCodeOptions,
  InputTypes,
  Option,
  PurchaseOrderStatusList,
  generateCode,
  isErrorResponse,
} from "@/lib";
import {
  CreateShipmentDocumentRequest,
  NamingType,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  PostApiV1ProcurementShipmentDocumentApiArg,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useGetApiV1ProcurementPurchaseOrderQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePostApiV1ProcurementShipmentDocumentMutation,
  usePostApiV1ProcurementShipmentInvoiceMutation,
} from "@/lib/redux/api/openapi.generated";

import { CreateManufacturerValidator, ShipmentRequestDto } from "../types";
import TableForData from "./table";
import { MaterialRequestDto } from "./type";

const Page = () => {
  const router = useRouter();
  const [saveMutation, { isLoading }] =
    usePostApiV1ProcurementShipmentDocumentMutation();
  const { data: codeConfig } =
    useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
      modelType: CODE_SETTINGS.modelTypes.ShipmentDocument,
    });
  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();
  const [saveShipmentInvoice, { isLoading: isSavingInvoice }] =
    usePostApiV1ProcurementShipmentInvoiceMutation();
  const { data: purchaseOrders } = useGetApiV1ProcurementPurchaseOrderQuery({
    pageSize: 1000,
    status: PurchaseOrderStatusList.Completed,
  });
  // console.log(isSavingInvoice)
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ShipmentRequestDto>({
    resolver: CreateManufacturerValidator,
    mode: "all",
  });

  const purchaseOrderOptions = purchaseOrders?.data?.map((item) => {
    return {
      label: item.supplier?.name,
      value: item?.id,
    };
  }) as Option[];

  const poOptions = useWatch({
    control,
    name: "purchaseOrderId",
  });

  useEffect(() => {
    if (poOptions?.value) {
      const PO = purchaseOrders?.data?.find(
        (item) => item.id === poOptions.value,
      );
      const payload = PO?.items?.map((item) => ({
        materialId: item.material?.id as string,
        uomId: item.uom?.id as string,
        expectedQuantity: item.quantity as number,
        materialName: item.material?.name as string,
        uomName: item.uom?.name as string,
        receivedQuantity: item.quantity as number,
        reason: "",
        code: item.material?.code as string,
        costPrice: item.price?.toString(),
      })) as MaterialRequestDto[];
      setMaterialLists(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poOptions]);

  useEffect(() => {
    const loadCodes = async () => {
      const generatePayload: GenerateCodeOptions = {
        maxlength: Number(codeConfig?.maximumNameLength),
        minlength: Number(codeConfig?.minimumNameLength),
        prefix: codeConfig?.prefix as string,
        type: codeConfig?.namingType as NamingType,
      };

      generatePayload.seriesCounter = 1;
      const code = await generateCode(generatePayload);
      setValue("code", code);
    };

    loadCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeConfig]);
  const onSubmit = async (data: ShipmentRequestDto) => {
    const payload = {
      code: data.code,
      invoiceNumber: data.invoiceNumber,
      purchaseOrderId: data.purchaseOrderId.value,
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

        await saveShipmentInvoice({
          createShipmentInvoice: {
            items: materialLists?.map((item) => ({
              materialId: item.materialId,
              expectedQuantity: item.expectedQuantity,
              // manufacturerId: item.manufacturerId,
              reason: item.reason,
              receivedQuantity: item.receivedQuantity,
              uoMId: item.uomId,
            })),
            shipmentDocumentId: shipmentId,
          },
        });
      }
      toast.success("Shipment Document Created");
      router.push("/logistics/shipment-documents");
    } catch (error) {
      console.log(error, "errors");
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const [materialLists, setMaterialLists] = useState<MaterialRequestDto[]>([]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full items-center justify-between space-y-4">
              <span className="text-xl font-semibold text-black">
                Create Shipment Document
              </span>
              <Button>
                {(isLoading || isUploadingAttachment || isSavingInvoice) && (
                  <Icon name="LoaderCircle" className="animate-spin" />
                )}
                <span>Save Changes</span>
              </Button>
            </div>
            <FormWizard
              className="grid w-full grid-cols-2 gap-x-10 space-y-0"
              fieldWrapperClassName="flex-grow"
              config={[
                {
                  register: { ...register("code") },
                  label: "Document Code",
                  readOnly: true,
                  required: true,
                  description: (
                    <span className="text-sm text-neutral-500">
                      You can’t change the document code
                    </span>
                  ),
                  placeholder: "Code will be generated",
                  type: InputTypes.TEXT,
                  errors: {
                    message: errors.code?.message,
                    error: !!errors.code,
                  },
                },
                {
                  label: "Vendor",
                  control,
                  type: InputTypes.SELECT,
                  name: "purchaseOrderId",
                  required: true,
                  placeholder: "Vendor",
                  options: purchaseOrderOptions,
                  errors: {
                    message: errors.purchaseOrderId?.message,
                    error: !!errors.purchaseOrderId,
                  },
                },
              ]}
            />
            <div className="grid w-full grid-cols-2 gap-x-10 space-y-0">
              <FormWizard
                config={[
                  {
                    register: { ...register("invoiceNumber") },
                    label: "Invoice Number",
                    placeholder: "Enter Invoice Number",
                    type: InputTypes.TEXT,
                    autoFocus: true,
                    required: true,
                    errors: {
                      message: errors.invoiceNumber?.message,
                      error: !!errors.invoiceNumber,
                    },
                  },
                ]}
              />
              {/* <Label>{supplier}</Label> */}
            </div>
            <div className="w-full">
              <FormWizard
                config={[
                  {
                    type: InputTypes.DRAGNDROP,
                    label: "Attach Documents",
                    name: `attachments`,
                    defaultValue: null,
                    control,
                    errors: {
                      message: errors.attachments?.message?.toString(),
                      error: !!errors.attachments,
                    },
                  },
                ]}
              />
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="w-full">
        <div>
          <span>Invoice Items</span>
        </div>
        <div className="space-y-2">
          <TableForData lists={materialLists} setItemLists={setMaterialLists} />
        </div>
      </div>
    </div>
  );
};

export default Page;

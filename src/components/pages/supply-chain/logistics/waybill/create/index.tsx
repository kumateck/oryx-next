"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import {
  CODE_SETTINGS,
  ErrorResponse,
  GenerateCodeOptions,
  Option,
  PermissionKeys,
  Section,
  findRecordWithFullAccess,
  generateCode,
  isErrorResponse,
} from "@/lib";
import {
  CreateShipmentDocumentRequest,
  NamingType,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  PostApiV1ProcurementWaybillApiArg,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useGetApiV1ProcurementShipmentInvoiceUnattachedQuery,
  useLazyGetApiV1ProcurementShipmentInvoiceByIdQuery,
  useLazyGetApiV1ProcurementWaybillQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePostApiV1ProcurementWaybillMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { MaterialRequestDto } from "../../shipment-documents/create/type";
import { WaybillRequestDto } from "../types";
import WaybillForm from "./form";
import { useSelector } from "@/lib/redux/store";
import NoAccess from "@/shared/no-access";

const Create = () => {
  const {
    control,
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WaybillRequestDto>({
    mode: "all",
    defaultValues: {
      shipmentInvoiceId: undefined,
      attachments: [],
    },
  });

  const [saveMutation, { isLoading }] =
    usePostApiV1ProcurementWaybillMutation();
  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();
  const [materialLists, setMaterialLists] = useState<MaterialRequestDto[]>([]);
  const { data: invoicesResponse } =
    useGetApiV1ProcurementShipmentInvoiceUnattachedQuery();
  const [loadDataforCodes] = useLazyGetApiV1ProcurementWaybillQuery();
  const { data: codeConfig } =
    useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
      modelType: CODE_SETTINGS.modelTypes.Waybill,
    });
  const invoiceOptions = invoicesResponse?.map((item) => {
    return {
      label: item.code,
      value: item?.id,
    };
  }) as Option[];

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

  const selectedInvoiceId = watch("shipmentInvoiceId");
  const router = useRouter();
  const [loadInvoice] = useLazyGetApiV1ProcurementShipmentInvoiceByIdQuery();

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

  const onSubmit = async (data: WaybillRequestDto) => {
    const payload = {
      code: data.code,
      shipmentInvoiceId: data.shipmentInvoiceId.value,
    } satisfies CreateShipmentDocumentRequest;
    try {
      const waybillId = await saveMutation({
        createShipmentDocumentRequest: payload,
      } as PostApiV1ProcurementWaybillApiArg).unwrap();

      if (waybillId) {
        const attachments = data.attachments || [];
        const attachmentsArray = Array.isArray(attachments)
          ? attachments
          : Array.from(attachments);

        if (attachmentsArray.length > 0) {
          const formData = new FormData();
          attachmentsArray.forEach((attachment: File) => {
            formData.append("files", attachment, attachment.name);
          });

          await uploadAttachment({
            modelType: CODE_SETTINGS.modelTypes.Waybill,
            modelId: waybillId,
            body: formData,
          } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
        }
      }

      toast.success("Waybill Created");
      router.push("/logistics/waybill");
    } catch (error) {
      console.error("Error creating waybill:", error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

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
    PermissionKeys.logistics.createWaybill,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }
  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <PageTitle title="Create Waybill" />

        <div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-end gap-2">
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
            <WaybillForm
              control={control}
              register={register}
              errors={errors}
              invoiceOptions={invoiceOptions}
              materialLists={materialLists}
              setMaterialLists={setMaterialLists}
            />
          </form>
        </div>
      </div>
    </ScrollablePageWrapper>
  );
};

export default Create;

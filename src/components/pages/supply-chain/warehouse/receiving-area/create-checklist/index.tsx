"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import {
  ChecklistBoolean,
  ErrorResponse,
  Option,
  SupplierStatus,
  Units,
  convertToLargestUnit,
  convertToSmallestUnit, // generateCode,
  isErrorResponse,
} from "@/lib";
import {
  ConsignmentCarrier as ConsignmentCarrierEnum,
  Intactness as IntactnessEnum,
} from "@/lib";
import {
  ConsignmentCarrier, // ConsignmentCarrier,
  CreateChecklistRequest,
  Intactness,
  MaterialKind,
  useGetApiV1CollectionUomQuery,
  useGetApiV1ProductQuery,
  useGetApiV1UserAuthenticatedQuery,
  useLazyGetApiV1WarehouseDistributedMaterialByIdQuery,
  usePostApiV1WarehouseChecklistMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import ChecklistForm, { OptionsUpdate } from "./form";
import { ChecklistRequestDto, CreateProductValidator } from "./types";

const CreateChecklist = () => {
  const { data: authUser } = useGetApiV1UserAuthenticatedQuery();
  // console.log(authUser, "authUser");
  const { id } = useParams();
  const distributedMaterialId = id as string;
  const {
    register,
    control,
    handleSubmit,
    // setValue,
    formState: { errors },
    reset,
  } = useForm<ChecklistRequestDto>({
    resolver: CreateProductValidator,
    mode: "all",
    defaultValues: {},
  });
  const router = useRouter();

  const [loadDetails] = useLazyGetApiV1WarehouseDistributedMaterialByIdQuery();

  // console.log(data, "data");
  // const distributedMaterial = data?.data?.find(
  //   (item) => item.id === distributedMaterialId,
  // );

  const [checklistMutation, { isLoading }] =
    usePostApiV1WarehouseChecklistMutation();

  // useEffect(() => {
  //   if (data?.data) {
  //     const distributedMaterial = data.data.find(
  //       (item) => item.id === distributedMaterialId,
  //     );
  //     if (distributedMaterial) {
  //       // reset({
  //       //   materialName: distributedMaterial.material?.name || "N/A",
  //       //   supplierStatus: distributedMaterial.supplier?.status || 0,
  //       //   invoiceNumber: distributedMaterial.shipmentInvoice?.code || "N/A",
  //       //   supplierName: distributedMaterial.supplier?.name || "N/A",
  //       //   manufacturerName: distributedMaterial.manufacturer?.name || "N/A",
  //       // });
  //     }
  //   }
  // }, [data, distributedMaterialId, reset]);

  useEffect(() => {
    handleLoadDetails(distributedMaterialId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distributedMaterialId]);

  const handleLoadDetails = async (id: string) => {
    try {
      const response = await loadDetails({ id }).unwrap();

      if (response) {
        const qty = response.quantity as number;
        const convertQty = convertToLargestUnit(
          qty,
          response?.uom?.symbol as Units,
        );
        const qtyPya = {
          quantity: convertQty.value,
          uom: convertQty.unit,
          uomId: response?.uom?.id as string,
        };
        setMaterialQty(qtyPya);
        reset({
          materialName: response.material?.name as string,
          materialId: response.material?.id as string,
          shipmentInvoiceId: response.shipmentInvoice?.id as string,
          supplierName: response.shipmentInvoice?.supplier?.name as string,
          supplierId: response.shipmentInvoice?.supplier?.id as string,
          materialKind: response.material?.kind as MaterialKind,
          supplierStatus:
            SupplierStatus[
              response.shipmentInvoice?.supplier?.status as SupplierStatus
            ],
          supplierStatusId: response.shipmentInvoice?.supplier?.status,
          certificateOfAnalysisDeliveredId:
            response.shipmentInvoice?.supplier?.status ===
            SupplierStatus.Approved
              ? ChecklistBoolean.Yes
              : ChecklistBoolean.No,
          certificateOfAnalysisDelivered:
            response.shipmentInvoice?.supplier?.status ===
            SupplierStatus.Approved
              ? ChecklistBoolean[ChecklistBoolean.Yes]
              : ChecklistBoolean[ChecklistBoolean.No],
          invoiceNumber: response.shipmentInvoice?.code as string,
          manufacturerName: response.materialItemDistributions?.[0]
            ?.shipmentInvoiceItem?.manufacturer?.name as string,
          manufacturerId: response.materialItemDistributions?.[0]
            ?.shipmentInvoiceItem?.manufacturer?.id as string,
        });
      }
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "batches",
  });

  // console.log(fields, `fields`);
  const { data: response } = useGetApiV1ProductQuery({
    page: 1,
    pageSize: 1000,
  });
  const [materialQty, setMaterialQty] = useState<{
    quantity: number;
    uom: string;
    uomId: string;
  }>();
  // console.log(materialQty, `materialQty`);
  // useEffect(() => {
  //   const total = fields.reduce((acc, curr) => {
  //     return (
  //       acc +
  //       Number(curr.quantityPerContainer) * Number(curr.numberOfContainers)
  //     );
  //   }, 0);
  //   const diff = materialQty - total;
  //   setMaterialQty(diff);
  // }, [fields.length]);

  const { data: uomResponse } = useGetApiV1CollectionUomQuery();

  // const uomOptions = uomResponse
  //   ?.filter((item) => item.isRawMaterial)
  //   ?.map((uom) => ({
  //     label: uom.symbol,
  //     value: uom.id,
  //   })) as Option[];

  const packingUomOptions = uomResponse
    // ?.filter((item) => !item.isRawMaterial)
    ?.map((uom) => ({
      label: uom.symbol,
      value: uom.id,
    })) as Option[];

  const checklistBooleanOptions: Option[] = [
    { label: "Yes", value: ChecklistBoolean.Yes.toString() },
    { label: "No", value: ChecklistBoolean.No.toString() },
  ];

  const checklistContainersOptions: Option[] = [
    { label: "Yes", value: IntactnessEnum.Yes.toString() },
    { label: "No", value: IntactnessEnum.No.toString() },
  ];

  const consignmentCarrierOptions: Option[] = [
    { label: "Good", value: ConsignmentCarrierEnum.Good.toString() },
    { label: "Bad", value: ConsignmentCarrierEnum.Bad.toString() },
  ];

  const products = response?.data || [];
  const productOptions = products.map((product) => ({
    label: product.name,
    value: product.id,
    uom: product.baseUoM?.symbol,
  })) as OptionsUpdate[];

  const onSubmit = async (data: ChecklistRequestDto) => {
    // if (!distributedMaterial) {
    //   toast.error("Distributed material not found");
    //   return;
    // }

    if (data.batches.length === 0) {
      toast.error("Please add at least one batch");
      return;
    }

    const warehouses = authUser?.department?.warehouses || [];
    const materialWarehouse = warehouses?.find(
      (item) => item.type === data.materialKind,
    );

    const initialLocationId = materialWarehouse?.id as string;

    if (!initialLocationId) {
      toast.error("Warehouse not found");
      return;
    }

    const payload: CreateChecklistRequest = {
      distributedRequisitionMaterialId: distributedMaterialId,
      materialId: data.materialId,
      checkedAt: data.date.toISOString(),
      shipmentInvoiceId: data.shipmentInvoiceId,
      supplierId: data.supplierId,
      manufacturerId: data.manufacturerId,
      certificateOfAnalysisDelivered:
        data.certificateOfAnalysisDeliveredId === ChecklistBoolean.Yes,
      visibleLabelling:
        data.visibleLabelingOfContainers.value ===
        ChecklistBoolean.Yes.toString(),

      intactnessStatus: parseInt(
        data.intactnessOfContainers.value,
      ) as unknown as Intactness,

      consignmentCarrierStatus: parseInt(
        data.conditionOfConsignmentCarrier.value,
      ) as unknown as ConsignmentCarrier,

      materialBatches: data.batches.map((batch) => ({
        batchNumber: batch.batchNumber,
        materialId: data.materialId,
        numberOfContainers: Number(batch.numberOfContainers),
        quantityPerContainer: convertToSmallestUnit(
          Number(batch.quantityPerContainer),
          materialQty?.uom as Units,
        ).value,
        containerUoMId: batch.numberOfContainersUom.value,
        totalQuantity:
          Number(batch.numberOfContainers) *
          convertToSmallestUnit(
            Number(batch.quantityPerContainer),
            materialQty?.uom as Units,
          ).value,
        initialLocationId, // Replace with actual location ID
        dateReceived: batch.manufacturingDate.toISOString(),
        uoMId: materialQty?.uomId,
        manufacturingDate: batch.manufacturingDate.toISOString(),
        expiryDate: batch.expiryDate.toISOString(),
        sampleWeights: batch?.weights
          ?.filter((weight) => weight.srNumber || weight.grossWeight)
          .map((weight) => ({
            srNumber: weight.srNumber || "",
            grossWeight: Number(weight.grossWeight) || 0,
          })),
      })),
    };

    try {
      await checklistMutation({ createChecklistRequest: payload }).unwrap();
      toast.success("Checklist created successfully");
      router.push("/warehouse/receiving-area");
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const onBack = () => {
    router.back();
  };
  return (
    <ScrollablePageWrapper>
      <PageWrapper>
        <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full items-center justify-between space-y-4">
            <div className="flex items-center gap-2">
              <Icon
                name="ArrowLeft"
                onClick={onBack}
                className="cursor-pointer"
              />

              <PageTitle title="Create Checklist" />
            </div>
            <div className="flex justify-end gap-4 px-12">
              <Button type="button" onClick={onBack} variant="outline">
                Cancel
              </Button>
              <Button type="submit">
                {isLoading ? (
                  <Icon name="LoaderCircle" className="animate-spin" />
                ) : (
                  <Icon name="Plus" />
                )}
                <span className="px-1"> Save </span>
              </Button>
            </div>
          </div>
          <ChecklistForm
            control={control}
            register={register}
            errors={errors}
            uomOptions={packingUomOptions}
            packingUomOptions={packingUomOptions}
            append={append}
            remove={remove}
            productOptions={productOptions}
            checklistBooleanOptions={checklistBooleanOptions}
            checklistContainersOptions={checklistContainersOptions}
            // defaultIntactnessOption={defaultIntactnessOption}
            consignmentCarrierOptions={consignmentCarrierOptions}
            fields={fields}
            qtyUnit={materialQty?.uom as Units}
            remainingQty={
              (materialQty?.quantity ?? 0) -
              fields.reduce((acc, curr) => {
                return (
                  acc +
                  Number(curr.quantityPerContainer) *
                    Number(curr.numberOfContainers)
                );
              }, 0)
            }
          />
        </form>
      </PageWrapper>
    </ScrollablePageWrapper>
  );
};

export default CreateChecklist;

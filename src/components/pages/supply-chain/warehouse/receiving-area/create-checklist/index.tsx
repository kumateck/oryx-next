"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import {
  ChecklistBoolean,
  ErrorResponse,
  Option, // generateCode,
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
  useGetApiV1CollectionUomQuery,
  useGetApiV1ProductQuery,
  useGetApiV1WarehouseByWarehouseIdDistributedRequisitionMaterialsQuery,
  usePostApiV1WarehouseChecklistMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";

import ChecklistForm, { OptionsUpdate } from "./form";
import { ChecklistRequestDto, CreateProductValidator } from "./types";

const CreateChecklist = () => {
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

  const { data } =
    useGetApiV1WarehouseByWarehouseIdDistributedRequisitionMaterialsQuery({
      warehouseId: "d959476f-7a2e-459a-b13b-9a41708c7299",
      page: 1,
      pageSize: 30,
    });

  const distributedMaterial = data?.data?.find(
    (item) => item.id === distributedMaterialId,
  );

  const [checklistMutation, { isLoading }] =
    usePostApiV1WarehouseChecklistMutation();

  useEffect(() => {
    if (data?.data) {
      const distributedMaterial = data.data.find(
        (item) => item.id === distributedMaterialId,
      );
      if (distributedMaterial) {
        reset({
          materialName: distributedMaterial.material?.name || "N/A",
          supplierStatus: distributedMaterial.supplier?.status || 0,
          invoiceNumber: distributedMaterial.shipmentInvoice?.code || "N/A",
          supplierName: distributedMaterial.supplier?.name || "N/A",
          manufacturerName: distributedMaterial.manufacturer?.name || "N/A",
        });
      }
    }
  }, [data, distributedMaterialId, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "batches",
  });

  const { data: response } = useGetApiV1ProductQuery({
    page: 1,
    pageSize: 1000,
  });

  const { data: uomResponse } = useGetApiV1CollectionUomQuery();

  const uomOptions = uomResponse
    ?.filter((item) => item.isRawMaterial)
    ?.map((uom) => ({
      label: uom.symbol,
      value: uom.id,
    })) as Option[];

  const packingUomOptions = uomResponse
    ?.filter((item) => !item.isRawMaterial)
    ?.map((uom) => ({
      label: uom.symbol,
      value: uom.id,
    })) as Option[];

  const checklistBooleanOptions: Option[] = [
    { label: "No", value: ChecklistBoolean.No.toString() },
    { label: "Yes", value: ChecklistBoolean.Yes.toString() },
  ];

  const checklistContainersOptions: Option[] = [
    { label: "No", value: IntactnessEnum.No.toString() },
    { label: "Yes", value: IntactnessEnum.Yes.toString() },
  ];

  const consignmentCarrierOptions: Option[] = [
    { label: "Bad", value: ConsignmentCarrierEnum.Bad.toString() },
    { label: "Good", value: ConsignmentCarrierEnum.Good.toString() },
  ];

  const defaultIntactnessOption = checklistContainersOptions.find(
    (option) => option.value === IntactnessEnum.Yes.toString(), // Change to No if you want No as the default
  );

  const products = response?.data || [];
  const productOptions = products.map((product) => ({
    label: product.name,
    value: product.id,
    uom: product.baseUoM?.symbol,
  })) as OptionsUpdate[];

  const onSubmit = async (data: ChecklistRequestDto) => {
    if (!distributedMaterial) {
      toast.error("Distributed material not found");
      return;
    }

    const payload: CreateChecklistRequest = {
      distributedRequisitionMaterialId: distributedMaterialId,
      materialId: distributedMaterial.material?.id,
      checkedAt: data.date.toISOString(),
      shipmentInvoiceId: distributedMaterial.shipmentInvoice?.id,
      supplierId: distributedMaterial.supplier?.id,
      manufacturerId: distributedMaterial.manufacturer?.id,
      certificateOfAnalysisDelivered:
        data.certificateOfAnalysisDelivered.value ===
        ChecklistBoolean.Yes.toString(),
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
        materialId: distributedMaterial.material?.id,
        totalQuantity:
          Number(batch.numberOfContainers) * Number(batch.quantityPerContainer),
        initialLocationId: "d959476f-7a2e-459a-b13b-9a41708c7299", // Replace with actual location ID
        dateReceived: batch.manufacturingDate.toISOString(),
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
      // router.push("/checklists");
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
            <span className="text-xl font-semibold text-black">
              Create Checklist
            </span>
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
            uomOptions={uomOptions}
            packingUomOptions={packingUomOptions}
            append={append}
            remove={remove}
            productOptions={productOptions}
            checklistBooleanOptions={checklistBooleanOptions}
            checklistContainersOptions={checklistContainersOptions}
            defaultIntactnessOption={defaultIntactnessOption}
            consignmentCarrierOptions={consignmentCarrierOptions}
            fields={fields}
          />
        </form>
      </PageWrapper>
    </ScrollablePageWrapper>
  );
};

export default CreateChecklist;

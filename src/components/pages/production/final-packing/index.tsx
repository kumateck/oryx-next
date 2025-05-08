"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import PageWrapper from "@/components/layout/wrapper";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  ErrorResponse,
  Units,
  cn,
  convertToLargestUnit,
  getSmallestUnit,
  isErrorResponse,
  routes,
} from "@/lib";
import {
  ProductionExtraPackingDto,
  useLazyGetApiV1ProductByProductIdQuery,
  useLazyGetApiV1ProductionScheduleActivityByProductionActivityIdQuery,
  useLazyGetApiV1ProductionScheduleByScheduleIdQuery,
  useLazyGetApiV1ProductionScheduleExtraPackingByProductbyProductionScheduleIdAndProductIdQuery,
  useLazyGetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdQuery,
  usePostApiV1ProductionScheduleFinalPackingMutation,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";

import MaterialForm from "./form";
import PackedForm from "./packed";
import {
  CreatePackingValidator,
  GroupedData,
  MaterialMatrix,
  PackingRequestDto,
  getMaterialSchema,
} from "./type";
import YieldPacking from "./yield";

const FinalPacking = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors: formErrors },
  } = useForm<PackingRequestDto>({
    resolver: CreatePackingValidator,
    mode: "all",
  });
  const { id } = useParams();
  const activityId = id as string;
  const [productId, setProductId] = useState<string>("");
  const [scheduleId, setScheduleId] = useState<string>("");
  const [currentStepId, setCurrentStepId] = useState<string>("");
  const [loadActivity, { isLoading: isLoadingActivity }] =
    useLazyGetApiV1ProductionScheduleActivityByProductionActivityIdQuery();
  const [loadProduct] = useLazyGetApiV1ProductByProductIdQuery();

  const [loadSchedule] = useLazyGetApiV1ProductionScheduleByScheduleIdQuery();
  const [finalPackingMutation, { isLoading: isLoadingSaveFinalPacking }] =
    usePostApiV1ProductionScheduleFinalPackingMutation();
  const [loadFinalPacking, { isLoading: isLoadingFinalPacking }] =
    useLazyGetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdQuery();
  const [loadExtraPacking, { isLoading: isLoadingExtraPacking }] =
    useLazyGetApiV1ProductionScheduleExtraPackingByProductbyProductionScheduleIdAndProductIdQuery();

  useEffect(() => {
    if (activityId) {
      handleFinalPacking(activityId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityId]);

  const [uomName, setUomName] = useState<Units>();
  const expectedYield =
    (useWatch<PackingRequestDto>({
      name: "expectedYield",
      control,
    }) as number) || 0;
  const packSize =
    (useWatch<PackingRequestDto>({
      name: "packSize",
      control,
    }) as number) || 0;
  const yieldTotalQuantityPacked =
    (useWatch<PackingRequestDto>({
      name: "yieldTotalQuantityPacked",
      control,
    }) as number) || 0;
  const leftOver =
    (useWatch<PackingRequestDto>({
      name: "leftOver",
      control,
    }) as number) || 0;

  const stabilitySamples =
    (useWatch<PackingRequestDto>({
      name: "stabilitySamples",
      control,
    }) as number) || 0;

  const retainedSamples =
    (useWatch<PackingRequestDto>({
      name: "retainedSamples",
      control,
    }) as number) || 0;
  const qualityControlAnalyticalSample =
    (useWatch<PackingRequestDto>({
      name: "qualityControlAnalyticalSample",
      control,
    }) as number) || 0;
  const totalNumberOfBottles =
    (useWatch<PackingRequestDto>({
      name: "totalNumberOfBottles",
      control,
    }) as number) || 0;

  useEffect(() => {
    const total =
      yieldTotalQuantityPacked +
      stabilitySamples +
      retainedSamples +
      qualityControlAnalyticalSample;
    setValue("totalNumberOfBottles", total);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    yieldTotalQuantityPacked,
    stabilitySamples,
    retainedSamples,
    qualityControlAnalyticalSample,
  ]);

  useEffect(() => {
    if (yieldTotalQuantityPacked > 0) {
      setValue(
        "totalGainOrLoss",
        Number(totalNumberOfBottles) - Number(expectedYield),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expectedYield, yieldTotalQuantityPacked, totalNumberOfBottles]);

  useEffect(() => {
    setValue("numberOfBottlesPerShipper", Number(packSize));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packSize]);
  useEffect(() => {
    const nUmberOfFullShipperPacked = Math.ceil(
      yieldTotalQuantityPacked / packSize,
    );
    setValue("nUmberOfFullShipperPacked", Number(nUmberOfFullShipperPacked));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yieldTotalQuantityPacked, packSize]);

  useEffect(() => {
    const nUmberOfFullShipperPacked = Math.ceil(
      yieldTotalQuantityPacked / packSize,
    );
    setValue("nUmberOfFullShipperPacked", Number(nUmberOfFullShipperPacked));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yieldTotalQuantityPacked, packSize]);

  useEffect(() => {
    const totalQuantityPacked = yieldTotalQuantityPacked + leftOver;
    setValue("totalQuantityPacked", Number(totalQuantityPacked));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yieldTotalQuantityPacked, leftOver]);

  // console.log(isLoadingActivity, isLoadingFinalPacking);
  const handleFinalPacking = async (activityId: string) => {
    try {
      const response = await loadActivity({
        productionActivityId: activityId,
      }).unwrap();
      const productId = response?.product?.id as string;
      const scheduleId = response?.productionSchedule?.id as string;

      const [
        productResponse,
        scheduleResponse,
        packingResponse,
        extraPackingResponse,
      ] = await Promise.all([
        loadProduct({ productId }).unwrap(),
        loadSchedule({ scheduleId }).unwrap(),
        loadFinalPacking({
          productionScheduleId: scheduleId,
          productId,
        }).unwrap(),
        loadExtraPacking({
          productionScheduleId: scheduleId,
          productId,
        }).unwrap(),
      ]);
      const findProduct = scheduleResponse?.products?.find(
        (p) => p.product?.id === productId,
      );
      const batchSize = convertToLargestUnit(
        findProduct?.quantity as number,
        getSmallestUnit(productResponse?.baseUoM?.symbol as Units),
      );
      const expectedYield =
        Number(findProduct?.quantity) /
        Number(productResponse?.basePackingQuantity);
      // console.log(scheduleResponse, "scheduleResponse");
      // console.log(productResponse, "productResponse");
      setValue(
        "averageVolumeFilledPerBottle",
        productResponse?.filledWeight as unknown as number,
      );
      setValue("batchSize", batchSize.value);
      setValue("expectedYield", expectedYield);
      setValue(
        "averageVolumeFilledPerBottle",
        productResponse?.basePackingQuantity as number,
      );

      setUomName(batchSize.unit as Units);
      const stepId = response?.currentStep?.id as string;
      setProductId(productId);
      setScheduleId(scheduleId);
      setCurrentStepId(stepId);

      const materialForMatrix = packingResponse?.items?.map((item) => ({
        materialId: item.material?.id as string,
        materialName: item.material?.name as string,
        // receivedQuantity: item.quantity as number,

        //i have to convert to largest and also i have to make sure that everything is converted to smallest for saving
        receivedQuantity: convertToLargestUnit(
          item.quantity as number,
          getSmallestUnit(item.uoM?.symbol as Units),
        ).value as number,
        subsequentDeliveredQuantity: convertToLargestUnit(
          findExtraPackingMaterialBymaterialId(
            extraPackingResponse,
            item.material?.id as string,
          )?.totalQty as number,
          getSmallestUnit(
            findExtraPackingMaterialBymaterialId(
              extraPackingResponse,
              item.material?.id as string,
            )?.uoMName as Units,
          ),
        ).value as number,
      })) as MaterialMatrix[];
      setMaterialMatrix(materialForMatrix);

      const initialFormData: { [key: string]: { [key: string]: number } } = {};
      materialForMatrix.forEach((material) => {
        initialFormData[material.materialId] = {
          receivedQuantity: material.receivedQuantity, // Read-only
          subsequentDeliveredQuantity: material.subsequentDeliveredQuantity, // Read-only
          totalReceivedQuantity:
            material.receivedQuantity + material.subsequentDeliveredQuantity, // Auto-calculated
          packedQuantity: 0, // Default to 1 since it must be > 0
          returnedQuantity: 0,
          rejectedQuantity: 0,
          sampledQuantity: 0,
          totalAccountedForQuantity:
            material.receivedQuantity + material.subsequentDeliveredQuantity, // Auto-calculated
          percentageLoss: 0,
        };
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
    }
  };

  // const  {data:}
  const [materialMatrix, setMaterialMatrix] = React.useState<MaterialMatrix[]>(
    [],
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
  // 🔹 Validation before submitting
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    materialMatrix.forEach((material) => {
      const schema = getMaterialSchema(
        formData[material.materialId].totalReceivedQuantity,
      );
      const result = schema.safeParse(formData[material.materialId]);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          newErrors[`${material.materialId}-${issue.path[0]}`] = issue.message;
        });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const onSubmit = async (data: PackingRequestDto) => {
    // console.log(data, validateForm(), errors);
    if (validateForm()) {
      console.log("✅ Validated Data:", formData);
      const materialArray = Object.entries(formData).map(
        ([materialId, values]) => ({
          materialId,
          ...values,
        }),
      );
      const payload = {
        productionScheduleId: scheduleId,
        productId: productId,
        productionActivityStepId: currentStepId,
        materials: materialArray,
        numberOfBottlesPerShipper: data.numberOfBottlesPerShipper,
        nUmberOfFullShipperPacked: data.nUmberOfFullShipperPacked,
        leftOver: data.leftOver,
        batchSize: data.batchSize,
        averageVolumeFilledPerBottle: data.averageVolumeFilledPerBottle,
        packSize: data.packSize,
        expectedYield: data.expectedYield,
        totalQuantityPacked: data.totalQuantityPacked,
        yieldTotalQuantityPacked: data.yieldTotalQuantityPacked,
        qualityControlAnalyticalSample: data.qualityControlAnalyticalSample,
        retainedSamples: data.retainedSamples,
        stabilitySamples: data.stabilitySamples,
        totalNumberOfBottles: data.totalNumberOfBottles,
        totalGainOrLoss: data.totalGainOrLoss,
      };
      try {
        await finalPackingMutation({
          createFinalPacking: payload,
        }).unwrap();
        toast.success("Final Packing updated successfully");
        router.push(routes.viewBoard(activityId));
      } catch (error) {
        toast.error(isErrorResponse(error as ErrorResponse)?.description);
      }
    } else {
      console.log("❌ Validation Errors:", errors);
    }
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <PageTitle title="Final Packing" />
          <Button type="submit" className="flex items-center gap-2">
            {isLoadingSaveFinalPacking && (
              <Icon name="LoaderCircle" className="size-4 animate-spin" />
            )}{" "}
            <span>Save Changes</span>
          </Button>
        </div>
        <div>
          {(Object.keys(errors).length > 0 ||
            Object.keys(formErrors).length > 0) && (
            <p
              className={cn(
                "text-[0.8rem] font-medium text-danger-default dark:text-red-900",
              )}
            >
              Some fields have errors
            </p>
          )}
        </div>
        <Tabs defaultValue="reconciliation" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reconciliation">
              Packing Material Reconciliation
            </TabsTrigger>
            <TabsTrigger value="yield">Yield on Packaging</TabsTrigger>
            <TabsTrigger value="packed">Quantity Packed</TabsTrigger>
          </TabsList>
          <TabsContent value="reconciliation">
            <Card>
              <CardHeader>
                <CardTitle>Packing Material Reconciliation</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <MaterialForm
                  materialMatrix={materialMatrix}
                  errors={errors}
                  setErrors={setErrors}
                  formData={formData}
                  setFormData={setFormData}
                  isLoading={
                    isLoadingActivity ||
                    isLoadingFinalPacking ||
                    isLoadingExtraPacking
                  }
                />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="yield">
            <Card>
              <CardHeader>
                <CardTitle>Yield on Packaging</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <YieldPacking
                  register={register}
                  errors={formErrors}
                  uomName={uomName}
                />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="packed">
            <Card>
              <CardHeader>
                <CardTitle>Quantity Packed</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <PackedForm register={register} errors={formErrors} />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </PageWrapper>
  );
};

const findExtraPackingMaterialBymaterialId = (
  extraPackingResponse: ProductionExtraPackingDto[],
  materialId: string,
) => {
  const groupedData = groupAndSumQuantities(extraPackingResponse);
  const res = groupedData?.find((item) => item.materialId === materialId);

  return res;
};
function groupAndSumQuantities(
  data: ProductionExtraPackingDto[],
): GroupedData[] {
  const groupedData: { [key: string]: GroupedData } = {};

  // Iterate over the data and group by materialId and uoMId
  data.forEach((item) => {
    const key = `${item.material?.id}-${item.uoM?.id}`;
    if (groupedData[key]) {
      // If the group already exists, update the total quantity
      groupedData[key].totalQty += item.quantity || 0;
    } else {
      // If the group doesn't exist, create it
      groupedData[key] = {
        materialId: item.material?.id as string,
        materialName: item.material?.name as string,
        uoMId: item.uoM?.id as string,
        uoMName: item.uoM?.symbol as Units,
        totalQty: item.quantity as number,
      };
    }
  });

  // Return the values as an array
  return Object.values(groupedData);
}

export default FinalPacking;

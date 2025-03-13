"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { Units, convertToLargestUnit, getSmallestUnit } from "@/lib";
import {
  useLazyGetApiV1ProductionScheduleActivityByProductionActivityIdQuery,
  useLazyGetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdQuery,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";

import MaterialForm from "./form";
import { MaterialMatrix, getMaterialSchema } from "./type";

const FinalPacking = () => {
  const { id } = useParams();
  const activityId = id as string;
  const [loadActivity, { isLoading: isLoadingActivity }] =
    useLazyGetApiV1ProductionScheduleActivityByProductionActivityIdQuery();

  const [loadFinalPacking, { isLoading: isLoadingFinalPacking }] =
    useLazyGetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdQuery();

  useEffect(() => {
    if (activityId) {
      handleFinalPacking(activityId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityId]);

  console.log(isLoadingActivity, isLoadingFinalPacking);
  const handleFinalPacking = async (activityId: string) => {
    const response = await loadActivity({
      productionActivityId: activityId,
    }).unwrap();
    const productId = response?.product?.id as string;
    const scheduleId = response?.productionSchedule?.id as string;

    const results = await loadFinalPacking({
      productionScheduleId: scheduleId,
      productId,
    }).unwrap();
    console.log(results, "stock packaging");

    const materialForMatrix = results?.items?.map((item) => ({
      materialId: item.material?.id as string,
      materialName: item.material?.name as string,
      // receivedQuantity: item.quantity as number,

      //i have to convert to largest and also i have to make sure that everything is converted to smallest for saving
      receivedQuantity: convertToLargestUnit(
        item.quantity as number,
        getSmallestUnit(item.uoM?.symbol as Units),
      ).value as number,
    })) as MaterialMatrix[];
    setMaterialMatrix(materialForMatrix);
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
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("✅ Validated Data:", formData);
    } else {
      console.log("❌ Validation Errors:", errors);
    }
  };
  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between gap-4">
          <PageTitle title="Final Packing" />
          <Button type="submit">Save Changes</Button>
        </div>
        <Tabs defaultValue="reconciliation" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reconciliation">
              Packing Material Reconciliation
            </TabsTrigger>
            <TabsTrigger value="packed">Quantity Packed</TabsTrigger>
            <TabsTrigger value="yield">Yield on Packaging</TabsTrigger>
          </TabsList>
          <TabsContent value="reconciliation">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <MaterialForm
                  materialMatrix={materialMatrix}
                  errors={errors}
                  setErrors={setErrors}
                  formData={formData}
                  setFormData={setFormData}
                />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2"></CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </PageWrapper>
  );
};

export default FinalPacking;

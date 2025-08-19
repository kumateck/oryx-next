"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Card, CardContent, Icon } from "@/components/ui";
import {
  CodeModelTypes,
  ErrorResponse,
  Units,
  convertToLargestUnit,
  convertToSmallestUnit,
  isErrorResponse,
} from "@/lib";
import {
  useLazyGetApiV1ConfigurationByModelTypeCountQuery,
  useLazyGetApiV1ProductionScheduleManufacturingByIdQuery,
  usePutApiV1ProductionScheduleManufacturingByIdMutation,
  usePutApiV1ProductionScheduleManufacturingIssueByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { CreateIssueValidator, IssueRequestDto } from "../types";
import IssueForm from "./form";
import { MaterialRequestDto } from "./type";
import ProductView from "./view";
import { generateBatchNumber, getBatchPrefix } from "@/lib/batch-gen";

const IssueDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const bmrId = id as string;
  const [rawLists, setRawLists] = useState<MaterialRequestDto[]>([]);
  const [packageLists, setPackageLists] = useState<MaterialRequestDto[]>([]);
  const [loadProductBMR] =
    useLazyGetApiV1ProductionScheduleManufacturingByIdQuery();

  const [updateManufacturingRecord, { isLoading }] =
    usePutApiV1ProductionScheduleManufacturingByIdMutation();

  const [IssueBMR, { isLoading: isIssueBmrLoading }] =
    usePutApiV1ProductionScheduleManufacturingIssueByIdMutation();
  const [loadCountConfig] = useLazyGetApiV1ConfigurationByModelTypeCountQuery();
  const [productId, setProductId] = useState<string>("");
  const [scheduleId, setScheduleId] = useState<string>("");
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IssueRequestDto>({
    resolver: CreateIssueValidator,
    mode: "all",
  });

  useEffect(() => {
    loadBatchInfo(bmrId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bmrId]);

  const loadBatchInfo = async (id: string) => {
    try {
      const data = await loadProductBMR({ id }).unwrap();
      const batch = convertToLargestUnit(
        data?.batchQuantity as number,
        data?.product?.baseUoM?.symbol as Units,
      );
      setValue("batchQuantity", batch?.value?.toString());
      setValue("uom", batch?.unit?.toString());
      setProductId(data?.product?.id as string);
      setScheduleId(data?.productionSchedule?.id as string);
      const productCode = data?.product?.code as string;
      const year = new Date().getFullYear();
      const prefix = getBatchPrefix(productCode, year);
      const countConfigResponse = await loadCountConfig({
        modelType: CodeModelTypes.ProductBatchNumber,
        prefix,
      }).unwrap();

      const batchNumer = generateBatchNumber(
        productCode,
        year,
        countConfigResponse + 1,
      );
      setValue("batchNumber", batchNumer);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: IssueRequestDto) => {
    try {
      await updateManufacturingRecord({
        id: bmrId,
        updateBatchManufacturingRecord: {
          batchQuantity: convertToSmallestUnit(
            Number(data.batchQuantity),
            data.uom as Units,
          ).value,
          batchNumber: data.batchNumber,
          manufacturingDate: data.manufacturingDate.toISOString(),
          expiryDate: data.expiryDate.toISOString(),
        },
      }).unwrap();
      await IssueBMR({
        id: bmrId,
      }).unwrap();
      toast.success("Issue updated successfully");
      router.push("/qa/issue-bmr");
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <ScrollablePageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <PageTitle title={"Issue Details"} />
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">
              {(isLoading || isIssueBmrLoading) && (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              )}
              <span>Save Changes</span>
            </Button>
          </div>
        </div>
        <Card className="space-y-4 p-5 pb-0">
          <CardContent>
            <IssueForm register={register} control={control} errors={errors} />
          </CardContent>
        </Card>
        {productId && scheduleId && (
          <ProductView
            productId={productId}
            scheduleId={scheduleId}
            rawLists={rawLists}
            packageLists={packageLists}
            setRawLists={setRawLists}
            setPackageLists={setPackageLists}
          />
        )}
      </form>
    </ScrollablePageWrapper>
  );
};

export default IssueDetails;

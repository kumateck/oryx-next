"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import {
  BatchSizeType,
  CODE_SETTINGS,
  ErrorResponse,
  Option,
  Units,
  convertToSmallestUnit,
  getLargestUnit,
  isErrorResponse,
  routes,
} from "@/lib";
import { useCodeGen } from "@/lib/code-gen";
import {
  PostApiV1ProductionScheduleApiArg,
  useLazyGetApiV1ProductByProductIdQuery,
  useLazyGetApiV1ProductQuery,
  useLazyGetApiV1ProductionScheduleQuery,
  usePostApiV1ProductionScheduleMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import ScheduleForm from "./form";
import { CreateScheduleValidator, ScheduleRequestDto } from "./type";

const Page = () => {
  const router = useRouter();

  const [
    loadProduct,
    { isLoading: isLoadingProducts, isFetching: isFetchingProducts },
  ] = useLazyGetApiV1ProductQuery();

  const [loadCodeModelCount] = useLazyGetApiV1ProductionScheduleQuery();

  const fetchCount = async () => {
    const countResponse = await loadCodeModelCount({}).unwrap();

    return { totalRecordCount: countResponse?.totalRecordCount };
  };

  const setCodeToInput = (code: string) => {
    setValue("code", code ?? "");
  };
  const [saveMutation, { isLoading }] =
    usePostApiV1ProductionScheduleMutation();
  const { regenerateCode, loading } = useCodeGen(
    CODE_SETTINGS.modelTypes.ProductionSchedule,
    fetchCount,
    setCodeToInput,
  );

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ScheduleRequestDto>({
    resolver: CreateScheduleValidator,
    mode: "all",
    defaultValues: {
      products: [
        {
          productId: {
            label: "",
            value: "",
          },
          sizeType: {
            label: "",
            value: "",
          },
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const associateProducts = useWatch({
    control,
    name: "products",
  });

  const [loadProductInfo] = useLazyGetApiV1ProductByProductIdQuery();

  const onSubmit = async (data: ScheduleRequestDto) => {
    const newCode = await regenerateCode();
    // console.log(ren, "code regen");
    const products = await Promise.all(
      data.products?.map(async (item) => {
        const productId = item.productId?.value;
        const product = await loadProductInfo({ productId }).unwrap();
        const fullBatchSize = product?.fullBatchSize as number;
        const uom = product?.baseUoM?.symbol as Units;
        const sizeType = Number(item.sizeType?.value);
        const convertUom = getLargestUnit(uom);
        const batchSize =
          sizeType === BatchSizeType.Half ? fullBatchSize / 2 : fullBatchSize;
        const quantity = convertToSmallestUnit(batchSize, convertUom).value;
        return {
          productId: item.productId?.value,
          quantity,
        };
      }),
    );
    const payload = {
      createProductionScheduleRequest: {
        code: newCode ?? data.code,
        products,
        remarks: data.remarks,
        scheduledEndTime: data.scheduledEndTime.toISOString(),
        scheduledStartTime: data.scheduledStartTime.toISOString(),
      },
    } as PostApiV1ProductionScheduleApiArg;
    try {
      await saveMutation(payload).unwrap();

      toast.success("Schedule created successfully");
      router.push(routes.productionSchedules());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const onBack = () => {
    router.push(routes.productionSchedules());
  };

  const loadDataOrSearch = async (searchQuery: string, page: number) => {
    const res = await loadProduct({
      searchQuery,
      page,
    }).unwrap();
    const options = res?.data?.map((item) => ({
      label: item.name,
      value: item.id,
    })) as Option[];
    const filteredOptions = options?.filter(
      (item2) =>
        !associateProducts?.some(
          (item1) => item1.productId.value === item2.value,
        ),
    );
    const response = {
      options: filteredOptions as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };
  return (
    <ScrollablePageWrapper className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full justify-between gap-4">
          <PageTitle title="Production Schedule" />
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button className="flex gap-2">
              {isLoading ? (
                <Icon name="LoaderCircle" className="animate-spin" />
              ) : (
                <Icon name="Save" />
              )}
              <span>Save</span>
            </Button>
          </div>
        </div>
        <ScheduleForm
          register={register}
          control={control}
          fields={fields}
          append={append}
          remove={remove}
          loading={loading}
          associateProducts={associateProducts}
          errors={errors}
          fetchOptions={loadDataOrSearch}
          isLoading={isLoadingProducts || isFetchingProducts}
        />
      </form>
    </ScrollablePageWrapper>
  );
};

export default Page;

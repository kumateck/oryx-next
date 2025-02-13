"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import {
  CODE_SETTINGS,
  ErrorResponse,
  GenerateCodeOptions,
  Units,
  convertToSmallestUnit,
  generateCode,
  isErrorResponse,
  renderUOM,
} from "@/lib";
import {
  NamingType,
  PostApiV1ProductionScheduleApiArg,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useGetApiV1ProductQuery,
  useLazyGetApiV1ProductionScheduleQuery,
  usePostApiV1ProductionScheduleMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import ScheduleForm, { OptionsUpdate } from "./form";
import { CreateScheduleValidator, ScheduleRequestDto } from "./type";

const Page = () => {
  const router = useRouter();

  const { data: codeConfig } =
    useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
      modelType: CODE_SETTINGS.modelTypes.ProductionSchedule,
    });
  const [loadProduct] = useLazyGetApiV1ProductionScheduleQuery();
  const { data: response } = useGetApiV1ProductQuery({
    page: 1,
    pageSize: 1000,
  });
  const [saveMutation, { isLoading }] =
    usePostApiV1ProductionScheduleMutation();

  const products = response?.data || [];
  const productOptions = products.map((product) => ({
    label: product.name,
    value: product.id,
    uom: product.baseUoM?.symbol,
  })) as OptionsUpdate[];

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ScheduleRequestDto>({
    resolver: CreateScheduleValidator,
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const associateProducts = useWatch({
    control,
    name: "products",
  });

  useEffect(() => {
    const loadCodes = async () => {
      const generatePayload: GenerateCodeOptions = {
        maxlength: Number(codeConfig?.maximumNameLength),
        minlength: Number(codeConfig?.minimumNameLength),
        prefix: codeConfig?.prefix as string,
        type: codeConfig?.namingType as NamingType,
      };
      const productsResponse = await loadProduct({
        page: 1,
        pageSize: 100000000,
      }).unwrap();

      const products = productsResponse?.totalRecordCount ?? 0;
      generatePayload.seriesCounter = products + 1;
      const code = await generateCode(generatePayload);
      setValue("code", code);
    };

    loadCodes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeConfig]);

  const onSubmit = async (data: ScheduleRequestDto) => {
    const payload = {
      createProductionScheduleRequest: {
        code: data.code,
        products: data.products?.map((item) => {
          const uom = renderUOM(productOptions, item.productId?.value) as Units;
          return {
            productId: item.productId?.value,
            quantity: convertToSmallestUnit(item.quantity, uom).value,
          };
        }),
        remarks: data.remarks,
        scheduledEndTime: data.scheduledEndTime.toISOString(),
        scheduledStartTime: data.scheduledStartTime.toISOString(),
      },
    } as PostApiV1ProductionScheduleApiArg;

    try {
      console.log(payload, "payload");
      const res = await saveMutation(payload).unwrap();
      console.log(res, "res");
      toast.success("Schedule created successfully");
      router.push(`/production/schedules`);
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const onBack = () => {
    router.push(`/production/schedules`);
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
          productOptions={productOptions}
          associateProducts={associateProducts}
          errors={errors}
        />
      </form>
    </ScrollablePageWrapper>
  );
};

export default Page;

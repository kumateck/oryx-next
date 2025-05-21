"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Card, CardContent, Icon } from "@/components/ui";
import {
  AuditModules,
  CODE_SETTINGS,
  COLLECTION_TYPES,
  DepartmentType,
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
  CreateProductRequest,
  PostApiV1CollectionApiArg,
  useGetApiV1CollectionUomQuery,
  useGetApiV1DepartmentQuery,
  useGetApiV1ProductEquipmentAllQuery,
  useLazyGetApiV1ProductQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1ProductMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import PageTitle from "@/shared/title";

import { CreateProductValidator, ProductRequestDto } from "../types";
import ProductForm from "./form";

const Create = () => {
  const router = useRouter();

  const [loadCodeModelCount] = useLazyGetApiV1ProductQuery();
  const [productMutation, { isLoading }] = usePostApiV1ProductMutation();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProductRequestDto>({
    resolver: CreateProductValidator,
    mode: "all",
  });

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  const { data: equipmentResponse } = useGetApiV1ProductEquipmentAllQuery({
    module: AuditModules.settings.name,
    subModule: AuditModules.settings.equipment,
  });
  const equipmentOptions = equipmentResponse?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];
  const { data: departmentResponse } = useGetApiV1DepartmentQuery({
    type: DepartmentType.Production,
    pageSize: 100,
    module: AuditModules.settings.name,
    subModule: AuditModules.settings.departments,
  });

  const departmentOptions = departmentResponse?.data?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  useEffect(() => {
    loadCollection({
      module: AuditModules.general.name,
      subModule: AuditModules.general.collection,
      body: [COLLECTION_TYPES.UnitOfMeasure, COLLECTION_TYPES.ProductCategory],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryOptions = collectionResponse?.[
    COLLECTION_TYPES.ProductCategory
  ]?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];

  const { data: uomResponse } = useGetApiV1CollectionUomQuery({
    isRawMaterial: true,
    module: AuditModules.general.name,
    subModule: AuditModules.general.collection,
  });
  const { data: packingUomResponse } = useGetApiV1CollectionUomQuery({
    isRawMaterial: false,
    module: AuditModules.general.name,
    subModule: AuditModules.general.collection,
  });

  const uomOptions = uomResponse?.map((uom) => ({
    label: uom.symbol,
    value: uom.id,
  })) as Option[];

  const packingUomOptions = packingUomResponse?.map((uom) => ({
    label: uom.symbol,
    value: uom.id,
  })) as Option[];

  const onSubmit = async (data: ProductRequestDto) => {
    const payload = {
      ...data,
      categoryId: data.categoryId?.value,
      fullBatchSize: convertToSmallestUnit(
        data.fullBatchSize,
        getLargestUnit(data.baseUomId?.label as Units),
      ).value,
      baseUomId: data.baseUomId?.value,
      equipmentId: data.equipment?.value,
      departmentId: data.department?.value,
      basePackingUomId: data.basePackingUomId?.value,
    } satisfies CreateProductRequest;

    try {
      await productMutation({
        createProductRequest: payload,
        module: AuditModules.production.name,
        subModule: AuditModules.production.planning,
      }).unwrap();
      // const productId = res as string;
      toast.success("Product Info created successfully");
      router.push(routes.planning());
      reset();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  // Function to fetch count (wraps RTK query)
  const fetchCount = async () => {
    const countResponse = await loadCodeModelCount({
      module: AuditModules.settings.name,
      subModule: AuditModules.settings.codeSettings,
    }).unwrap();
    return { totalRecordCount: countResponse?.totalRecordCount };
  };

  const setCodeToInput = (code: string) => {
    setValue("code", code ?? "");
  };
  useCodeGen(CODE_SETTINGS.modelTypes.Product, fetchCount, setCodeToInput);

  const onBack = () => {
    router.back();
  };
  return (
    <PageWrapper>
      <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full justify-between gap-4 px-5">
          <PageTitle title="Create Product" />
          <div className="flex items-center gap-2">
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

        <ScrollableWrapper>
          <Card>
            <CardContent className="px-8 pt-8">
              <ProductForm
                control={control}
                register={register}
                errors={errors}
                categoryOptions={categoryOptions}
                uomOptions={uomOptions}
                packingUomOptions={packingUomOptions}
                equipmentOptions={equipmentOptions}
                departmentOptions={departmentOptions}
              />
            </CardContent>
          </Card>
        </ScrollableWrapper>
      </form>
    </PageWrapper>
  );
};

export default Create;

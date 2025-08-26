"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  UoMType,
  convertToSmallestUnit,
  getLargestUnit,
  isErrorResponse,
} from "@/lib";
import { useCodeGen } from "@/lib/code-gen";
import {
  CreateProductRequest,
  Division,
  PostApiV1CollectionApiArg,
  useGetApiV1DepartmentQuery,
  useGetApiV1ProductEquipmentAllQuery,
  useLazyGetApiV1ProductQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1CollectionUomPaginatedMutation,
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
      division: Number(data.division?.value) as unknown as Division,
      packPerShipper: data.packPerShipper,
    } satisfies CreateProductRequest;

    try {
      await productMutation({
        createProductRequest: payload,
        module: AuditModules.production.name,
        subModule: AuditModules.production.planning,
      }).unwrap();
      // const productId = res as string;
      toast.success("Product Info created successfully");
      router.back();
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

  const [loadUom] = usePostApiV1CollectionUomPaginatedMutation();

  const [packingUomOptions, setPackingUomOptions] = useState<Option[]>([]);
  const [rawUomOptions, setRawUomOptions] = useState<Option[]>([]);

  const handleLoadUom = async () => {
    try {
      const response = await loadUom({
        filterUnitOfMeasure: {
          types: [UoMType.Raw, UoMType.Packing],
          pageSize: 100,
        },
      }).unwrap();
      const uom = response.data;
      const packingUom = uom
        ?.filter((uom) => uom.type === UoMType.Packing)
        ?.map((uom) => ({
          label: `${uom.name} (${uom.symbol})`,
          value: uom.id,
        })) as Option[];
      const rawUom = uom
        ?.filter((uom) => uom.type === UoMType.Raw)
        ?.map((uom) => ({
          label: `${uom.name} (${uom.symbol})`,
          value: uom.id,
        })) as Option[];
      setPackingUomOptions(packingUom);
      setRawUomOptions(rawUom);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadUom();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full justify-between gap-4 px-5">
          <PageTitle title="Create Product" />
          <div className="flex items-center gap-2">
            <Button
              disabled={isLoading}
              type="button"
              onClick={onBack}
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
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
                uomOptions={rawUomOptions}
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

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Card, CardContent, Icon } from "@/components/ui";
import {
  CODE_SETTINGS,
  COLLECTION_TYPES,
  ErrorResponse,
  Option,
  isErrorResponse,
  routes,
} from "@/lib";
import { useCodeGen } from "@/lib/code-gen";
import {
  CreateProductRequest,
  PostApiV1CollectionApiArg,
  useGetApiV1CollectionUomQuery,
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

  useEffect(() => {
    loadCollection({
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

  const onSubmit = async (data: ProductRequestDto) => {
    const payload = {
      ...data,
      categoryId: data.categoryId?.value,
      baseUomId: data.baseUomId?.value,
      basePackingUomId: data.basePackingUomId?.value,
    } satisfies CreateProductRequest;

    try {
      const res = await productMutation({
        createProductRequest: payload,
      }).unwrap();
      const productId = res as string;
      toast.success("Product Info created successfully");
      router.push(routes.editPlanning(productId));
      reset();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  // Function to fetch count (wraps RTK query)
  const fetchCount = async () => {
    const countResponse = await loadCodeModelCount({}).unwrap();
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
              />
            </CardContent>
          </Card>
        </ScrollableWrapper>
      </form>
    </PageWrapper>
  );
};

export default Create;

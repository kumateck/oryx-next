"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import {
  CODE_SETTINGS,
  COLLECTION_TYPES,
  ErrorResponse,
  GenerateCodeOptions,
  Option, // generateCode,
  isErrorResponse,
  routes,
} from "@/lib";
import {
  CreateProductRequest,
  NamingType,
  PostApiV1CollectionApiArg,
  useGetApiV1CollectionUomQuery,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useGetApiV1ProductQuery,
  useLazyGetApiV1ProductQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1ProductMutation,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";

import { CreateProductValidator, ProductRequestDto } from "../types";
import ChecklistForm, { OptionsUpdate } from "./form";

const Create = () => {
  const router = useRouter();
  const { data: productCodeConfig } =
    useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
      modelType: CODE_SETTINGS.modelTypes.Product,
    });

  const [loadProduct] = useLazyGetApiV1ProductQuery();
  const [productMutation, { isLoading }] = usePostApiV1ProductMutation();
  const {
    register,
    control,
    handleSubmit,
    // setValue,
    formState: { errors },
    reset,
  } = useForm<ProductRequestDto>({
    resolver: CreateProductValidator,
    mode: "all",
    defaultValues: {
      //   code: ,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "finishedProducts",
  });

  const { data: response } = useGetApiV1ProductQuery({
    page: 1,
    pageSize: 1000,
  });
  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.UnitOfMeasure, COLLECTION_TYPES.ProductCategory],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadCodes = async () => {
      const generatePayload: GenerateCodeOptions = {
        maxlength: Number(productCodeConfig?.maximumNameLength),
        minlength: Number(productCodeConfig?.minimumNameLength),
        prefix: productCodeConfig?.prefix as string,
        type: productCodeConfig?.namingType as NamingType,
      };
      const productsResponse = await loadProduct({
        page: 1,
        pageSize: 100000,
      }).unwrap();

      const products = productsResponse?.totalRecordCount ?? 0;
      generatePayload.seriesCounter = products + 1;
      // const code = await generateCode(generatePayload);
      // setValue("code", code);
    };

    loadCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCodeConfig]);

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

  const products = response?.data || [];
  const productOptions = products.map((product) => ({
    label: product.name,
    value: product.id,
    uom: product.baseUoM?.symbol,
  })) as OptionsUpdate[];

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
            categoryOptions={categoryOptions}
            uomOptions={uomOptions}
            packingUomOptions={packingUomOptions}
            append={append}
            remove={remove}
            productOptions={productOptions}
            fields={fields}
          />
        </form>
      </PageWrapper>
    </ScrollablePageWrapper>
  );
};

export default Create;

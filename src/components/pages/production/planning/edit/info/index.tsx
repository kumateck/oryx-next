"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Card, CardContent, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import { COLLECTION_TYPES, Option, routes } from "@/lib/constants";
import {
  CreateProductRequest,
  PostApiV1CollectionApiArg,
  PutApiV1ProductByProductIdApiArg,
  useGetApiV1CollectionUomQuery,
  useLazyGetApiV1ProductByProductIdQuery,
  usePostApiV1CollectionMutation,
  usePutApiV1ProductByProductIdMutation,
} from "@/lib/redux/api/openapi.generated";

import ProductForm from "../../create/form";
import { CreateProductValidator, ProductRequestDto } from "../../types";

export interface ProductDetailProps {
  code?: string | null;
  name?: string | null;
  description?: string | null;
  categoryId?: {
    label: string;
    value: string;
  };
}
// interface ProductInfoProps {
//   productId?: string;
//   productDetail?: ProductDetailProps;
//   loadProductById: () => void;
// }
const ProductInfo = () => {
  const { id } = useParams();
  const productId = id as string;
  const router = useRouter();
  const [productMutation, { isLoading }] =
    usePutApiV1ProductByProductIdMutation();
  const [loadProductInfo] = useLazyGetApiV1ProductByProductIdQuery();
  const [defaultCategory, setDefaultCategory] = useState<Option | undefined>(
    undefined,
  );
  const [defaultUom, setDefaultUom] = useState<Option | undefined>(undefined);
  const [defaultPackingUom, setDefaultPackingUom] = useState<
    Option | undefined
  >(undefined);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    // reset,
    setValue,
  } = useForm<ProductRequestDto>({
    resolver: CreateProductValidator,
    mode: "all",
  });

  useEffect(() => {
    if (productId) {
      handleLoadProduct(productId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleLoadProduct = async (productId: string) => {
    const product = await loadProductInfo({
      productId,
    }).unwrap();
    const category = {
      label: product?.category?.name as string,
      value: product?.category?.id as string,
    } as Option;
    const uom = {
      label: product?.baseUoM?.symbol as string,
      value: product?.baseUoM?.id as string,
    } as Option;
    const puom = {
      label: product?.basePackingUoM?.symbol as string,
      value: product?.basePackingUoM?.id as string,
    } as Option;
    setDefaultCategory(category);
    setDefaultUom(uom);
    setDefaultPackingUom(puom);
    const defaultProduct = {
      code: product?.code as string,
      name: product?.name as string,
      filledWeight: product?.filledWeight as string,
      shelfLife: product?.shelfLife as string,
      storageCondition: product?.storageCondition as string,
      packageStyle: product?.packageStyle as string,
      baseUomId: uom,
      basePackingUomId: puom,
      genericName: product?.genericName as string,
      description: product?.description as string,
      basePackingQuantity: product?.basePackingQuantity,
      baseQuantity: product?.baseQuantity,
      categoryId: {
        label: product?.category?.name as string,
        value: product?.category?.id as string,
      },
    } as ProductRequestDto;
    setValue("code", defaultProduct.code);
    setValue("name", defaultProduct.name);
    setValue("description", defaultProduct.description);
    setValue("categoryId", defaultProduct.categoryId);
    setValue("baseUomId", defaultProduct.baseUomId);
    setValue("basePackingUomId", defaultProduct.basePackingUomId);
    setValue("filledWeight", defaultProduct.filledWeight);
    setValue("shelfLife", defaultProduct.shelfLife);
    setValue("storageCondition", defaultProduct.storageCondition);
    setValue("packageStyle", defaultProduct.packageStyle);
    setValue("genericName", defaultProduct.genericName);
    setValue("basePackingQuantity", defaultProduct.basePackingQuantity);
    setValue("baseQuantity", defaultProduct.baseQuantity);
  };

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

  const onSubmit = async (data: ProductRequestDto) => {
    const payload = {
      ...data,
      categoryId: data.categoryId?.value,
      baseUomId: data.baseUomId?.value,
      basePackingUomId: data.basePackingUomId?.value,
      // finishedProducts: data.finishedProducts?.map((fp) => ({
      //   ...fp,
      //   uoMId: fp.uoMId?.value,
      // })),
    } satisfies CreateProductRequest;

    try {
      await productMutation({
        productId,
        updateProductRequest: payload,
      } as PutApiV1ProductByProductIdApiArg).unwrap();
      toast.success("Product Info updated successfully");
      // reset();
      await handleLoadProduct(productId);
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

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

  return (
    <PageWrapper className="relative w-full">
      <div className="absolute right-0 -mt-10">
        <div className="flex justify-end gap-4">
          <Link
            href={routes.editPlanningInfo()}
            className="hover:text-primary-500 underline"
          >
            Edit Info
          </Link>
          <Link
            href={routes.editPlanningBom()}
            className="hover:text-primary-500 underline"
          >
            Edit BOM
          </Link>
          <Link
            href={routes.editPlanningProcedure()}
            className="hover:text-primary-500 underline"
          >
            Edit Procedure
          </Link>
          <Link
            href={routes.editPackingOrder()}
            className="underline hover:text-primary-hover"
          >
            Packing Order Preparation
          </Link>
        </div>
      </div>
      <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="px-8 pt-8">
            <ProductForm
              control={control}
              register={register}
              errors={errors}
              categoryOptions={categoryOptions}
              defaultCategory={defaultCategory}
              defaultUom={defaultUom}
              defaultPackingUom={defaultPackingUom}
              uomOptions={uomOptions}
              packingUomOptions={packingUomOptions}
            />
          </CardContent>
        </Card>

        <div className="flex w-full justify-end gap-4 px-12">
          <Button
            type="button"
            onClick={() => router.push("/production/plannings")}
            variant="outline"
          >
            Cancel
          </Button>
          <Button type="submit">
            {isLoading ? (
              <Icon name="LoaderCircle" className="animate-spin" />
            ) : (
              <Icon name="Plus" />
            )}
            <span className="px-1"> Save Changes</span>
          </Button>
        </div>
      </form>
    </PageWrapper>
  );
};

export default ProductInfo;

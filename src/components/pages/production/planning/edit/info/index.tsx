"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import { Button, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import { COLLECTION_TYPES, InputTypes, Option, routes } from "@/lib/constants";
import {
  CreateProductRequest,
  PostApiV1CollectionApiArg,
  PutApiV1ProductByProductIdApiArg,
  useGetApiV1ProductByProductIdQuery,
  usePostApiV1CollectionMutation,
  usePutApiV1ProductByProductIdMutation,
} from "@/lib/redux/api/openapi.generated";

import { CreateProductValidator, ProductRequestDto } from "./types";

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
  const [productMutation, { isLoading }] =
    usePutApiV1ProductByProductIdMutation();
  const { data: product } = useGetApiV1ProductByProductIdQuery({
    productId,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductRequestDto>({
    resolver: CreateProductValidator,
    mode: "all",
    // defaultValues: {
    //   categoryId: defaultProduct.categoryId,
    //   code: defaultProduct?.code,
    //   name: defaultProduct?.name,
    //   description: defaultProduct?.description,
    // },
  });
  useEffect(() => {
    if (product) {
      const defaultProduct = {
        code: product?.code as string,
        name: product?.name as string,
        description: product?.description as string,
        categoryId: {
          label: product?.category?.name as string,
          value: product?.category?.id as string,
        },
      } as ProductRequestDto;
      setValue("code", defaultProduct.code);
      setValue("name", defaultProduct.name);
      setValue("description", defaultProduct.description);
      setValue("categoryId", defaultProduct.categoryId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

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
      finishedProducts: data.finishedProducts?.map((fp) => ({
        ...fp,
        uoMId: fp.uoMId?.value,
      })),
    } satisfies CreateProductRequest;

    try {
      await productMutation({
        productId,
        updateProductRequest: payload,
      } as PutApiV1ProductByProductIdApiArg).unwrap();
      toast.success("Product Info updated successfully");
      reset();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-end gap-4">
        <Link
          href={routes.editPlanningBom()}
          className="underline hover:text-primary-500"
        >
          Edit BOM
        </Link>
        <Link
          href={routes.editPlanningPackaging()}
          className="underline hover:text-primary-500"
        >
          Edit Packaging
        </Link>
        <Link
          href={routes.editPlanningProcedure()}
          className="underline hover:text-primary-500"
        >
          Edit Procedure
        </Link>
      </div>
      <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-xl border border-neutral-200 bg-white px-10 py-8">
          <FormWizard
            className="grid w-full grid-cols-2 gap-x-10 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                register: { ...register("name") },
                label: "Product Name",
                placeholder: "Enter Product Name",
                type: InputTypes.TEXT,
                autoFocus: true,
                required: true,
                errors: {
                  message: errors.name?.message,
                  error: !!errors.name,
                },
              },
              {
                register: { ...register("code") },
                label: "Product Code",
                readOnly: true,
                required: true,
                description: (
                  <span className="text-sm text-neutral-500">
                    You can’t change the product code
                  </span>
                ),
                placeholder: "Code will be generated",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.code?.message,
                  error: !!errors.code,
                },
              },
              {
                register: { ...register("description") },
                label: "Product Description",
                placeholder: "Enter Product Description",
                type: InputTypes.TEXTAREA,
                errors: {
                  message: errors.description?.message,
                  error: !!errors.description,
                },
              },
              {
                label: "Category",
                control,
                type: InputTypes.SELECT,
                name: "categoryId",
                defaultValue: product?.category?.name
                  ? {
                      label: product?.category?.name as string,
                      value: product?.category?.id as string,
                    }
                  : undefined,
                required: true,
                placeholder: "Category",
                options: categoryOptions,
                errors: {
                  message: errors.categoryId?.message,
                  error: !!errors.categoryId,
                },
              },
            ]}
          />
        </div>

        <div className="flex w-full gap-4">
          <Button variant={"primary"} type="submit" className="w-full">
            {isLoading ? (
              <Icon name="LoaderCircle" className="animate-spin" />
            ) : (
              <Icon name="Plus" />
            )}
            <span className="px-1"> Save Changes </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductInfo;

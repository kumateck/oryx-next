"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import { Button, Icon } from "@/components/ui";
import {
  CODE_SETTINGS,
  COLLECTION_TYPES,
  ErrorResponse,
  GenerateCodeOptions,
  InputTypes,
  Option,
  generateCode,
  isErrorResponse,
  routes,
} from "@/lib";
import {
  CreateProductRequest,
  NamingType,
  PostApiV1CollectionApiArg,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useLazyGetApiV1ProductQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1ProductMutation,
} from "@/lib/redux/api/openapi.generated";

import { CreateProductValidator, ProductRequestDto } from "../types";

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
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProductRequestDto>({
    resolver: CreateProductValidator,
    mode: "all",
    defaultValues: {
      //   code: ,
    },
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
      const code = generateCode(generatePayload);
      setValue("code", code);
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
      const res = await productMutation({
        createProductRequest: payload,
      }).unwrap();
      const productId = res as string;
      router.push(`../${routes.editPlanning(productId)}`);
      toast.success("Product Info created successfully");
      reset();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full space-y-4">
        <span className="text-xl font-semibold text-black">Create Product</span>
      </div>
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

      <div className="w-full">
        <Button type="submit" className="w-full">
          {isLoading ? (
            <Icon name="LoaderCircle" className="animate-spin" />
          ) : (
            <Icon name="Plus" />
          )}
          <span className="px-1"> Save </span>
        </Button>
      </div>
    </form>
  );
};

export default Create;

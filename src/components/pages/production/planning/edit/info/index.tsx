"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Card, CardContent, Icon } from "@/components/ui";
import {
  AuditModules,
  Division,
  ErrorResponse,
  UoMType,
  convertToSmallestUnit,
  getLargestUnit,
  isErrorResponse,
  splitWords,
} from "@/lib";
import { COLLECTION_TYPES, DepartmentType, Option, Units, routes } from "@/lib";
import {
  CreateProductRequest,
  PostApiV1CollectionApiArg,
  PutApiV1ProductByProductIdApiArg,
  useGetApiV1DepartmentQuery,
  useGetApiV1ProductEquipmentAllQuery,
  useLazyGetApiV1ProductByProductIdQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1CollectionUomPaginatedMutation,
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
  const [defaultEquipment, setDefaultEquipment] = useState<Option | undefined>(
    undefined,
  );
  const [defaultDepartment, setDefaultDepartment] = useState<
    Option | undefined
  >(undefined);
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
  const { data: equipmentResponse } = useGetApiV1ProductEquipmentAllQuery({
    module: AuditModules.settings.name,
    subModule: AuditModules.settings.equipment,
  });
  const equipmentOptions = equipmentResponse?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  useEffect(() => {
    if (productId) {
      handleLoadProduct(productId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleLoadProduct = async (productId: string) => {
    const product = await loadProductInfo({
      productId,
      module: AuditModules.production.name,
      subModule: AuditModules.production.planning,
    }).unwrap();

    const category = {
      label: product?.category?.name as string,
      value: product?.category?.id as string,
    } as Option;
    const equipment = {
      label: product?.equipment?.name as string,
      value: product?.equipment?.id as string,
    } as Option;
    const department = {
      label: product?.department?.name as string,
      value: product?.department?.id as string,
    } as Option;

    const uom = {
      label: `${product.baseUoM?.name} (${product?.baseUoM?.symbol})`,
      value: product?.baseUoM?.id as string,
    } as Option;
    const puom = {
      label: `${product.basePackingUoM?.name} (${product?.basePackingUoM?.symbol})`,
      value: product?.basePackingUoM?.id as string,
    } as Option;

    setDefaultCategory(category);
    setDefaultUom(uom);
    setDefaultPackingUom(puom);
    setDefaultEquipment(equipment);
    setDefaultDepartment(department);

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
      actionUse: product?.actionUse as string,
      basePackingQuantity: product?.basePackingQuantity,
      fullBatchSize: product?.fullBatchSize,
      baseQuantity: product?.baseQuantity,
      categoryId: {
        label: product?.category?.name as string,
        value: product?.category?.id as string,
      },
      equipment: {
        label: product?.equipment?.name as string,
        value: product?.equipment?.id as string,
      },
      packPerShipper: product?.packPerShipper,
      price: product?.price,
      division: {
        value: product?.division?.toString() ?? "",
        label: splitWords(Division[product?.division ?? ""]) || "",
      } as Option,
      department: {
        label: product?.department?.name as string,
        value: product?.department?.id as string,
      },
      masterFormulaNumber: product?.masterFormulaNumber as string,
      fdaRegistrationNumber: product?.fdaRegistrationNumber as string,
      expectedYield: product?.expectedYield as number,
    } as ProductRequestDto;

    setValue("code", defaultProduct.code);
    setValue("name", defaultProduct.name);
    setValue("fullBatchSize", defaultProduct.fullBatchSize);
    setValue("description", defaultProduct.description);
    setValue("categoryId", defaultProduct.categoryId);
    setValue("baseUomId", defaultProduct.baseUomId);
    setValue("basePackingUomId", defaultProduct.basePackingUomId);
    setValue("equipment", defaultProduct.equipment);
    setValue("department", defaultProduct.department);
    setValue("filledWeight", defaultProduct.filledWeight);
    setValue("shelfLife", defaultProduct.shelfLife);
    setValue("price", defaultProduct.price);
    setValue("division", defaultProduct.division);
    setValue("packPerShipper", defaultProduct.packPerShipper);
    setValue("storageCondition", defaultProduct.storageCondition);
    setValue("packageStyle", defaultProduct.packageStyle);
    setValue("genericName", defaultProduct.genericName);
    setValue("basePackingQuantity", defaultProduct.basePackingQuantity);
    setValue("baseQuantity", defaultProduct.baseQuantity);
    setValue("description", defaultProduct.description);
    setValue("actionUse", defaultProduct.actionUse);
    setValue("fdaRegistrationNumber", defaultProduct?.fdaRegistrationNumber);
    setValue("masterFormulaNumber", defaultProduct?.masterFormulaNumber);
    setValue("expectedYield", defaultProduct?.expectedYield);
  };

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  useEffect(() => {
    loadCollection({
      module: AuditModules.general.name,
      subModule: AuditModules.general.collection,
      body: [COLLECTION_TYPES.ProductCategory],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryOptions = collectionResponse?.[
    COLLECTION_TYPES.ProductCategory
  ]?.map((cat) => ({
    label: cat.name,
    value: cat.id,
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
  const onSubmit = async (data: ProductRequestDto) => {
    const payload = {
      ...data,
      categoryId: data.categoryId?.value,
      fullBatchSize: convertToSmallestUnit(
        data.fullBatchSize,
        getLargestUnit(defaultUom?.label as Units),
      ).value,
      baseUomId: data.baseUomId?.value,
      basePackingUomId: data.basePackingUomId?.value,
      equipmentId: data.equipment?.value,
      departmentId: data.department?.value,
      division: Number(data.division?.value) as unknown as Division,
    } satisfies CreateProductRequest;

    try {
      await productMutation({
        productId,
        updateProductRequest: payload,
        module: AuditModules.production.name,
        subModule: AuditModules.production.planning,
      } as PutApiV1ProductByProductIdApiArg).unwrap();
      toast.success("Product Info updated successfully");
      // reset();
      await handleLoadProduct(productId);
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
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
              defaultEquipment={defaultEquipment}
              defaultPackingUom={defaultPackingUom}
              defaultDepartment={defaultDepartment}
              uomOptions={rawUomOptions}
              packingUomOptions={packingUomOptions}
              equipmentOptions={equipmentOptions}
              departmentOptions={departmentOptions}
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

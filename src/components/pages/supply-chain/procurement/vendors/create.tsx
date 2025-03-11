"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import { COLLECTION_TYPES, Option, routes } from "@/lib";
import {
  CreateSupplierRequest,
  PostApiV1CollectionApiArg,
  PostApiV1ProcurementSupplierApiArg,
  useGetApiV1MaterialAllQuery,
  useLazyGetApiV1ProcurementManufacturerMaterialByMaterialIdQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1ProcurementSupplierMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";
import PageTitle from "@/shared/title";

import VendorForm from "./form";
import { CreateVendorValidator, VendorRequestDto } from "./types";

export type ManufacturerMap = {
  [key: string]: Option[];
};
const Create = () => {
  const router = useRouter();
  // Rest of the existing code...
  const [createMutation, { isLoading }] =
    usePostApiV1ProcurementSupplierMutation();
  const { data: materialResponse } = useGetApiV1MaterialAllQuery();

  const materialOptions = materialResponse?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<VendorRequestDto>({
    resolver: CreateVendorValidator,
    mode: "all",
    defaultValues: {
      associatedManufacturers: [
        {
          material: {
            label: "",
            value: "",
          },
          manufacturer: [
            {
              label: "",
              value: "",
            },
          ],
        },
      ],
    },
  });

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.Country, COLLECTION_TYPES.Currency],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countryOptions = collectionResponse?.[COLLECTION_TYPES.Country]?.map(
    (uom) => ({
      label: uom.name,
      value: uom.id,
    }),
  ) as Option[];
  const currencyOptions = collectionResponse?.[COLLECTION_TYPES.Currency]?.map(
    (uom) => ({
      label: uom.name,
      value: uom.id,
    }),
  ) as Option[];

  const [manufacturerOptionsMap, setManufacturerOptionsMap] =
    useState<ManufacturerMap>({}); // To store manufacturers by material ID
  const { fields, append, remove } = useFieldArray({
    control,
    name: "associatedManufacturers",
  });
  const [loadMaterialManufacturers] =
    useLazyGetApiV1ProcurementManufacturerMaterialByMaterialIdQuery();

  // const typeValues =
  //   useWatch({
  //     control,
  //     name: "associatedManufacturers",
  //   })?.map((item) => item?.material) || [];
  const associatedManufacturers = useWatch({
    control,
    name: "associatedManufacturers",
  });

  // Memoize derived values
  const typeValues = useMemo(() => {
    return associatedManufacturers?.map((item) => item?.material) || [];
  }, [associatedManufacturers]);

  // console.log(typeValues, "typeValues", materialOptions);
  const onSubmit = async (data: VendorRequestDto) => {
    try {
      const associatedManufacturers = data.associatedManufacturers.flatMap(
        (item) =>
          item.manufacturer.map((manufacturer) => ({
            materialId: item.material.value,
            manufacturerId: manufacturer.value,
          })),
      );
      const { country, currency, ...rest } = data;
      const payload = {
        ...rest,
        associatedManufacturers,
        type: country.label === "Ghana" ? 1 : 0,
        countryId: country.value,
        currencyId: currency.value,
      } satisfies CreateSupplierRequest;
      await createMutation({
        createSupplierRequest: payload,
      } as PostApiV1ProcurementSupplierApiArg);
      toast.success("Vendor created successfully");
      router.push(routes.vendors());
      // reset(); // Reset the form after submission
      // onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  // Track previously fetched materials to avoid refetching them
  const [fetchedMaterials, setFetchedMaterials] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    // Only fetch manufacturers if the material is new (not already fetched)
    typeValues.forEach((material) => {
      const materialId = material?.value;
      if (materialId && !fetchedMaterials.has(materialId)) {
        // Mark the material as fetched
        setFetchedMaterials((prev) => new Set(prev).add(materialId));

        loadMaterialManufacturers({ materialId })
          .unwrap()
          .then((response) => {
            if (response) {
              setManufacturerOptionsMap((prev) => {
                const manufacturers = response?.map((item) => ({
                  label: item.name as string,
                  value: item.id as string,
                })) as Option[];

                return {
                  ...prev,
                  [materialId]: manufacturers,
                };
              });
            }
          });
      }
    });
  }, [typeValues, loadMaterialManufacturers, fetchedMaterials]); // `fetchedMaterials` is now part of dependencies

  const onBack = () => {
    router.back();
  };
  return (
    <div className="h-full w-full space-y-5 bg-white p-5">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon
              name="ArrowLeft"
              onClick={onBack}
              className="cursor-pointer"
            />
            <PageTitle title={"Create Vendor"} />
          </div>
          <div className="flex justify-end gap-4 py-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push(routes.vendors())}
            >
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Save </span>
            </Button>
          </div>
        </div>
        <VendorForm
          control={control}
          register={register}
          errors={errors}
          countryOptions={countryOptions}
          currencyOptions={currencyOptions}
          fields={fields}
          remove={remove}
          materialOptions={materialOptions}
          manufacturerOptionsMap={manufacturerOptionsMap}
          typeValues={typeValues}
          append={append}
        />
      </form>
    </div>
  );
};

export default Create;

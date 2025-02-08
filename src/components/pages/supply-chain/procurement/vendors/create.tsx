"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import { COLLECTION_TYPES, Option } from "@/lib";
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
      body: [COLLECTION_TYPES.Country],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countryOptions = collectionResponse?.[COLLECTION_TYPES.Country]?.map(
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
      const payload = {
        ...data,
        associatedManufacturers,
        type: data.country.label === "Ghana" ? 1 : 0,
        countryId: data.country.value,
      } satisfies CreateSupplierRequest;
      await createMutation({
        createSupplierRequest: payload,
      } as PostApiV1ProcurementSupplierApiArg);
      toast.success("Manufacturer created successfully");
      router.push("/procurement/vendors");
      // reset(); // Reset the form after submission
      // onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  // Watch for changes in the materials and fetch corresponding manufacturers
  // useEffect(() => {
  //   typeValues.forEach((material, index) => {
  //     if (material?.value && !manufacturerOptionsMap[material.value]) {
  //       loadMaterialManufacturers({ materialId: material.value })
  //         .unwrap()
  //         .then((response) => {
  //           if (response) {
  //             setManufacturerOptionsMap((prev) => ({
  //               ...prev,
  //               [material.value]: response.map((item) => ({
  //                 label: item.name,
  //                 value: item.id,
  //               })),
  //             }));
  //           }
  //         });
  //     }
  //   });
  // }, [typeValues, manufacturerOptionsMap, loadMaterialManufacturers]);

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

  // console.log(first)
  return (
    <div className="h-full w-full bg-white p-5">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <VendorForm
          control={control}
          register={register}
          errors={errors}
          countryOptions={countryOptions}
          fields={fields}
          remove={remove}
          materialOptions={materialOptions}
          manufacturerOptionsMap={manufacturerOptionsMap}
          typeValues={typeValues}
          append={append}
        />
        <div className="flex justify-end gap-4 py-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => console.log("d")}
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
      </form>
    </div>
  );
};

export default Create;

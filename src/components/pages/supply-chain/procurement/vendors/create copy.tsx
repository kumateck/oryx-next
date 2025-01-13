"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import { Button, Icon } from "@/components/ui";
import { COLLECTION_TYPES, InputTypes, Option } from "@/lib";
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

import { CreateVendorValidator, VendorRequestDto } from "./types";

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
  const [manufacturerOptionsMap, setManufacturerOptionsMap] = useState<{
    [key: string]: Option[];
  }>({}); // To store manufacturers by material ID
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
        <div className="">
          {/* Existing static fields */}
          <FormWizard
            className="grid w-full grid-cols-2 gap-4 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                register: { ...register("name") },
                label: "Name",
                placeholder: "Enter Name",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.name?.message,
                  error: !!errors.name,
                },
              },
              {
                register: { ...register("contactPerson") },
                label: "Contact Person",
                placeholder: "Enter contact person",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.contactPerson?.message,
                  error: !!errors.contactPerson,
                },
              },
              {
                register: { ...register("email") },
                label: "Email",
                placeholder: "Enter email",
                type: InputTypes.EMAIL,
                errors: {
                  message: errors.email?.message,
                  error: !!errors.email,
                },
              },
              {
                register: { ...register("contactNumber") },
                label: "Contact Number",
                placeholder: "Enter telephone number",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.contactNumber?.message,
                  error: !!errors.contactNumber,
                },
              },
              {
                label: "Country",
                control,
                type: InputTypes.SELECT,
                name: "country",
                required: true,
                placeholder: "Select Country",
                options: countryOptions,
                errors: {
                  message: errors.country?.message,
                  error: !!errors.country,
                },
              },
              {
                register: { ...register("address") },
                label: "Address",
                placeholder: "Enter address",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.address?.message,
                  error: !!errors.address,
                },
              },
            ]}
          />
        </div>
        {/* Dynamic Associated Manufacturers Section */}
        <div>
          <div>
            <div className="flex justify-between px-2 py-5">
              <span className="font-medium">Associated Manufacturers</span>
              <Button
                type="button"
                onClick={() =>
                  append({
                    manufacturer: [{ label: "", value: "" }],
                    material: { label: "", value: "" },
                  })
                }
              >
                Add
              </Button>
            </div>
          </div>

          <div className="max-h-[500px] min-h-[400px] w-full space-y-4 overflow-y-auto">
            {fields.map((field, index) => {
              const type = typeValues[index];
              const currentManufacturerOptions =
                manufacturerOptionsMap[type?.value] || []; // Get the options for the selected material

              return (
                <div key={field.id} className="relative rounded-2xl border p-2">
                  <div className="absolute right-2 top-2">
                    <Icon
                      onClick={() => remove(index)}
                      name="CircleMinus"
                      className="h-5 w-5 text-danger-500 hover:cursor-pointer"
                    />
                  </div>

                  <div className="flex w-full gap-2">
                    <FormWizard
                      className="grid w-full grid-cols-2 gap-4 space-y-0"
                      fieldWrapperClassName="flex-grow"
                      config={[
                        {
                          label: "Material",
                          control,
                          type: InputTypes.SELECT,
                          name: `associatedManufacturers.${index}.material`,
                          required: true,
                          placeholder: "Material",
                          options: materialOptions?.filter(
                            (item2) =>
                              !typeValues?.some(
                                (item1) => item1.value === item2.value,
                              ),
                          ),
                          errors: {
                            message:
                              errors.associatedManufacturers?.[
                                index
                              ]?.material?.message?.toString(),
                            error:
                              !!errors.associatedManufacturers?.[index]
                                ?.material,
                          },
                        },
                        {
                          label: "Manufacturer",
                          control,
                          type: InputTypes.MULTI,
                          name: `associatedManufacturers.${index}.manufacturer`,
                          required: true,
                          placeholder: "Manufacturer",
                          options: currentManufacturerOptions, // Dynamically loaded options
                          errors: {
                            message:
                              errors.associatedManufacturers?.[
                                index
                              ]?.manufacturer?.message?.toString(),
                            error:
                              !!errors.associatedManufacturers?.[index]
                                ?.manufacturer,
                          },
                        },
                      ]}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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
            <span>Save Manufacturer</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Create;

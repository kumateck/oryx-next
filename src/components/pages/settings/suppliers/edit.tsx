"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button, Icon } from "@/components/ui";
import { COLLECTION_TYPES, Option, PermissionKeys, routes } from "@/lib";
import {
  CreateSupplierRequest,
  PostApiV1CollectionApiArg,
  PutApiV1ProcurementSupplierBySupplierIdApiArg,
  useGetApiV1MaterialAllQuery,
  useLazyGetApiV1ProcurementManufacturerMaterialByMaterialIdQuery,
  useLazyGetApiV1ProcurementSupplierBySupplierIdQuery,
  usePostApiV1CollectionMutation,
  usePutApiV1ProcurementSupplierBySupplierIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";
import PageTitle from "@/shared/title";

import VendorForm from "./form";
import {
  CreateVendorValidator,
  VendorRequestDto,
  mapAssociatedManufacturers,
} from "./types";
import { useUserPermissions } from "@/hooks/use-permission";
import NoAccess from "@/shared/no-access";

const Edit = () => {
  const router = useRouter();
  const { id } = useParams();
  const supplierId = id as string;
  // Rest of the existing code...
  const [updateMutation, { isLoading }] =
    usePutApiV1ProcurementSupplierBySupplierIdMutation();
  const [defaultValues, setDefaultValues] = useState<VendorRequestDto>();
  const [loadSupplierInfo] =
    useLazyGetApiV1ProcurementSupplierBySupplierIdQuery();

  // console.log(supplierInfo, "supplierInfo");
  const { data: materialResponse } = useGetApiV1MaterialAllQuery({});

  const materialOptions = materialResponse?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<VendorRequestDto>({
    resolver: CreateVendorValidator,
    mode: "all",
  });

  useEffect(() => {
    if (supplierId) {
      handleLoadSupplier(supplierId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierId]);

  const handleLoadSupplier = async (supplierId: string) => {
    const res = await loadSupplierInfo({ supplierId }).unwrap();

    const associatedManufacturers = res?.associatedManufacturers || [];

    const groupedManufacturers = associatedManufacturers.reduce(
      (acc, item) => {
        if (!item.material || !item.manufacturer) return acc;

        const materialKey = item.material.id as string;

        const materialEntry = {
          label: item.material.name as string,
          value: item.material.id as string,
        };

        const manufacturerEntry = {
          label: item.manufacturer.name as string,
          value: item.manufacturer.id as string,
        };

        if (!acc.has(materialKey)) {
          acc.set(materialKey, {
            material: materialEntry,
            defaultManufacturer: { label: "", value: "" },
            otherManufacturers: [] as { label: string; value: string }[],
          });
        }

        const entry = acc.get(materialKey)!;

        if (item.default) {
          entry.defaultManufacturer = manufacturerEntry;
        } else {
          entry.otherManufacturers.push(manufacturerEntry);
        }

        return acc;
      },
      new Map<
        string,
        {
          material: { label: string; value: string };
          defaultManufacturer: { label: string; value: string };
          otherManufacturers: { label: string; value: string }[];
        }
      >(),
    );

    const defaultSupplier = {
      address: res.address as string,
      name: res.name as string,
      contactPerson: res.contactPerson as string,
      contactNumber: res.contactNumber as string,
      email: res.email as string,
      country: {
        label: res.country?.name as string,
        value: res.country?.id as string,
      },
      currency: {
        label: res.currency?.name as string,
        value: res.currency?.id as string,
      },
      associatedManufacturers: Array.from(groupedManufacturers.values()),
    } as VendorRequestDto;

    console.log(defaultSupplier, "defaultSupplier");

    setDefaultValues(defaultSupplier);
    reset(defaultSupplier);
  };

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

  const [manufacturerOptionsMap, setManufacturerOptionsMap] = useState<{
    [key: string]: Option[];
  }>({}); // To store manufacturers by material ID
  const { fields, append, remove } = useFieldArray({
    control,
    name: "associatedManufacturers",
  });
  const [loadMaterialManufacturers] =
    useLazyGetApiV1ProcurementManufacturerMaterialByMaterialIdQuery();

  const associatedManufacturers = useWatch({
    control,
    name: "associatedManufacturers",
  });

  // Memoize derived values
  const typeValues = useMemo(() => {
    return associatedManufacturers?.map((item) => item?.material) || [];
  }, [associatedManufacturers]);

  // Memoize derived values
  const deManValues = useMemo(() => {
    return (
      associatedManufacturers?.map((item) => item?.defaultManufacturer) || []
    );
  }, [associatedManufacturers]);
  const onSubmit = async (data: VendorRequestDto) => {
    const associatedManufacturers = mapAssociatedManufacturers(
      data.associatedManufacturers,
    );
    try {
      const payload = {
        ...data,
        associatedManufacturers,
        type: data.country.label === "Ghana" ? 1 : 0,
        countryId: data.country.value,
        currencyId: data.currency.value,
      } satisfies CreateSupplierRequest;
      console.log(payload, "payload", data);
      await updateMutation({
        createSupplierRequest: payload,
        supplierId,
      } as PutApiV1ProcurementSupplierBySupplierIdApiArg);
      toast.success("Supplier updated successfully");
      router.push(routes.suppliers());
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
  //Check Permision
  const { hasPermissionAccess } = useUserPermissions();
  // check permissions access

  const hasAccess = hasPermissionAccess(
    PermissionKeys.procurement.updateVendorDetails,
  );

  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }
  return (
    <div className="h-full w-full bg-white p-5">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon
              name="ArrowLeft"
              onClick={onBack}
              className="cursor-pointer"
            />
            <PageTitle title={"Edit Supplier"} />
          </div>
          <div className="flex justify-end gap-4 py-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push(routes.suppliers())}
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
              <span>Save Changes</span>
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
          defaultValues={defaultValues}
          remove={remove}
          materialOptions={materialOptions}
          manufacturerOptionsMap={manufacturerOptionsMap}
          typeValues={typeValues}
          deManValues={deManValues}
          append={append}
        />
      </form>
    </div>
  );
};

export default Edit;

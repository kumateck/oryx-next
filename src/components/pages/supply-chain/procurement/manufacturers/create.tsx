// import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { COLLECTION_TYPES, InputTypes, Option } from "@/lib";
import {
  CreateManufacturerRequest,
  PostApiV1CollectionApiArg,
  useGetApiV1MaterialAllQuery,
  useLazyGetApiV1ProcurementManufacturerQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1ProcurementManufacturerMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateManufacturerValidator, ManufacturerRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const [reload] = useLazyGetApiV1ProcurementManufacturerQuery();
  const { data: materialResponse } = useGetApiV1MaterialAllQuery();

  const [createMutation, { isLoading }] =
    usePostApiV1ProcurementManufacturerMutation();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ManufacturerRequestDto>({
    resolver: CreateManufacturerValidator,
    mode: "all",
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
  const materialOptions = materialResponse?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  const onSubmit = async (data: ManufacturerRequestDto) => {
    try {
      const payload = {
        ...data,
        validityDate: data?.validityDate
          ? data?.validityDate?.toISOString()
          : "",
        materials: data?.materials?.map((item) => {
          return {
            materialId: item.value,
          };
        }),
        countryId: data?.country?.value,
      } satisfies CreateManufacturerRequest;
      await createMutation({
        createManufacturerRequest: payload,
      });
      toast.success("Manufacturer created successfully");
      reload({
        page: 1,
        pageSize: 10,
      });
      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Manufacturer</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
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
                register: { ...register("address") },
                label: "Address",
                placeholder: "Enter Address",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.address?.message,
                  error: !!errors.address,
                },
              },
              {
                label: "Country",
                control,
                type: InputTypes.SELECT,
                name: "country",
                required: true,
                onModal: true,
                placeholder: "Select Country",
                options: countryOptions,
                errors: {
                  message: errors.country?.message,
                  error: !!errors.country,
                },
              },
              {
                type: InputTypes.DATE,
                label: "Validity Date",
                name: `validityDate`,
                kind: "extensive",
                control,
                errors: {
                  message: errors.validityDate?.message,
                  error: !!errors.validityDate,
                },
                disabled: {
                  before: new Date(),
                },
              },
              {
                label: "Materials",
                control,
                type: InputTypes.MULTIPLE,
                name: "materials",
                required: true,
                onModal: true,
                placeholder: "Materials",
                options: materialOptions,
                errors: {
                  message: errors.materials?.message,
                  error: !!errors.materials,
                },
              },
            ]}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Save Manufacturer</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

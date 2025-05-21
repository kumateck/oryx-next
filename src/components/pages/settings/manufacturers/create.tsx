// import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { COLLECTION_TYPES, Option } from "@/lib";
import {
  CreateManufacturerRequest,
  PostApiV1CollectionApiArg,
  useGetApiV1MaterialAllQuery,
  usePostApiV1CollectionMutation,
  usePostApiV1ProcurementManufacturerMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import ManufacturerForm from "./form";
import { CreateManufacturerValidator, ManufacturerRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Create = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const { data: materialResponse } = useGetApiV1MaterialAllQuery({});

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
      }).unwrap();
      toast.success("Manufacturer created successfully");
      dispatch(commonActions.setTriggerReload());

      reset(); // Reset the form after submission
      onClose(); // Close the form/modal if applicable
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Manufacturer</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <ManufacturerForm
            register={register}
            control={control}
            countryOptions={countryOptions}
            materialOptions={materialOptions}
            errors={errors}
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
              <span>Save </span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;

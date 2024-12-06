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
  CreateMaterialRequest,
  MaterialDto,
  PostApiV1CollectionApiArg, // MaterialKind,
  // useGetApiV1CollectionByItemTypeQuery,
  useLazyGetApiV1MaterialQuery,
  usePostApiV1CollectionMutation,
  usePutApiV1MaterialByMaterialIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateRackValidator, RackRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: MaterialDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [loadMaterials] = useLazyGetApiV1MaterialQuery();

  const [createMaterial, { isLoading }] =
    usePutApiV1MaterialByMaterialIdMutation();
  // const { data } = useGetApiV1CollectionByItemTypeQuery({
  //   itemType: COLLECTION_TYPES.MaterialCategory,
  // });

  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.UnitOfMeasure, COLLECTION_TYPES.ProductCategory],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RackRequestDto>({
    resolver: CreateRackValidator,
    mode: "all",
    defaultValues: {
      name: details.name as string,
      description: details.description as string,
      location: details.description as string,
      code: details.code as string,
    },
  });

  const categoryOptions = collectionResponse?.[
    COLLECTION_TYPES.ProductCategory
  ]?.map((uom) => ({
    label: uom.name,
    value: uom.id,
  })) as Option[];

  const onSubmit = async (data: RackRequestDto) => {
    try {
      const payload = {
        ...data,
      } satisfies CreateMaterialRequest;
      await createMaterial({
        materialId: details.id as string,
        createMaterialRequest: payload,
      });
      toast.success("Material updated successfully");
      loadMaterials({
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
          <DialogTitle>Edit Material</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            config={[
              {
                label: "Location",
                control,
                type: InputTypes.SELECT,
                name: "locationId",
                required: true,

                options: categoryOptions,
                errors: {
                  message: errors.location?.message,
                  error: !!errors.location,
                },
              },
              {
                register: { ...register("name") },
                label: "Rack Name",
                required: true,
                placeholder: "Enter Rack Name",
                type: InputTypes.TEXT,

                errors: {
                  message: errors.name?.message,
                  error: !!errors.name,
                },
              },
              {
                register: { ...register("description") },
                label: "Description",
                required: true,
                placeholder: "Enter Description",
                type: InputTypes.TEXT,

                errors: {
                  message: errors.description?.message,
                  error: !!errors.description,
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
              <span>Update Material</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;

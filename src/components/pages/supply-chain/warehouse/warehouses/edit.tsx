// // import { useForm } from "react-hook-form";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { FormWizard } from "@/components/form-inputs";
// import {
//   Button,
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   Icon,
// } from "@/components/ui";
// import { InputTypes } from "@/lib";
// import {
//   CreateMaterialRequest,
//   MaterialDto,
//   useLazyGetApiV1MaterialQuery,
//   usePutApiV1MaterialByMaterialIdMutation,
// } from "@/lib/redux/api/openapi.generated";
// import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";
// import { CreateWarehouseValidator, WarehouseRequestDto } from "./types";
// // import "./types";
// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   details: MaterialDto;
// }
// const Edit = ({ isOpen, onClose, details }: Props) => {
//   const [loadMaterials] = useLazyGetApiV1MaterialQuery();
//   const [createMaterial, { isLoading }] =
//     usePutApiV1MaterialByMaterialIdMutation();
//   // const { data } = useGetApiV1CollectionByItemTypeQuery({
//   //   itemType: COLLECTION_TYPES.MaterialCategory,
//   // });
//   // const [loadCollection, { data: collectionResponse }] =
//   //   usePostApiV1CollectionMutation();
//   // useEffect(() => {
//   //   loadCollection({
//   //     body: [COLLECTION_TYPES.UnitOfMeasure, COLLECTION_TYPES.ProductCategory],
//   //   } as PostApiV1CollectionApiArg).unwrap();
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);
//   const {
//     register,
//     // control,
//     formState: { errors },
//     reset,
//     handleSubmit,
//   } = useForm<WarehouseRequestDto>({
//     resolver: CreateWarehouseValidator,
//     mode: "all",
//     defaultValues: {
//       name: details.name as string,
//       description: details.description as string,
//       code: details.code as string,
//     },
//   });
//   // const categoryOptions = collectionResponse?.[
//   //   COLLECTION_TYPES.ProductCategory
//   // ]?.map((uom) => ({
//   //   label: uom.name,
//   //   value: uom.id,
//   // })) as Option[];
//   const onSubmit = async (data: WarehouseRequestDto) => {
//     try {
//       const payload = {
//         ...data,
//       } satisfies CreateMaterialRequest;
//       await createMaterial({
//         materialId: details.id as string,
//         createMaterialRequest: payload,
//       });
//       toast.success("Material updated successfully");
//       loadMaterials({
//         page: 1,
//         pageSize: 10,
//       });
//       reset(); // Reset the form after submission
//       onClose(); // Close the form/modal if applicable
//     } catch (error) {
//       toast.error(isErrorResponse(error as ErrorResponse)?.description);
//     }
//   };
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit Material</DialogTitle>
//         </DialogHeader>
//         <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
//           <FormWizard
//             config={[
//               {
//                 label: "Kind",
//                 control,
//                 type: InputTypes.RADIO,
//                 name: `kind`,
//                 required: true,
//                 disabled: true,
//                 options: ["Raw", "Package"].map((option) => ({
//                   label: option,
//                   value: option,
//                 })),
//                 errors: {
//                   message: errors?.type?.message || "",
//                   error: !!errors?.type?.type,
//                 },
//               },
//               {
//                 register: { ...register("name") },
//                 label: "Warehouse Name",
//                 required: true,
//                 placeholder: "Edit Warehouse Name",
//                 type: InputTypes.TEXT,
//                 errors: {
//                   message: errors.name?.message,
//                   error: !!errors.name,
//                 },
//               },
//               {
//                 register: { ...register("description") },
//                 label: "Description",
//                 required: true,
//                 placeholder: "Edit Warehouse Description",
//                 type: InputTypes.TEXT,
//                 errors: {
//                   message: errors.name?.message,
//                   error: !!errors.name,
//                 },
//               },
//               // {
//               //   label: "Production Department",
//               //   control,
//               //   type: InputTypes.SELECT,
//               //   name: "departmentId",
//               //   required: true,
//               //   options: categoryOptions,
//               //   errors: {
//               //     message: errors.productionDepartment?.message,
//               //     error: !!errors.productionDepartment,
//               //   },
//               // },
//             ]}
//           />
//           <DialogFooter className="justify-end gap-4 py-6">
//             <Button type="button" variant="secondary" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button variant={"default"} className="flex items-center gap-2">
//               <Icon
//                 name={isLoading ? "LoaderCircle" : "Plus"}
//                 className={cn("h-4 w-4", {
//                   "animate-spin": isLoading,
//                 })}
//               />
//               <span>Update Material</span>{" "}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };
// export default Edit;
// import { useForm } from "react-hook-form";
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
import { InputTypes } from "@/lib";
import {
  CreateWarehouseRequest,
  WarehouseDto,
  WarehouseType,
  useLazyGetApiV1MaterialQuery,
  usePutApiV1MaterialByMaterialIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { CreateWarehouseValidator, WarehouseRequestDto } from "./types";

// import "./types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: WarehouseDto;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [loadMaterials] = useLazyGetApiV1MaterialQuery();

  const [createMaterial, { isLoading }] =
    usePutApiV1MaterialByMaterialIdMutation();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<WarehouseRequestDto>({
    resolver: CreateWarehouseValidator,
    mode: "all",
    defaultValues: {
      name: details.name as string,
      description: details.description as string,
      type: details?.type as WarehouseType,
      code: details.code as string,
    },
  });

  const onSubmit = async (data: WarehouseRequestDto) => {
    try {
      const payload = {
        ...data,
        type: data.type,
      } satisfies CreateWarehouseRequest;
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
                register: { ...register("code") },
                label: "Warehouse Code",
                readOnly: true,
                required: true,
                description: (
                  <span className="text-sm text-neutral-500">
                    You can’t change the warehouse code
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
                label: "Type",
                control,
                type: InputTypes.RADIO,
                name: `type`,
                required: true,
                disabled: true,
                options: ["Storage", "Production"].map((option) => ({
                  label: option,
                  value: option,
                })),
                errors: {
                  message: errors?.type?.message || "",
                  error: !!errors?.type?.type,
                },
              },
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
                register: { ...register("description") },
                label: "Description",
                placeholder: "Enter Description",
                type: InputTypes.TEXTAREA,

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

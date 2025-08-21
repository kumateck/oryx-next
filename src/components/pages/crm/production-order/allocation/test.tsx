// "use client";

// import { Button, Input } from "@/components/ui";
// import { SpecialSelect } from "@/components/ui/special-select";
// import { Option } from "@/lib";
// import {
//   ProductionOrderProductsDto,
//   useLazyGetApiV1ProductionScheduleApprovedProductsProductByProductIdQuery,
//   usePostApiV1ProductionScheduleAllocateProductsMutation,
// } from "@/lib/redux/api/openapi.generated";
// import ThrowErrorMessage from "@/lib/throw-error";
// import { format } from "date-fns";
// import React from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { toast } from "sonner";

// interface Product {
//   id: string;
//   productId: string;
//   name: string;
//   description: string;
//   batchId: string;
//   batchNo: string;
//   mfgDate: string;
//   expDate: string;
//   packSize: string;
//   qtyPerShipper: number;
//   batchStockQty: number;
//   totalOrderQuantity: number;
// }

// interface FormProduct extends Product {
//   totalPacks: number;
//   shipper: number;
//   loose: number;
// }

// interface FormData {
//   products: FormProduct[];
// }

// interface Props {
//   productOptions: ProductionOrderProductsDto[];
//   productionOrderId: string;
//   onClose: () => void;
// }
// const PharmaceuticalInventoryForm = ({
//   productOptions,
//   productionOrderId,
//   onClose,
// }: Props) => {
//   const { control, register, watch, setValue, handleSubmit } =
//     useForm<FormData>({
//       defaultValues: {
//         products: [],
//       },
//     });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "products",
//   });

//   const watchedProducts = watch("products");

//   const addProduct = (productId: string, batchId: string) => {
//     const product = batchInfo.find(
//       (p) => p.productId === productId && p.batchId === batchId,
//     );
//     if (product) {
//       const newProduct: FormProduct = {
//         ...product,
//         totalPacks: 0,
//         shipper: 0,
//         loose: 0,
//       };
//       append(newProduct);
//     }
//   };

//   const handleTotalPacksChange = (
//     index: number,
//     totalPacks: number,
//     available,
//   ) => {
//     if (totalPacks > available) {
//       toast.error("Total packs cannot be greater than available");
//       setValue(`products.${index}.totalPacks`, 0);
//       setValue(`products.${index}.shipper`, 0);
//       setValue(`products.${index}.loose`, 0);

//       return;
//     }

//     const product = watchedProducts[index];
//     if (product && totalPacks >= 0) {
//       const shipper = Math.floor(totalPacks / product.qtyPerShipper);
//       const loose = totalPacks % product.qtyPerShipper;

//       setValue(`products.${index}.totalPacks`, totalPacks);
//       setValue(`products.${index}.shipper`, shipper);
//       setValue(`products.${index}.loose`, loose);
//     }
//   };

//   const [saveMutation, { isLoading }] =
//     usePostApiV1ProductionScheduleAllocateProductsMutation();

//   //   const onSubmit = async (data: FormData) => {
//   //     console.log("Form Data:", data);
//   //     try {
//   //       await saveMutation({
//   //         allocateProductionOrderRequest: {
//   //           productionOrderId,
//   //           products: data.products?.map((product) => ({

//   //           }))
//   //         },
//   //       }).unwrap();

//   //       toast.success("Allocation created successfully");
//   //       onClose();
//   //     } catch (error) {
//   //       console.log(error, "error");
//   //       ThrowErrorMessage(error);
//   //     }
//   //   };

//   const buildPayload = (productionOrderId: string, batches: FormData) => {
//     // group batches by productId
//     if (!batches.products) {
//       throw new Error("No batches found");
//     }
//     const grouped = batches.products!.reduce(
//       (acc, batch) => {
//         if (!acc[batch.productId]) acc[batch?.productId] = [];
//         acc[batch.productId].push(batch);
//         return acc;
//       },
//       {} as Record<string, typeof batches>,
//     );

//     return {
//       productionOrderId,
//       products: Object.entries(grouped).map(([productId, productBatches]) => ({
//         productId,
//         fulfilledQuantities: productBatches?.map((b) => ({
//           finishedGoodsTransferNoteId: b.id,
//           quantity: b.totalOrderQuantity, // or use b.shipper * b.qtyPerShipper + b.loose if that's the allocation
//         })),
//       })),
//     };
//   };
//   const onSubmit = async (data: FormData) => {
//     console.log("Form Data:", data);
//     try {
//       await saveMutation({
//         allocateProductionOrderRequest: {
//           productionOrderId,
//           products: data?.map((item) => ({
//             productId: item.productId,
//             fulfilledQuantities: [
//               {
//                 finishedGoodsTransferNoteId: item.id, // noteId
//                 quantity: item.totalOrderQuantity, // allocate from order quantity or user-input qty
//               },
//             ],
//           })),
//         },
//       }).unwrap();

//       toast.success("Allocation created successfully");
//       onClose();
//     } catch (error) {
//       console.log(error, "error");
//       ThrowErrorMessage(error);
//     }
//   };
//   const getTotalPacks = () => {
//     return watchedProducts.reduce(
//       (sum, product) => sum + (product?.totalPacks || 0),
//       0,
//     );
//   };
//   const [loadApprovedProducts] =
//     useLazyGetApiV1ProductionScheduleApprovedProductsProductByProductIdQuery();

//   const handleLoadBatches = async (productId: string) => {
//     const findProduct = productOptions.find(
//       (item) => item.product?.id === productId,
//     );

//     try {
//       const response = await loadApprovedProducts({
//         productId,
//       }).unwrap();
//       console.log(response);
//       const batch = response.finishedGoodsTransferNotes
//         ?.filter((item) => item.isApproved)
//         ?.map((item) => {
//           const mfgDate = item.batchManufacturingRecord
//             ?.manufacturingDate as string;
//           const expDate = item.batchManufacturingRecord?.expiryDate as string;
//           return {
//             id: item.id as string,
//             batchId: item.batchManufacturingRecord?.id as string,
//             productId: item.batchManufacturingRecord?.product?.id as string,
//             description: item.batchManufacturingRecord?.product?.name as string,
//             batchNo: item.batchManufacturingRecord?.batchNumber as string,
//             mfgDate: mfgDate ? format(new Date(mfgDate), "MMM dd, yyyy") : "",
//             expDate: expDate ? format(new Date(expDate), "MMM dd, yyyy") : "",
//             packSize: `${item.batchManufacturingRecord?.product?.packPerShipper}x${item.batchManufacturingRecord?.product?.basePackingQuantity}`,
//             qtyPerShipper: item.quantityPerPack,
//             batchStockQty: item.remainingQuantity,
//             totalOrderQuantity: findProduct?.totalOrderQuantity,
//           };
//         });
//       setBatchInfo(batch);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const [batchInfo, setBatchInfo] = React.useState<any>([]);
//   const [selectedProduct, setSelectedProduct] = React.useState<Option>();

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-white">
//       <div className="mb-6">
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Add Product:
//           </label>
//           <div className="flex gap-4 items-center">
//             <SpecialSelect
//               value={selectedProduct}
//               onChange={(option) => {
//                 handleLoadBatches(option.value);
//                 setSelectedProduct(option);
//               }}
//               placeholder={"Select a product"}
//               options={
//                 productOptions?.map((item) => ({
//                   label: item.product?.name,
//                   value: item.product?.id,
//                 })) as Option[]
//               }
//             />
//             <SpecialSelect
//               onChange={(option) => {
//                 addProduct(selectedProduct?.value as string, option.value);
//               }}
//               placeholder={"Select a Batch"}
//               options={
//                 batchInfo?.map((item) => ({
//                   label: item.batchNo,
//                   value: item.id,
//                 })) as Option[]
//               }
//             />
//           </div>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-400">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   No
//                 </th>
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   Product Description
//                 </th>
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   Batch No
//                 </th>
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   Mfg Date
//                 </th>
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   Exp. Date
//                 </th>
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   Pack Size
//                 </th>
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   Ordered Qty
//                 </th>
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   Available Stock
//                 </th>
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   Qty Per Shipper
//                 </th>
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   Shipper
//                 </th>
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   Pack/(Loose)
//                 </th>
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   Total Packs
//                 </th>
//                 <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {fields.map((field, index) => (
//                 <tr key={field.id} className="hover:bg-gray-50">
//                   <td className="border border-gray-400 px-2 py-2 text-sm text-center">
//                     {index + 1}
//                   </td>
//                   <td className="border border-gray-400 px-2 py-2 text-sm">
//                     {field.description}
//                   </td>
//                   <td className="border border-gray-400 px-2 py-2 text-sm text-center">
//                     {field.batchNo}
//                   </td>
//                   <td className="border border-gray-400 px-2 py-2 text-sm text-center">
//                     {field.mfgDate}
//                   </td>
//                   <td className="border border-gray-400 px-2 py-2 text-sm text-center">
//                     {field.expDate}
//                   </td>
//                   <td className="border border-gray-400 px-2 py-2 text-sm text-center">
//                     {field.packSize}
//                   </td>
//                   <td className="border border-gray-400 px-2 py-2 text-sm text-center">
//                     {field.totalOrderQuantity}
//                   </td>
//                   <td className="border border-gray-400 px-2 py-2 text-sm text-center">
//                     {field.batchStockQty}
//                   </td>
//                   <td className="border border-gray-400 px-2 py-2 text-sm text-center">
//                     {field.qtyPerShipper}
//                   </td>
//                   <td className="border border-gray-400 px-2 py-2 text-sm text-center">
//                     <span className="font-medium">
//                       {watchedProducts[index]?.shipper || 0}
//                     </span>
//                   </td>
//                   <td className="border border-gray-400 px-2 py-2 text-sm text-center">
//                     <span className="font-medium">
//                       {watchedProducts[index]?.loose || 0}
//                     </span>
//                   </td>
//                   <td className="border border-gray-400 px-2 py-2">
//                     <Input
//                       type="number"
//                       min="0"
//                       {...register(`products.${index}.totalPacks`, {
//                         valueAsNumber: true,
//                         min: 0,
//                       })}
//                       onChange={(e) =>
//                         handleTotalPacksChange(
//                           index,
//                           parseInt(e.target.value) || 0,
//                           field.batchStockQty,
//                         )
//                       }
//                       placeholder="0"
//                     />
//                   </td>
//                   <td className="border border-gray-400 px-2 py-2 text-center">
//                     <Button
//                       type="button"
//                       variant={"destructive"}
//                       onClick={() => remove(index)}
//                     >
//                       Remove
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//               {fields.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={11}
//                     className="border border-gray-400 px-4 py-8 text-center text-gray-500"
//                   >
//                     No products added. Select a product from the dropdown above
//                     to add it to the table.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {fields.length > 0 && (
//           <div className="mt-6 flex justify-between items-center">
//             <div className="text-sm text-gray-600">
//               <span className="font-medium">
//                 Total Packs: {getTotalPacks()}
//               </span>
//             </div>
//             <div className="flex gap-4">
//               <Button
//                 variant={"ghost"}
//                 type="button"
//                 onClick={() => {
//                   setValue("products", []);
//                 }}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Clear All
//               </Button>
//               <Button
//                 type="button"
//                 onClick={handleSubmit(onSubmit)}
//                 className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Submit
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default PharmaceuticalInventoryForm;

"use client";

import React, { useState, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button, Input } from "@/components/ui";
import { SpecialSelect } from "@/components/ui/special-select";
import { Option, sanitizeNumber } from "@/lib";
import {
  ProductionOrderProductsDto,
  useLazyGetApiV1ProductionScheduleApprovedProductsProductByProductIdQuery,
  usePostApiV1ProductionScheduleAllocateProductsMutation,
  AllocateProductionOrderRequest,
} from "@/lib/redux/api/openapi.generated";
import ThrowErrorMessage from "@/lib/throw-error";

// ========================================
// Types & Interfaces
// ========================================

interface BatchInfo {
  id: string;
  batchId: string;
  productId: string;
  name: string;
  description: string;
  batchNo: string;
  mfgDate: string;
  expDate: string;
  packSize: string;
  qtyPerShipper: number;
  batchStockQty: number;
  totalOrderQuantity: number;
}

interface FormProduct extends BatchInfo {
  totalPacks: number;
  shipper: number;
  loose: number;
}

interface FormData {
  products: FormProduct[];
}

interface Props {
  productOptions: ProductionOrderProductsDto[];
  productionOrderId: string;
  onClose: () => void;
}

// ========================================
// Main Component
// ========================================

const PharmaceuticalInventoryForm: React.FC<Props> = ({
  productOptions,
  productionOrderId,
  onClose,
}) => {
  // ========================================
  // Hooks & State
  // ========================================

  const [batchInfo, setBatchInfo] = useState<BatchInfo[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Option>();

  const { control, register, watch, setValue, handleSubmit, reset } =
    useForm<FormData>({
      defaultValues: {
        products: [],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchedProducts = watch("products");

  // API Hooks
  const [loadApprovedProducts, { isLoading: isLoadingBatches }] =
    useLazyGetApiV1ProductionScheduleApprovedProductsProductByProductIdQuery();

  const [saveMutation, { isLoading: isSaving }] =
    usePostApiV1ProductionScheduleAllocateProductsMutation();

  // ========================================
  // Event Handlers
  // ========================================

  const handleLoadBatches = useCallback(
    async (productId: string) => {
      if (!productId) return;

      const findProduct = productOptions.find(
        (item) => item.product?.id === productId,
      );

      try {
        const response = await loadApprovedProducts({ productId }).unwrap();

        const batches =
          response.finishedGoodsTransferNotes
            ?.filter((item) => item.isApproved)
            ?.map((item): BatchInfo => {
              const mfgDate = item.batchManufacturingRecord?.manufacturingDate;
              const expDate = item.batchManufacturingRecord?.expiryDate;

              return {
                id: item.id || "",
                batchId: item.batchManufacturingRecord?.id || "",
                productId: item.batchManufacturingRecord?.product?.id || "",
                name: item.batchManufacturingRecord?.product?.name || "",
                description: item.batchManufacturingRecord?.product?.name || "",
                batchNo: item.batchManufacturingRecord?.batchNumber || "",
                mfgDate: mfgDate
                  ? format(new Date(mfgDate), "MMM dd, yyyy")
                  : "",
                expDate: expDate
                  ? format(new Date(expDate), "MMM dd, yyyy")
                  : "",
                packSize: `${item.batchManufacturingRecord?.product?.packPerShipper || 0}x${item.batchManufacturingRecord?.product?.basePackingQuantity || 0}`,
                qtyPerShipper: item.quantityPerPack || 0,
                batchStockQty:
                  sanitizeNumber(item.remainingQuantity) -
                  sanitizeNumber(item.pendingAllocatedQuantity),
                totalOrderQuantity: findProduct?.totalOrderQuantity || 0,
              };
            }) || [];

        setBatchInfo(batches);
      } catch (error) {
        console.error("Failed to load batches:", error);
        toast.error("Failed to load batch information");
        setBatchInfo([]);
      }
    },
    [loadApprovedProducts, productOptions],
  );

  const handleProductSelect = useCallback(
    (option: Option) => {
      setSelectedProduct(option);
      setBatchInfo([]); // Clear previous batches
      handleLoadBatches(option.value);
    },
    [handleLoadBatches],
  );

  const handleBatchSelect = useCallback(
    (option: Option) => {
      if (!selectedProduct) return;

      const batch = batchInfo.find((b) => b.id === option.value);
      if (!batch) return;

      // Check if batch already exists in form
      const existingIndex = fields.findIndex((field) => field.id === batch.id);
      if (existingIndex >= 0) {
        toast.error("This batch is already added to the table");
        return;
      }

      const newProduct: FormProduct = {
        ...batch,
        totalPacks: 0,
        shipper: 0,
        loose: 0,
      };

      append(newProduct);
    },
    [selectedProduct, batchInfo, fields, append],
  );

  const handleTotalPacksChange = useCallback(
    (index: number, totalPacks: number, availableStock: number) => {
      // Validate input
      if (totalPacks < 0) {
        setValue(`products.${index}.totalPacks`, 0);
        setValue(`products.${index}.shipper`, 0);
        setValue(`products.${index}.loose`, 0);
        return;
      }

      if (totalPacks > availableStock) {
        toast.error(
          `Total packs cannot exceed available stock (${availableStock})`,
        );
        setValue(`products.${index}.totalPacks`, 0);
        setValue(`products.${index}.shipper`, 0);
        setValue(`products.${index}.loose`, 0);
        return;
      }

      const product = watchedProducts[index];
      if (!product) return;

      const shipper = Math.floor(totalPacks / product.qtyPerShipper);
      const loose = totalPacks % product.qtyPerShipper;

      setValue(`products.${index}.totalPacks`, totalPacks);
      setValue(`products.${index}.shipper`, shipper);
      setValue(`products.${index}.loose`, loose);
    },
    [setValue, watchedProducts],
  );

  const handleClearAll = useCallback(() => {
    reset({ products: [] });
    setSelectedProduct(undefined);
    setBatchInfo([]);
  }, [reset]);

  const handleRemoveProduct = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  // ========================================
  // Form Submission
  // ========================================

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!data.products || data.products.length === 0) {
        toast.error("Please add at least one product");
        return;
      }

      // Validate that all products have quantities > 0
      const invalidProducts = data.products.filter((p) => p.totalPacks <= 0);
      if (invalidProducts.length > 0) {
        toast.error("Please enter valid quantities for all products");
        return;
      }

      try {
        const payload: AllocateProductionOrderRequest = {
          productionOrderId,
          products: data.products.map((item) => ({
            productId: item.productId,
            fulfilledQuantities: [
              {
                finishedGoodsTransferNoteId: item.id,
                quantity: item.totalPacks,
              },
            ],
          })),
        };

        console.log(payload, "payload");
        await saveMutation({
          allocateProductionOrderRequest: payload,
        }).unwrap();

        toast.success("Allocation created successfully");
        onClose();
      } catch (error) {
        console.error("Failed to save allocation:", error);
        ThrowErrorMessage(error);
      }
    },
    [productionOrderId, saveMutation, onClose],
  );

  // ========================================
  // Computed Values
  // ========================================

  const getTotalPacks = useCallback(() => {
    return watchedProducts.reduce(
      (sum, product) => sum + (product?.totalPacks || 0),
      0,
    );
  }, [watchedProducts]);

  const productSelectOptions: Option[] =
    productOptions?.map((item) => ({
      label: item.product?.name || "Unknown Product",
      value: item.product?.id || "",
    })) || [];

  const batchSelectOptions: Option[] = batchInfo.map((item) => ({
    label: item.batchNo,
    value: item.id,
  }));

  // ========================================
  // Render
  // ========================================

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Product Selection Section */}
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Product:
          </label>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <SpecialSelect
                value={selectedProduct}
                onChange={handleProductSelect}
                placeholder="Select a product"
                options={productSelectOptions}
                // disabled={isSaving}
              />
            </div>
            <div className="flex-1">
              <SpecialSelect
                onChange={handleBatchSelect}
                placeholder="Select a batch"
                options={batchSelectOptions}
                // disabled={!selectedProduct || isLoadingBatches || isSaving}
              />
            </div>
            {isLoadingBatches && (
              <div className="text-sm text-gray-500">Loading batches...</div>
            )}
          </div>
        </div>
      </div>

      {/* Products Table Section */}
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  #
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Product Description
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Batch No
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Mfg Date
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Exp. Date
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Pack Size
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Ordered Qty
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Available Stock
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Qty Per Shipper
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Shipper
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Pack/(Loose)
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Total Packs
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="hover:bg-gray-50">
                  <td className="border border-gray-400 px-2 py-2 text-sm text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-sm">
                    {field.description}
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-sm text-center">
                    {field.batchNo}
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-sm text-center">
                    {field.mfgDate}
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-sm text-center">
                    {field.expDate}
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-sm text-center">
                    {field.packSize}
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-sm text-center">
                    {field.totalOrderQuantity}
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-sm text-center">
                    {field.batchStockQty}
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-sm text-center">
                    {field.qtyPerShipper}
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-sm text-center">
                    <span className="font-medium">
                      {watchedProducts[index]?.shipper || 0}
                    </span>
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-sm text-center">
                    <span className="font-medium">
                      {watchedProducts[index]?.loose || 0}
                    </span>
                  </td>
                  <td className="border border-gray-400 px-2 py-2">
                    <Input
                      type="number"
                      min="0"
                      max={field.batchStockQty}
                      {...register(`products.${index}.totalPacks`, {
                        valueAsNumber: true,
                        min: 0,
                        max: field.batchStockQty,
                      })}
                      onChange={(e) =>
                        handleTotalPacksChange(
                          index,
                          parseInt(e.target.value) || 0,
                          field.batchStockQty,
                        )
                      }
                      placeholder="0"
                      disabled={isSaving}
                      className="w-20"
                    />
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveProduct(index)}
                      disabled={isSaving}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
              {fields.length === 0 && (
                <tr>
                  <td
                    colSpan={13}
                    className="border border-gray-400 px-4 py-8 text-center text-gray-500"
                  >
                    No products added. Select a product from the dropdown above
                    to add it to the table.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons Section */}
        {fields.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                Total Packs: {getTotalPacks()}
              </span>
            </div>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                type="button"
                onClick={handleClearAll}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Clear All
              </Button>
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSaving || fields.length === 0}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSaving ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmaceuticalInventoryForm;

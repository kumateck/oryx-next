// "use client";
// import React, { useEffect, useState } from "react";
// // import { useForm } from "react-hook-form";
// import { Button, Card, Label,  } from "@/components/ui";
// import { EMaterialKind, Option, quantityAvailable } from "@/lib";
// import {
//   useGetApiV1ProductionScheduleSchedulesQuery,
//   useLazyGetApiV1ProductionScheduleByScheduleIdDetailsQuery,
// } from "@/lib/redux/api/openapi.generated";
// import Purchase from "./purchase";
// import TableForData from "./table";
// import {
//   // CreateRequisitionValidator,
//   MaterialRequestDto, // RequisitionRequestDto,
// } from "./type";
// const Page = () => {
//   const { data: products } = useGetApiV1ProductionScheduleSchedulesQuery({
//     page: 1,
//     pageSize: 10000,
//   });
//   const [loadPlanning, { data: planning }] =
//     useLazyGetApiV1ProductionScheduleByScheduleIdDetailsQuery();
//   const productOptions = products?.data?.map((product) => ({
//     label: `${product?.code} - ${product?.product?.name}`,
//     value: product?.id,
//   }));
//   const [rawLists, setRawLists] = useState<MaterialRequestDto[]>([]);
//   const [packageLists, setPackageLists] = useState<MaterialRequestDto[]>([]);
//   const [purchaseLists, setPurchaseLists] = useState<MaterialRequestDto[]>([]);
//   const [enablePurchase, setEnablePurchase] = useState(false);
//   useEffect(() => {
//     if (planning) {
//       setEnablePurchase(!quantityAvailable(planning));
//       if (!quantityAvailable(planning)) {
//         const filteredMaterials = planning
//           .filter(
//             (item) =>
//               Number(item.quantityRequested) > Number(item.quantityOnHand),
//           )
//           ?.map((material) => ({
//             code: material.material?.code,
//             materialName: material.material?.name,
//             materialId: material.material?.id,
//             uom: material.uoM?.name,
//             quantityOnHand: material.quantityOnHand,
//             quantityRequested: material.quantityRequested,
//             quantity: material.quantityRequested,
//             totalStock: material.material?.totalStock,
//             uomId: material.uoM?.id,
//           })) as unknown as MaterialRequestDto[];
//         setPurchaseLists(filteredMaterials);
//       }
//       const raw = planning
//         ?.filter((item) => item.material?.kind === EMaterialKind.Raw)
//         ?.map((material) => ({
//           code: material.material?.code,
//           materialName: material.material?.name,
//           materialId: material.material?.id,
//           uom: material.uoM?.name,
//           quantityOnHand: material.quantityOnHand,
//           quantityRequested: material.quantityRequested,
//           totalStock: material.material?.totalStock,
//           uomId: material.uoM?.id,
//         })) as unknown as MaterialRequestDto[];
//       const packagings = planning
//         ?.filter((item) => item.material?.kind === EMaterialKind.Package)
//         ?.map((material) => ({
//           code: material.material?.code,
//           materialName: material.material?.name,
//           materialId: material.material?.id,
//           uom: material.uoM?.name,
//           quantityOnHand: material.quantityOnHand,
//           quantityRequested: material.quantityRequested,
//           totalStock: material.material?.totalStock,
//           uomId: material.uoM?.id,
//         })) as unknown as MaterialRequestDto[];
//       setRawLists(raw);
//       setPackageLists(packagings);
//     }
//   }, [planning]);
//   // const {
//   //   control,
//   //   handleSubmit,
//   //   register,
//   //   // setValue,
//   //   formState: { errors },
//   // } = useForm<RequisitionRequestDto>({
//   //   resolver: CreateRequisitionValidator,
//   //   mode: "all",
//   // });
//   // const onSubmit = () => {};
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="space-y-4">
//       {/* <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}> */}
//       <div className="flex w-full justify-between gap-4">
//         <span className="text-2xl font-semibold">Requisitions</span>
//         {/* <Button className="flex gap-2" variant={"primary"}>
//             <span>Save</span>
//           </Button> */}
//       </div>
//       {enablePurchase && isOpen && (
//         <Purchase
//           lists={purchaseLists}
//           onClose={() => setIsOpen(false)}
//           isOpen={isOpen}
//         />
//       )}
//       <Card className="p-5">
//         <div className="grid grid-cols-2 gap-4">
//           <div className="w-full space-y-2">
//             <div>
//               <Label>Load Production Schedule</Label>
//               <SelectDropDown
//                 options={productOptions}
//                 onChange={async (opt) => {
//                   const option = opt as Option;
//                   await loadPlanning({
//                     scheduleId: option.value,
//                   }).unwrap();
//                 }}
//               />
//             </div>
//           </div>
//           <div className="flex w-full justify-end gap-2">
//             {planning && (
//               <div>
//                 {enablePurchase && planning.length > 0 ? (
//                   <Button variant={"secondary"} onClick={() => setIsOpen(true)}>
//                     {" "}
//                     Purchase Requisition
//                   </Button>
//                 ) : (
//                   <Button variant={"primary"}>Stock Requisition</Button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </Card>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label>Raw Material</Label>
//           <TableForData lists={rawLists} setItemLists={setRawLists} />
//         </div>
//         <div className="space-y-2">
//           <Label>Packaging Material</Label>
//           <TableForData lists={packageLists} setItemLists={setPackageLists} />
//         </div>
//       </div>
//       {/* </form> */}
//     </div>
//   );
// };
// export default Page;
import React from "react";

const Page = () => {
  return <div>Page</div>;
};

export default Page;

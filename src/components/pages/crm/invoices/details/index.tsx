// "use client";
// import PageWrapper from "@/components/layout/wrapper";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   Icon,
//   CardContent,
//   Button,
// } from "@/components/ui";

// import PageTitle from "@/shared/title";
// import { ListsTable } from "@/shared/datatable";
// import { columns } from "./columns";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect } from "react";
// import ItemsDetailsSkeleton from "./skeletone";

// function Index() {
//   // const [loadInvoice, { data, isLoading }] =
//   //   useLazyGetApiV1ProductionOrdersInvoicesByIdQuery();
//   const { id } = useParams();
//   const router = useRouter();

//   useEffect(() => {
//     if (id) {
//       loadInvoice({ id: id as string });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const imageExtensions = ["jpg", "jpeg", "png", "gif"];
//   const allImagesDoc = data?.attachments?.filter((att) => {
//     const ext = att?.name?.split(".").pop()?.toLowerCase();
//     return ext ? imageExtensions.includes(ext) : false;
//   });
//   const otherDocs = data?.attachments?.filter((att) => {
//     const ext = att?.name?.split(".").pop()?.toLowerCase();
//     return ext ? !imageExtensions.includes(ext) : false;
//   });

//   if (isLoading) return <ItemsDetailsSkeleton />;

//   return (
//     <PageWrapper className="space-y-4">
//       <div className="flex items-center justify-between gap-3">
//         <div className="flex items-center gap-2">
//           <div onClick={() => router.back()}>
//             <Icon name="ArrowLeft" className="h-4 w-4" />
//           </div>
//           <PageTitle title="Invoice Details" />
//         </div>
//         <Button>
//           <Icon name="Plus" className="h-4 w-4" />
//           <span>Create Shipment</span>
//         </Button>
//       </div>
//       {data ? (
//         <>
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold">
//                 Invoice Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <span>Customer Name:</span>
//                   <span className="font-semibold text-lg whitespace-nowrap">
//                     {data?.proformaInvoice?.productionOrder?.customer?.name}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span>Invoice Number:</span>
//                   <span className="font-semibold text-lg whitespace-nowrap">
//                     {data?.proformaInvoice?.productionOrder?.code}
//                   </span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold">
//                 Invoice Items
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ListsTable
//                 data={data?.proformaInvoice?.products ?? []}
//                 columns={columns}
//               />
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold uppercase">
//                 Attachments
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid md:grid-cols-3 gap-2 sm:grid-cols-2 grid-cols-1">
//                 {allImagesDoc &&
//                   allImagesDoc.length > 0 &&
//                   allImagesDoc.map((att) => {
//                     return (
//                       <div
//                         key={att.name}
//                         className="flex w-full items-center gap-3 rounded-2xl border bg-neutral-50 "
//                       >
//                         {/* eslint-disable-next-line @next/next/no-img-element */}
//                         <img
//                           src={att.link ?? ""}
//                           alt={att.name ?? "Service Attachment"}
//                           loading="lazy"
//                           className="w-full min-h-40 md:min-h-48 h-full rounded-lg object-cover"
//                         />
//                       </div>
//                     );
//                   })}
//               </div>
//               <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-2 grid-cols-1">
//                 {otherDocs &&
//                   otherDocs.length > 0 &&
//                   otherDocs.map((att) => {
//                     return (
//                       <div
//                         key={att.name}
//                         className="flex w-full items-center gap-3 rounded-2xl border border-primary-default bg-neutral-50 px-4 py-4"
//                       >
//                         <div className="bg-secondary-500 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
//                           <Icon name="FileText" className="text-primary-500" />
//                         </div>
//                         <div className="flex w-full flex-col">
//                           <span className="text-base text-neutral-900">
//                             {att.name}
//                           </span>
//                           {/* <span className="text-sm text-neutral-500">{att.size}</span> */}
//                         </div>
//                       </div>
//                     );
//                   })}
//               </div>
//               {!data?.attachments ||
//                 (data?.attachments?.length === 0 && (
//                   <div className="flex h-full w-full items-center justify-center">
//                     <span className="text-gray-500">
//                       No documents available.
//                     </span>
//                   </div>
//                 ))}
//             </CardContent>
//           </Card>{" "}
//         </>
//       ) : (
//         <div className="flex h-full w-full items-center justify-center">
//           <span className="text-gray-500">No data available.</span>
//         </div>
//       )}
//     </PageWrapper>
//   );
// }

// export default Index;

import React from "react";

const Page = () => {
  return <div>Page</div>;
};

export default Page;

// "use client";
// import {
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   Icon,
// } from "@/components/ui";
// import { useLazyGetApiV1ProductionOrdersInvoicesByIdQuery } from "@/lib/redux/api/openapi.generated";
// import ScrollablePageWrapper from "@/shared/page-wrapper";
// import PageTitle from "@/shared/title";
// import { useParams, useRouter } from "next/navigation";
// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { CreateWaybillSchema, CreateWaybillValidator } from "./types";
// import Form from "./form";

// function Page() {
//   const [loadInvoiceDetails, { data }] =
//     useLazyGetApiV1ProductionOrdersInvoicesByIdQuery();
//   const router = useRouter();
//   const { id } = useParams();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     setValue,
//   } = useForm<CreateWaybillSchema>({
//     resolver: CreateWaybillValidator,
//   });

//   useEffect(() => {
//     if (id) {
//       loadInvoiceDetails({ id: id as string });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   useEffect(() => {
//     if (data) {
//       // setValue("date", data.proformaInvoice.createdAt);
//       // setValue("time", data.proformaInvoice.);
//       // TODO: AUTO-GENERATE OR ALLOW WAYLBILL NUMBER TO BE ENTERE MANUALLY
//       // setValue("waybillNumber", data.waybillNumber);
//       // setValue("customerName", data.proformaInvoice.customerName);
//       // setValue("customerAddress", data.proformaInvoice.customer.address);
//     }
//   }, [data, setValue]);

//   const onSubmit = async (data: CreateWaybillSchema) => {
//     // Handle form submission
//     console.log(data);
//   };

//   return (
//     <ScrollablePageWrapper className="space-y-4">
//       <div className="flex items-center gap-2">
//         <div onClick={() => router.back()} className="cursor-pointer">
//           <Icon name="ArrowLeft" className="h-4 w-4" />
//         </div>
//         <PageTitle title="Create Waybill" />
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Waybill Information</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Form register={register} control={control} errors={errors} />
//             <div className="flex w-full justify-end">
//               <Button className="mt-4 ml-auto">Submit</Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//       {/* TODO: dispaly the tablar content for the waybill batch products */}
//     </ScrollablePageWrapper>
//   );
// }

// export default Page;

import React from "react";

const Page = () => {
  return <div>Page</div>;
};

export default Page;

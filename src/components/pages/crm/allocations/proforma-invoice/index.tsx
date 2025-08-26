import {
  Dialog,
  DialogHeader,
  Button,
  DialogContent,
  DialogTitle,
  // Icon,
} from "@/components/ui";
// import ProFormalInvoiceForm from "./form";
// import { useForm, useFieldArray } from "react-hook-form";
// import { CreateInvoiceSchema, CreateInvoiceSchemaValidator } from "./type";
// import { isErrorResponse, ErrorResponse } from "@/lib";
// import { usePostApiV1ProductionOrdersProformaInvoicesMutation } from "@/lib/redux/api/openapi.generated";
// import { toast } from "sonner";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   details: CreateInvoiceSchema;
// }
// function CreateProFormalInvoice({ isOpen, onClose, details }: Props) {
//   const [createProFormalInvoice, { isLoading }] =
//     usePostApiV1ProductionOrdersProformaInvoicesMutation();

//   const {
//     register,
//     control,
//     reset,
//     formState: { errors },
//     handleSubmit,
//   } = useForm<CreateInvoiceSchema>({
//     resolver: CreateInvoiceSchemaValidator,
//     defaultValues: details,
//   });

//   const { fields } = useFieldArray({
//     control,
//     name: "products",
//   });

//   const onSubmit = async (data: CreateInvoiceSchema) => {
//     try {
//       await createProFormalInvoice({
//         createProformaInvoice: {
//           productionOrderId: data.productionOrderId,
//           products: data.products.map((product) => ({
//             productId: product.productId,
//             quantity: product.quantity,
//           })),
//         },
//       }).unwrap();
//       toast.success("Proforma invoice created successfully");
//       onClose();
//       reset();
//     } catch (error) {
//       toast.error(
//         isErrorResponse(error as ErrorResponse)?.description ||
//           "Error occurred while creating Proforma invoice. Try again later.",
//       );
//     }
//   };
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create Proforma Invoice</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <ProFormalInvoiceForm
//             control={control}
//             fields={fields}
//             register={register}
//             errors={errors}
//           />
//           <DialogFooter>
//             <Button disabled={isLoading} type="button" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button
//               className="flex items-center gap-1"
//               type="submit"
//               disabled={isLoading}
//             >
//               <Icon
//                 name={isLoading ? "LoaderCircle" : "Plus"}
//                 className={isLoading ? "animate-spin" : ""}
//               />
//               {isLoading ? "Creating..." : "Create"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default CreateProFormalInvoice;

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { AllocateProductionOrderDtoRead } from "@/lib/redux/api/openapi.generated";
import { extractInvoiceData } from "./utils";
import { format } from "date-fns";
// import { toast } from "sonner";
// import ThrowErrorMessage from "@/lib/throw-error";

// // Data extraction function

// Sample data (based on your JSON)

interface ProformaInvoiceProps {
  data?: AllocateProductionOrderDtoRead;
  isOpen: boolean;
  onClose: () => void;
}

const ProformaInvoice: React.FC<ProformaInvoiceProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  // const [createProFormalInvoice, { isLoading }] =
  //   usePostApiV1ProductionOrdersProformaInvoicesMutation();

  // Extract the invoice data using our function
  const invoiceData = extractInvoiceData(
    data as AllocateProductionOrderDtoRead,
  );

  // const onSubmit = async () => {
  //   try {
  //     await createProFormalInvoice({
  //       createProformaInvoice: {
  //         productionOrderId: data?.productionOrder?.id as string,
  //         products: invoiceData?.products.map((product) => ({
  //           productId: product.id as string,
  //           quantity: product.fulfilledQuantity,
  //         })),
  //       },
  //     }).unwrap();
  //     toast.success("Proforma invoice created successfully");
  //     onClose();
  //   } catch (error) {
  //     ThrowErrorMessage(error);
  //   }
  // };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl rounded-none" noClose>
        <div className="absolute -right-36 flex flex-col gap-4">
          {/* <Button variant="outline" onClick={() => onSubmit()}>
            {isLoading ? (
              <Icon name="LoaderCircle" className="animate-spin" />
            ) : (
              <Icon name="Printer" />
            )}
            <span>Submit</span>
          </Button> */}
          <Button variant="destructive" onClick={() => onClose()}>
            <span>Close</span>
          </Button>
        </div>

        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className=" ">
          {/* Header */}

          <div className="p-8">
            {/* Bill To Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Bill To
                </h3>
                <div className="space-y-2">
                  <div className="font-medium text-gray-900">
                    {invoiceData?.customer.name}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{invoiceData?.customer.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} className="text-gray-400" />
                    <span>{invoiceData?.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} className="text-gray-400" />
                    <span>{invoiceData?.customer.phone}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Order Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Production Order:</span>
                    <span className="font-medium">
                      {invoiceData?.orderCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">
                      {invoiceData?.orderDate
                        ? format(new Date(invoiceData.orderDate), "dd/MM/yyyy")
                        : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        invoiceData?.isApproved
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {invoiceData?.isApproved ? "Approved" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Items
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">
                        Product Code
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">
                        Description
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-700">
                        Quantity
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-right font-semibold text-gray-700">
                        Unit Price
                      </th>
                      <th className="border border-gray-200 px-4 py-3 text-right font-semibold text-gray-700">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData?.products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-3 font-mono text-sm">
                          {product.code}
                        </td>
                        <td className="border border-gray-200 px-4 py-3">
                          {product.name}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-center">
                          {product.fulfilledQuantity.toLocaleString()}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-right">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-right font-semibold">
                          ${product.totalValue.toLocaleString()}.00
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end mb-8">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">
                      ${invoiceData?.totalAmount.toLocaleString()}.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax (0%):</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-gray-800">
                      Total Amount:
                    </span>
                    <span className="font-bold text-blue-600">
                      ${invoiceData?.totalAmount.toLocaleString()}.00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Notes */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Terms & Conditions
                </h3>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-gray-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      This is a proforma invoice for estimation purposes only
                    </li>
                    <li>Prices are valid for 30 days from the invoice date</li>
                    <li>Payment terms: Net 30 days from delivery</li>
                    <li>
                      All products are subject to quality control approval
                    </li>
                    <li>Storage conditions must be maintained as specified</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Product Information
                </h3>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-sm text-gray-700">
                  <div className="space-y-2">
                    {invoiceData?.products.map((product) => (
                      <div key={product.id}>
                        <strong>
                          {product.name} ({product.code}):
                        </strong>
                        {` Storage: ${product.storageCondition} | Shelf Life: ${product.shelfLife}`}
                        {product.labelClaim &&
                          ` | Label: ${product.labelClaim}`}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>
                Thank you for your business. For any questions, please contact
                our sales team.
              </p>
              <p className="mt-1">
                Generated on {new Date().toLocaleDateString("en-GB")} at{" "}
                {new Date().toLocaleTimeString("en-GB")}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Export the extraction function for external use

export default ProformaInvoice;

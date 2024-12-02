// import { useState } from "react";
// import { restApi } from "~/redux/api";
// import { modelActions } from "~/redux/slices/models";
// import { useDispatch } from "~/redux/store";
// import { NoIconStepper } from "@/app/shared/no-icon-stepper";
// import { Button } from "@/components/ui";
// import { ErrorResponse } from "@/lib";
// import BOM from "./bom";
// import { BomRequestDto } from "./bom/types";
// import FinishedGoods from "./finished-goods";
// import { FinishedRequestDto } from "./finished-goods/types";
// import Packaging from "./packaging";
// import { PackagingRequestDto } from "./packaging/types";
// import ProductInfo, { ProductDetailProps } from "./product";
// import Routing from "./routing";
// import { RoutingRequestDto } from "./routing/types";
// import ScrollablePageWrapper from "@/app/shared/page-wrapper";
// import { useParams } from "next/navigation";
// const Page = () => {
//   const { id: productId } = useParams();
//   const [loadProductById, { data: product }] =
//     restApi.useLazyGetProductByIdQuery();
//   const loadProductByIdHandler = () =>
//     loadProductById({ productId: productId as string });
//   const loader = useLoaderData() as unknown as {
//     defaultProduct: ProductDetailProps;
//     codeConfigError: ErrorResponse;
//     defaultCode?: string;
//     defaultFinishedGoods: FinishedRequestDto[];
//     defaultBillOfMaterials: BomRequestDto[];
//     defaultPackaging: PackagingRequestDto[];
//     defaultRouting: RoutingRequestDto[];
//   };
//   const defaultFinishedGoods = product?.finishedProducts?.map((fp) => ({
//     ...fp,
//     uoMId: {
//       label: fp.uoM?.name as string,
//       value: fp.uoM?.id as string,
//     },
//   })) as FinishedRequestDto[];
//   const defaultBillOfMaterials =
//     product?.currentBillOfMaterial?.billOfMaterial?.items?.map((bom) => ({
//       ...bom,
//       componentMaterialId: {
//         label: bom.componentMaterial?.name as string,
//         value: bom.componentMaterial?.id as string,
//       },
//       materialTypeId: {
//         label: bom.materialType?.name as string,
//         value: bom.materialType?.id as string,
//       },
//     })) as BomRequestDto[];
//   const defaultPackaging = product?.packages?.map((p) => ({
//     ...p,
//     materialId: {
//       label: p.material?.name as string,
//       value: p.material?.id as string,
//     },
//     packageTypeId: {
//       label: p.packageType?.name as string,
//       value: p.packageType?.id as string,
//     },
//   })) as PackagingRequestDto[];
//   const defaultRouting = product?.routes?.map((r) => ({
//     ...r,
//     resourceIds: r.resources?.map((res) => {
//       return {
//         label: res.name as string,
//         value: res.id as string,
//       };
//     }),
//     operationId: {
//       label: r.operation?.name as string,
//       value: r.operation?.id as string,
//     },
//     workCenterId: {
//       label: r.workCenter?.name as string,
//       value: r.workCenter?.id as string,
//     },
//   })) as RoutingRequestDto[];
//   const defaultProduct: ProductDetailProps = {
//     code: product?.code,
//     name: product?.name,
//     description: product?.description,
//     categoryId: {
//       label: product?.category?.name as string,
//       value: product?.category?.id as string,
//     },
//   };
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(0);
//   const STEPS = [
//     {
//       title: "Product Information",
//       description:
//         "Please add your content here. Keep it short and simple. And smile :)",
//       content: (
//         <ProductInfo
//           productId={productId}
//           loadProductById={loadProductByIdHandler}
//           productDetail={
//             defaultProduct?.code ? defaultProduct : loader.defaultProduct
//           }
//         />
//       ),
//     },
//     {
//       title: "Finished Goods",
//       description:
//         "Please add your content here. Keep it short and simple. And smile :)",
//       content: (
//         <FinishedGoods
//           productId={productId}
//           loadProductById={loadProductByIdHandler}
//           finishedGoodsLists={
//             defaultFinishedGoods || loader.defaultFinishedGoods
//           }
//         />
//       ),
//     },
//     {
//       title: "Bill of Materials",
//       description:
//         "Please add your content here. Keep it short and simple. And smile :)",
//       content: (
//         <BOM
//           loadProductById={loadProductByIdHandler}
//           productId={productId}
//           bomLists={(
//             defaultBillOfMaterials || loader.defaultBillOfMaterials
//           )?.map((item, idx) => {
//             return {
//               ...item,
//               id: `${idx + 1}`,
//             };
//           })}
//         />
//       ),
//     },
//     {
//       title: "Packaging",
//       description:
//         "Please add your content here. Keep it short and simple. And smile :)",
//       content: (
//         <Packaging
//           loadProductById={loadProductByIdHandler}
//           productId={productId}
//           packagingLists={defaultPackaging || loader.defaultPackaging}
//         />
//       ),
//     },
//     {
//       title: "Routing",
//       description:
//         "Please add your content here. Keep it short and simple. And smile :)",
//       content: (
//         <Routing
//           loadProductById={loadProductByIdHandler}
//           productId={productId}
//           routingLists={(defaultRouting || loader.defaultRouting)?.map(
//             (item, idx) => {
//               return {
//                 ...item,
//                 id: `${idx + 1}`,
//               };
//             },
//           )}
//         />
//       ),
//     },
//   ];
//   return (
//     <ScrollablePageWrapper className="w-full pr-12">
//       <div className="w-full space-y-4">
//         <span className="text-xl font-semibold text-black">
//           Product Planning
//         </span>
//       </div>
//       <NoIconStepper
//         classNames={{
//           activeClassName: "after:border-secondary-200",
//         }}
//         currentStep={currentStep}
//         steps={STEPS}
//         setCurrentStep={setCurrentStep}
//         leftBtns={
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => {
//               dispatch(modelActions.resetModelId());
//               navigate(-1);
//             }}
//           >
//             Cancel
//           </Button>
//         }
//         // rightBtns={<div>right</div>}
//       >
//         {STEPS[currentStep].content}
//       </NoIconStepper>
//     </ScrollablePageWrapper>
//   );
// };
// export default Page;
import React from "react";

const Page = () => {
  return <div>Edit Page</div>;
};

export default Page;

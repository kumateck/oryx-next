import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components/ui";
import { ProductDtoRead } from "@/lib/redux/api/openapi.generated";
import { Database, FlaskConical, Microscope, Package } from "lucide-react";
import React from "react";

interface Props {
  product?: ProductDtoRead;
}
const ProductInfo = ({ product }: Props) => {
  return (
    <Card className="w-full  mx-auto shadow-md rounded-2xl border bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" /> {product?.name}
          </CardTitle>
          <Badge variant="outline">{product?.code}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{product?.description}</p>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-3 gap-6 p-4">
        {/* General Info */}
        <div className="space-y-3">
          <h3 className="text-base font-medium flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-blue-500" /> General Info
          </h3>
          <ul className="text-sm space-y-1">
            <li>
              <span className="font-medium">Category:</span>{" "}
              {product?.category?.name}
            </li>
            <li>
              <span className="font-medium">Package Style:</span>{" "}
              {product?.packageStyle}
            </li>
            <li>
              <span className="font-medium">Label Claim:</span>{" "}
              {product?.labelClaim}
            </li>
            <li>
              <span className="font-medium">Filled Weight:</span>{" "}
              {product?.filledWeight}
            </li>
            <li>
              <span className="font-medium">Shelf Life:</span>{" "}
              {product?.shelfLife}
            </li>
            <li>
              <span className="font-medium">Storage:</span>{" "}
              {product?.storageCondition}
            </li>
          </ul>
        </div>

        {/* Batch & UoM */}
        <div className="space-y-3">
          <h3 className="text-base font-medium flex items-center gap-2">
            <Database className="w-4 h-4 text-green-600" /> Batch & Units
          </h3>
          <ul className="text-sm space-y-1">
            <li>
              <span className="font-medium">Base Quantity:</span>{" "}
              {product?.baseQuantity} {product?.baseUoM?.symbol}
            </li>
            <li>
              <span className="font-medium">Packing Quantity:</span>{" "}
              {product?.basePackingQuantity} {product?.basePackingUoM?.symbol}
            </li>
            <li>
              <span className="font-medium">Batch Size:</span>{" "}
              {product?.fullBatchSize}
            </li>
            <li>
              <span className="font-medium">Pack/Shipper:</span>{" "}
              {product?.packPerShipper}
            </li>
            <li>
              <span className="font-medium">Price:</span> ${product?.price}
            </li>
          </ul>
        </div>

        {/* Equipment Info */}
        <div className=" space-y-3">
          <h3 className="text-base font-medium flex items-center gap-2">
            <Microscope className="w-4 h-4 text-purple-600" /> Equipment
          </h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {product?.equipment?.name}
              </p>
              <p>
                <span className="font-medium">Machine ID:</span>{" "}
                {product?.equipment?.machineId}
              </p>
              <p>
                <span className="font-medium">Capacity:</span>{" "}
                {product?.equipment?.capacityQuantity}
              </p>
            </div>
            <div className="space-y-1">
              <p>
                <span className="font-medium">Department:</span>{" "}
                {product?.equipment?.department?.name}
              </p>
              <p>
                <span className="font-medium">Storage Location:</span>{" "}
                {product?.equipment?.storageLocation}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInfo;

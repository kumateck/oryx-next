"use client";

import { Button, Input } from "@/components/ui";
import { SpecialSelect } from "@/components/ui/special-select";
import { Option } from "@/lib";
import { useLazyGetApiV1ProductionScheduleApprovedProductsProductByProductIdQuery } from "@/lib/redux/api/openapi.generated";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

interface Product {
  id: string;
  description: string;
  batchNo: string;
  mfgDate: string;
  expDate: string;
  packSize: string;
  qtyPerShipper: number;
}

interface FormProduct extends Product {
  totalPacks: number;
  shipper: number;
  loose: number;
}

interface FormData {
  products: FormProduct[];
  vehicleNo: string;
  date: string;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    description: "ANCIGEL O+",
    batchNo: "L033013",
    mfgDate: "06/2025",
    expDate: "05/2027",
    packSize: "30X200ML",
    qtyPerShipper: 30,
  },
  {
    id: "2",
    description: "ANCIGEL O+",
    batchNo: "L033015",
    mfgDate: "06/2025",
    expDate: "05/2027",
    packSize: "30X200ML",
    qtyPerShipper: 30,
  },
  {
    id: "3",
    description: "ENTRANCE ANTACID",
    batchNo: "L019010",
    mfgDate: "06/2025",
    expDate: "05/2028",
    packSize: "30X150ML",
    qtyPerShipper: 30,
  },
  {
    id: "4",
    description: "TOBCEE SYRUP",
    batchNo: "L044003",
    mfgDate: "06/2025",
    expDate: "05/2027",
    packSize: "60X100ML",
    qtyPerShipper: 60,
  },
  {
    id: "5",
    description: "XTRIM SUSP.",
    batchNo: "L003001",
    mfgDate: "07/2025",
    expDate: "06/2028",
    packSize: "60X100ML",
    qtyPerShipper: 60,
  },
];

interface Props {
  productOptions: Option[];
}
const PharmaceuticalInventoryForm = ({ productOptions }: Props) => {
  const { control, register, watch, setValue, handleSubmit } =
    useForm<FormData>({
      defaultValues: {
        products: [],
        vehicleNo: "",
        date: "09/07/2025",
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchedProducts = watch("products");

  const addProduct = (productId: string) => {
    const product = PRODUCTS_DATA.find((p) => p.id === productId);
    if (product) {
      const newProduct: FormProduct = {
        ...product,
        totalPacks: 0,
        shipper: 0,
        loose: 0,
      };
      append(newProduct);
    }
  };

  const handleTotalPacksChange = (index: number, totalPacks: number) => {
    const product = watchedProducts[index];
    if (product && totalPacks >= 0) {
      const shipper = Math.floor(totalPacks / product.qtyPerShipper);
      const loose = totalPacks % product.qtyPerShipper;

      setValue(`products.${index}.totalPacks`, totalPacks);
      setValue(`products.${index}.shipper`, shipper);
      setValue(`products.${index}.loose`, loose);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  const getTotalPacks = () => {
    return watchedProducts.reduce(
      (sum, product) => sum + (product?.totalPacks || 0),
      0,
    );
  };
  const [loadApprovedProducts] =
    useLazyGetApiV1ProductionScheduleApprovedProductsProductByProductIdQuery();

  const handleLoadBatches = async (productId: string) => {
    try {
      const response = await loadApprovedProducts({
        productId,
      }).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedProduct, setSelectedProduct] = React.useState<Option>();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Product:
          </label>
          <div className="flex gap-4 items-center">
            <SpecialSelect
              value={selectedProduct}
              onChange={(option) => {
                handleLoadBatches(option.value);
                setSelectedProduct(option);
              }}
              placeholder={"Select a product"}
              options={productOptions}
            />
            <SpecialSelect
              onChange={(option) => {
                addProduct(option.value);
              }}
              placeholder={"Select a Batch"}
              options={productOptions}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  No
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
                  Qty Per Shipper
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Shipper
                </th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-medium">
                  Pack//(Loose)
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
                      {...register(`products.${index}.totalPacks`, {
                        valueAsNumber: true,
                        min: 0,
                      })}
                      onChange={(e) =>
                        handleTotalPacksChange(
                          index,
                          parseInt(e.target.value) || 0,
                        )
                      }
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-center">
                    <Button
                      type="button"
                      variant={"destructive"}
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
              {fields.length === 0 && (
                <tr>
                  <td
                    colSpan={11}
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

        {fields.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                Total Packs: {getTotalPacks()}
              </span>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setValue("products", []);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PharmaceuticalInventoryForm;

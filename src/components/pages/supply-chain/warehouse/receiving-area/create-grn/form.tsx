import React, { useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";
import { useGetApiV1ProductionScheduleQuery } from "@/lib/redux/api/openapi.generated";

import TableForData from "./table";
import { GRNRequestDto } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;

  locationOptions: Option[];

  defaultValues?: TFieldValues;
}
const RackForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  locationOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  const [packageLists, setPackageLists] = useState<GRNRequestDto[]>([]);
  const { data: result } = useGetApiV1ProductionScheduleQuery({ page: 1 });

  useEffect(() => {
    const data = result?.data || [];
    if (data) {
      const packOptions = data?.map((item) => {
        const batchNumber = item?.id?.split("-")[0] as string;

        const materialName = item?.code as string;

        const manufacturerName = item?.products?.map(
          (product) => product.product?.genericName as string,
        );

        const invoiceNumber = item?.products?.map(
          (product) => product.product?.shelfLife as string,
        );

        const quantity = item?.products?.map(
          (product) => product.product?.baseQuantity as number,
        );

        const expiryDate = item.scheduledEndTime;

        const manufacturingDate = item?.scheduledStartTime;

        const retestDate = item?.scheduledStartTime;

        return {
          batchNumber,
          materialName,
          manufacturerName,
          invoiceNumber,
          quantity,
          expiryDate,
          manufacturingDate,
          retestDate,
        };
      }) as GRNRequestDto[];
      setPackageLists(packOptions);
    }
  }, [result]);

  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Location Name",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "locationId",
            defaultValue: defaultValues?.locationId,
            required: true,
            placeholder: "Select location",
            options: locationOptions,
            errors,
          },
          {
            register: register("name" as Path<TFieldValues>),
            label: "Name",
            placeholder: "Ener name",
            type: InputTypes.TEXT,

            required: true,

            errors,
          },

          {
            label: "Description",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "description",
            required: true,
            autoFocus: true,
            placeholder: "Enter Remarks",
            suggestions: [],
            errors,
          },
        ]}
      />

      <TableForData lists={packageLists} setItemLists={setPackageLists} />
    </div>
  );
};

export default RackForm;

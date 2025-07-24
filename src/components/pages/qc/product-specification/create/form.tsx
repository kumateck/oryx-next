import { FormWizard } from "@/components/form-inputs";
import { Button, Card, CardContent, CardHeader, Icon } from "@/components/ui";
import { InputTypes, Option } from "@/lib";
import React from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  Path,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import {
  CreateProductSpecificationDto,
  MaterialSpecificationReference,
  TestStageValues,
} from "../types";

type FieldsType = {
  id: string;
  testSpecifications: {
    testName: string;
    releaseSpecification: string;
    reference: string;
  };
}[];
interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<CreateProductSpecificationDto>;
  fields: FieldArrayWithId<FieldsType>[];
  productOptions: Option[];
}
const SpecificationForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  productOptions,
  fields,
  append,
  remove,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <>
      <Card>
        <CardHeader className="font-semibold">Product Information</CardHeader>
        <CardContent className="w-full flex items-start justify-between gap-4 md:flex-row flex-col">
          <FormWizard
            className="w-full"
            config={[
              {
                label: "Product",
                type: InputTypes.SELECT,
                name: "productId",
                control: control as Control,
                placeholder: "Select Product",
                options: productOptions,
                errors,
              },
              {
                label: "SPC Number",
                type: InputTypes.TEXT,
                placeholder: "SPC Number",
                register: register("specificationNumber" as Path<TFieldValues>),
                required: true,
                errors,
              },
              {
                label: "Effective Date",
                type: InputTypes.DATE,
                placeholder: "Effective Date",
                name: "effectiveDate",
                control: control as Control,
                errors,
              },
              {
                label: "Packing Style",
                type: InputTypes.TEXT,
                placeholder: "Packing Style",
                readOnly: true,
                register: register("packingStyle" as Path<TFieldValues>),
                required: true,
                errors,
              },
              {
                label: "Label Claim",
                type: InputTypes.TEXTAREA,
                readOnly: true,
                required: false,
                placeholder: "Label Claim",
                register: register(`labelClaim` as Path<TFieldValues>),
                errors,
              },
            ]}
          />
          <FormWizard
            className="w-full"
            config={[
              {
                label: "Revision Date",
                type: InputTypes.DATE,
                name: "reviewDate",
                placeholder: "Revision Date",
                control: control as Control,
                errors,
              },
              {
                label: "Revision",
                type: InputTypes.TEXT,
                placeholder: "Revision",
                register: register("revisionNumber" as Path<TFieldValues>),
                errors,
              },
              {
                label: "Supersedes",
                type: InputTypes.TEXT,
                placeholder: "Supersedes",
                register: register("supersedesNumber" as Path<TFieldValues>),
                errors,
              },
              {
                label: "Test Stage",
                type: InputTypes.SELECT,
                name: `testStage`,
                control: control as unknown as Control,
                // TODO: update to show the right test stage options
                placeholder: "Select Test Stage",
                options: Object.keys(TestStageValues) // get only labels
                  .map((label) => ({
                    label: String(label),
                    value: String(TestStageValues[label]),
                  })),
                errors,
              },
              {
                label: "Shelf Life",
                type: InputTypes.TEXT,
                placeholder: "Shelf Life",
                readOnly: true,
                register: register("shelfLife" as Path<TFieldValues>),
                required: true,
                errors,
              },
            ]}
          />
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mt-4">
        <span className="font-semibold">Tests & Specification</span>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              reference: {
                value: "",
                label: "",
              },
              releaseSpecification: "",
              srNumber: 0,
              name: "",
            })
          }
        >
          <Icon name="Plus" className="h-4 w-4 mr-2" /> Test & Specification
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <div key={field.id} className="p-4 rounded-md relative space-y-3">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 text-red-500"
                onClick={() => remove(index)}
              >
                <Icon name="Trash" className="h-4 w-4" />
              </Button>
              <FormWizard
                config={[
                  {
                    label: "SR Number",
                    type: InputTypes.NUMBER,
                    register: register(
                      `testSpecifications.${index}.srNumber` as Path<TFieldValues>,
                      { valueAsNumber: true },
                    ),
                    errors,
                  },
                  {
                    label: "Test Name",
                    type: InputTypes.TEXT,
                    register: register(
                      `testSpecifications.${index}.testName` as Path<TFieldValues>,
                    ),
                    placeholder: "Select Test Name",
                    errors,
                  },
                  {
                    label: "Release Specification",
                    type: InputTypes.TEXTAREA,
                    placeholder: "Release Specification",
                    register: register(
                      `testSpecifications.${index}.releaseSpecification` as Path<TFieldValues>,
                    ),
                    errors,
                  },
                  {
                    label: "Reference",
                    type: InputTypes.SELECT,
                    name: `testSpecifications.${index}.reference`,
                    control: control as unknown as Control,
                    placeholder: "Select Reference",
                    options: Object.keys(MaterialSpecificationReference) // get only labels
                      .map((label) => ({
                        label: String(label),
                        value: String(MaterialSpecificationReference[label]),
                      })),
                    errors,
                  },
                ]}
              />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default SpecificationForm;

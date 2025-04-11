"use client";

import { useParams } from "next/navigation";
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

import { FormWizard } from "@/components/form-inputs";
import { Button, Card, CardContent, Icon } from "@/components/ui";
import { EmployeeType, Gender, InputTypes } from "@/lib";

import { ChildRequestDto } from "../types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  // For children:
  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
  // For siblings (optional)
  siblingFields?: FieldArrayWithId<TFieldValues>[];
  removeSibling?: UseFieldArrayRemove;
  appendSibling?: UseFieldArrayAppend<TFieldValues>;
}

const defaultAssociated: ChildRequestDto = {
  fullName: "",
  dob: new Date(),
  sex: { label: "", value: "" },
};

const FamilyInfo2Step = <TFieldValues extends FieldValues, TContext>({
  register,
  control,
  errors,
  fields,
  append,
  remove,
  siblingFields,
  removeSibling,
  appendSibling,
}: Props<TFieldValues, TContext>) => {
  const { type } = useParams();
  const etype = type as unknown as EmployeeType;
  const genderOptions = Object.entries(Gender)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: String(value),
    }));

  return (
    <div className="h-full space-y-6">
      <h2 className="text-xl font-medium text-black">Emergency Contact</h2>
      <FormWizard
        className="mt-3 grid w-full grid-cols-2 gap-x-10 gap-y-2 space-y-0"
        config={[
          {
            register: register(
              "emergencyContact.fullName" as Path<TFieldValues>,
            ),
            label: "Emergency Contact Full Name",
            type: InputTypes.TEXT,
            placeholder: "Enter your emergency contact's full name",
            required: true,
            errors,
          },
          {
            register: register(
              "emergencyContact.contactNumber" as Path<TFieldValues>,
            ),
            label: "Emergency Contact Number",
            type: InputTypes.TEXT,
            placeholder: "Enter your emergency contact's phone number",
            required: true,
            errors,
          },
          {
            register: register(
              "emergencyContact.address" as Path<TFieldValues>,
            ),
            label: "Emergency Contact Address",
            type: InputTypes.TEXT,
            placeholder: "Enter your emergency contact's address",
            required: true,
            errors,
          },
          {
            register: register(
              "emergencyContact.relation" as Path<TFieldValues>,
            ),
            label: "Emergency Contact Relation",
            type: InputTypes.TEXT,
            placeholder: "Enter your relation to the emergency contact",
            required: true,
            errors,
          },
        ]}
      />

      <h2 className="mt-10 text-lg font-medium text-black">Next of Kin</h2>
      <FormWizard
        className="mt-3 grid w-full grid-cols-2 gap-x-10 gap-y-2 space-y-0"
        config={[
          {
            register: register("nextOfKin.fullName" as Path<TFieldValues>),
            label: "Next of Kin Full Name",
            type: InputTypes.TEXT,
            placeholder: "Enter your next of kin's full name",
            required: true,
            errors,
          },
          {
            register: register("nextOfKin.contactNumber" as Path<TFieldValues>),
            label: "Next of Kin Contact Number",
            type: InputTypes.TEXT,
            placeholder: "Enter your next of kin's phone number",
            required: true,
            errors,
          },
          {
            register: register("nextOfKin.address" as Path<TFieldValues>),
            label: "Next of Kin Address",
            type: InputTypes.TEXT,
            placeholder: "Enter your next of kin's address",
            required: true,
            errors,
          },
          {
            register: register("nextOfKin.relation" as Path<TFieldValues>),
            label: "Next of Kin Relation",
            type: InputTypes.TEXT,
            placeholder: "Enter your relationship to the next of kin",
            required: true,
            errors,
          },
        ]}
      />

      <div className="mt-10 space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Children</h3>
          <Button
            type="button"
            onClick={() => append({ ...defaultAssociated } as any)}
            variant="ghost"
          >
            <Icon name="Plus" />
            <span>Add Child</span>
          </Button>
        </div>
        <div>
          {fields.map((field, index) => (
            <Card key={field.id} className="relative my-4 p-4">
              <div className="absolute right-2 top-2">
                <Icon
                  name="CircleMinus"
                  onClick={() => remove(index)}
                  className="h-5 w-5 cursor-pointer text-red-500"
                />
              </div>
              <CardContent className="p-0">
                <FormWizard
                  className="grid w-full grid-cols-3 gap-x-10 gap-y-5 space-y-0"
                  config={[
                    {
                      register: register(
                        `children.${index}.fullName` as Path<TFieldValues>,
                      ),
                      label: "Child's Full Name",
                      type: InputTypes.TEXT,
                      placeholder: "Enter child's full name",
                      required: true,
                      errors,
                    },
                    {
                      name: `children.${index}.dob`,
                      label: "Date of Birth",
                      type: InputTypes.DATE,
                      placeholder: "Select child's DOB",
                      control: control as Control,
                      required: true,
                      errors,
                    },
                    {
                      name: `children.${index}.sex`,
                      label: "Sex",
                      type: InputTypes.SELECT,
                      placeholder: "Select child's gender",
                      control: control as Control,
                      required: true,
                      options: genderOptions,
                      errors,
                    },
                  ]}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {etype === EmployeeType.Casual && (
        <div className="mt-10 space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Siblings</h3>
            <Button
              type="button"
              onClick={() =>
                appendSibling && appendSibling({ ...defaultAssociated } as any)
              }
              variant="ghost"
            >
              <Icon name="Plus" />
              <span>Add Sibling</span>
            </Button>
          </div>
          <div>
            {siblingFields &&
              siblingFields.map((field, index) => (
                <Card key={field.id} className="relative my-4 p-4">
                  <div className="absolute right-2 top-2">
                    <Icon
                      name="CircleMinus"
                      onClick={() => removeSibling && removeSibling(index)}
                      className="h-5 w-5 cursor-pointer text-red-500"
                    />
                  </div>
                  <CardContent className="p-0">
                    <FormWizard
                      className="grid w-full grid-cols-3 gap-x-10 gap-y-5 space-y-0"
                      config={[
                        {
                          register: register(
                            `siblings.${index}.fullName` as Path<TFieldValues>,
                          ),
                          label: "Sibling's Full Name",
                          type: InputTypes.TEXT,
                          placeholder: "Enter sibling's full name",
                          required: true,
                          errors,
                        },
                        {
                          register: register(
                            `siblings.${index}.contactNumber` as Path<TFieldValues>,
                          ),
                          label: "Contact Number",
                          type: InputTypes.TEXT,
                          placeholder: "Select sibling's contact number",
                          required: true,
                          errors,
                        },
                        {
                          name: `siblings.${index}.sex`,
                          label: "Sex",
                          type: InputTypes.SELECT,
                          placeholder: "Select sibling's gender",
                          control: control as Control,
                          options: genderOptions,
                          required: true,
                          errors,
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyInfo2Step;

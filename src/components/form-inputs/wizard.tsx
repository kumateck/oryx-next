"use client";

import { icons } from "lucide-react";
import React from "react";
import { Controller } from "react-hook-form";

import { Button, Icon, SelectComponents } from "@/components/ui";
import { InputTypes, Option } from "@/lib/constants";
import { cn } from "@/lib/utils";

import {
  ErrorProps,
  FormDateInput,
  FormEmailInput,
  FormFileInput,
  FormFilesDropzoneInput,
  FormFilesUploadInput,
  FormMomentInput,
  FormNumberInput,
  FormPasswordInput,
  FormRadioInput,
  FormRichtextInput,
  FormSelectInput,
  FormSwitchInput,
  FormTextInput,
  FormTextareaInput,
} from ".";
import FormDate2Input from "./form-date-2";
import FormMultiSelectInput from "./form-multi-select";

interface BaseInputProps {
  errors: ErrorProps;
  autoFocus?: boolean;
  readOnly?: boolean;
  required?: boolean;
  label: string;
  className?: string;
  placeholder?: string;
}
type TextInputProps = BaseInputProps & {
  type:
    | InputTypes.TEXT
    | InputTypes.TEXTAREA
    | InputTypes.EMAIL
    | InputTypes.PASSWORD
    | InputTypes.NUMBER;
  register: any;
  suffix?: keyof typeof icons;
  suffixClass?: string;
  description?: React.ReactNode;
  rows?: number;
};

type SwitchInputProps = BaseInputProps & {
  value?: string | undefined;
  type: InputTypes.SWITCH;
  control: any;
  name: string;
};
type PhoneInputProps = BaseInputProps & {
  type:
    | InputTypes.PHONE
    | InputTypes.OTP
    | InputTypes.RICHTEXT
    | InputTypes.MOMENT;
  control: any;
  name: string;
  defaultValue?: string;
};
type FilesUploadInputProps = BaseInputProps & {
  type: InputTypes.UPLOAD | InputTypes.DRAGNDROP;
  control: any;
  name: string;
  defaultValue: FileList | null;
};
type FileInputProps = BaseInputProps & {
  type: InputTypes.IMAGE | InputTypes.COLOR;
  control: any;
  name: string;
  defaultValue?: string;
};
type DateInputProps = BaseInputProps & {
  type: InputTypes.DATE;
  kind?: "default" | "extensive";
  control: any;
  name: string;
  disabled: {
    after?: Date;
    before?: Date;
  };
};
type SelectInputProps = BaseInputProps & {
  type: InputTypes.SELECT;
  control?: any;
  name: string;
  options: Option[];
  defaultValue?: Option;
  value?: Option;
  components?: Partial<SelectComponents>;
  onModal?: boolean;
};
type MultiSelectInputProps = BaseInputProps & {
  type: InputTypes.MULTIPLE;
  control?: any;
  name: string;
  options: Option[];
  defaultValue?: Option[];
  value?: Option[];
  components?: Partial<SelectComponents>;
  onModal?: boolean;
};

// type SearchableSelectInputProps = BaseInputProps & {
//   type: InputTypes.SEARCHABLE_SELECT;
//   control?: any;
//   name: string;
//   options: Option[];
//   defaultValue?: Option;
//   value?: Option;
//   searchPlaceholder?: string;
//   prefix?: React.FC;
// };
type MultiInputProps = BaseInputProps & {
  type: InputTypes.MULTI;
  control?: any;
  name: string;
  options: Option[];
  defaultValue?: Option[];
  values?: Option[];
  onModal?: boolean;
};
type RadioInputProps = BaseInputProps & {
  control?: any;
  name: string;
  options: Option[];
  type: InputTypes.RADIO;
  disabled?: boolean;
};
interface ButtonProps {
  type: InputTypes.SUBMIT;
  title: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  prefix?: keyof typeof icons;
  prefixClass?: string;
  suffix?: keyof typeof icons;
  suffixClass?: string;
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
}
export type FormInput =
  | TextInputProps
  | SelectInputProps
  | MultiSelectInputProps
  | MultiInputProps
  | PhoneInputProps
  | FileInputProps
  | FilesUploadInputProps
  | DateInputProps
  | RadioInputProps
  | SwitchInputProps
  | ButtonProps;

interface Props {
  className?: string;
  config: FormInput[];
  fieldWrapperClassName?: string;
}

export default function FormWizard({
  className,
  fieldWrapperClassName,
  config,
}: Props) {
  return (
    <div className={cn("space-y-4", className)}>
      {config?.map((formInput: FormInput, index) => (
        <div key={index} className={cn(fieldWrapperClassName)}>
          {FormWizardSwitch(formInput)}
        </div>
      ))}
    </div>
  );
}

const FormWizardSwitch = (formInput: FormInput) => {
  switch (formInput.type) {
    case InputTypes.TEXT:
      return <FormTextInput {...formInput} />;
    case InputTypes.NUMBER:
      return <FormNumberInput {...formInput} />;
    case InputTypes.TEXTAREA:
      return <FormTextareaInput {...formInput} />;
    case InputTypes.MOMENT:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => (
            <FormMomentInput
              defaultValue={formInput.defaultValue}
              label={formInput.label}
              required={formInput.required}
              errors={formInput.errors}
              value={value}
              onChange={onChange}
            />
          )}
        />
      );
    case InputTypes.SWITCH:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field }) => (
            <FormSwitchInput
              label={formInput.label}
              // className="h-4 w-10"
              // thumbClassName="w-4 h-4"
              onChange={field.onChange}
              errors={formInput.errors}
              value={field.value}
            />
          )}
        />
      );
    case InputTypes.RICHTEXT:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field }) => (
            <FormRichtextInput
              label={formInput.label}
              required={formInput.required}
              errors={formInput.errors}
              field={field}
            />
          )}
        />
      );
    case InputTypes.EMAIL:
      return <FormEmailInput {...formInput} />;
    case InputTypes.PASSWORD:
      return <FormPasswordInput {...formInput} />;

    case InputTypes.SELECT:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => (
            <FormSelectInput
              onModal={formInput.onModal}
              isMulti={false}
              defaultValue={formInput.defaultValue}
              label={formInput.label}
              required={formInput.required}
              value={value}
              onChange={onChange}
              errors={formInput.errors}
              options={formInput.options}
              autoFocus={formInput.autoFocus}
              placeholder={formInput.placeholder}
              components={formInput.components}
            />
          )}
        />
      );
    case InputTypes.MULTIPLE:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => (
            <FormSelectInput
              onModal={formInput.onModal}
              isMulti={true}
              defaultValue={formInput.defaultValue}
              label={formInput.label}
              required={formInput.required}
              value={value}
              onChange={onChange}
              errors={formInput.errors}
              options={formInput.options}
              autoFocus={formInput.autoFocus}
              placeholder={formInput.placeholder}
              components={formInput.components}
            />
          )}
        />
      );
    case InputTypes.RADIO:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => (
            <FormRadioInput
              label={formInput.label}
              required={formInput.required}
              onChange={onChange}
              defaultValue={value}
              errors={formInput.errors}
              disabled={formInput.disabled}
              options={formInput.options}
              autoFocus={formInput.autoFocus}
            />
          )}
        />
      );

    case InputTypes.MULTI:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange } }) => (
            <FormMultiSelectInput
              onModal={formInput.onModal}
              defaultValue={formInput.defaultValue}
              label={formInput.label}
              required={formInput.required}
              onChange={onChange}
              errors={formInput.errors}
              options={formInput.options}
              autoFocus={formInput.autoFocus}
              placeholder={formInput.placeholder}
            />
          )}
        />
      );

    case InputTypes.IMAGE:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange } }) => (
            <FormFileInput
              defaultValue={formInput.defaultValue}
              label={formInput.label}
              required={formInput.required}
              onChange={onChange}
              errors={formInput.errors}
            />
          )}
        />
      );
    case InputTypes.UPLOAD:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange } }) => (
            <FormFilesUploadInput
              defaultValue={formInput.defaultValue}
              label={formInput.label}
              required={formInput.required}
              onChange={onChange}
              errors={formInput.errors}
            />
          )}
        />
      );
    case InputTypes.DRAGNDROP:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange } }) => (
            <FormFilesDropzoneInput
              defaultValue={formInput.defaultValue}
              label={formInput.label}
              required={formInput.required}
              onChange={onChange}
              errors={formInput.errors}
            />
          )}
        />
      );
    case InputTypes.DATE:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => (
            <>
              {formInput.kind === "extensive" ? (
                <FormDate2Input
                  label={formInput.label}
                  required={formInput.required}
                  onChange={onChange}
                  value={value}
                  disabled={formInput.disabled}
                  className={formInput.className}
                  errors={formInput.errors}
                />
              ) : (
                <FormDateInput
                  label={formInput.label}
                  required={formInput.required}
                  onChange={onChange}
                  value={value}
                  disabled={formInput?.disabled}
                  className={formInput.className}
                  errors={formInput.errors}
                />
              )}
            </>
          )}
        />
      );
    case InputTypes.SUBMIT:
      return (
        <Button
          disabled={formInput.disabled}
          onClick={formInput.onClick}
          type="submit"
          size={formInput.size}
          className={formInput.className}
          variant={formInput.variant ? formInput.variant : "secondary"}
        >
          {formInput.loading ? (
            <Icon name="LoaderCircle" className="mr-2 animate-spin" />
          ) : (
            formInput.prefix && (
              <Icon
                className={cn("pr-2", formInput.prefixClass)}
                name={formInput.prefix}
              />
            )
          )}
          {formInput.title}
        </Button>
      );
    default:
      return null;
  }
};

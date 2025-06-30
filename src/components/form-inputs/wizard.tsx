// import { Controller } from "react-hook-form";
import { icons } from "lucide-react";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";

import { ExpressionKind, InputTypes, Option, TimeType, cn } from "@/lib";

import { Button, Icon, Label, Switch } from "../ui";
import { SuggestionProps } from "../ui/adusei-editor/suggestion";
import { FetchOptionsResult } from "../ui/async-select";
// import { FetchOptionsResult } from "../ui/paginated-select";
import { FormAsyncSelect } from "./async-select-input";
import { FormDateInput } from "./date-input";
import FormDropzoneInput from "./dragzone-input";
import { FormRadioInput } from "./radio-input";
import FormRichTextInput from "./rich-input";
import { FormSpecialAddSelect } from "./special-add-input";
import { FormSpecialSelect } from "./special-input";
import { FormAsyncMultiSelect } from "./async-multi-input";
import { FormTextInput } from "./text-input";
import { FormTextareaInput } from "./textarea-input";
import { FormClockInput } from "./time-input";
import FormImageInput from "./image-input";
import { ExpressionInput } from "./expression-input";
import { FormSpecialMultiSelect } from "./special-multi-input";
import { FormSignatureInput } from "./signature-input";
import { FormCheckInput } from "./check-input";
import { EvaluationInput } from "./evaluate-input";

interface SpaceProps {
  type: InputTypes.SPACE;
}

interface LabelProps {
  type: InputTypes.LABEL;
  title: string;
  label: string;
  className?: string;
}
interface BaseInputProps<TFieldValues extends FieldValues> {
  errors: FieldErrors<TFieldValues>;
  autoFocus?: boolean;
  readOnly?: boolean;
  required?: boolean;
  label: string;
  className?: string;
  placeholder?: string;
}

interface TextInputProps<TFieldValues extends FieldValues>
  extends BaseInputProps<TFieldValues> {
  type:
    | InputTypes.TEXT
    | InputTypes.TEXTAREA
    | InputTypes.EMAIL
    | InputTypes.PASSWORD
    | InputTypes.NUMBER;
  register: UseFormRegisterReturn;
  rows?: number;
  suffix?: keyof typeof icons;
  prefix?: keyof typeof icons;
  suffixClass?: string;
  prefixText?: string;
  description?: React.ReactNode;
  onSuffixClick?: () => void;
}

interface FileInputProps extends BaseInputProps<FieldValues> {
  type: InputTypes.IMAGE | InputTypes.COLOR;
  control: Control<FieldValues>;
  name: string;
  defaultValue?: string;
}

interface SwitchInputProps extends BaseInputProps<FieldValues> {
  type: InputTypes.SWITCH;
  control: Control<FieldValues>;
  name: string;
}

interface ExpressionInputProps extends BaseInputProps<FieldValues> {
  type: InputTypes.FORMULAR;
  control: Control<FieldValues>;
  name: string;
  kind?: ExpressionKind;
  option?: string;
}

interface FilesUploadInputProps extends BaseInputProps<FieldValues> {
  type: InputTypes.DRAGNDROP;
  control: Control<FieldValues>;
  name: string;
  defaultValue: FileList | null;
  single?: boolean;
}

interface ImageUploadInputProps extends BaseInputProps<FieldValues> {
  type: InputTypes.IMAGE;
  control: Control<FieldValues>;
  name: string;
  defaultValue: string | null;
}

interface DateInputProps extends BaseInputProps<FieldValues> {
  type: InputTypes.DATE;
  control: Control<FieldValues>;
  name: string;
  disabled?: { after?: Date; before?: Date };
}
interface SignInputProps extends BaseInputProps<FieldValues> {
  type: InputTypes.SIGNATURE;
  control: Control<FieldValues>;
  name: string;
}
interface TimeInputProps extends BaseInputProps<FieldValues> {
  type: InputTypes.TIME | InputTypes.MOMENT | InputTypes.CLOCK;
  control: Control<FieldValues>;
  name: string;
  defaultValue?: string;
  moment?: boolean;
  showDays?: boolean;
}

interface RichTextInputProps extends BaseInputProps<FieldValues> {
  type: InputTypes.RICHTEXT;
  control: Control<FieldValues>;
  name: string;
  suggestions?: SuggestionProps[];
}
interface SelectInputProps extends BaseInputProps<FieldValues> {
  type: InputTypes.SELECT;
  control?: Control<FieldValues>;
  name: string;
  options: Option[];
  defaultValue?: Option;
  value?: Option;
  searchPlaceholder?: string;
  isLoading?: boolean;
  onChange?: (...event: any[]) => void;
  isDisabled?: boolean;
  onModal?: boolean;
}

interface AsyncSelectInputProps
  extends Omit<SelectInputProps, "options" | "type"> {
  type: InputTypes.ASYNC_SELECT;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
  isLoading: boolean;
}

interface PaginatedSelectInputProps extends BaseInputProps<FieldValues> {
  type: InputTypes.PAGINATED_SELECT;
  control?: Control<FieldValues>;
  name: string;
  defaultValue?: Option;
  value?: Option;
  searchPlaceholder?: string;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
  isLoading?: boolean;
  onChange?: (...event: any[]) => void;
  isDisabled?: boolean;
  onModal?: boolean;
}

interface SpecialSelectInputProps<TFieldValues extends FieldValues, TContext>
  extends BaseInputProps<TFieldValues> {
  type: InputTypes.SPECIAL_SELECT;
  handleCreateNew?: (input: string) => void;
  isBtnLoading?: boolean;
  control?: Control<TFieldValues, TContext>;
  name: string;
  options: Option[];
  defaultValue?: Option;
  value?: Option;
  searchPlaceholder?: string;
  isLoading?: boolean;
  onChange?: (...event: any[]) => void;
  isDisabled?: boolean;
}

interface MultiInputProps<TFieldValues extends FieldValues, TContext>
  extends BaseInputProps<TFieldValues> {
  type: InputTypes.MULTI;
  control?: Control<TFieldValues, TContext>;
  name: string;
  options: Option[];
  defaultValue?: Option[];
  values?: Option[];
  searchPlaceholder?: string;
}
interface AsyncMultiInputProps
  extends Omit<MultiInputProps<FieldValues, any>, "options" | "type"> {
  type: InputTypes.ASYNC_MULTI;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
  isLoading: boolean;
  onChange?: (...event: any[]) => void;
}
interface RadioInputProps extends BaseInputProps<FieldValues> {
  control?: Control<FieldValues>;
  name: string;
  options: Option[];
  type: InputTypes.RADIO;
  disabled?: boolean;
}

interface CheckboxInputProps extends BaseInputProps<FieldValues> {
  type: InputTypes.CHECKBOX;
  control: any;
  name: string;
  defaultValue?: boolean;
  value?: boolean;
  options: Option[];
  disabled?: boolean;
}
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

export type FormInput<TFieldValues extends FieldValues, TContext> =
  | TextInputProps<TFieldValues>
  | SelectInputProps
  | AsyncSelectInputProps
  | MultiInputProps<TFieldValues, TContext>
  | SignInputProps
  | AsyncMultiInputProps
  | FileInputProps
  | FilesUploadInputProps
  | ImageUploadInputProps
  | DateInputProps
  | RadioInputProps
  | CheckboxInputProps
  | RichTextInputProps
  | TimeInputProps
  | PaginatedSelectInputProps
  | SpecialSelectInputProps<TFieldValues, TContext>
  | ButtonProps
  | SpaceProps
  | SwitchInputProps
  | ExpressionInputProps
  | LabelProps
  | null
  | undefined;

interface Props<TFieldValues extends FieldValues, TContext> {
  className?: string;
  config: FormInput<TFieldValues, TContext>[];
  fieldWrapperClassName?: string;
  wizardWrapperClassName?: string;
  suffix?: React.FC;
}

export function FormWizard({
  className,
  fieldWrapperClassName,
  config,
  wizardWrapperClassName,
}: Props<FieldValues, any>) {
  return (
    <div className={cn("w-full", wizardWrapperClassName)}>
      <div className={cn("space-y-4", className)}>
        {config?.map(
          (formInput: FormInput<FieldValues, any>, index) =>
            formInput && (
              <div key={index} className={cn(fieldWrapperClassName)}>
                {FormWizardSwitch(formInput)}
              </div>
            ),
        )}
      </div>
    </div>
  );
}

const FormWizardSwitch = (formInput: FormInput<FieldValues, any>) => {
  if (formInput === null || formInput === undefined) return null;

  switch (formInput.type) {
    case InputTypes.TEXT:
    case InputTypes.PASSWORD:
    case InputTypes.NUMBER:
    case InputTypes.EMAIL:
      return <FormTextInput {...formInput} />;
    case InputTypes.TEXTAREA:
      return <FormTextareaInput {...formInput} />;
    case InputTypes.TIME:
    case InputTypes.MOMENT:
    case InputTypes.CLOCK:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => (
            <FormClockInput
              defaultValue={formInput.defaultValue}
              label={formInput.label}
              required={formInput.required}
              errors={formInput.errors}
              value={value}
              onChange={onChange}
              name={formInput.name}
              type={formInput.type as unknown as TimeType}
              showDays={formInput.showDays}
            />
          )}
        />
      );
    case InputTypes.FORMULAR:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => {
            return formInput.kind === ExpressionKind.Evaluation ? (
              <EvaluationInput
                label={formInput.label}
                required={formInput.required}
                errors={formInput.errors}
                value={value}
                onChange={onChange}
                name={formInput.name}
                option={formInput.option as string}
              />
            ) : (
              <ExpressionInput
                label={formInput.label}
                required={formInput.required}
                errors={formInput.errors}
                value={value}
                onChange={onChange}
                name={formInput.name}
              />
            );
          }}
        />
      );
    case InputTypes.MULTI:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => (
            <FormSpecialMultiSelect
              defaultValue={formInput.defaultValue || value}
              label={formInput.label}
              required={formInput.required}
              onChange={onChange}
              errors={formInput.errors}
              name={formInput.name}
              options={formInput.options}
              autoFocus={formInput.autoFocus}
              placeholder={formInput.placeholder}
            />
          )}
        />
      );
    case InputTypes.SIGNATURE:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange } }) => (
            <FormSignatureInput
              label={formInput.label}
              required={formInput.required}
              errors={formInput.errors}
              onChange={onChange}
              name={formInput.name}
            />
          )}
        />
      );
    case InputTypes.SWITCH:
      return (
        <Controller
          name={formInput.name}
          control={formInput.control}
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      );

    case InputTypes.ASYNC_SELECT:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => {
            if (formInput.onChange) {
              formInput.onChange(value);
            }
            return (
              <FormAsyncSelect
                value={value || formInput.defaultValue}
                defaultValue={formInput.defaultValue || value}
                label={formInput.label}
                required={formInput.required}
                onChange={onChange}
                errors={formInput.errors}
                name={formInput.name}
                fetchOptions={formInput.fetchOptions}
                isLoading={formInput.isLoading}
                autoFocus={formInput.autoFocus}
                placeholder={formInput.placeholder}
                searchPlaceholder={formInput.searchPlaceholder}
              />
            );
          }}
        />
      );
    case InputTypes.ASYNC_MULTI:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => {
            if (formInput.onChange) {
              formInput.onChange(value);
            }
            return (
              <FormAsyncMultiSelect
                value={value || formInput.defaultValue}
                defaultValue={formInput.defaultValue || value}
                label={formInput.label}
                required={formInput.required}
                onChange={onChange}
                errors={formInput.errors}
                name={formInput.name}
                fetchOptions={formInput.fetchOptions}
                isLoading={formInput.isLoading}
                autoFocus={formInput.autoFocus}
                placeholder={formInput.placeholder}
                searchPlaceholder={formInput.searchPlaceholder}
              />
            );
          }}
        />
      );
    case InputTypes.SELECT:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => {
            if (formInput.onChange) {
              formInput.onChange(value);
            }
            return (
              <FormSpecialSelect
                value={value || formInput.defaultValue}
                defaultValue={formInput.defaultValue || value}
                label={formInput.label}
                required={formInput.required}
                onChange={onChange}
                errors={formInput.errors}
                name={formInput.name}
                options={formInput.options}
                autoFocus={formInput.autoFocus}
                placeholder={formInput.placeholder}
                searchPlaceholder={formInput.searchPlaceholder}
              />
            );
          }}
        />
      );
    case InputTypes.SPECIAL_SELECT:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => {
            return (
              <FormSpecialAddSelect
                value={value || formInput.defaultValue}
                defaultValue={formInput.defaultValue}
                label={formInput.label}
                required={formInput.required}
                onChange={onChange}
                errors={formInput.errors}
                name={formInput.name}
                options={formInput.options}
                autoFocus={formInput.autoFocus}
                placeholder={formInput.placeholder}
                searchPlaceholder={formInput.searchPlaceholder}
                handleCreateNew={formInput.handleCreateNew}
                isBtnLoading={formInput.isBtnLoading}
              />
            );
          }}
        />
      );
    case InputTypes.RICHTEXT:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => (
            <FormRichTextInput
              name={formInput.name}
              label={formInput.label}
              required={formInput.required}
              autoFocus={formInput.autoFocus}
              readOnly={formInput.readOnly}
              onChange={onChange}
              value={value}
              suggestions={formInput.suggestions}
              errors={formInput.errors}
              placeholder={formInput.placeholder}
            />
          )}
        />
      );
    case InputTypes.DRAGNDROP:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => (
            <FormDropzoneInput
              name={formInput.name}
              defaultValue={formInput.defaultValue ?? value}
              label={formInput.label}
              required={formInput.required}
              onChange={onChange}
              errors={formInput.errors}
              single={formInput.single}
            />
          )}
        />
      );
    case InputTypes.IMAGE:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => (
            <FormImageInput
              name={formInput.name}
              defaultValue={formInput.defaultValue ?? value}
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
            <FormDateInput
              label={formInput.label}
              required={formInput.required}
              onChange={onChange}
              value={value}
              disabled={formInput.disabled}
              className={formInput.className}
              errors={formInput.errors}
              name={formInput.name}
            />
          )}
        />
      );
    case InputTypes.CHECKBOX:
      return (
        <Controller
          control={formInput.control}
          name={formInput.name}
          render={({ field: { onChange, value } }) => (
            <FormCheckInput
              label={formInput.label}
              required={formInput.required}
              onChange={onChange}
              value={value || []}
              errors={formInput.errors}
              options={formInput.options}
              disabled={formInput?.disabled}
              name={formInput.name}
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
              name={formInput.name}
            />
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
    case InputTypes.LABEL:
      return (
        <div className={cn("flex w-full flex-col gap-2")}>
          {formInput.label && <Label>{formInput.label}</Label>}
          {formInput.title && (
            <div className={cn("", formInput.className)}>
              <p>{formInput.title}</p>
            </div>
          )}
          <p>.</p>
        </div>
      );
    case InputTypes.SPACE:
      return <div></div>;
    default:
      return <div></div>;
  }
};

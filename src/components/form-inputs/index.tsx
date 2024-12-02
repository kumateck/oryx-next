export interface ErrorProps {
  error: boolean | undefined;
  message: string | undefined;
}
export const FormError = ({ error, message }: ErrorProps) => (
  <div>{error && <small className="text-danger-500">{message}</small>}</div>
);
export { default as FormTextInput } from "./form-input";
export { default as FormEmailInput } from "./form-email";
export { default as FormPasswordInput } from "./form-password-input";
export { default as FormFileInput } from "./form-file";
export { default as FormFilesUploadInput } from "./form-files";

export { default as FormMomentInput } from "./form-moment";
export { default as FormSelectInput } from "./form-select";
export { default as FormDateInput } from "./form-date";
export { default as FormRadioInput } from "./form-radio";
export { default as FormNumberInput } from "./form-number";
export { default as FormMonthInput } from "./form-month";
export { default as FormTextareaInput } from "./form-textarea";
export { default as FormRichtextInput } from "./form-richtext";
export { default as FormSwitchInput } from "./form-switch";
export { default as FormWizard } from "./wizard";

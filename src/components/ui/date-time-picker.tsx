import DatePicker, { DatePickerProps } from "react-datepicker";

export const DateTimePicker = (props: DatePickerProps) => {
  return <DatePicker {...props} preventOpenOnFocus />;
};

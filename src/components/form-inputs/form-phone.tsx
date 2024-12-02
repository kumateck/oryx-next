// import { PhoneNumberInput } from "~/components/ui";
// import { cn } from "~/lib/utils.ts";
// import { ErrorProps, FormError } from ".";

// interface Props {
//   autoFocus?: boolean;
//   label: string;
//   required?: boolean;
//   errors?: ErrorProps;
//   field: any;
//   setSelectedDialCode?: (dialCode: string) => void;
// }
// export default function FormPhoneInput({
//   label,
//   required,
//   errors,
//   autoFocus,
//   field,
//   setSelectedDialCode,
// }: Props) {
//   return (
//     <div>
//       <label className="space-y-1 capitalize">
//         <div
//           className={cn("text-base font-medium ", {
//             "text-danger-500": errors?.error,
//           })}
//         >
//           {label} {required && <span className="text-danger-400">*</span>}
//         </div>
//         <PhoneNumberInput
//           autoFocus={autoFocus}
//           style={
//             {
//               "--react-international-phone-height": "2.5rem",
//             } as any
//           }
//           defaultCountry="gh"
//           inputClassName={cn("uppercase text-base", {
//             "border-danger-500": errors && errors.error,
//           })}
//           {...field}
//           onChange={(a, b) => {
//             if (setSelectedDialCode) {
//               setSelectedDialCode(b.country.dialCode);
//             }
//             field.onChange(a);
//           }}
//         />
//         <FormError error={errors?.error} message={errors?.message} />
//       </label>
//     </div>
//   );
// }

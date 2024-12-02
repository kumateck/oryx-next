// import { FormWizard } from "adusei-ui";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { Button, Icon } from "~/components/ui";
// import { InputTypes } from "~/lib/constants";
// import {
//   PostApiV1AuthChangePasswordApiArg,
//   ResetPasswordRequest,
//   usePostApiV1AuthChangePasswordMutation,
// } from "~/redux/api/openapi.generated";

// import { ChangePwdValidator } from "./types";

// const ChangePassword = () => {
//   const [changePasswordMutation, { isLoading }] =
//     usePostApiV1AuthChangePasswordMutation();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ResetPasswordRequest>({
//     resolver: ChangePwdValidator,
//     mode: "all",
//     defaultValues: {
//       resetCode: "",
//       newPassword: "",
//     },
//   });

//   const onSubmit = async (data: ResetPasswordRequest) => {
//     const payload = {
//       resetPasswordRequest: {
//         email: data.email,
//         resetCode: data.resetCode,
//         newPassword: data.newPassword,
//       },
//     } satisfies PostApiV1AuthChangePasswordApiArg;

//     try {
//       await changePasswordMutation(payload).unwrap();
//       toast.success("Password changed successfully");
//     } catch (err) {
//       const errorResponse = err as unknown as {
//         responseException?: {
//           exceptionMessage: {
//             errors: Record<string, string[]>;
//           };
//         };
//       };
//       const errors = errorResponse.responseException?.exceptionMessage.errors;
//       toast.error(errors?.[Object.keys(errors!)[0]]![0]);
//     }
//   };
//   return (
//     <div className="w-full">
//       <form
//         className="w-full max-w-116.25 flex-col space-y-9"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <div className="">
//           <span className="text-2xl font-medium capitalize">
//             Change Password
//           </span>
//         </div>
//         <FormWizard
//           config={[
//             {
//               register: { ...register("resetCode") },
//               label: "Old Password",
//               placeholder: "Old Password",
//               className: "bg-white",
//               errors: {
//                 message: errors.resetCode?.message,
//                 error: !!errors.resetCode,
//               },
//               type: InputTypes.PASSWORD,
//             },
//             {
//               register: { ...register("newPassword") },
//               label: "New Password",
//               placeholder: "New Password",
//               errors: {
//                 message: errors.newPassword?.message,
//                 error: !!errors.newPassword,
//               },
//               type: InputTypes.PASSWORD,
//             },
//           ]}
//         />
//         <div>
//           <Button type="submit">
//             {isLoading && (
//               <Icon name="LoaderCircle" className="mr-2 animate-spin" />
//             )}
//             <span>Submit</span>
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;

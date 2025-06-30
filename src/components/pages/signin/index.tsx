"use client";

import { Mutex } from "async-mutex";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { FormWizard } from "@/components/form-inputs";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Icon,
} from "@/components/ui";
import { APP_CONTEXT, InputTypes, routes } from "@/lib";
import {
  PostApiV1AuthLoginApiArg,
  usePostApiV1AuthLoginMutation,
} from "@/lib/redux/api/openapi.generated";
import { authActions } from "@/lib/redux/slices/auth";
import { persistToken } from "@/lib/utilities";

import { LoginDto, LoginValidator, TLogin } from "./types";

import ThrowErrorMessage from "@/lib/throw-error";

const mutex = new Mutex();
const Signin = () => {
  const searchParams = useSearchParams();
  const cookies = useCookies();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginMutation, { isLoading }] = usePostApiV1AuthLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: LoginValidator,
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLogin) => {
    if (!data.password) return;

    const payload = {
      loginRequest: {
        email: data.email,
        password: data.password,
      },
    } satisfies PostApiV1AuthLoginApiArg;

    // try {
    //   // const result = await loginMutation(payload).unwrap();
    //   const response = await fetch("/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload.loginRequest),
    //   });
    //   const result = await response.json();
    //   console.log(result, "result from login api");
    //   if (result.success) {
    //     // toast.success("Login successful");
    //     // router.push("/dashboard");
    //     const { accessToken, refreshToken, userId, expiresIn, avatar } = result;
    //     dispatch(
    //       authActions.setTokens({
    //         refreshToken: refreshToken as string,
    //         userId: userId as string,
    //         expiresIn,
    //         avatar,
    //       }),
    //     );
    //     const redirectTo = searchParams.get("redirectTo") ?? routes.home();
    //     router.replace(redirectTo);
    //   } else if (isLoginError(result)) {
    //     // This branch should not execute due to RTK Query treating non-2xx responses as errors
    //     // But it's here for type safety
    //     const errorMessage = result.errors?.[0]?.message || "Login failed";
    //     toast.error(errorMessage);
    //   }
    // } catch (error) {
    //   console.error("Login failed:", error);
    //   const errorResponse = error as ErrorResponse;

    //   // Properly handle RTK Query errors
    //   if (errorResponse.data && isLoginError(errorResponse.data)) {
    //     // Display the specific error message returned by the API
    //     const errorMessage = isErrorResponse(errorResponse)?.message;
    //     //errorResponse.data.errors?.[0]?.message || "Login failed";

    //     toast.error(errorMessage);
    //   } else {
    //     // Generic error handling
    //     toast.error("An unexpected error occurred");
    //   }
    // }
    // try {
    //   const result = await loginMutation(payload).unwrap();
    //   console.log(result, "result ");
    //   // if (result.success) {
    //   //   router.push('/dashboard'); // ✅ or wherever
    //   // }
    // } catch (error) {
    //   console.error("Login failed:", error);
    //   const err = error as any;
    //   console.error("Login failed:", err);
    //   // toast.error(isErrorResponse(err.data as ErrorResponse)?.description);
    // }
    try {
      // Acquire lock
      await mutex.runExclusive(async () => {
        const response = await loginMutation(payload).unwrap();
        const { accessToken, refreshToken, userId, expiresIn, avatar } =
          response;
        persistToken(
          cookies,
          accessToken as string,
          expiresIn as number,
          APP_CONTEXT.ORYX_ERP,
        );
        // Dispatch the tokens to Redux

        dispatch(
          authActions.setTokens({
            refreshToken: refreshToken as string,
            userId: userId as string,
            expiresIn,
            avatar,
          }),
        );
        // await waitForTimeout(100);
        // Only proceed with navigation after dispatching the tokens
        const redirectTo = searchParams.get("redirectTo") ?? routes.home();
        // console.log(redirectTo, "redirectTo");
        if (userId) {
          router.replace(redirectTo);
          window.location.reload();
        } else {
          router.push(routes.signin());
        }
      });
      // const res = await loginUser(data.email, data.password);
      // console.log(res);
    } catch (error) {
      // const err = error as { data: ErrorResponse };
      console.log(error, "error");
      ThrowErrorMessage(error);
      // toast.error(isErrorResponse(err.data as ErrorResponse)?.description);
    }
  };
  return (
    <form className="w-full px-12" onSubmit={handleSubmit(onSubmit)}>
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-left text-2xl text-black">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-left">
            Signin into your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <FormWizard
              config={[
                {
                  autoFocus: true,
                  register: register(LoginDto.email),
                  label: "Email",
                  required: true,
                  placeholder: "Enter Email",
                  errors,
                  type: InputTypes.EMAIL,
                  suffix: "Mail",
                },
                {
                  register: register(LoginDto.password),
                  label: "Password",
                  placeholder: "Enter Password",
                  required: true,
                  errors,
                  type: InputTypes.PASSWORD,
                },
              ]}
            />
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Button
              type="submit"
              variant="default"
              className="flex w-full items-center justify-center gap-2"
            >
              {isLoading && (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              )}
              <span>Sign In</span>
            </Button>
          </div>
          <div className="mt-6 text-center text-sm" />
        </CardContent>
      </Card>
    </form>
  );
};

export default Signin;

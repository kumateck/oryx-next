// // services/authApi.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { PostApiV1AuthLoginApiArg, PostApiV1AuthLoginApiResponse } from './openapi.generated';

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: '/api', // point to your Next.js API route
//     credentials: 'include', // ✅ crucial to receive Set-Cookie
//   }),
//   endpoints: (builder) => ({
//     login: builder.mutation<
//     PostApiV1AuthLoginApiResponse, // response shape
//     PostApiV1AuthLoginApiArg // request shape
//     >({
//       query: (queryArg) => ({
//         url: '/login',
//         method: 'POST',
//         body: queryArg.loginRequest
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation } = authApi;

// services/authApi.ts
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { PostApiV1AuthLoginApiArg } from "./openapi.generated";

// Define proper response types
export interface LoginSuccessResponse {
  success: true;
  userId: string;
}

export interface LoginErrorItem {
  message: string;
}

export interface LoginErrorResponse {
  success: false;
  errors: LoginErrorItem[];
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
  mode: "cors",
  //   prepareHeaders: (headers) => {
  //     // Retrieve the token from cookies
  //     const token = getCookie(ORYX_ERP_COOKIE_ID); // Adjust the cookie name if different
  //     if (token) {
  //       headers.set("Authorization", `Bearer ${token}`); // Set Authorization header
  //     }

  //     return headers;
  //   },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait for the mutex to unlock
  //   await mutex.waitForUnlock();
  // await waitForTimeout(100);
  let result = await baseQuery(args, api, extraOptions);

  console.log(result, "result from rtk query");
  if (result.error && result.error.status === 401) {
    // if (!mutex.isLocked()) {
    //   const release = await mutex.acquire();
    //   try {
    //     // Handle token refresh logic here
    //   } finally {
    //     release();
    //   }
    // } else {
    //   await mutex.waitForUnlock();
    // }
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: '/api', // point to your Next.js API route
  //     credentials: 'include', // ✅ crucial to receive Set-Cookie
  //   }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, PostApiV1AuthLoginApiArg>({
      query: (queryArg) => ({
        url: "/login",
        method: "POST",
        body: queryArg.loginRequest,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

// Helper to check error response type
export const isLoginError = (
  response: unknown,
): response is LoginErrorResponse => {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    response.success === false &&
    "errors" in response
  );
};

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Mutex } from "async-mutex";
// import { getCookie } from "cookies-next";
// import { BASE_URL } from "@/lib/constants";
// import { AuthState } from "../slices/auth";
// import { reduxStore } from "../store";
// import {
//   GetApiV1ConfigurationByModelTypeByModelTypeApiArg,
//   GetApiV1ConfigurationByModelTypeByModelTypeApiResponse,
//   GetApiV1ProductApiArg,
//   GetApiV1ProductApiResponse,
//   GetApiV1ProductByProductIdApiArg,
//   GetApiV1ProductByProductIdApiResponse,
// } from "./openapi.generated";
// export const mutex = new Mutex();
// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   credentials: "same-origin",
//   mode: "cors",
//   prepareHeaders: async (headers) => {
//     // const auth = await getAccessToken();
//     // const token = auth?.accessToken;
//     const token = getCookie("accessToken");
//     // const refreshToken = auth?.refreshToken;
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     // if (refreshToken) {
//     //   headers.set("Authorization", `Bearer ${refreshToken}`);
//     // }
//     return headers;
//   },
//   // },
// });
// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   // wait until the mutex is available without locking it
//   await mutex.waitForUnlock();
//   let result = await baseQuery(args, api, extraOptions);
//   if (result.error && result.error.status === 401) {
//     // checking whether the mutex is locked
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire();
//       try {
//         // const refreshResult = await baseQuery(
//         //   "/refreshToken",
//         //   api,
//         //   extraOptions,
//         // );
//         // if (refreshResult.data) {
//         //   api.dispatch(tokenReceived(refreshResult.data));
//         //   // retry the initial query
//         //   result = await baseQuery(args, api, extraOptions);
//         // } else {
//         // api.dispatch(loggedOut());
//         // }
//       } finally {
//         // release must be called once the mutex should be released again.
//         release();
//       }
//     } else {
//       // wait until the mutex is available without locking it
//       await mutex.waitForUnlock();
//       result = await baseQuery(args, api, extraOptions);
//     }
//   } else if (result.error) {
//     result.error = result.error.data as FetchBaseQueryError;
//   }
//   return result;
// };
// export const api = createApi({
//   baseQuery: baseQueryWithReauth,
//   // baseQuery: fetchBaseQuery({
//   //   baseUrl: BASE_URL,
//   // }),
//   endpoints: (builder) => ({
//     getCodeConfigByModelType: builder.query<
//       GetApiV1ConfigurationByModelTypeByModelTypeApiResponse,
//       GetApiV1ConfigurationByModelTypeByModelTypeApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/api/v1/configuration/by-model-type/${queryArg.modelType}`,
//       }),
//     }),
//     getProductById: builder.query<
//       GetApiV1ProductByProductIdApiResponse,
//       GetApiV1ProductByProductIdApiArg
//     >({
//       query: (queryArg) => ({ url: `/api/v1/product/${queryArg.productId}` }),
//     }),
//     getProducts: builder.query<
//       GetApiV1ProductApiResponse,
//       GetApiV1ProductApiArg
//     >({
//       query: (queryArg) => ({
//         url: `/api/v1/product`,
//         params: {
//           page: queryArg.page,
//           pageSize: queryArg.pageSize,
//           searchQuery: queryArg.searchQuery,
//         },
//       }),
//     }),
//   }),
// });
// export const restApi = api;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { getCookie } from "cookies-next";

// Import the getCookie function
import { BASE_URL, ORYX_ERP_COOKIE_ID } from "@/lib/constants";

// Mutex instance to handle potential concurrent requests
export const mutex = new Mutex();

// Define the baseQuery with added authorization header
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "same-origin",
  mode: "cors",
  prepareHeaders: (headers) => {
    // Retrieve the token from cookies
    const token = getCookie(ORYX_ERP_COOKIE_ID); // Adjust the cookie name if different
    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Set Authorization header
    }
    return headers;
  },
});

// Middleware function with re-authentication logic
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait for the mutex to unlock
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Handle token refresh logic here
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

// Define API slice with endpoints
export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCodeConfigByModelType: builder.query({
      query: (queryArg) => ({
        url: `/api/v1/configuration/by-model-type/${queryArg.modelType}`,
      }),
    }),
    getProductById: builder.query({
      query: (queryArg) => ({ url: `/api/v1/product/${queryArg.productId}` }),
    }),
    getProducts: builder.query({
      query: (queryArg) => ({
        url: `/api/v1/product`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
  }),
});

export const restApi = api;

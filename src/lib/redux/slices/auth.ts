import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { deleteCookie } from "cookies-next";
import { ReduxState } from "../store";
import { Permission } from "@/lib/utils";

export interface AuthState {
  accessToken?: string;
  refreshToken: string;
  userId: string;
  triggerRefresh: boolean;
  avatar?: string | null;
  expiresIn?: number | null;
  permissions: Permission[];
}

const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
  userId: "",
  expiresIn: null,
  avatar: null,
  triggerRefresh: false,
  permissions: [],
};

// const setAuthCookie = (token: string, name: string) => {
//   const toBase64 = Buffer.from(token).toString("base64");

//   setCookie(name, toBase64, {
//     maxAge: 30 * 24 * 60 * 60,
//     path: "/",
//     // more security options here
//     // sameSite: 'strict',
//     // httpOnly: true,
//     // secure: process.env.NODE_ENV === 'production',
//   });
// };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<
        Pick<AuthState, "refreshToken" | "avatar" | "expiresIn" | "userId">,
        string
      >,
    ) => {
      state.refreshToken = action.payload.refreshToken as string;
      state.avatar = action.payload.avatar as string;
      state.expiresIn = action.payload.expiresIn as number;
      state.userId = action.payload.userId as string;
    },
    setUserPermissions: (
      state,
      action: PayloadAction<Permission[], string>,
    ) => {
      state.permissions = action.payload;
    },
    setUserId: (state, action: PayloadAction<string, string>) => {
      state.userId = action.payload;
    },
    setTriggerRefresh: (state, action: PayloadAction<boolean, string>) => {
      state.triggerRefresh = action.payload;
    },
    clearTokens: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.userId = "";
      state.permissions = [];
      state.triggerRefresh = false;
    },
    logout: (state) => {
      state.accessToken = "";
      // deleteCookie("accessToken");
      // clear the auth slice data
      return;
    },
  },
});

function createSelector<T>(
  fn: (d: ReduxState["persistedReducer"]["auth"]) => T,
) {
  return ({ persistedReducer: { auth } }: ReduxState) => fn(auth);
}
export const selectCurrentAuthUser = createSelector(
  (auth: AuthState | undefined) => auth,
);
export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;

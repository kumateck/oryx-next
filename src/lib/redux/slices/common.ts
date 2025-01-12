import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { VerifyOtpResponseDto } from "./endpoints";
import { ReduxState } from "../store";

export interface CommonState {
  searchInput: string;
  triggerReload?: boolean;
}

const initialState: CommonState = {
  searchInput: "",
  triggerReload: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string, string>) => {
      state.searchInput = action.payload;
    },

    clearSearchValue: (state) => {
      state.searchInput = "";
    },
    setTriggerReload: (state) => {
      state.triggerReload = true;
    },
    unSetTriggerReload: (state) => {
      state.triggerReload = false;
    },
  },
});

function createSelector<T>(fn: (d: ReduxState["common"]) => T) {
  return ({ common }: ReduxState) => fn(common);
}

export const common = createSelector((common: CommonState) => common);
export const searchValue = createSelector(
  (common: CommonState) => common.searchInput,
);
export const commonActions = commonSlice.actions;

const commonReducer = commonSlice.reducer;

export default commonReducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isShowSidebar: boolean;
}

const initialState: AppState = {
  isShowSidebar: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isShowSidebar = !state.isShowSidebar;
    },
  },
});

export const { toggleSidebar } = appSlice.actions;

export default appSlice.reducer;

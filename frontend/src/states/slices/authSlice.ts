import UserEntity from "@/entities/UserEntity";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface AuthState {
  accessToken: string;
  userInfo: UserEntity | null;
}

const initialState: AuthState = {
  accessToken: "",
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storageAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserEntity | null>) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.accessToken = "";
      state.userInfo = null;
    },
  },
});

export const { storageAccessToken, setUserInfo, logout } = authSlice.actions;

export default authSlice.reducer;

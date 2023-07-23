import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "js-cookie";
import thunk from "redux-thunk";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";
import storage from "./storage";

const rootPersistConfig = {
  key: "root",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage: new CookieStorage(Cookies),
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "cookies-js";
import thunk from "redux-thunk";
import appReducer from "./appSlice";
import authReducer from "./authSlice";

const rootPersistConfig = {
  key: "root",
  storage
};

const authPersistConfig = {
  key: "auth",
  storage: new CookieStorage(Cookies)
}

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

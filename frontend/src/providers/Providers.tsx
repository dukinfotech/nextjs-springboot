"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider, createStore } from "jotai";

export function Providers({ children }: { children: React.ReactNode }) {
  const myStore = createStore();
  return (
    <Provider store={myStore}>
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
}

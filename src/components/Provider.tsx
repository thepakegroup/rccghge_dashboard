"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { Toaster } from "react-hot-toast";
import { CtxProvider } from "@/providers/ctx-provider";

type Props = {
  children?: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <CtxProvider>
      <Provider store={store}>
        <Toaster />
        {children}
      </Provider>
    </CtxProvider>
  );
};

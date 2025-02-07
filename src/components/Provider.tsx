"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { Toaster } from "react-hot-toast";

type Props = {
  children?: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <Toaster />
      {children}
    </Provider>
  );
};

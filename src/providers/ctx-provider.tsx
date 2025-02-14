"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type CtxType = "web_edit" | "mobile_edit" | null;

interface CtxContextType {
  ctx: CtxType;
  setCtx: (value: CtxType) => void;
}

const CtxContext = createContext<CtxContextType | undefined>(undefined);

export const CtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [ctx, setCtxState] = useState<CtxType>(null);

  // Load ctx from cookies when the app initializes
  useEffect(() => {
    const savedCtx = Cookies.get("ctx") as CtxType;
    if (savedCtx) setCtxState(savedCtx);
  }, []);

  // Update state and set cookie when ctx changes
  const setCtx = (value: CtxType) => {
    setCtxState(value);
    if (value) {
      Cookies.set("ctx", value, { expires: 2 });
    } else {
      Cookies.remove("ctx");
    }
  };

  return (
    <CtxContext.Provider value={{ ctx, setCtx }}>
      {children}
    </CtxContext.Provider>
  );
};

// Custom hook for using the context
export const useCtx = () => {
  const context = useContext(CtxContext);
  if (!context) {
    throw new Error("useCtx must be used within a CtxProvider");
  }
  return context;
};

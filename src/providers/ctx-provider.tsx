"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { mobileLinks, webLinks } from "./side-bar-links";

type CtxType = "web_edit" | "mobile_edit" | null;

interface CtxContextType {
  ctx: CtxType;
  setCtx: (value: CtxType) => void;
}

const CtxContext = createContext<CtxContextType | undefined>(undefined);

export const CtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [ctx, setCtxState] = useState<CtxType>(null);
  //
  const router = useRouter();
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
      if (value === "mobile_edit") {
        router.replace("/");
      } else {
        router.replace("/home-web");
      }
    } else {
      Cookies.remove("ctx");
    }
  };

  //

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

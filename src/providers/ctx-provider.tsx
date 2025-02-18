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
  const pathname = usePathname();
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

  const sharedRoutes = ["/admin", "/manage-events"];

  // Redirect logic when ctx changes
  useEffect(() => {
    if (!ctx) return; // Ensure context exists before running

    // Extract only the route paths from both arrays
    const webRoutes = webLinks?.map((link) => link.link);
    const mobileRoutes = mobileLinks?.map((link) => link.link);

    const isWeb = ctx === "web_edit";
    const isMobile = ctx === "mobile_edit";

    // If pathname is not in the respective mode's routes, redirect
    if (isWeb && !webRoutes.includes(pathname)) {
      router.replace("/home-web");
    } else if (isMobile && !mobileRoutes.includes(pathname)) {
      router.replace("/");
    }
  }, [ctx, pathname]);

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

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

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
    if (ctx) {
      const currentRoute = pathname;

      // If on web mode and on a mobile-specific route
      if (ctx === "web_edit" && currentRoute === "/") {
        router.push("/home-web"); // Redirect to web home if on mobile mode
      }

      // If on mobile mode and on a web-specific route
      if (ctx === "mobile_edit" && currentRoute === "/home-web") {
        router.push("/"); // Redirect to mobile home if on web mode
      }

      // Check if we're on a shared route, and no redirection is needed
      if (!sharedRoutes.includes(currentRoute)) {
        if (ctx === "web_edit" && currentRoute !== "/home-web") {
          router.push("/home-web"); // Redirect to web home if not on the web route
        } else if (ctx === "mobile_edit" && currentRoute !== "/") {
          router.push("/"); // Redirect to mobile home if not on the mobile route
        }
      }
    }
  }, [ctx, pathname, sharedRoutes]);

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

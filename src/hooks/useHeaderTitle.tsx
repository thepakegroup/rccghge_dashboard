import { useCtx } from "@/providers/ctx-provider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useHeaderTitle = () => {
  const path = usePathname();
  const [title, setTitle] = useState<string>("");
  const { ctx } = useCtx();

  useEffect(() => {
    const paths = path.split("/").filter(Boolean); // Filter out empty strings
    if (paths.length) {
      const lastItem = paths[paths.length - 1];
      setTitle(
        lastItem.toLowerCase() === null ? "Home" : lastItem.replaceAll("-", " ")
      );
    } else {
      setTitle("Home");
    }
  }, [path, ctx]);
  return {
    title,
  };
};

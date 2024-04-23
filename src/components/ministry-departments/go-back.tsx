"use client";

import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { useRouter } from "next/navigation";

export const GoBack = ({ header }: { header: string }) => {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-2 select-none cursor-pointer"
      onClick={() => router.push(`/ministry-departments`)}
    >
      <ArrowLeftIcon />
      <h3 className="font-semibold">{header}</h3>
    </div>
  );
};

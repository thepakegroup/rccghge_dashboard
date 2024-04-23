"use client";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import { useRouter } from "next/navigation";

export const MinistryDepartmentsHeader = () => {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-2 select-none cursor-pointer"
      onClick={() => router.push("/page_settings")}
    >
      <ArrowLeftIcon />
      <h3 className="font-semibold">Back to Page settings</h3>
    </div>
  );
};

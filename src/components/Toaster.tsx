"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { setToast } from "../store/slice/toast";

const Toaster = () => {
  const { isToast, title, info, type } = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeDisplay = setTimeout(() => {
      dispatch(
        setToast({
          isToast: false,
          title: "",
          info: "",
        })
      );
    }, 1500);

    return () => clearTimeout(timeDisplay);
  });

  return (
    <>
      {isToast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-[80]">
          <div
            className={`flex-center gap-2 p-4 bg-gray-50 border ${
              type === "delete" ? "border-[#DA2B2B]" : "border-[#073364]"
            } rounded-lg w-[18rem] md:w-[29rem]`}
          >
            <Image
              src={type === "delete" ? "icons/delete.svg" : "icons/toast.svg"}
              alt=""
              width={24}
              height={24}
            />
            <div className="text-sm">
              <p className="text-gray-900 font-medium">
                {type === "delete" ? "Deleted!" : title}
              </p>
              {info !== "" && <span className="text-gray-500">{info}</span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toaster;

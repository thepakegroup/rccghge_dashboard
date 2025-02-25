"use client";

import useModalType from "@/hooks/modalType";
import { useAppDispatch } from "@/store/hooks";
import { setButtonVisibility } from "@/store/slice/ButtonVisibility";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const AddItemButton = ({
  title,
  onclick,
}: {
  title: string;
  onclick?: () => void;
}) => {
  const elementRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();

  const handleButton = useModalType();

  const handleScroll = () => {
    const element: any = elementRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      dispatch(setButtonVisibility(isVisible));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      ref={elementRef}
      onClick={() => {
        handleButton("add");
        onclick?.();
      }}
      className="text-sm font-semibold px-4 py-3 bg-[#e77400] flex-center gap-[0.3rem] text-white rounded-md"
    >
      <span>{title}</span>
      <Image
        src="icons/plus.svg"
        alt=""
        width={18}
        height={18}
        className="cursor-pointer"
      />
    </button>
  );
};

export default AddItemButton;

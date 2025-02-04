"use client";

import Image from "next/image";
import { useEffect } from "react";
import { setIsSidebarToggle } from "../store/slice/sidbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearItems } from "@/store/slice/mediaItems";
import { usePathname } from "next/navigation";
import useModalType from "@/hooks/modalType";

const Nav = () => {
  const isSidebarOpen = useAppSelector((state) => state.sideBar.isSidebarOpen);
  const { items } = useAppSelector((state) => state.mediaItems);

  const isButtonVisible = useAppSelector(
    (state) => state.buttonVisible.isButtonViible
  );

  const handleButton = useModalType();

  const pathname = usePathname();

  const section: { [key: string]: string } = {
    "/": "home",
    "/testimonies": "testimonies",
    "/manage-events": "manage events",
    "/page-writeup": "page writeup",
    "/ministry": "ministry",
    "/socials": "socials",
    "/subscriptions": "subscriptions",
    "/settings": "app settings",
    "/page_settings": "page settings",
    "/admin": "admin",
  };

  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(setIsSidebarToggle(!isSidebarOpen));
  };

  useEffect(() => {
    isSidebarOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isSidebarOpen]);

  return (
    <nav
      className={`flex-center justify-between bg-white px-4 py-3 fixed top-0 w-full z-30 ${
        isSidebarOpen ? "lg:calc-width-50 lg:ml-[271px]" : "lg:w-full md:ml-0"
      }`}
    >
      <div className="flex-center gap-5">
        <Image
          src="/icons/hamburger.svg"
          alt=""
          width={24}
          height={24}
          className="cursor-pointer h-auto w-auto"
          onClick={handleToggle}
        />
        <div className="font-bold text-lg capitalize">{section[pathname]}</div>
      </div>
      <div className="text-base flex-center gap-2 md:gap-3">
        <button
          onClick={() => handleButton("delete")}
          className={`gap-1 ${
            items.length > 0 ? "flex-center text-xs md:text-base" : "hidden"
          }`}
        >
          <Image src="/icons/delete.svg" alt="" width={18} height={18} />
          <span>{items.length === 1 ? "Delete" : "Delete All"}</span>
        </button>
        <button
          onClick={() => dispatch(clearItems())}
          className={`gap-1 ${
            items.length > 0 ? "flex-center text-xs md:text-base" : "hidden"
          }`}
        >
          <Image src="/icons/edit.svg" alt="" width={18} height={18} />
          <span>{items.length === 1 ? "Uncheck" : "Uncheck All"}</span>
        </button>
        <button
          onClick={() => handleButton("add")}
          className={`py-2 px-3 text-sm font-semibold bg-secondary gap-[0.3rem] text-white rounded-md ${
            isButtonVisible ? "hidden" : "flex-center"
          }`}
        >
          <span>Add media</span>
          <Image src="/icons/plus.svg" alt="" width={18} height={18} />
        </button>
      </div>
    </nav>
  );
};

export default Nav;

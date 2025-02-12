"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { setIsSidebarToggle } from "../store/slice/sidbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearItems } from "@/store/slice/mediaItems";
import { usePathname, useRouter } from "next/navigation";
import useModalType from "@/hooks/modalType";
import { BsChevronDown } from "react-icons/bs";
import Cookies from "js-cookie";
import { Truncate } from "@/helper/truncate-text";

const Nav = () => {
  const router = useRouter();
  const isSidebarOpen = useAppSelector((state) => state.sideBar.isSidebarOpen);
  const { items } = useAppSelector((state) => state.mediaItems);
  const isButtonVisible = useAppSelector(
    (state) => state.buttonVisible.isButtonViible
  );

  // State for client-side rendering
  const [currentCtx, setCurrentCtx] = useState<string>("");
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const [showSwitchDrop, setShowSwitchDrop] = useState(false);

  const handleButton = useModalType();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // Initialize states after mount
  useEffect(() => {
    setCurrentCtx(Cookies.get("ctx") || "");
    setCurrentEmail(Cookies.get("email") || "");
    setIsMounted(true);
  }, []);

  // Handle ctx changes
  const handleCtxSwitch = () => {
    const newCtx = currentCtx === "web_edit" ? "mobile_edit" : "web_edit";
    Cookies.set("ctx", newCtx, { expires: 2 });
    setCurrentCtx(newCtx);
    // Force a page refresh to ensure all components update
    router.refresh();
  };

  const handleToggle = () => {
    dispatch(setIsSidebarToggle(!isSidebarOpen));
  };

  useEffect(() => {
    isSidebarOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isSidebarOpen]);

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

  // Prevent hydration issues by not rendering until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <nav
      className={`flex-center justify-between bg-white px-4 py-3 fixed top-0 w-full z-30 ${
        isSidebarOpen ? "lg:calc-width-50 lg:ml-[271px]" : "lg:w-full md:ml-0"
      }`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex-center gap-5">
          <Image
            src="/icons/hamburger.svg"
            alt=""
            width={24}
            height={24}
            className="cursor-pointer h-auto w-auto"
            onClick={handleToggle}
          />
          <div className="font-bold text-lg capitalize">
            {section[pathname]}
          </div>
        </div>

        <div className="relative">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setShowSwitchDrop(!showSwitchDrop)}
          >
            <div className="h-[40px] w-[40px] bg-gray-300 rounded-full" />
            {currentEmail && (
              <p className="capitalize">{Truncate(currentEmail, 5)}</p>
            )}
            <BsChevronDown />
          </div>

          {showSwitchDrop && currentCtx && (
            <div
              className="absolute right-0 top-[40px] mt-2 py-2 px-4 bg-white shadow-lg rounded-md cursor-pointer hover:bg-gray-50"
              onClick={() => {
                handleCtxSwitch();
                setShowSwitchDrop(false);
              }}
            >
              Switch to {currentCtx === "web_edit" ? "Mobile Edit" : "Web Edit"}
            </div>
          )}
        </div>
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

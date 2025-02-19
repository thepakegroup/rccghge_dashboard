"use client";

import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";
import { setIsSidebarToggle } from "../store/slice/sidbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearItems } from "@/store/slice/mediaItems";
import { usePathname, useRouter } from "next/navigation";
import useModalType from "@/hooks/modalType";
import { BsChevronDown } from "react-icons/bs";
import Cookies from "js-cookie";
import { Truncate } from "@/helper/truncate-text";
import { useCtx } from "@/providers/ctx-provider";
import Link from "next/link";
import { LogOut } from "@/icons";
import axios from "axios";
import { baseUrl } from "@/util/constants";
import Loader from "./Loader";
import CircleClosed from "@/icons/circle-closed";

const Nav = () => {
  const router = useRouter();
  const isSidebarOpen = useAppSelector((state) => state.sideBar.isSidebarOpen);
  const { items } = useAppSelector((state) => state.mediaItems);
  const isButtonVisible = useAppSelector(
    (state) => state.buttonVisible.isButtonViible
  );

  // State for client-side rendering
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const [showSwitchDrop, setShowSwitchDrop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleButton = useModalType();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  //
  // Header and token
  const token = Cookies.get("token");
  const userMail = Cookies.get("email");

  const headers = useMemo(() => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  // Handle Logout
  const handleLogout = async () => {
    setLoader(true);
    const res = await axios.get(`${baseUrl}admin/logout`, {
      headers,
    });

    const data = await res.data;

    if (data.error === false) {
      Cookies.remove("token");
      Cookies.remove("email");
      setCtx(null);
      router.replace("/login");
      setLoader(false);
      handleCloseModal();
    }
  };

  // Initialize states after mount
  useEffect(() => {
    setCurrentEmail(Cookies.get("email") || "");
    setIsMounted(true);
  }, []);

  // Handle ctx changes
  const { ctx, setCtx } = useCtx();

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
    <Fragment>
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

            {showSwitchDrop && ctx && (
              <div className="absolute right-0 top-[45px] mt-2 bg-white shadow-lg rounded-md hover:bg-gray-50 w-fit min-[480px]:w-[322px] font-quicksand">
                <div className="flex items-center justify-between px-3 py-3 gap-4">
                  <div className="flex items-center gap-1">
                    <div className="h-[45px] w-[45px] rounded-full bg-gray-400" />
                    <p className="text-sm">{userMail}</p>
                  </div>
                  {/*  */}
                  <CircleClosed onClick={() => setShowSwitchDrop(false)} />
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  <Link
                    href={"/admin"}
                    onClick={() => setShowSwitchDrop(false)}
                    className="py-3 px-3 w-full hover:bg-gray-200"
                  >
                    Admins
                  </Link>
                  <div
                    className="py-3 px-3 cursor-pointer w-full hover:bg-gray-200"
                    onClick={() => {
                      setCtx(
                        ctx === "mobile_edit" ? "web_edit" : "mobile_edit"
                      );
                      setShowSwitchDrop(false);
                    }}
                  >
                    Switch to {ctx === "web_edit" ? "mobile app" : "web app"}
                  </div>
                  {/* <Link
                    href={"/admin"}
                    className="py-3 px-3 cursor-pointer w-full hover:bg-gray-200"
                    onClick={() => setShowSwitchDrop(false)}
                  >
                    Change password
                  </Link> */}
                </div>
                <div
                  className="flex items-center gap-1 cursor-pointer text-error-400 py-3 px-3 border-t w-full hover:bg-gray-200"
                  onClick={() => {
                    setIsOpen(true);
                    setShowSwitchDrop(false);
                  }}
                >
                  <LogOut />
                  <span>Log out</span>
                </div>
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
      {isOpen && (
        <div
          onClick={handleCloseModal}
          className="modal-wrapper !min-w-[100vw]"
        >
          {loader ? (
            <Loader />
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-red w-full flex flex-col justify-center items-center "
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="delete-modal flex-center flex-col justify-center"
              >
                <Image src="/icons/logout.svg" alt="" width={24} height={24} />
                <div className="text-base font-medium text-center text-black mt-3 mb-6">
                  Are you sure you want to logout?
                </div>
                <div className="flex-center gap-3 text-sm [&>button]:px-8 [&>button]:py-2 [&>button]:rounded-md">
                  <button
                    onClick={handleCloseModal}
                    className="border-2 border-[#D0D5DD] text-black"
                  >
                    No
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-[#CB1A14] text-white"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Nav;

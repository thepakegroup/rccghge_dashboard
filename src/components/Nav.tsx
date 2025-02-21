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
import { LogOut, SearchIcon } from "@/icons";
import axios from "axios";
import { baseUrl } from "@/util/constants";
import Loader from "./Loader";
import CircleClosed from "@/icons/circle-closed";
import { useHeaderTitle } from "@/hooks/useHeaderTitle";

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
  //
  const { title } = useHeaderTitle();
  // Prevent hydration issues by not rendering until mounted
  if (!isMounted) {
    return null;
  }
  //
  //
  return (
    <Fragment>
      <nav
        className={`flex items-center bg-[#e5e8ed] justify-center fixed top-0 py-2 w-full z-30 ${
          isSidebarOpen ? "lg:calc-width-50 lg:ml-[271px]" : "lg:w-full lg:ml-0"
        }`}
      >
        <section className="w-full max-w-[97%] flex gap-3 items-center justify-between bg-white px-5 rounded-[10px] shadow-[1px_5px_44px_0px_rgba(3,2,41,0.07)] py-3">
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
              <div className="font-bold text-sm md:text-base lg:text-lg capitalize line-clamp-1">
                {title}
              </div>
            </div>
            <div className="flex items-center gap-6 md:gap-12">
              <SearchIcon className="block min-[740px]:hidden" />
              <div className="hidden min-[740px]:flex w-[350px] items-center gap-3 bg-[#F2F2F7] rounded-md border border-[#E7E7E7] pl-4">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search for anything"
                  className="outline-none bg-transparent border-none py-3 focus-within:ring-transparent"
                />
              </div>
              <div className="relative">
                <div
                  className="flex items-center gap-1 w-fit cursor-pointer"
                  onClick={() => setShowSwitchDrop(!showSwitchDrop)}
                >
                  <div className="h-[40px] min-w-[40px] bg-[#d9d9d9] rounded-full" />
                  {currentEmail && (
                    <p className="capitalize">{Truncate(currentEmail, 6)}</p>
                    // <p className="capitalize">{Truncate(currentEmail, 5)}</p>
                  )}
                  <BsChevronDown />
                </div>

                {showSwitchDrop && ctx && (
                  <div className="absolute right-0 top-[50px] px-1 py-4 mt-2 bg-white shadow-lg rounded-md hover:bg-gray-50 w-fit min-[480px]:w-[322px] font-quicksand">
                    {/* header */}
                    <div className="flex items-center justify-between border-b border-[#d1d1d1] px-[11.5px] pb-[13px] gap-4">
                      <div className="flex items-center gap-1">
                        <div className="h-[45px] w-[45px] rounded-full bg-[#d9d9d9]" />
                        <p className="text-sm">{userMail}</p>
                      </div>
                      {/*  */}
                      <CircleClosed onClick={() => setShowSwitchDrop(false)} />
                    </div>

                    <div className="flex flex-col gap-2 mb-2">
                      <Link
                        href={"/admin"}
                        onClick={() => setShowSwitchDrop(false)}
                        className="p-[10px] w-full hover:bg-gray-200"
                      >
                        Admins
                      </Link>
                      <div
                        className="p-[10px] cursor-pointer w-full hover:bg-gray-200"
                        onClick={() => {
                          setCtx(
                            ctx === "mobile_edit" ? "web_edit" : "mobile_edit"
                          );
                          setShowSwitchDrop(false);
                        }}
                      >
                        Switch to{" "}
                        {ctx === "web_edit" ? "mobile app" : "web app"}
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-1 cursor-pointer text-error-400 py-3 p-2 border-t w-full hover:bg-gray-200"
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
          </div>

          {/* buttons */}
          {items.length > 0 ? (
            <div className="text-base min-w-[20%] justify-end flex-center gap-4 md:gap-3">
              <button
                onClick={() => handleButton("delete")}
                className={`gap-1 flex-center text-xs md:text-sm`}
              >
                <Image src="/icons/delete.svg" alt="" width={18} height={18} />
                <span>{items.length === 1 ? "Delete" : "Delete All"}</span>
              </button>
              <button
                onClick={() => dispatch(clearItems())}
                className={`gap-1 flex-center text-xs md:text-sm`}
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
          ) : null}
        </section>
      </nav>

      {/* modal content */}
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { setIsSidebarToggle } from "../store/slice/sidbar";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "@/util/constants";
import Loader from "./Loader";
import {
  AdminIcon,
  HomeIcon,
  ManageEventIcon,
  NotifyIcon,
  SermonSubIcon,
  SettingIcon,
  SocialsIcon,
} from "@/icons";
import { useCtx } from "@/providers/ctx-provider";

interface navItemProp {
  title: string;
  info: string;
  icon: ReactNode;
  link: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isSidebarOpen = useAppSelector((state) => state.sideBar.isSidebarOpen);

  const dispatch = useAppDispatch();
  const user_email = Cookies.get("email");

  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  //
  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Header and token
  const token = Cookies.get("token");

  const headers = useMemo(() => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  const handleToggle = () => {
    window.innerWidth < 1024 && dispatch(setIsSidebarToggle(false));
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

  useEffect(() => {
    if (window.innerWidth > 1024) {
      dispatch(setIsSidebarToggle(true));
    }

    window.addEventListener("resize", () => {
      window && window.innerWidth < 1024
        ? dispatch(setIsSidebarToggle(false))
        : dispatch(setIsSidebarToggle(true));
    });

    setEmail(user_email as string);
  }, [dispatch, user_email]);
  //
  //

  const webLinks: navItemProp[] = [
    {
      title: "Home",
      info: "Dashboard",
      icon: <HomeIcon />,
      link: "/home-web",
    },
    {
      title: "manage events",
      info: "Add and remove events",
      icon: <ManageEventIcon />,
      link: "/manage-events",
    },
    {
      title: "page writeup",
      info: "manage page text content",
      icon: "/icons/write.svg",
      link: "/page-writeup",
    },
    {
      title: "ministry",
      info: "manage leaders & ministry",
      icon: "/icons/minister.svg",
      link: "/ministry",
    },
    {
      title: "sermon subscriptions",
      info: "manage subscriptions",
      icon: <SermonSubIcon />,
      link: "/subscriptions",
    },
    {
      title: "page settings",
      info: "manage site settings",
      icon: <SettingIcon />,
      link: "/page_settings",
    },
    {
      title: "Ministry Settings",
      info: "manage ministries and departments",
      icon: "/icons/minister.svg",
      link: "/ministry-departments",
    },
    {
      title: "admin",
      info: "add & remove admins",
      icon: <AdminIcon />,
      link: "/admin",
    },
  ];
  //
  const mobileLinks = [
    {
      title: "Home",
      info: "Dashboard",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      title: "manage events",
      info: "Add and remove events",
      icon: <ManageEventIcon />,
      link: "/manage-events",
    },
    {
      title: "Testimonies",
      info: "Manage testimonies",
      icon: "/icons/star.svg",
      link: "/testimonies",
    },
    {
      title: "socials",
      info: "manage accounts",
      icon: <SocialsIcon />,
      link: "/socials",
    },
    {
      title: "admin",
      info: "add & remove admins",
      icon: <AdminIcon />,
      link: "/admin",
    },
    {
      title: "manage notification",
      info: "send push notifications",
      icon: <NotifyIcon />,
      link: "/notification",
    },
    {
      title: "app settings",
      info: "manage app settings",
      icon: <SettingIcon />,
      link: "/settings",
    },
  ];

  const { ctx, setCtx } = useCtx();

  // const navItems = useMemo(() => {
  //   if (ctx === "web_edit") return webLinks;
  //   if (ctx === "mobile_edit") return mobileLinks;
  // }, [ctx]);

  const navItems = ctx === "web_edit" ? webLinks : mobileLinks;

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // console.log(Cookies.get("email"));
  if (!hydrated) return null;
  return (
    <>
      <aside
        onClick={handleToggle}
        className={`fixed lg:max-w-max top-0 z-50 w-full h-screen text-white transition-all ease-in-out delay-150 overflow-y-auto no-scrollbar ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full hidden"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="px-2 pt-5 pb-28 md:pb-5 min-h-screen w-[17rem] bg-gradient-to-r from-[#12234E] to-[#4473BA] relative !overflow-y-scroll lg:overscroll-y-auto flex flex-col md:justify-between gap-7 lg:gap-10 no-scrollbar"
        >
          <div className="bg-white flex flex-col items-center rounded-md p-2 max-w-[126px] !mx-auto">
            <Image
              src="/images/logo1.png"
              priority
              alt=""
              width={119.58}
              height={62.57}
              className="w-[59.52px] h-[48px] md:w-[119.58px]"
            />
          </div>
          <div className="min-h-auto lg:min-h-max overflow-y-scroll">
            {navItems?.map((navItem) => {
              const { title, icon, info, link } = navItem;
              return (
                <div key={title}>
                  <Link
                    href={`${link}`}
                    className={`flex-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all hover:bg-secondary mb-2 ${
                      pathname === link && "bg-secondary"
                    }`}
                    onClick={handleToggle}
                  >
                    {icon && typeof icon === "string" ? (
                      <Image
                        src={String(icon)}
                        alt=""
                        width={24}
                        height={24}
                        className="cursor-pointer"
                      />
                    ) : (
                      icon
                    )}
                    <div className="capitalize">
                      <p className="text-sm font-bold">{title}</p>
                      <span className="text-xs font-medium">{info}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="border-t-2 border-[#657596] py-6 md:py-0">
            <div
              className="flex-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all hover:bg-secondary"
              onClick={() => {
                // handleToggle();
                setIsOpen(true);
              }}
            >
              <Image
                src="/icons/logout.svg"
                alt=""
                width={24}
                height={24}
                className="cursor-pointer"
              />
              <div className="">
                <p className="text-sm font-bold text-secondary-01">Logout</p>
                <span className="text-xs font-medium">{email}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
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
    </>
  );
};

export default Sidebar;

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { setIsSidebarToggle } from "../store/slice/sidbar";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Cookies from "js-cookie";

const Sidebar = () => {
  const pathname = usePathname();

  const isSidebarOpen = useAppSelector((state) => state.sideBar.isSidebarOpen);

  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

  const access = Cookies.get("access");

  // const windowSize = typeof window !== "undefined" ? window.innerWidth : 0;

  // const [screenWidth, setScreenWidth] = useState<number>(windowSize);

  // const updateScreenSize = () => {
  //   if (typeof window === "undefined") return;

  //   setScreenWidth(windowSize);
  // };

  const handleToggle = () => {
    window.innerWidth < 1024 && dispatch(setIsSidebarToggle(false));
  };

  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    router.push("/login");
  };

  // useEffect(() => {
  //   window.addEventListener("resize", updateScreenSize);
  //   updateScreenSize();

  //   if (screenWidth > 1024) {
  //     dispatch(setIsSidebarToggle(true));
  //     document.body.classList.remove("overflow-hidden");
  //   } else if (screenWidth <= 1024) {
  //     dispatch(setIsSidebarToggle(false));
  //   }

  //   setEmail(Cookies.get("email") as string);

  //   return () => {
  //     window.removeEventListener("resize", updateScreenSize);
  //   };
  // }, [screenWidth]);

  useEffect(() => {
    dispatch(setIsSidebarToggle(true));

    window.addEventListener("resize", () => {
      window && window.innerWidth < 1024
        ? dispatch(setIsSidebarToggle(false))
        : dispatch(setIsSidebarToggle(true));
    });

    setEmail(Cookies.get("email") as string);
  }, [dispatch]);

  const navItems = [
    {
      title: "Home",
      info: "Dashboard",
      icon: "icons/home.svg",
      link: "/",
    },
    {
      title: "Testimonies",
      info: "Manage testimonies",
      icon: "icons/star.svg",
      link: "/testimonies",
    },
    {
      title: "manage events",
      info: "Add and remove events",
      icon: "icons/event.svg",
      link: "/manage-events",
    },
    {
      title: "page writeup",
      info: "manage page text content",
      icon: "icons/write.svg",
      link: "/page-writeup",
    },
    {
      title: "ministry",
      info: "manage leaders & ministry",
      icon: "icons/minister.svg",
      link: "/ministry",
    },
    {
      title: "page settings",
      info: "manage site settings",
      icon: "icons/settings.svg",
      link: "/settings",
    },
    {
      title: "admin",
      info: "add & remove admins",
      icon: "icons/admin.svg",
      link: "/admin",
    },
    {
      title: "manage notification",
      info: "send push notifications",
      icon: "/icons/notification.svg",
      link: "/notification",
    },
  ];

  return (
    <aside
      onClick={handleToggle}
      className={`fixed lg:max-w-max top-0 z-50 w-full text-white transition-all ease-in-out delay-150 overflow-auto ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full hidden"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="px-2 py-3 h-screen overflow-y-auto w-[17rem] bg-side-bar-bg relative flex flex-col justify-between gap-10"
      >
        <div className="bg-white rounded-md p-[0.465rem] max-w-max">
          <Image src="/images/logo.png" alt="" width={54} height={40} />
        </div>
        <ul className=" min-h-max">
          {navItems.map((navItem) => {
            const { title, icon, info, link } = navItem;
            return (
              <li key={title}>
                <Link
                  href={`${link}`}
                  className={`flex-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all hover:bg-secondary ${
                    pathname === link && "bg-secondary"
                  }`}
                  onClick={handleToggle}
                >
                  <Image
                    src={icon}
                    alt=""
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                  <div className="capitalize">
                    <p className="text-sm font-bold">{title}</p>
                    <span className="text-xs font-medium">{info}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="border-t-2 border-[#657596]">
          <div
            className="flex-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all hover:bg-secondary"
            onClick={handleToggle}
          >
            <Image
              src="/icons/logout.svg"
              alt=""
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <div onClick={handleLogout} className="capitalize">
              <p className="text-sm font-bold text-secondary-01">Logout</p>
              <span className="text-xs font-medium">{email}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

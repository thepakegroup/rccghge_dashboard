"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { setIsSidebarToggle } from "../store/slice/sidbar";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "@/util/constants";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isSidebarOpen = useAppSelector((state) => state.sideBar.isSidebarOpen);

  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

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
    const res = await axios.get(`${baseUrl}admin/logout`, {
      headers,
    });

    const data = await res.data;

    if (data.error === false) {
      Cookies.remove("token");
      router.replace("/login");
    }
  };

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
          <Image
            src="/images/logo1.png"
            priority
            alt=""
            width={119.58}
            height={62.57}
            className="w-[59.52px] h-[41.38px] md:w-[119.58px] md:h-[62.57px]"
          />
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

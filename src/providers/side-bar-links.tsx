import {
  AdminIcon,
  HomeIcon,
  ManageEventIcon,
  NotifyIcon,
  PrayerRequestIcon,
  RideRequestIcon,
  SermonSubIcon,
  SettingIcon,
  SocialsIcon,
} from "@/icons";
import { ReactNode } from "react";

export interface navItemProp {
  title: string;
  info: string;
  icon: ReactNode;
  link: string;
}
export const webLinks: navItemProp[] = [
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
  // {
  //   title: "prayer request",
  //   info: "manage prayer requests",
  //   icon: <PrayerRequestIcon />,
  //   link: "/prayer-requests",
  // },
  // {
  //   title: "ride request",
  //   info: "manage ride requests",
  //   icon: <RideRequestIcon />,
  //   link: "/ride-requests",
  // },
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
export const mobileLinks = [
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

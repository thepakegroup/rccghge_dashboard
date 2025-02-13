"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const WebHomePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("ctx") === "mobile_edit") {
      router.push("/");
    }
  }, []);
  return <div>WebHomePage</div>;
};

export default WebHomePage;

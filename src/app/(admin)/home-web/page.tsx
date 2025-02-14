"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCtx } from "@/providers/ctx-provider";
import { UpcomingEvents } from "@/components/Home/home-web/UpcomingEvents";
import { ConnectAnalysis } from "@/components/Home/home-web/ConnectAnalysis";
import { NewMinistryIntakeList } from "@/components/Home/home-web/NewMinistryIntakeList";
import { Notifications } from "@/components/Home/home-web/Notifications";

const WebHomePage = () => {
  const router = useRouter();

  //
  const { ctx } = useCtx();

  useEffect(() => {
    if (ctx === "mobile_edit") {
      router.push("/");
    }
  }, [ctx]);
  //
  return (
    <section className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] items-start gap-8 mb-8">
        <UpcomingEvents />
        <ConnectAnalysis />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 mb-8">
        <NewMinistryIntakeList />
        <Notifications />
      </div>
    </section>
  );
};

export default WebHomePage;

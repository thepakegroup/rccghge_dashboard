"use client";
import React, { Suspense, useEffect } from "react";
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
    <section className="flex flex-col gap-5 py-[45px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] items-start gap-8">
        <UpcomingEvents />
        <Suspense>
          <ConnectAnalysis />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8">
        <NewMinistryIntakeList />
        <Notifications />
      </div>
    </section>
  );
};

export default WebHomePage;

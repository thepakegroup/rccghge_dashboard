"use client";

import EditSocial from "@/components/Socials/EditSocial";
import Image from "next/image";
import React, { useState } from "react";

const Socials = () => {
  const [show, setShow] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");

  return (
    <section className="relative min-h-[88vh]">
      {/* new sign ups */}
      <div className="flex flex-col gap-3 mt-11">
        <h3 className="text-lg font-semibold text-black">Social Accounts</h3>

        {/* cards */}
        <section className="w-full lg:max-w-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-[66px] md:gap-y-[74px]">
          {socialAccounts?.map((c) => {
            return (
              <div
                key={c?.title}
                className="relative flex flex-col max-w-[305px] rounded-[10px] col-span-1 w-full"
              >
                <Image
                  src={c?.image}
                  alt=""
                  width={305}
                  height={225}
                  className="rounded-t-[10px] w-full"
                />

                <div className="flex justify-between gap-3 bg-white rounded-b-[10px] py-4 px-7">
                  <h5 className="font-bold text-sm text-[#050505]">
                    {c?.title}
                  </h5>

                  <button
                    onClick={() => {
                      setSelectedAccount(c?.title);
                      setShow(true);
                    }}
                    className="flex items-center gap-2 bg-white border-none outline-none text-xs text-[#E77400] font-semibold"
                  >
                    {" "}
                    <Image
                      src="/icons/pen-icon.svg"
                      alt=""
                      width={13}
                      height={13}
                      className="rounded-t-[10px] w-full"
                    />
                    Edit
                  </button>
                </div>

                {/* social icon */}
                <Image
                  src={c?.icon}
                  alt=""
                  width={30}
                  height={30}
                  className="absolute top-2 left-2"
                />
              </div>
            );
          })}
        </section>
      </div>

      {/* Edit a social account */}
      {show && (
        <EditSocial
          onClose={() => {
            setSelectedAccount("");
            setShow(false);
          }}
          selectedAccount={selectedAccount}
        />
      )}
    </section>
  );
};

export default Socials;

const socialAccounts = [
  {
    title: "Instagram",
    image: "/images/default-socials-image.png",
    icon: "/icons/instagram.svg",
  },
  {
    title: "Facebook",
    image: "/images/default-socials-image.png",
    icon: "/icons/facebook.svg",
  },
  {
    title: "Twitter",
    image: "/images/default-socials-image.png",
    icon: "/icons/twitter.svg",
  },
  {
    title: "TikTok",
    image: "/images/default-socials-image.png",
    icon: "/icons/tiktok.svg",
  },
  {
    title: "Youtube",
    image: "/images/default-socials-image.png",
    icon: "/icons/youtube.svg",
  },
  {
    title: "Vimeo",
    image: "/images/default-socials-image.png",
    icon: "/icons/vimeo.svg",
  },
];

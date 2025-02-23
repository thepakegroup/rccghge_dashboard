"use client";

import Loader from "@/components/Loader";
import PaginationButtons from "@/components/PaginationButtons";
import ConfirmDeleteSocials from "@/components/Socials/ConfirmDeleteSocials";
import CreateSocial from "@/components/Socials/CreateSocial";
import EditSocial from "@/components/Socials/EditSocial";
import { useFetchData } from "@/hooks/fetchData";
import { Socials } from "@/util/interface/socials";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SocialsPage = () => {
  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Socials | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // get all social connect
  const { data, loading, fetchData, metadata } = useFetchData({
    url: `social-connects?page=${currentPage}&perPage=${10}`,
    method: "client",
  });

  const socials: Socials[] = data?.data?.data;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Pagination
  const totalPages = data?.data?.meta?.last_page;

  return (
    <section className="relative min-h-[88vh] w-full">
      {/* new sign ups */}
      <div className="flex flex-col gap-6 mt-11 w-full">
        <div className="flex justify-between items-center w-full  md:max-w-[93%]">
          <h3 className="text-lg font-semibold text-black">Social Accounts</h3>

          <button
            onClick={() => setShowCreate(true)}
            className="bg-[#E77400] py-2 px-6 w-fit text-white rounded-md"
          >
            Create
          </button>
        </div>

        {/* cards */}
        {loading ? (
          <Loader />
        ) : (
          <section className="w-full items-center justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-x-[16px] md:gap-y-[74px]">
            {socials?.map((c) => {
              return (
                <div
                  key={c?.id}
                  className="relative flex flex-col max-w-[305px] mx-auto lg:mx-0 rounded-[10px] col-span-1 w-full"
                >
                  <div className="relative">
                    <div className="h-[225px] rounded-t-[10px] bg-white">
                      <Image
                        src={
                          c?.media_thumbnail ||
                          "/images/default-socials-image.png"
                        }
                        alt=""
                        width={305}
                        height={225}
                        className="rounded-t-[10px] !w-full !max-h-full"
                      />
                    </div>

                    {c?.media_type === "video" && (
                      <Image
                        src="/icons/play.svg"
                        alt=""
                        width={80}
                        height={80}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      />
                    )}
                  </div>

                  <div className="flex justify-between gap-3 bg-white rounded-b-[10px] py-4 px-7">
                    <h5 className="font-bold flex flex-col gap-1 text-sm text-[#050505] capitalize">
                      {c?.social_media_type}
                      <span className="text-[#5D5D5D] font-medium">
                        {c?.media_type}
                      </span>
                    </h5>

                    <div className="flex gap-2">
                      {" "}
                      <button
                        onClick={() => {
                          setSelectedAccount(c);
                          setShow(true);
                        }}
                        className="flex items-center gap-2 bg-white border-none outline-none text-xs text-[#E77400] font-semibold"
                      >
                        {" "}
                        <Image
                          src="/icons/pen-icon.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAccount(c);
                          setShowDelete(true);
                        }}
                      >
                        <Image
                          src="icons/delete.svg"
                          alt=""
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  </div>

                  {/* social icon */}
                  <Image
                    src={
                      socialAccounts?.filter(
                        (i) =>
                          i.title.toLowerCase() ===
                          c?.social_media_type.toLowerCase()
                      )[0]?.icon
                    }
                    alt=""
                    width={30}
                    height={30}
                    className="absolute top-2 left-2"
                  />
                </div>
              );
            })}
          </section>
        )}
      </div>

      {/* Pagination */}
      {socials?.length > 0 && (
        <div className="absolute bottom-0 right-[45%]">
          <PaginationButtons
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {/* Create a social account */}
      {showCreate && (
        <CreateSocial
          onClose={() => {
            setShowCreate(false);
          }}
          fetchData={fetchData}
        />
      )}

      {/* Edit a social account */}
      {show && (
        <EditSocial
          onClose={() => {
            setSelectedAccount(null);
            setShow(false);
          }}
          selectedAccount={selectedAccount as Socials}
          fetchData={fetchData}
        />
      )}

      {/* Delete a social account */}
      {showDelete && (
        <ConfirmDeleteSocials
          onClose={() => {
            setSelectedAccount(null);
            setShowDelete(false);
          }}
          selectedAccount={selectedAccount as Socials}
          fetchData={fetchData}
        />
      )}
    </section>
  );
};

export default SocialsPage;

const socialAccounts = [
  {
    title: "Instagram",
    icon: "/icons/instagram.svg",
  },
  {
    title: "Facebook",
    icon: "/icons/facebook.svg",
  },
  {
    title: "Twitter",
    icon: "/icons/twitter.svg",
  },
  {
    title: "TikTok",
    icon: "/icons/tiktok.svg",
  },
  {
    title: "Youtube",
    icon: "/icons/youtube.svg",
  },
  {
    title: "Vimeo",
    icon: "/icons/vimeo.svg",
  },
];

"use client";

import Loader from "@/components/Loader";
import PaginationButtons from "@/components/PaginationButtons";
import { patch } from "@/helper/apiFetch";
import { useFetchData } from "@/hooks/fetchData";
import useUpdateToast from "@/hooks/updateToast";
import { NewSignups, SubscribersI } from "@/util/interface/subscribers";
import { AxiosError } from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Subscriptions = () => {
  const updateToast = useUpdateToast();
  const [currentPageNewSignups, setCurrentPageNewSignups] = useState(1);
  const [currentPageSubscribers, setCurrentPageSubscribers] = useState(1);
  const [currentEmail, setCurrentEmail] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  // get all new signups
  const {
    data: new_signups,
    loading: loading_new_signups,
    fetchData: fetch_new_signups,
    metadata: new_signup_metadata,
  } = useFetchData({
    url: `sermon-subscribers?subscribed=${false}&page=${currentPageNewSignups}&perPage=${10}`,
    method: "client",
  });

  // get all subscribers
  const {
    data: subscribers,
    loading: loading_subscribers,
    fetchData: fetch_subscribers,
    metadata: subscribers_metadata,
  } = useFetchData({
    url: `sermon-subscribers?subscribed=${true}&page=${currentPageSubscribers}&perPage=${10}`,
    method: "client",
  });

  const newSignups: NewSignups[] = new_signups?.data?.data;
  const subscribers_data: SubscribersI[] = subscribers?.data?.data;

  useEffect(() => {
    fetch_new_signups();
  }, [currentPageNewSignups]);

  useEffect(() => {
    fetch_subscribers();
  }, [currentPageSubscribers]);

  // subscribe an email
  const handleSubscribe = async (email: string, status: boolean) => {
    setLoading(true);

    try {
      const res = await patch(`subscriber-status`, {
        status: status,
        subscriber: email,
      });

      updateToast({
        title: `${"Subscribed Successfully."}`,
      });

      setLoading(false);
      setCurrentEmail(null);
      fetch_new_signups();
      fetch_subscribers();
    } catch (error) {
      setLoading(false);

      updateToast({
        title: `Error! Email not subscribed.`,
        type: "error",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  // Pagination
  const totalPagesNewSignups = new_signups?.data?.meta?.last_page;
  const totalPagesSubscribers = subscribers?.data?.meta?.last_page;

  return (
    <section className="relative min-h-[88vh]">
      {/* new sign ups */}
      <div className="flex flex-col gap-3 mt-11">
        <h3 className="text-lg font-semibold text-black">New Sign Ups</h3>

        {!loading_new_signups && newSignups?.length < 1 && (
          <p className="w-full text-center pt-10">No New Sign Ups!</p>
        )}

        {/*new sign ups card */}
        {loading_new_signups ? (
          <Loader />
        ) : (
          <>
            {newSignups?.map((c) => {
              return (
                <div
                  key={c?.id}
                  className="flex flex-col md:flex-row gap-2 relative justify-between md:items-center bg-white px-6 py-4 rounded-[7px]"
                >
                  <p className="gap-5 flex items-center text-sm text-[#3D3D3D] font-semibold">
                    <Image
                      src="/icons/red-dot.svg"
                      alt=""
                      width={7}
                      height={7}
                    />
                    {c?.email}
                  </p>

                  <button
                    onClick={() => {
                      setCurrentEmail(c?.email);
                      handleSubscribe(c?.email, true);
                    }}
                    className={`bg-[#E77400] px-[15px] py-[10px] w-fit rounded text-xs font-semibold text-[#F9FAFB] ${
                      loading && currentEmail === c?.email && "animate-pulse"
                    }`}
                  >
                    {loading && currentEmail === c?.email
                      ? "Adding..."
                      : "Add to list"}
                  </button>

                  <p className="absolute top-1 left-1 flex gap-1 items-center text-[10px] text-[#4A4A4A]">
                    <Image
                      src="/icons/calendar-icon.svg"
                      alt=""
                      width={12}
                      height={12}
                    />
                    {new Date(c?.created_at).toDateString()}
                  </p>
                </div>
              );
            })}
          </>
        )}

        {/* Pagination */}
        {newSignups?.length > 0 && (
          <div className="absolute bottom-0 right-[45%]">
            <PaginationButtons
              totalPages={totalPagesNewSignups}
              currentPage={currentPageNewSignups}
              setCurrentPage={setCurrentPageNewSignups}
            />
          </div>
        )}
      </div>

      {/* subscribers */}
      <div className="flex flex-col gap-3 mt-11">
        <h3 className="text-lg font-semibold text-black">Subscribers</h3>

        {!loading_subscribers && subscribers_data?.length < 1 && (
          <p className="w-full text-center pt-10">No Subscribers Yet!</p>
        )}

        {/*new sign ups card */}
        {loading_subscribers ? (
          <Loader />
        ) : (
          <>
            {subscribers_data?.map((c) => {
              return (
                <div
                  key={c?.id}
                  className="flex relative justify-between items-center bg-white px-6 py-4 rounded-[7px]"
                >
                  <p className="text-sm text-[#3D3D3D] font-semibold">
                    {c?.email}
                  </p>

                  {loading && currentEmail === c?.email ? (
                    <div className="loader"></div>
                  ) : (
                    <input
                      type="checkbox"
                      checked={c?.added}
                      onChange={() => {
                        setCurrentEmail(c?.email);
                        handleSubscribe(c?.email, c?.added ? false : true);
                      }}
                      className="w-[30px] h-[30px] rounded-sm text-green-500 cursor-pointer"
                    />
                  )}

                  <p className="absolute top-1 left-1 flex gap-1 items-center text-[10px] text-[#4A4A4A]">
                    <Image
                      src="/icons/calendar-icon.svg"
                      alt=""
                      width={12}
                      height={12}
                    />
                    {new Date(c?.updated_at).toDateString()}
                  </p>
                </div>
              );
            })}
          </>
        )}

        {/* Pagination */}
        {subscribers_data?.length > 0 && (
          <div className="absolute bottom-0 right-[45%]">
            <PaginationButtons
              totalPages={totalPagesSubscribers}
              currentPage={currentPageSubscribers}
              setCurrentPage={setCurrentPageSubscribers}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Subscriptions;

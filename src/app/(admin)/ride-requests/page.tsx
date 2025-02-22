"use client";
import { NewRequests } from "@/components/ride-requests/NewRequests";
import { PreviousRequests } from "@/components/ride-requests/PreviousRequests";
import { RideRequestProp } from "@/components/ride-requests/request-prop";
import { UpdateRequestModal } from "@/components/ride-requests/UpdateRequestModal";
import { Pagination } from "@/components/simple-pagination/Pagination";
import { get } from "@/helper/apiFetch";
import { MotionPresence } from "@/util/motion-exports";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useState } from "react";

const RideRequestsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 20;
  const params = new URLSearchParams(searchParams.toString());
  //
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] =
    useState<RideRequestProp | null>(null);
  //
  const {
    data,
    isLoading,
    refetch: getRequests,
  } = useQuery({
    queryKey: ["get-ride-request", page, perPage],
    queryFn: async () => {
      const res = await get(`/ride-request?page=${page}&perPage=${perPage}`);
      return res.data;
    },
    select: (data) => data.data,
  });
  //
  const tabs = [
    {
      id: 0,
      title: "New Requests",
      value: (
        <NewRequests
          setShowModal={setShowModal}
          setSelectedRequest={setSelectedRequest}
          data={data?.data}
        />
      ),
    },
    {
      id: 1,
      title: "Previous Requests",
      value: (
        <PreviousRequests
          setShowModal={setShowModal}
          data={data?.data}
          getRequests={getRequests}
        />
      ),
    },
  ];
  //
  const currTab = searchParams.get("currTab") || tabs[0]?.title;
  //
  return (
    <Fragment>
      <div className="flex items-center gap-6 py-6 lg:pt-11 lg:pb-6 px-6 lg:px-[50px]">
        {tabs?.map((item) => (
          <div
            key={item?.id}
            className={`text-base sm:text-lg md:text-xl font-semibold font-play-fair-display mb-4 cursor-pointer select-none ${
              currTab === item?.title && "border-b-2 border-b-orange"
            }`}
            onClick={() => {
              params.set("currTab", item?.title.toString());
              router.push(`?${params}`);
            }}
          >
            {item?.title}
          </div>
        ))}
      </div>
      {/*  */}
      <div className="px-6 lg:px-[50px] flex flex-col gap-5">
        {isLoading ? (
          <div className="flex flex-col gap-8">
            {Array.from({ length: 6 }, (_, idx) => (
              <div
                className="h-[50px] rounded-md bg-gray-300 animate-pulse"
                key={idx}
              />
            ))}
          </div>
        ) : data && data?.data?.length < 1 ? (
          <div className="w-full h-[250px] flex justify-center items-center">
            <p>No Ride Requests at the moment</p>
          </div>
        ) : (
          tabs?.find((item) => item?.title === currTab)?.value
        )}
      </div>
      <div className="flex items-center gap-6 px-6 lg:px-[50px] mb-6 lg:mb-10 mt-5">
        {data && data?.meta?.total !== 0 && (
          <div className="p-1 px-3 w-full bg-white rounded-xl shadow-md">
            <Pagination meta={data?.meta} />
          </div>
        )}
      </div>
      <MotionPresence>
        {showModal && (
          <UpdateRequestModal
            setShowModal={setShowModal}
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
            getRequests={getRequests}
          />
        )}
      </MotionPresence>
    </Fragment>
  );
};

export default RideRequestsPage;

"use client";
import { NewRequests } from "@/components/ride-requests/NewRequests";
import { PreviousRequests } from "@/components/ride-requests/PreviousRequests";
import { RideRequestProp } from "@/components/ride-requests/request-prop";
import { UpdateRequestModal } from "@/components/ride-requests/UpdateRequestModal";
import { get } from "@/helper/apiFetch";
import { MotionPresence } from "@/util/motion-exports";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useState } from "react";

const RideRequestsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 50;
  const params = new URLSearchParams(searchParams.toString());
  //
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] =
    useState<RideRequestProp | null>(null);
  //
  const { data, isLoading } = useQuery({
    queryKey: ["get-ride-request", page, perPage],
    queryFn: async () => {
      const res = await get(`/ride-request?page=${page}&perPage=${perPage}`);
      return res.data;
    },
    select: (data) => data.data,
  });
  //
  return (
    <Fragment>
      <div className="py-6 lg:py-11 px-6 lg:px-[50px] flex flex-col gap-5">
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
          data && (
            <Fragment>
              <NewRequests
                setShowModal={setShowModal}
                setSelectedRequest={setSelectedRequest}
                data={data?.data}
              />
              <PreviousRequests
                setShowModal={setShowModal}
                setSelectedRequest={setSelectedRequest}
                data={data?.data}
              />
            </Fragment>
          )
        )}
      </div>
      <MotionPresence>
        {showModal && (
          <UpdateRequestModal
            setShowModal={setShowModal}
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
          />
        )}
      </MotionPresence>
    </Fragment>
  );
};

export default RideRequestsPage;

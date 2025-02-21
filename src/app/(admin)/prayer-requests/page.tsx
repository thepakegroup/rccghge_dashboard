"use client";

import Loader from "@/components/Loader";
import PaginationButtons from "@/components/PaginationButtons";
import PrayerRequestTable from "@/components/prayer-requests/prayer-request-table";
import { useFetchData } from "@/hooks/fetchData";
import React, { useEffect, useState } from "react";

export interface PrayerRequests {
  id: number;
  name: string;
  email: string;
  mobile: string;
  subject: null;
  content: string;
  created_at: Date;
  updated_at: Date;
}

const PrayerRequestsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSeen, setCurrentPageSeen] = useState(1);

  //Fetch All unseen prayer requests data
  const { data, loading, fetchData, metadata } = useFetchData({
    url: `prayer-requests?page=${currentPage}&perPage=${10}&seen=${false}`,
    method: "client",
  });

  // fetch all seen prayer requests
  const {
    data: seen_data,
    loading: isloading,
    fetchData: fetchSeenData,
    metadata: seenMetadata,
  } = useFetchData({
    url: `prayer-requests?page=${currentPage}&perPage=${10}&seen=${true}`,
    method: "client",
  });

  // Pagination
  const totalPagesUnseen = metadata?.last_page;
  const totalPagesSeen = seenMetadata?.last_page;

  // list
  const prayer_requests: PrayerRequests[] = data?.message?.data;
  const seen_prayer_requests: PrayerRequests[] = seen_data?.message?.data;

  console.log({ prayer_requests, seen_prayer_requests });

  const onFetchAllData = () => {
    fetchData();
    fetchSeenData();
  };

  useEffect(() => {
    fetchData();
    fetchSeenData();
  }, [currentPage, currentPageSeen]);

  return (
    <div className="py-6 lg:py-11 px-6 lg:px-[50px]">
      <h2 className="text-[#030229] text-xl mb-[18px] font-semibold font-play-fair-display">
        New Prayer Requests
      </h2>

      {/* new prayer requests */}
      <div className="bg-white rounded-[10px] py-5 px-[30px]">
        <h4 className=" text-[#030229] text-xl font-medium font-play-fair-display">
          This Week
        </h4>

        {loading ? (
          <Loader />
        ) : (
          <PrayerRequestTable
            fetchData={onFetchAllData}
            data={prayer_requests}
          />
        )}
      </div>

      {/* Pagination */}
      {prayer_requests?.length > 0 && (
        <div className="mt-24">
          <PaginationButtons
            totalPages={totalPagesUnseen}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      <h2 className="text-[#030229] text-xl mt-[35px] mb-[13px] font-semibold font-play-fair-display">
        Seen Prayer Requests
      </h2>

      {/* other prayer requests that have been seen */}
      <div className="bg-white rounded-[10px] py-5 px-[30px]">
        <h4 className=" text-[#030229] text-xl font-medium font-play-fair-display">
          Others
        </h4>

        {isloading ? (
          <Loader />
        ) : (
          <PrayerRequestTable
            fetchData={onFetchAllData}
            data={seen_prayer_requests}
          />
        )}
      </div>

      {/* Pagination */}
      {prayer_requests?.length > 0 && (
        <div className="absolute bottom-0 right-[40%]">
          <PaginationButtons
            totalPages={totalPagesSeen}
            currentPage={currentPageSeen}
            setCurrentPage={setCurrentPageSeen}
          />
        </div>
      )}
    </div>
  );
};

export default PrayerRequestsPage;

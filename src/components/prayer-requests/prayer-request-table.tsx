"use client";

import React, { useState } from "react";
import ViewPrayerRequestModal from "./view-prayer-request";
import { PrayerRequests } from "@/app/(admin)/prayer-requests/page";
import ConfirmDeletePrayerRequest from "./confirm-delete";

interface Props {
  data: PrayerRequests[];
  fetchData: any;
  seen_requests?: boolean;
}
const PrayerRequestTable = ({
  data,
  fetchData,
  seen_requests = false,
}: Props) => {
  const [openDel, setOpenDel] = useState(false);
  const [selectedId, setSelectedId] = useState<null | number>(null);
  const [openView, setOpenView] = useState(false);
  const [currPrayer, setCurrPrayer] = useState<null | PrayerRequests>(null);

  return (
    <>
      <div className="overflow-auto scroll-style">
        {data && !data.length ? (
          <td className="!w-full text-center py-10">
            {seen_requests
              ? "No Prayer Requests Found!"
              : "No New Prayer Requests Found!"}
          </td>
        ) : (
          <table className="border-collapse w-full">
            {/* Table Header */}
            <thead>
              <tr className="whitespace-nowrap text-left text-sm font-quicksand bg-white rounded-[5px] shadow-[1px_5px_44px_0px_rgba(3,2,41,0.07)] font-medium">
                <th className="py-5 px-4 font-medium">ID</th>
                <th className="py-5 px-4 font-medium">Member Name</th>
                <th className="py-5 px-4 font-medium">Phone Number</th>
                <th className="py-5 px-4 font-medium">Date</th>
                <th className="py-5 px-4 font-medium">Prayer Request</th>
              </tr>
            </thead>

            {/* Table Body */}

            <tbody>
              {data?.map((row, index) => (
                <tr
                  key={index}
                  className="border-t whitespace-nowrap bg-white text-xs font-quicksand"
                >
                  <td className="py-5 px-4">#{row.id}</td>
                  <td className="py-5 px-4">{row.name}</td>
                  <td className="py-5 px-4">{row.mobile}</td>
                  <td className="py-5 px-4">
                    {new Date(row.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-5 px-4 line-clamp-1">{row.content}</td>
                  <td className="py-5 px-4 ">
                    {seen_requests ? (
                      <button
                        onClick={() => {
                          setSelectedId(row?.id);
                          setOpenDel(true);
                        }}
                        className="text-red-600 bg-transparent border-none outline-none"
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setCurrPrayer(row);
                          setOpenView(true);
                        }}
                        className="text-orange bg-transparent border-none outline-none"
                      >
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {openView && (
        <ViewPrayerRequestModal
          prayer={currPrayer as PrayerRequests}
          fetchData={fetchData}
          onClose={() => {
            setCurrPrayer(null);
            setOpenView(false);
          }}
        />
      )}

      {openDel && (
        <ConfirmDeletePrayerRequest
          selectedId={selectedId as number}
          fetchData={fetchData}
          onClose={() => {
            setSelectedId(null);
            setOpenDel(false);
          }}
        />
      )}
    </>
  );
};

export default PrayerRequestTable;

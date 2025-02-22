import { Pagination } from "@/components/simple-pagination/Pagination";
import { get } from "@/helper/apiFetch";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { MinistryIntakeTableAction } from "./MinistryIntakeTableAction";
//
export const NewMinistryIntakeList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const page = searchParams.get("page") || 1;
  //
  const {
    data,
    isLoading,
    refetch: getRequests,
  } = useQuery({
    queryKey: ["get-membership-requests", page],
    queryFn: async () => {
      const res = await get(
        `/group-membership-requests?page=${page}&perPage=10`
      );
      return res.data?.data;
    },
  });
  //
  //
  return (
    <div className="min-w-0 w-full">
      <div className="p-5 w-full bg-white rounded-xl shadow-md mb-3">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-[21px]">
          <h2 className="text-base sm:text-lg md:text-xl font-play-fair-display font-semibold">
            New Ministry intake list
          </h2>
          {/* <div className="cursor-pointer flex items-center font-play-fair-display gap-1 bg-gray-100 rounded-md px-2 py-2 text-sm">
            <p>10-06-2021</p>
            <BsChevronDown />
          </div> */}
        </div>

        {/* Table */}
        <div className="overflow-auto scroll-style w-full">
          <table className="border-collapse w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-100 whitespace-nowrap text-left text-sm font-medium">
                <th className="py-5 px-4">Member Name</th>
                <th className="py-5 px-4">Phone Number</th>
                <th className="py-5 px-4">Address</th>
                <th className="py-5 px-4">Ministry</th>
                <th className="py-5 px-4">Email Address</th>
                <th className="py-5 px-4"></th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {isLoading ? (
                <>
                  {Array.from({ length: 6 }, (_, idx) => (
                    <tr key={idx} className="w-full my-8">
                      <td
                        colSpan={6}
                        className="h-10 py-1 bg-gray-200 animate-pulse"
                      />
                    </tr>
                  ))}
                </>
              ) : data && data?.data?.length < 1 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-3 h-6 text-[#5d5d5d]"
                  >
                    No new ministry intake available
                  </td>
                </tr>
              ) : (
                data &&
                data?.data?.map((row: any, index: number) => (
                  <tr
                    key={index}
                    className="border-t whitespace-nowrap text-sm"
                  >
                    <td className="py-5 px-4">{row?.name}</td>
                    <td className="py-5 px-4">{row?.mobile}</td>
                    <td className="py-5 px-4">{row?.address}</td>
                    <td className="py-5 px-4">{row?.ministry}</td>
                    <td className="py-5 px-4">{row?.email}</td>
                    <td className="py-5 px-4">
                      <MinistryIntakeTableAction
                        getRequests={getRequests}
                        item={row}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/*  */}
      {data && data?.meta?.total !== 0 && (
        <div className="p-1 px-3 w-full bg-white rounded-xl shadow-md">
          <Pagination meta={data?.meta} />
        </div>
      )}
    </div>
  );
};

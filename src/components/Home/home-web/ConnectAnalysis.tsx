"use client";
import { get } from "@/helper/apiFetch";
import { formatDate } from "@/helper/dateFormat";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BsChevronDown } from "react-icons/bs";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

//
export const ConnectAnalysis = () => {
  const router = useRouter();
  //
  const today = new Date();
  const date_range = [
    {
      id: 0,
      title: "Today",
      value: new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate()
        )
      ).toISOString(),
    },
    {
      id: 1,
      title: "Yesterday",
      value: new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate() - 1
        )
      ).toISOString(),
    },
    {
      id: 2,
      title: "Last 7 Days",
      value: new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate() - 7
        )
      ).toISOString(),
    },
    {
      id: 4,
      title: "Last Month",
      value: new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth() - 1,
          today.getUTCDate()
        )
      ).toISOString(),
    },
    {
      id: 5,
      title: "Last 6 Months",
      value: new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth() - 6,
          today.getUTCDate()
        )
      ).toISOString(),
    },
    {
      id: 6,
      title: "Last Year",
      value: new Date(
        Date.UTC(
          today.getUTCFullYear() - 1,
          today.getUTCMonth(),
          today.getUTCDate()
        )
      ).toISOString(),
    },
  ];

  //
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  //
  const date = searchParams.get("date") || `${date_range[0]?.value}`;
  //
  const { data } = useQuery({
    queryKey: ["get-connect-analytics", date],
    queryFn: async () => {
      const res = await get(`/connect-analytics?date=${date}`);
      return res.data?.data;
    },
  });
  //

  const formattedData = useMemo(() => {
    const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042"];
    if (data) {
      return data?.map((entry: any, index: any) => ({
        name: entry?.page,
        value: entry?.clicks,
        clickPercentage: entry?.clickPercentage,
        color: COLORS[index % COLORS.length], // Assign color cyclically
      }));
    }
  }, [data]);

  const totalClicks = useMemo(() => {
    if (data) {
      return data?.reduce((sum: any, entry: any) => sum + entry?.clicks, 0);
    }
  }, [data]);
  //
  return (
    <div className="flex flex-col items-center py-[19px] px-[11px] bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-[550px] lg:w-full">
      <div className="flex w-full justify-between items-center px-4 mb-8">
        <h2 className="text-xl  font-play-fair-display font-semibold">
          Connect Analytics
        </h2>
        <Popover className="relative">
          <PopoverButton className={"border-none outline-none"}>
            <div className="cursor-pointer flex items-center text-sm font-play-fair-display gap-1 bg-gray-100 rounded-md px-2 py-2">
              <p>{date_range?.find((item) => item?.value === date)?.title}</p>
              <BsChevronDown />
            </div>
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            className="flex flex-col bg-white rounded-md border border-gray-400"
          >
            {date_range?.map((item) => (
              <div
                className="cursor-pointer py-2 px-2"
                key={item?.id}
                onClick={() => {
                  params.set("date", item?.value);
                  router.push(`?${params.toString()}`);
                }}
              >
                {item?.title}
              </div>
            ))}
          </PopoverPanel>
        </Popover>
      </div>
      <div className="relative w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={0}
              dataKey="value"
            >
              {formattedData?.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center flex-col justify-center text-xl font-semibold text-gray-500">
          <span className="font-normal text-sm">Total Click(s)</span>
          <span>{totalClicks}</span>
        </div>
      </div>
      <div className="mt-4 flex items-start gap-2 flex-wrap">
        {formattedData?.length < 1 && (
          <p className="text-sm font-normal text-[#5d5d5d]">
            No Data available for these periods
          </p>
        )}
        {formattedData?.map((entry: any, index: number) => (
          <div
            key={index}
            className="flex w-full xl:max-w-[32%] items-start text-gray-600 space-x-2"
          >
            <span
              className="!w-2 !h-2 p-2 rounded-full"
              style={{ backgroundColor: entry?.color }}
            ></span>
            <p className="flex flex-col">
              <span className="text-sm text-[#5d5d5d]">{entry?.name}</span>
              <span className="text-sm font-medium text-[#050505]">
                {entry?.clickPercentage}%
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

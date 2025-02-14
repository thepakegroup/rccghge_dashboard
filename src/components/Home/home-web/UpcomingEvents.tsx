import { get } from "@/helper/apiFetch";
import { CalenderIcon } from "@/icons";
import { baseUrl } from "@/util/constants";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { BsArrowRight } from "react-icons/bs";

export const UpcomingEvents = () => {
  const [page, setPage] = useState<number>(1);
  //
  const { data, isLoading } = useQuery({
    queryKey: ["get-event", page],
    queryFn: async () => {
      const res = await get(`/events/${page}/10`);
      return res.data;
    },
    select: (data) => data?.message,
  });
  //
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    if (data) {
      return data?.data
        ?.filter((item: any) => new Date(item?.end_date) > now)
        .slice(0, 3);
    }
    return [];
  }, [data?.data]);
  //
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-play-fair-display font-semibold text-2xl">
          Upcoming Events
        </h3>
        <Link
          href="/manage-events"
          className="flex items-center gap-2 text-orange"
        >
          <p>See more</p>
          <BsArrowRight />
        </Link>
      </div>
      {/*  */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 min-[1180px]:grid-cols-3 gap-y-5 gap-x-6">
        {isLoading ? (
          Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-[240px] bg-gray-300 shadow-sm animate-pulse rounded-md"
            />
          ))
        ) : data && upcomingEvents?.length < 1 ? (
          <div>No Events here</div>
        ) : (
          data &&
          upcomingEvents?.map((item: any) => {
            const date = parseISO(item?.end_date);
            return (
              <div
                key={item?.id}
                className="rounded-md p-5 flex flex-col gap-2 items-center bg-white shadow-sm"
              >
                <div className="rounded-sm overflow-hidden w-[96%] h-[250px] mx-auto">
                  <Image
                    src={`${baseUrl}event-image/${item?.banner}`}
                    alt={item?.title}
                    width={100}
                    height={80}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-play-fair-display font-semibold text-lg line-clamp-1">
                    {item?.title}
                  </h3>
                  <p className="text-sm flex items-start gap-2 text-gray-500">
                    <CalenderIcon />
                    <span>
                      {item?.end_date &&
                        format(date, "MMMM do - h a") + " - 12PM"}
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

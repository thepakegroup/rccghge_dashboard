"use client";
import { MinistryCardLoader } from "@/components/ministry-departments/ministry-card-loader";
import { MinistryDepartmentsHeader } from "@/components/ministry-departments/ministry-departments-header";
import { MinistryDepartmentsTab } from "@/components/ministry-departments/ministry-departments-tab";
import { get } from "@/helper/apiFetch";
import { redirectLink } from "@/helper/redirectLink";
import { PenIcon } from "@/icons/pen-icon";
import { baseUrl } from "@/util/constants";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const MinistryDepartmentsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // states
  // params
  const tab = searchParams.get("tab") || "Ministry";
  const page = searchParams.get("page") || 1;
  // get all groups
  const { data: groups, isLoading: loadingGroups } = useQuery({
    queryKey: ["groups", tab, page],
    queryFn: async () => {
      const res = await get(`/groups?category=${tab}&page=${page}&perPage=10`);
      return res.data;
    },
    select: (data) => data.message,
    staleTime: 3000,
  });
  //
  const handlePageClick = ({ selected }: { selected: number }) => {
    const page = selected + 1;
    router.push(`/ministry-departments?page=${page}&tab=${tab}`);
  };
  //
  return (
    <div className="max-w-[1440px] px-4 mt-8">
      {/* <MinistryDepartmentsHeader /> */}
      {/* two tab display */}
      <MinistryDepartmentsTab
        tab={tab}
        // setTab={setTab}
        page={page}
      />
      {/* Groups Display */}
      <div className="mt-8 grid grid-cols-1 min-[476px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1240px]:gricd-cols-4 gap-4 mb-5">
        {loadingGroups &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((group) => {
            return <MinistryCardLoader key={group} />;
          })}
        {groups &&
          groups.data?.map((group: any) => {
            return (
              <div
                className="rounded-lg overflow-hidden bg-white"
                key={group?.id}
              >
                <div className="w-full h-[250px]">
                  <Image
                    className="w-full h-full object-cover"
                    src={`${baseUrl}load-media/${group?.banner}`}
                    alt={group?.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="py-5 px-2 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="h-[10px] w-[10px] rounded-full bg-black" />
                    <h3 className="text-sm font-bold font-play-fair-display">
                      {group?.name}
                    </h3>
                  </div>
                  <Link
                    className="flex items-center gap-1 text-orange text-xs"
                    href={`${redirectLink(group)}`}
                  >
                    <PenIcon />
                    <span>Edit Page</span>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
      {groups && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={groups.meta?.last_page}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="ministry-departments-pagination flex flex-wrap gap-2 justify-center my-5"
          activeLinkClassName="text-white bg-orange"
        />
      )}
    </div>
  );
};

export default MinistryDepartmentsPage;

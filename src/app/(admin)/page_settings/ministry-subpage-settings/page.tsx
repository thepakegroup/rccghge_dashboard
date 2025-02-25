"use client";
import { MinistryDepartmentLists } from "@/components/ministry-departments/ministry-department-lists";
import { MinistryDepartmentsTab } from "@/components/ministry-departments/ministry-departments-tab";
import { get } from "@/helper/apiFetch";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { redirectLink } from "@/helper/redirectLink";
import ReactPaginate from "react-paginate";
import { MinistryDepartmentsHeader } from "@/components/ministry-departments/ministry-departments-header";

const MinistrySubPageSettingsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString())
  // states
  // params
  const tab = searchParams.get("tab") || "Ministry";
  const page = searchParams.get("page") || 1;
  // get all groups
  const {
    data: groups,
    isLoading: loadingGroups,
    refetch: getGroups,
  } = useQuery({
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
    params.set("page", String(page))
    router.push(`?${params}`);
  };
  return (
    <div className="max-w-[1440px] px-4 mt-8">
      <MinistryDepartmentsHeader />
      {/*  */}
      <MinistryDepartmentsTab
        tab={tab}
        // setTab={setTab}
        page={page}
      />
      {/* Groups Display */}
      <MinistryDepartmentLists
        {...{ groups, loadingGroups, redirectLink, isPageSettings: true }}
      />
      {/*  */}
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

export default MinistrySubPageSettingsPage;

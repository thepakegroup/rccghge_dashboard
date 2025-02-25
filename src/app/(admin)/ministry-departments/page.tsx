"use client";
import { Button } from "@/components/base-components/button";
import { AddMinistryModal } from "@/components/ministry-departments/AddMinistryModal";
import { EditMinistryModal } from "@/components/ministry-departments/EditMinistryModal";
import { MinistryDepartmentLists } from "@/components/ministry-departments/ministry-department-lists";
import { MinistryDepartmentsTab } from "@/components/ministry-departments/ministry-departments-tab";
import { get } from "@/helper/apiFetch";
import { redirectLink } from "@/helper/redirectLink";
import { MotionPresence } from "@/util/motion-exports";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const MinistryDepartmentsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
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
    params.set("page", String(page));
    router.push(`?${params}`);
  };
  //
  //
  const [showCreateMinistryModal, setShowCreateMinistryModal] =
    useState<boolean>(false);
  const [showEditMinistryModal, setShowEditMinistryModal] =
    useState<boolean>(false);
  const [selectedMinistry, setSelectedMinistry] = useState<any>(null);
  //
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
      <MinistryDepartmentLists
        {...{
          groups,
          loadingGroups,
          redirectLink,
          setSelectedMinistry,
          setShowEditMinistryModal,
        }}
      />
      {/*  */}
      <Button
        label={tab === "Ministry" ? "Add Ministry" : "Add Department"}
        className="!h-[44px] !rounded-[6px] !w-[192px] flex justify-center items-center text-center !py-4 !px-6 font-quicksand !my-12"
        onClick={() => setShowCreateMinistryModal(true)}
      />
      {/*  */}
      <MotionPresence>
        {showCreateMinistryModal && (
          <AddMinistryModal
            setShowModal={setShowCreateMinistryModal}
            tab={tab}
            getGroups={getGroups}
          />
        )}
        {showEditMinistryModal && (
          <EditMinistryModal
            selectedMinistry={selectedMinistry}
            setSelectedMinistry={setSelectedMinistry}
            setShowModal={setShowEditMinistryModal}
            getGroups={getGroups}
          />
        )}
      </MotionPresence>
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

export default MinistryDepartmentsPage;

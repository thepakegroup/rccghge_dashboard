"use client";
import { Button } from "@/components/base-components/button";
import { AddMinistryModal } from "@/components/ministry-departments/AddMinistryModal";
import { EditMinistryModal } from "@/components/ministry-departments/EditMinistryModal";
import { MinistryDepartmentLists } from "@/components/ministry-departments/ministry-department-lists";
import { MinistryDepartmentsTab } from "@/components/ministry-departments/ministry-departments-tab";
import { get } from "@/helper/apiFetch";
import { redirectLink } from "@/helper/redirectLink";
import { ChevronLeft, ChevronRight } from "@/icons";
import { MotionPresence } from "@/util/motion-exports";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const MinistryDepartmentsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  // states
  // params
  const tab = searchParams.get("tab") || "Ministry";
  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 9;
  // get all groups
  const {
    data: groups,
    isLoading: loadingGroups,
    refetch: getGroups,
  } = useQuery({
    queryKey: ["groups", tab, page, perPage],
    queryFn: async () => {
      const res = await get(
        `/groups?category=${tab}&page=${page}&perPage=${perPage}`
      );
      return res.data;
    },
    select: (data) => data.message,
    staleTime: 3000,
  });
  //
  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;

      if (width >= 1240) {
        params.set("perPage", "28");
        router.push(`?${params}`);
      } else if (width >= 768) {
        params.set("perPage", "21");
        router.push(`?${params}`);
      } else if (width >= 476) {
        params.set("perPage", "10");
        router.push(`?${params}`);
      } else {
        params.set("perPage", "10");
        router.push(`?${params}`);
      }
    };

    updatePerPage(); // Set initial value
    window.addEventListener("resize", updatePerPage);

    return () => {
      window.removeEventListener("resize", updatePerPage);
    };
  }, [router, searchParams]);
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
            tab={tab}
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
          breakLabel={<span className="mr-4">...</span>}
          nextLabel={
            page !== groups?.meta?.total && (
              <span className="w-10 h-10 flex items-center justify-center bg-[#d3d3d3] rounded-md">
                <ChevronRight />
              </span>
            )
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={groups.meta?.last_page}
          previousLabel={
            page !== 1 && (
              <span className="w-10 h-10 flex items-center justify-center bg-[#d3d3d3] rounded-md mr-4">
                <ChevronLeft />
              </span>
            )
          }
          containerClassName="flex items-center justify-center mt-8 mb-4"
          pageLinkClassName="flex items-center justify-center w-10 h-10 rounded-md"
          pageClassName="block border border-solid border-[#d3d3d3] hover:bg-[#d3d3d3] flex items-center justify-center rounded-md mr-4"
          activeClassName="bg-orange text-white"
          activeLinkClassName="bg-orange text-white"
        />
      )}
    </div>
  );
};

export default MinistryDepartmentsPage;

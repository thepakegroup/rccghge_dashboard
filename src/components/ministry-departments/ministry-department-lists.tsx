import { PenIcon } from "@/icons/pen-icon";
import { baseUrl } from "@/util/constants";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { MinistryCardLoader } from "./ministry-card-loader";
import { useSearchParams } from "next/navigation";
import { MinistryDepartmentListCard } from "./ministry-department-list-card";
import { QueryObserverResult } from "@tanstack/react-query";

export const MinistryDepartmentLists = ({
  loadingGroups,
  groups,
  redirectLink,
  setSelectedMinistry,
  setShowEditMinistryModal,
  isPageSettings = false,
  getGroups,
}: {
  loadingGroups?: boolean;
  groups?: any;
  redirectLink?: (link: any) => void;
  setShowEditMinistryModal?: Dispatch<SetStateAction<boolean>>;
  setSelectedMinistry?: Dispatch<SetStateAction<any>>;
  isPageSettings?: boolean;
  getGroups: () => Promise<QueryObserverResult<any, Error>>;
}) => {
  //
  const searchParams = useSearchParams();
  const perPage = searchParams.get("perPage") || 9;
  //
  return (
    <Fragment>
      <div className="mt-8 grid grid-cols-1 min-[476px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1240px]:grid-cols-4 gap-4 mb-5">
        {loadingGroups &&
          Array.from({ length: Number(perPage) }, (_, idx) => (
            <MinistryCardLoader key={idx} />
          ))}
        {groups &&
          groups.data?.map((group: any) => {
            return (
              <MinistryDepartmentListCard
                key={group?.id}
                group={group}
                isPageSettings={isPageSettings}
                setSelectedMinistry={setSelectedMinistry}
                setShowEditMinistryModal={setShowEditMinistryModal}
                getGroups={getGroups}
              />
            );
          })}
      </div>
    </Fragment>
  );
};

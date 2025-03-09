import { PenIcon } from "@/icons/pen-icon";
import { baseUrl } from "@/util/constants";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { MinistryCardLoader } from "./ministry-card-loader";
import { useSearchParams } from "next/navigation";

export const MinistryDepartmentLists = ({
  loadingGroups,
  groups,
  redirectLink,
  setSelectedMinistry,
  setShowEditMinistryModal,
  isPageSettings = false,
}: {
  loadingGroups?: boolean;
  groups?: any;
  redirectLink?: (link: any) => void;
  setShowEditMinistryModal?: Dispatch<SetStateAction<boolean>>;
  setSelectedMinistry?: Dispatch<SetStateAction<any>>;
  isPageSettings?: boolean;
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
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-[10px] w-[10px] rounded-full bg-black" />
                      <h3 className="text-sm font-bold font-play-fair-display">
                        {group?.name}
                      </h3>
                    </div>
                    <p className="line-clamp-2 my-1 text-[#454545] font-quicksand text-xs pl-4">
                      {group?.description}
                    </p>
                  </div>
                  {/*  */}
                  <div className="flex justify-end items-center gap-2 my-2 px-4">
                    {isPageSettings ? (
                      <Link
                        className="flex items-center gap-1 text-orange text-xs"
                        // href={`${
                        //   group?.ministry_code === "mens_ministry"
                        //     ? "https://admin.rccghge.ministries.kouakoudomagni.com/men/settings"
                        //     : group?.ministry_code === "young-adult-ministry"
                        //     ? "https://admin.rccghge.ministries.kouakoudomagni.com/youth/settings"
                        //     : redirectLink && redirectLink(group)
                        // }`}
                        href={`${
                          group?.ministry_code === "young-adult-ministry"
                            ? "https://admin.rccghge.ministries.kouakoudomagni.com/youth/settings"
                            : redirectLink && redirectLink(group)
                        }`}
                      >
                        <PenIcon />
                        <span>Edit Page</span>
                      </Link>
                    ) : (
                      <div
                        className="cursor-pointer select-none flex items-center gap-1 text-orange text-xs"
                        onClick={() => {
                          setSelectedMinistry && setSelectedMinistry(group);
                          setShowEditMinistryModal &&
                            setShowEditMinistryModal(true);
                        }}
                      >
                        <PenIcon />
                        <span>Edit</span>
                      </div>
                    )}
                    {/*  */}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

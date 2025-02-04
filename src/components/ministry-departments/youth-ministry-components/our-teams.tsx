"use client";
import { CancelIcon } from "@/icons/cancel-icon";
import { MotionDiv, MotionPresence } from "@/util/motion-exports";
import { QueryObserverResult } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { OurTeamsList } from "./our-teams-list";
import { Button } from "@/components/base-components/button";
import { BsPlus } from "react-icons/bs";
import { NewTeamMemberForm } from "./new-team-member-form";
import { UpdateTeamMemberForm } from "./update-team-member-form";

export const OurTeams = ({
  teams,
  getBackPageInfo,
  setShowOurTeam,
}: {
  teams: any;
  getBackPageInfo: () => Promise<QueryObserverResult<any, Error>>;
  setShowOurTeam: Dispatch<SetStateAction<boolean>>;
}) => {
  //states
  const [showNewTeamForm, setShowNewTeamForm] = useState<boolean>(false);
  const [showUpdateTeam, setShowUpdateTeam] = useState<boolean>(false);
  //
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  //
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mt-5"
    >
      <div className="flex justify-between gap-2 items-center mb-2">
        <h1 className="text-xl font-play-fair-display font-semibold text-black/70">
          Our Great Teams
        </h1>
        <CancelIcon onClick={() => setShowOurTeam(false)} className="mr-5" />
      </div>
      <div className="flex flex-col gap-3 bg-white rounded-lg p-4">
        {teams?.map((item: any) => {
          return (
            <OurTeamsList
              key={item?.id}
              item={item}
              setShowUpdateTeam={setShowUpdateTeam}
              setSelectedTeam={setSelectedTeam}
              getBackPageInfo={getBackPageInfo}
            />
          );
        })}
      </div>
      <Button
        label="Add another team member"
        className="!bg-transparent !text-orange"
        icon={<BsPlus className="text-xl" />}
        onClick={() => setShowNewTeamForm(true)}
      />
      <MotionPresence>
        {showNewTeamForm && (
          <NewTeamMemberForm
            getBackPageInfo={getBackPageInfo}
            setShowNewTeamForm={setShowNewTeamForm}
          />
        )}
        {showUpdateTeam && (
          <UpdateTeamMemberForm
            selectedTeam={selectedTeam}
            getBackPageInfo={getBackPageInfo}
            setShowUpdateTeam={setShowUpdateTeam}
          />
        )}
      </MotionPresence>
    </MotionDiv>
  );
};

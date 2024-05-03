"use client";

import { CancelIcon } from "@/icons/cancel-icon";
import { MotionDiv, MotionPresence } from "@/util/motion-exports";
import { Dispatch, SetStateAction, useState } from "react";
import { OurProgramsList } from "./our-programs-list";
import { Button } from "@/components/base-components/button";
import { BsPlus } from "react-icons/bs";
import { NewProgramForm } from "./new-program-form";
import { QueryObserverResult } from "@tanstack/react-query";
import { UpdateProgramForm } from "./update-program-form";

export const OurPrograms = ({
  ourPrograms,
  setShowOurPrograms,
  getBackPageInfo,
}: {
  ourPrograms: any;
  setShowOurPrograms: Dispatch<SetStateAction<boolean>>;
  getBackPageInfo: () => Promise<QueryObserverResult<any, Error>>;
}) => {
  // states
  const [showNewProgramForm, setShowNewProgramForm] = useState<boolean>(false);
  const [showUpdateProgram, setShowUpdateProgram] = useState<boolean>(false);
  //
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

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
          Our Programs
        </h1>
        <CancelIcon
          onClick={() => setShowOurPrograms(false)}
          className="mr-5"
        />
      </div>
      <div className="flex flex-col gap-3 bg-white rounded-lg p-4">
        {ourPrograms?.map((item: any) => {
          return (
            <OurProgramsList
              setSelectedProgram={setSelectedProgram}
              setShowUpdateProgram={setShowUpdateProgram}
              key={item?.id}
              item={item}
              getBackPageInfo={getBackPageInfo}
            />
          );
        })}
      </div>
      <Button
        label="Add another program"
        className="!bg-transparent !text-orange"
        icon={<BsPlus className="text-xl" />}
        onClick={() => setShowNewProgramForm(true)}
      />
      <MotionPresence>
        {showNewProgramForm && (
          <NewProgramForm
            setShowNewProgramForm={setShowNewProgramForm}
            getBackPageInfo={getBackPageInfo}
          />
        )}
        {showUpdateProgram && (
          <UpdateProgramForm
            getBackPageInfo={getBackPageInfo}
            setShowUpdateProgram={setShowUpdateProgram}
            selectedProgram={selectedProgram}
          />
        )}
      </MotionPresence>
    </MotionDiv>
  );
};

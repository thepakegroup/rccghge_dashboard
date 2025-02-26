"use client";

import Leaders from "@/components/Ministry/Leaders";
import { useState } from "react";

const GroupLeadersPage = () => {
  const [currentSection, setCurrentSection] = useState("church leader");

  return (
    <section className="">
      <Leaders currentSection={currentSection} />
    </section>
  );
};

export default GroupLeadersPage;

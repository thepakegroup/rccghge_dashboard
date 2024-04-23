import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export const MinistryDepartmentsTab = ({
  tab,
  // setTab,
  page,
}: {
  tab: string;
  // setTab: Dispatch<SetStateAction<string>>;
  page: string | number;
}) => {
  const router = useRouter();
  // const handle ministry tab click
  const handleMinistryTab = () => {
    const params = new URLSearchParams();
    params.append("tab", "Ministry");
    router.push(`/ministry-departments?page=${page}&tab=Ministry`);
  };
  // const handle department tab click
  const handleDepartmentTab = () => {
    const params = new URLSearchParams();
    params.append("tab", "Department");
    router.push(`/ministry-departments?page=${page}&tab=Department`);
  };
  // two tab display
  return (
    <div className="flex items-center gap-3 mt-8 select-none">
      <h3
        className={`font-semibold text-2xl font-play-fair-display pb-[2px] border-b-[2px] transition-all duration-300 cursor-pointer select-none ${
          tab === "Ministry" && "border-b-orange"
        }`}
        onClick={handleMinistryTab}
      >
        Ministries
      </h3>
      <h3
        className={`font-semibold text-2xl font-play-fair-display pb-[2px] border-b-[2px] transition-all duration-300 cursor-pointer select-none ${
          tab === "Department" && "border-b-orange"
        }`}
        onClick={handleDepartmentTab}
      >
        Departments
      </h3>
    </div>
  );
};

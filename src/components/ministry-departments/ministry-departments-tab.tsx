import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  // const handle ministry tab click
  const handleMinistryTab = () => {
    params.set("tab", "Ministry");
    params.set("page", "1");
    router.push(`?${params}`);
  };
  // const handle department tab click
  const handleDepartmentTab = () => {
    params.set("tab", "Department");
    params.set("page", "1");
    router.push(`?${params}`);
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

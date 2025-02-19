import PrayerRequestTable from "@/components/prayer-requests/prayer-request-table";
import React from "react";

const PrayerRequestsPage = () => {
  return (
    <div className="py-6 lg:py-11 px-6 lg:px-[50px]">
      <h2 className="text-[#030229] text-xl mb-[18px] font-semibold font-play-fair-display">
        New Prayer Requests
      </h2>

      {/* new prayer requests */}
      <div className="bg-white rounded-[10px] py-5 px-[30px]">
        <h4 className=" text-[#030229] text-xl font-medium font-play-fair-display">
          This Week
        </h4>

        <PrayerRequestTable />
      </div>

      <h2 className="text-[#030229] text-xl mt-[35px] mb-[13px] font-semibold font-play-fair-display">
        Seen Prayer Requests
      </h2>

      {/* other prayer requests that have been seen */}
      <div className="bg-white rounded-[10px] py-5 px-[30px]">
        <h4 className=" text-[#030229] text-xl font-medium font-play-fair-display">
          Others
        </h4>

        <PrayerRequestTable />
      </div>
    </div>
  );
};

export default PrayerRequestsPage;

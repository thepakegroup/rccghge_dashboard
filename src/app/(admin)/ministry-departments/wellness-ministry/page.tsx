"use client";

import { GoBack } from "@/components/ministry-departments/go-back";
import { get } from "@/helper/apiFetch";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const WellnessMinistryPage = () => {
  const { data: wellness_ministry, isLoading: loadingWellnessInfo } = useQuery({
    queryKey: ["wellness_ministry"],
    queryFn: async () => {
      const res = await get(`ministry-page/wellness-page`);
      return res.data;
    },
    select: (data) => data.data,
    staleTime: 3000,
  });
  wellness_ministry && console.log(wellness_ministry);
  //
  return (
    <div className="px-4">
      <GoBack header="HGE Wellness Ministry" />
      <form className="mt-5">
        <div>
          <h3 className="font-semibold font-play-fair-display">
            Main header content
          </h3>
          {/* background image input */}
          <div>
            <label htmlFor=""></label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WellnessMinistryPage;

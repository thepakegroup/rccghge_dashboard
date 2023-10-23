"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface fetchI {
  url: string;
  method?: string;
}

export const useFetchData = ({ url, method }: fetchI) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchData = async () => {
    const token = Cookies.get("token");
    try {
      let res;

      if (method !== "client") {
        res = await fetch(url);
      }

      if (method === "client") {
        res = await fetch(url, {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      const data = await res?.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error as any);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, fetchData };
};

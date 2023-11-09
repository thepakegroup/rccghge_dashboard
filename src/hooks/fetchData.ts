"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

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

    const api = axios.create({
      baseURL: "https://api.kouakoudomagni.com/",
    });

    api.interceptors.response.use(
      (response) => {
        // Do something with the response data if needed
        return response;
      },
      (error) => {
        console.log(error.response.status);
        // Handle common error cases, e.g., 401 unauthorized
        if (error.response.status === 401) {
          // Redirect to the login page or show a message to the user
          try {
            axios.get(`admin/logout`);
            Cookies.remove("token");
            window.location.replace("/login");
          } catch (error) {}
          return;
        }

        return Promise.reject(error);
      }
    );

    try {
      let res;

      if (method !== "client") {
        res = await api.get(url);
      }

      if (method === "client") {
        res = await api.get(url, {
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      const data = await res?.data;
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

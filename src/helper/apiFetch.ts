"use client";

import useUpdateToast from "@/hooks/updateToast";
import { baseUrl } from "@/util/constants";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const headers = {
  "content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

const post_headers = {
  "content-Type": "multipart/form-data",
  Authorization: `Bearer ${token}`,
};

const api = axios.create({
  baseURL: baseUrl,
});

// Request interceptors
api.interceptors.request.use(
  (config) => {
    // You can add headers, tokens, or other configurations here
    // For example, you can set an authorization token if you have one
    // config.headers['Authorization'] = `Bearer ${yourToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptors
api.interceptors.response.use(
  (response) => {
    // Do something with the response data if needed
    return response;
  },
  (error) => {
    console.log(error);
    // Handle common error cases, e.g., 401 unauthorized
    if (error.response.status === 401) {
      // Redirect to the login page or show a message to the user
      try {
        get(`admin/logout`);
        Cookies.remove("token");
        window.location.replace("/login");
      } catch (error) {}
      return;
    }

    return Promise.reject(error);
  }
);

export const get = (url: string) => {
  return api.get(url, { headers });
};

export const post = (url: string, data: any, type?: string) => {
  return api.post(url, data, {
    headers: {
      "content-Type": type || "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patch = (url: string, data: any, type?: string) => {
  return api.patch(url, data, {
    headers: {
      "content-Type": type || "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patch2 = (url: string, data?: any, type?: string) => {
  return api.patch(url, data, {
    headers: {
      "content-Type": type || "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const remove = (url: string) => {
  return api.delete(url, { headers });
};

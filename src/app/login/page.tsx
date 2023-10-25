"use client";

import Loader from "@/components/Loader";
import Toaster from "@/components/Toaster";
import useUpdateToast from "@/hooks/updateToast";
import { baseUrl } from "@/util/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/helper/schema";
import { useForm } from "react-hook-form";
import { post } from "@/helper/apiFetch";

const Login = () => {
  const router = useRouter();
  const updateToast = useUpdateToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    const login = {
      email: data.email,
      password: data.password,
    };

    setLoading(true);
    let dataRes;

    try {
      const res = await post(`admin/login`, login);
      dataRes = await res.data;

      if (dataRes.error === true) {
        setLoading(false);
        updateToast({
          title: `Please provide valid credentials`,
          type: "error",
          info: `${dataRes?.message}`,
        });
        return;
      }

      const token = dataRes?.token?.token;
      Cookies.set("token", token, { expires: 2 });

      router.push("/");
    } catch (error) {
      setLoading(false);

      updateToast({
        title: `Error`,
        type: "error",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  return (
    <section className="h-screen flex-center justify-center relative bg-bg-mobile md:bg-bg-desktop bg-cover bg-no-repeat no-scrollbar">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[85%] md:w-full max-w-[29.1875rem]">
          <div className="flex justify-center mb-[1.35875rem]">
            <div className="max-w-max bg-white p-[0.465rem] rounded-md">
              <Image
                src="/images/logo1.png"
                priority
                alt=""
                width={119.58}
                height={62.57}
                className="w-[59.52px] h-[41.38px] md:w-[119.58px] md:h-[62.57px]"
              />
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 md:py-12 md:px-9 w-full">
            <h1 className="font-bold text-2xl">Sign in</h1>
            <form
              className="flex flex-col gap-[1.19rem] mt-6"
              onSubmit={handleSubmit(handleLogin)}
            >
              <label htmlFor="email" className="input-field relative">
                <span>Email Address</span>
                <div className="relative">
                  <input
                    type="email"
                    {...register("email")}
                    className="input"
                    placeholder="Enter your admin email"
                  />
                  <Image
                    src="icons/mail.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="absolute top-1/2 -translate-y-1/2 right-3"
                  />
                </div>
                <p className="text-xs text-red-600">{errors.email?.message}</p>
              </label>
              <label htmlFor="password" className="input-field flex-1 relative">
                <span>Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="input"
                    // required
                  />
                  {showPassword ? (
                    <Image
                      src="icons/eyeoff.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <Image
                      src="icons/eye.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
                <p className="text-xs text-red-600">
                  {errors.password?.message}
                </p>
              </label>
              <button
                // onClick={handleLogin}
                type="submit"
                className="px-6 py-4 bg-secondary-02 w-full text-white rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
      <Toaster />
    </section>
  );
};

export default Login;

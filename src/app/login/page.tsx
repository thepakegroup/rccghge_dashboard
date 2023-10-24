"use client";

import Loader from "@/components/Loader";
import Toaster from "@/components/Toaster";
import useUpdateToast from "@/hooks/updateToast";
import { baseUrl } from "@/util/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const updateToast = useUpdateToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const logIn = async () => {
    const login = {
      email,
      password,
    };

    if (email === "") {
      updateToast({
        title: "Email cannot be empty!",
        info: "Please provide your email address",
      });

      return;
    } else if (password === "") {
      updateToast({
        title: "Password cannot be empty!",
        info: "Please provide your password",
      });

      return;
    }

    setLoading(true);

    const res = await axios.post(`${baseUrl}admin/login`, login);
    const data = await res.data;

    if (data.error === false) {
      const token = data.token.token;
      Cookies.set("token", token, { expires: 2 });

      router.push("/");
      return;
    }
    data.error && setLoading(false);
    if (data.error === true) {
      updateToast({
        title: data.message,
        info: "Please provide valid credentials",
      });
      return;
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    logIn();
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
            <form className="flex flex-col gap-[1.19rem] mt-6">
              <label htmlFor="email" className="input-field relative">
                <span>Email Address</span>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    className="input"
                    required
                    placeholder="Enter your admin email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Image
                    src="icons/mail.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="absolute top-1/2 -translate-y-1/2 right-3"
                  />
                </div>
              </label>
              <label htmlFor="password" className="input-field flex-1 relative">
                <span>Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    className="input"
                    required
                    onChange={(e) => setPassword(e.target.value)}
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
              </label>
              <button
                onClick={handleLogin}
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

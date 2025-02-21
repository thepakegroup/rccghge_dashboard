"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Toaster from "@/components/Toaster";
import useUpdateToast from "@/hooks/updateToast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/helper/schema";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/util/constants";
import Loader from "@/components/Loader";
import Image from "next/image";
import { useCtx } from "@/providers/ctx-provider";

interface ContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  email: string;
}

interface ctxProp {
  name: JSX.Element;
  value: string;
}

const ctxs: ctxProp[] = [
  {
    name: (
      <h3 className="text-xl font-medium text-center cursor-pointer">
        RCCGHGE
        <br />
        Mobile App
      </h3>
    ),
    value: "mobile_edit",
  },
  {
    name: (
      <h3 className="text-xl font-medium text-center cursor-pointer">
        RCCGHGE
        <br />
        Website
      </h3>
    ),
    value: "web_edit",
  },
];

const ContextModal = ({ isOpen, onClose, token, email }: ContextModalProps) => {
  const router = useRouter();
  const { ctx, setCtx } = useCtx();
  const [selectedCtx, setSelectedCtx] = useState<ctxProp>(ctxs[0]);

  const handleContinue = () => {
    if (!selectedCtx) return;

    Cookies.set("token", token, { expires: 2 });
    Cookies.set("email", email, { expires: 2 });
    setCtx(selectedCtx?.value as any);

    router.push("/");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="overflow-hidden rounded-2xl w-[90%] max-w-[600px] shadow-lg bg-gray-100">
        <div className="mb-8 py-5 bg-white flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-center font-play-fair-display">
            What do you want to open?
          </h2>
          <small className="text-xs text-center opacity-60">
            Select where you would like the changes you made on the Dashboard to
            show.
          </small>
        </div>

        <div className="grid grid-cols-1 min-[576px]:grid-cols-2 gap-6 mb-8 p-8 font-quicksand">
          {ctxs?.map((item: ctxProp, index: number) => (
            <div
              key={index}
              onClick={() => setSelectedCtx(item)}
              className={`
              !cursor-pointer rounded-xl p-8
              flex flex-col items-center justify-center
              transition-all select-none
              ${
                selectedCtx?.value === item?.value
                  ? "bg-gradient-to-r from-[#12234E] to-[#4473BA] text-white"
                  : "border-gray-200 border-[1.8px]"
              }
            `}
            >
              {item?.name}
            </div>
          ))}
        </div>
        <div className="p-8 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedCtx?.value}
            className={`
            w-full min-[380px]:w-[200px] !mx-auto py-4 rounded-lg text-white bg-[#E77400] text-lg font-medium
            transition-all
            ${
              selectedCtx?.value
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-300 cursor-not-allowed"
            }
              `}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// Modified Login Component
const Login = () => {
  const router = useRouter();
  const updateToast = useUpdateToast();
  const [showContextModal, setShowContextModal] = useState(false);
  const [loginData, setLoginData] = useState({ token: "", email: "" });

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

    try {
      const res = await axios.post(`${baseUrl}admin/login`, login);
      const dataRes = await res.data;

      if (dataRes.error === true) {
        setLoading(false);
        updateToast({
          title: `Please provide valid credentials`,
          type: "error",
          info: `${dataRes?.message}`,
        });
        return;
      }

      // Instead of setting cookies directly, show the context modal
      setLoginData({
        token: dataRes?.token?.token,
        email: dataRes?.email,
      });
      setShowContextModal(true);
      setLoading(false);
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
    <section
      // className="h-screen flex-center justify-center relative bg-bg-mobile md:bg-bg-desktop bg-cover bg-no-repeat no-scrollbar"
      className="h-screen flex-center justify-center relative bg-gradient-to-r from-[#12234E] to-[#4473BA] no-scrollbar"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-[85%] md:w-full max-w-[29.1875rem]">
            <div className="flex justify-center mb-[1.35875rem]"></div>
            <div className="rounded-lg bg-white p-6 md:py-10 md:px-9 w-full h-fit overflow-y-auto pb-2">
              <Image
                src="/images/logo1.png"
                priority
                alt=""
                width={119.58}
                height={62.57}
                className="w-[100px] mb-6"
              />
              <h1 className="font-bold text-2xl">Sign in</h1>
              <form
                className="flex flex-col gap-[1.19rem] mt-6"
                onSubmit={handleSubmit(handleLogin)}
              >
                <label htmlFor="email" className="input-field relative">
                  <span>Email Address</span>
                  <div className="relative">
                    <div className="input-2 flex justify-between items-center gap-1">
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full outline-none border-none focus-within:ring-0"
                        placeholder="Enter your admin email"
                      />
                      <Image
                        src="icons/mail.svg"
                        alt=""
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-red-600">
                    {errors.email?.message}
                  </p>
                </label>
                <label
                  htmlFor="password"
                  className="input-field flex-1 relative"
                >
                  <span>Password</span>
                  <div className="relative">
                    <div className="input-2 flex justify-between items-center gap-1">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className="w-full outline-none border-none focus-within:ring-0"
                        // required
                      />
                      {showPassword ? (
                        <Image
                          src="icons/eyeoff.svg"
                          alt=""
                          width={20}
                          height={20}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <Image
                          src="icons/eye.svg"
                          alt=""
                          width={20}
                          height={20}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-red-600">
                    {errors.password?.message}
                  </p>
                </label>
                <button
                  // onClick={handleLogin}
                  type="submit"
                  className="px-6 py-4 bg-orange w-full text-white rounded-md"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
          <ContextModal
            isOpen={showContextModal}
            onClose={() => setShowContextModal(false)}
            token={loginData.token}
            email={loginData.email}
          />
        </>
      )}
      <Toaster />
    </section>
  );
};

export default Login;

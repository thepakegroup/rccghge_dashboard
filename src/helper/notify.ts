import toast, { ToastOptions } from "react-hot-toast";
export const notify = ({
  message,
  type,
  options = {
    position: "top-center",
    className: "px-16 tracking-wide z-[9999] py-3",
    duration: 2800,
  },
}: {
  message: string;
  type: "success" | "error" | "custom" | "loading";
  options?: ToastOptions;
}) => {
  return toast[type](message, options);
};

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const handleLogin = (e: any) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <section className="h-screen flex-center justify-center relative bg-bg-mobile md:bg-bg-desktop md:bg-cover bg-no-repeat">
      <div>
        <div className="flex justify-center mb-6">
          <div className="max-w-max bg-white p-[0.465rem] rounded-md">
            <Image src="/images/logo.png" alt="" width={54} height={40} />
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 md:py-12 md:px-9 md:min-w-[30rem]">
          <h1 className="font-bold text-2xl">Sign in</h1>
          <form className="flex flex-col gap-[1.19rem] mt-6">
            <label htmlFor="email" className="input-field relative">
              <span>Admin email</span>
              <div className="relative">
                <input type="text" className="input" />
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
              <span>Admin password</span>
              <div className="relative">
                <input type="password" className="input" />
                <Image
                  src="icons/eye.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="absolute top-1/2 -translate-y-1/2 right-3"
                />
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
    </section>
  );
};

export default Login;

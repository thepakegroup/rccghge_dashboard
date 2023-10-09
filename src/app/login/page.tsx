'use client';

import Loader from '@/components/Loader';
import Toaster from '@/components/Toaster';
import useUpdateToast from '@/hooks/updateToast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [loading, setloading] = useState(false);

  const updateToast = useUpdateToast();

  const logIn = async () => {
    const login = {
      email,
      password,
    };

    if (email !== '' && password !== '') {
      setloading(true);
    }

    setSubmit(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(login),
    });

    const data = await res.json();

    if (data.error === true) {
      updateToast({
        title: data.message,
        info: 'Please provide valid credentials',
      });
      setloading(false);
    }

    if (data.error === false) {
      router.push('/');
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    logIn();
  };

  return (
    <section className="h-screen flex-center justify-center relative bg-bg-mobile md:bg-bg-desktop bg-cover bg-no-repeat">
      {loading ? (
        <Loader />
      ) : (
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
                  <input
                    type="email"
                    value={email}
                    className="input"
                    required
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
                {email === '' && submit && (
                  <p className="text-xs text-error-400">Email is required</p>
                )}
              </label>
              <label htmlFor="password" className="input-field flex-1 relative">
                <span>Admin password</span>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    className="input"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Image
                    src="icons/eye.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="absolute top-1/2 -translate-y-1/2 right-3"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                {password === '' && submit && (
                  <p className="text-xs text-error-400">Password is required</p>
                )}
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

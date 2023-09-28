'use client';

import AdminInfo from '@/components/Admin/AdminInfo';
import EditAdmin from '@/components/Admin/EditAdmin';
import DeleteModal from '@/components/DeleteModal';
import { useFetchData } from '@/hooks/fetchData';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import { useAppSelector } from '@/store/hooks';
import { adminI } from '@/util/interface/admin';
import Image from 'next/image';
import { useState } from 'react';

const Admin = () => {
  const type = useGetTypeOfModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('admin');

  const { id } = useAppSelector((state) => state.mediaItems);
  const { data, loading, fetchData } = useFetchData('/api/getAllAdmin');
  const admins: adminI[] = data?.message;

  const createAdmin = async (e: any) => {
    e.preventDefault();
    const adminLevel = level === 'admin' ? '1' : '2';

    const res = await fetch('/api/createAdmin', {
      method: 'POST',
      body: JSON.stringify({ email, password, level: adminLevel }),
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      setPassword('');
      setLevel('');
      setEmail('');
    }
  };

  const deleteAdmin = async () => {
    const res = await fetch(`/api/deleteAdmin/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
    }
  };

  const updateMedia = async (adminInfo: any) => {
    const adminData = {
      ...adminInfo,
      id,
    };

    const res = await fetch(`/api/updateAdmin`, {
      method: 'POST',
      body: JSON.stringify(adminData),
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
    }
  };

  return (
    <section className=" md:max-w-[70vw]">
      <h1 className="text-[#717171] text-lg font-bold">Manage Admins</h1>
      <form className="flex flex-col md:flex-center md:flex-row gap-[1.12rem] mt-9">
        <label htmlFor="email" className="input-field flex-1 relative">
          <span>Admin email</span>
          <div className="relative">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="input"
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
        <label htmlFor="password" className="input-field relative">
          <span>Admin password</span>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="input"
            />
            <Image
              src="icons/eye.svg"
              alt=""
              width={20}
              height={20}
              className="absolute top-1/2 -translate-y-1/2 right-3"
            />
          </div>
        </label>
        <label htmlFor="level" className="input-field flex-1">
          <span>Admin level</span>
          <select
            onChange={(e) => setLevel(e.target.value)}
            value={level}
            name="level"
            className="input"
          >
            <option value=""></option>
            <option value="admin">Admin</option>
            <option value="super admin">Super admin</option>
          </select>
        </label>
        <div className="md:pt-5">
          <button
            onClick={createAdmin}
            className="w-full bg-[#052A53] text-white rounded-md px-6 py-4"
          >
            Register
          </button>
        </div>
      </form>
      <div className="mt-9 bg-white rounded-lg px-6">
        <div className="text-smb font-medium [&>div]:grid [&>div]:grid-cols-5 [&>div]:py-4">
          <div className="">
            <p className="col-span-2">Email</p>
            <p>Password</p>
          </div>
          {admins?.map((admin) => {
            return (
              <AdminInfo
                key={admin.id}
                email={admin.email}
                id={admin.id}
                level={admin.level}
              />
            );
          })}
        </div>
      </div>
      {type == 'modify' && <EditAdmin handleSubmit={updateMedia} />}
      {type == 'delete' && <DeleteModal deleteFunc={deleteAdmin} />}
    </section>
  );
};

export default Admin;

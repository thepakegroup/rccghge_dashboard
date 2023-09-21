'use client';

import AdminInfo from '@/components/Admin/AdminInfo';
import EditAdmin from '@/components/Admin/EditAdmin';
import DeleteModal from '@/components/DeleteModal';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import Image from 'next/image';

const Admin = () => {
  const type = useGetTypeOfModal();

  return (
    <section className=" md:max-w-[70vw]">
      <h1 className="text-[#717171] text-lg font-bold">Manage Admins</h1>
      <form className="flex flex-col md:flex-center md:flex-row gap-[1.12rem] mt-9">
        <label htmlFor="email" className="input-field flex-1 relative">
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
        <label htmlFor="password" className="input-field relative">
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
        <label htmlFor="type" className="input-field flex-1">
          <span>Admin level</span>
          <select name="type" className="input">
            <option value=""></option>
            <option value="admin">Admin</option>
            <option value="super admin">Super admin</option>
          </select>
        </label>
        <div className="md:pt-5">
          <button className="w-full bg-[#052A53] text-white rounded-md px-6 py-4">
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
          <AdminInfo />
          <AdminInfo />
          <AdminInfo />
        </div>
      </div>
      {type == 'modify' && <EditAdmin />}
      {type == 'delete' && <DeleteModal />}
    </section>
  );
};

export default Admin;

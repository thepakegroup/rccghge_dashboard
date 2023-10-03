import Image from 'next/image';
import ProfileCard from './ProfileCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { churchGroupI } from '@/util/interface/ministry';
import DeleteModal from '../DeleteModal';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import {
  setCatgeory,
  setDescription,
  setGroupInfo,
  setName,
} from '@/store/slice/churchGroup';
import GroupProfileModal from './GroupProfileModal';
import Loader from '../Loader';
import useUpdateToast from '@/hooks/updateToast';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from '@/util/constants';
import ImageUpload from '../ImageUpload';
import { setMediaFile } from '@/store/slice/mediaItems';

const ChurchGroup = ({ currentSection }: { currentSection: string }) => {
  const { id, file } = useAppSelector((state) => state.mediaItems);
  const { section } = useAppSelector((state) => state.content);
  const type = useGetTypeOfModal();

  const { name, category, description, action } = useAppSelector(
    (state) => state.churchGroup
  );

  const dispatch = useAppDispatch();

  const [groups, setGroups] = useState<churchGroupI[]>([]);
  const [loading, setloading] = useState(true);

  const getGroupByCategory = async (category: string) => {
    const res = await fetch('api/fetchGroup', {
      method: 'POST',
      body: JSON.stringify({ category, page: 1 }),
    });

    const data = await res.json();

    if (data.error === false) setloading(false);

    setGroups(data.message.data);
  };

  useEffect(() => {
    getGroupByCategory(category);
  }, [category]);

  const removeGroup = async () => {
    const res = await fetch(`/api/removeGroup/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (data.error === false) {
      getGroupByCategory(category);
      updateToast({
        type: 'delete',
      });
    }
  };

  const updateToast = useUpdateToast();

  const updateGroup = async (groupInfo: any) => {
    const form = new FormData();

    form.append('banner', file as Blob, file?.name);
    form.append('name', groupInfo.name);
    form.append('category', groupInfo.category);
    form.append('description', groupInfo.qualification);
    action === 'edit' && form.append('id', `${id}`);

    const token = Cookies.get('token');

    const res = await axios.post(
      `${
        action == 'edit' ? `${baseUrl}update-group` : `${baseUrl}create-group`
      }`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;

    if (data.error === false) {
      getGroupByCategory(category);
      updateToast({
        title: `Church group ${action === 'edit' ? 'updated' : 'added'}`,
        info: groupInfo.name,
      });
      dispatch(
        setGroupInfo({
          name: '',
          category: '',
          description: '',
          id: null,
          action: 'add',
        })
      );
    }
  };

  const groupInfo = {
    name,
    category,
    description,
  };

  // useEffect(() => {
  //   section === 'group' && dispatch(setMediaFile(null));
  // }, [file]);

  return (
    <div
      className={`${
        currentSection === 'church group' ? 'block' : 'hidden md:block'
      }`}
    >
      <div className="bg-white rounded-lg py-6 px-7">
        <h2 className="text-lg font-bold mb-5">Add church groups</h2>
        <ImageUpload />
        <div className="flex flex-col gap-[1.19rem] min-h-[200px]">
          <label htmlFor="name" className="input-field">
            <span>Name</span>
            <input
              onChange={(e) => dispatch(setName(e.target.value))}
              value={name}
              name="name"
              type="text"
              className="input"
            />
          </label>
          <label htmlFor="category" className="input-field">
            <span>Category</span>
            <select
              onChange={(e) => dispatch(setCatgeory(e.target.value))}
              value={category}
              name="category"
              className="input"
            >
              <option value="All">All</option>
              <option value="Department">Department</option>
              <option value="Ministry">Ministy</option>
            </select>
          </label>
          <label htmlFor="description" className="input-field">
            <span>Description</span>
            <textarea
              onChange={(e) => dispatch(setDescription(e.target.value))}
              value={description}
              name="description"
              rows={4}
              className="input"
            />
          </label>
          <button
            onClick={() => updateGroup(groupInfo)}
            className="flex-center gap-2 bg-secondary-02 rounded-md max-w-max text-white text-sm px-4 py-2"
          >
            <span>Upload</span>
            <Image
              src="icons/upload-btn.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex justify-end">
          <select
            placeholder="Sort by"
            className="p-4 rounded-md bg-white my-4 text-sm"
          >
            <option value="most recent">Most recent</option>
            <option value="older">Older</option>
          </select>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {groups?.map((group) => {
              return (
                <ProfileCard
                  key={group.id}
                  id={group.id}
                  img={group.banner}
                  name={group.name}
                  category={group.category}
                  type="group"
                />
              );
            })}
          </div>
        )}
      </div>
      {type == 'delete' && section === 'group' && (
        <DeleteModal deleteFunc={removeGroup} />
      )}
      {type == 'modify' && section === 'group' && (
        <GroupProfileModal handleSubmit={updateGroup} />
      )}
    </div>
  );
};

export default ChurchGroup;

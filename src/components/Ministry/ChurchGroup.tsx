import Image from 'next/image';
import ProfileCard from './ProfileCard';
import DragDrop from '../DragDrop';
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
    const groupData = {
      ...groupInfo,
      profile_picture: file,
      ...(action == 'edit' && id !== undefined ? { id } : {}),
    };
    const res = await fetch(
      `/api/${action == 'edit' ? 'updateGroup' : 'createGroup'}`,
      {
        method: 'POST',
        body: JSON.stringify(groupData),
      }
    );

    const data = await res.json();
    console.log(data);

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

  return (
    <div
      className={`${
        currentSection === 'church group' ? 'block' : 'hidden md:block'
      }`}
    >
      <div className="bg-white rounded-lg py-6 px-7">
        <h2 className="text-lg font-bold mb-5">Add church groups</h2>
        <div className="px-4 py-6 rounded-md border border-dashed border-[#D0D5DD] my-6">
          <DragDrop>
            <div className="flex-center md:flex-col gap-3 relative cursor-pointer">
              <div className="flex justify-center">
                <Image
                  src="icons/upload.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </div>
              <div className="hidden md:block text-center">
                <p className="text-gray-600 text-sm">
                  <span className="text-secondary-01">Click to upload</span>{' '}
                  <span>or drag and drop</span>
                </p>
                <p className="text-xs text-gray-400">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
              <div className="md:hidden mt-4 text-center">
                <p className="text-gray-600 text-sm">
                  <span className="text-secondary-01">Tap upload</span>
                </p>
                <p className="text-xs text-gray-400">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
              <button className="md:hidden bg-[#EB5017] px-4 py-2 text-white text-sm font-semibold rounded-md">
                Upload
              </button>
            </div>
          </DragDrop>
        </div>
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

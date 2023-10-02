import Image from 'next/image';
import DragDrop from '../DragDrop';
import { leadersI } from '@/util/interface/ministry';
import { useFetchData } from '@/hooks/fetchData';
import ProfileCard from './ProfileCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import DeleteModal from '../DeleteModal';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import {
  setDescription,
  setFullStory,
  setLeaderInfo,
  setName,
  setPosition,
  setQualification,
  setTitle,
} from '@/store/slice/leader';
import ProfileModification from './ProfileModification';
import Loader from '../Loader';
import useUpdateToast from '@/hooks/updateToast';

const Leaders = ({ currentSection }: { currentSection: string }) => {
  const { data, loading, fetchData } = useFetchData('/api/getAllLeaders');
  const { id, file } = useAppSelector((state) => state.mediaItems);
  const {
    name,
    title,
    qualification,
    position,
    description,
    fullStory,
    action,
  } = useAppSelector((state) => state.leader);
  const { section } = useAppSelector((state) => state.content);
  const type = useGetTypeOfModal();

  const dispatch = useAppDispatch();

  const leaders: leadersI[] = data?.message;

  const updateToast = useUpdateToast();
  const removeLeader = async () => {
    const res = await fetch(`/api/removeLeader/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        type: 'delete',
      });
    }
  };

  const updateLeader = async (leaderInfo: any) => {
    const formData = new FormData();
    formData.append('file', file as Blob);
    // console.log(formData);

    const leaderData = {
      ...leaderInfo,
      profile_picture: file,
      ...(action == 'edit' && id !== undefined ? { id } : {}),
    };
    const res = await fetch(
      `/api/${action == 'edit' ? 'updateLeader' : 'leader'}`,
      {
        method: 'POST',
        body: JSON.stringify(leaderData),
      }
    );

    const data = await res.json();
    console.log(data);

    if (data.error === false) {
      fetchData();
      updateToast({
        title: `Church leader ${action === 'edit' ? 'updated' : 'added'}`,
        info: leaderInfo.name,
      });
      dispatch(
        setLeaderInfo({
          name: '',
          title: '',
          qualification: '',
          position: '',
          description: '',
          fullStory: '',
          action: 'add',
        })
      );
    }
  };

  const leaderInfo: leadersI = {
    name,
    title,
    qualification,
    position,
    short_description: description,
    full_story_about: fullStory,
  };

  return (
    <div
      className={`${
        currentSection === 'church leader' ? 'block' : 'hidden md:block'
      }`}
    >
      <div className="bg-white rounded-lg py-6 px-7 md:h-[40rem] md:overflow-y-auto overflow-x-hidden">
        <h2 className="text-lg font-bold mb-5">Add Church Leader</h2>
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
        <div className="flex flex-col gap-[1.19rem]">
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

          <label htmlFor="title" className="input-field">
            <span>Title</span>
            <input
              onChange={(e) => dispatch(setTitle(e.target.value))}
              value={title}
              name="title"
              type="text"
              className="input"
            />
          </label>
          <label htmlFor="qualification" className="input-field">
            <span>Qualification</span>
            <input
              onChange={(e) => dispatch(setQualification(e.target.value))}
              value={qualification}
              name="qualification"
              type="text"
              className="input"
            />
          </label>
          <label htmlFor="position" className="input-field">
            <span>Position</span>
            <input
              onChange={(e) => dispatch(setPosition(e.target.value))}
              value={position}
              name="position"
              type="text"
              className="input"
            />
          </label>
          <label htmlFor="description" className="input-field">
            <span>Short description</span>
            <input
              onChange={(e) => dispatch(setDescription(e.target.value))}
              value={description}
              name="description"
              type="text"
              className="input"
            />
          </label>
          <label htmlFor="fullStory" className="input-field">
            <span>Full story</span>
            <textarea
              onChange={(e) => dispatch(setFullStory(e.target.value))}
              value={fullStory}
              name="fullStory"
              rows={5}
              className="input"
            />
          </label>
          <button
            onClick={() => updateLeader(leaderInfo)}
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
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {leaders?.map((leader) => {
            return (
              <ProfileCard
                key={leader.id}
                name={leader.name}
                title={leader.title}
                qualification={leader.qualification}
                position={leader.position}
                id={leader.id as number}
                img={leader.profile_picture as string}
                type="leader"
              />
            );
          })}
        </div>
      )}
      {type == 'delete' && section === 'leader' && (
        <DeleteModal deleteFunc={removeLeader} />
      )}
      {type == 'modify' && section === 'leader' && (
        <ProfileModification handleSubmit={updateLeader} />
      )}
    </div>
  );
};

export default Leaders;

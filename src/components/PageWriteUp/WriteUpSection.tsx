'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Content from './Content';
import { useFetchData } from '@/hooks/fetchData';
import { writeupI } from '@/util/interface/writeup';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import DeleteModal from '../DeleteModal';
import {
  setContent,
  setDeleteFunc,
  setDescription,
  setHeader,
  setTitle,
} from '@/store/slice/content';

const WriteUpSection = ({ currentSection }: { currentSection: string }) => {
  const type = useGetTypeOfModal();
  const { id } = useAppSelector((state) => state.mediaItems);
  const { data, loading, fetchData } = useFetchData('/api/getAllWriteup');
  const {
    content,
    title,
    header,
    btnType,
    id: editId,
    section,
  } = useAppSelector((state) => state.content);
  const dispatch = useAppDispatch();

  const writeups: writeupI[] = data?.message;

  const deleteContent = async () => {
    const res = await fetch(`/api/deleteContent/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
    }
  };

  const updateContent = async () => {
    const contentData = {
      page_title: title,
      content,
      heading: header,
      ...(btnType == 'edit' && editId !== undefined ? { id: editId } : {}),
    };

    const res = await fetch(
      `/api/${btnType == 'edit' ? 'updateContent' : 'createWriteup'}`,
      {
        method: 'POST',
        body: JSON.stringify(contentData),
      }
    );

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      dispatch(
        setContent({
          title: '',
          content: '',
          header: '',
          id: null,
          btnType: `${btnType === 'edit' ? 'add' : 'edit'}`,
        })
      );
    }
  };

  return (
    <section
      className={`mt-3 ${
        currentSection === 'edit content' ? 'block' : 'hidden md:block'
      }`}
    >
      <div className="bg-white rounded-lg py-6 px-7">
        <h2 className="font-bold text-lg">Edit content</h2>
        <div className="flex flex-col gap-[1.12rem]">
          <label htmlFor="title" className="input-field">
            <span>Page title</span>
            <input
              onChange={(e) => dispatch(setTitle(e.target.value))}
              value={title}
              type="text"
              name="title"
              className="input"
            />
          </label>
          <label htmlFor="heading" className="input-field">
            <span>Heading</span>
            <input
              onChange={(e) => dispatch(setHeader(e.target.value))}
              value={header}
              type="text"
              name="heading"
              className="input"
            />
          </label>
          <label htmlFor="description" className="input-field">
            <textarea
              onChange={(e) => dispatch(setDescription(e.target.value))}
              value={content}
              rows={10}
              className="input"
            />
          </label>
        </div>

        <button
          onClick={updateContent}
          className="text-sm font-semibold bg-gray-300 rounded-md px-4 py-2 my-5"
        >
          {btnType === 'add' ? 'Create Post' : 'Edit Post'}
        </button>

        <div className="flex flex-col gap-2">
          {writeups?.map((writeup) => {
            const { content, heading, id, page_title } = writeup;
            return (
              <Content
                key={writeup.id}
                page_title={page_title}
                heading={heading}
                content={content}
                id={id}
              />
            );
          })}
        </div>
      </div>
      {type == 'delete' && section == 'edit content' && (
        <DeleteModal deleteFunc={deleteContent} />
      )}
    </section>
  );
};

export default WriteUpSection;

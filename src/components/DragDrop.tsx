'use client';

import { useAppDispatch } from '@/store/hooks';
import { setGroupImg, setGroupImgName } from '@/store/slice/churchGroup';
import { setLeaderImg, setLeaderImgName } from '@/store/slice/leader';
import { setFileName, setMediaFile } from '@/store/slice/mediaItems';
import React, { ReactElement } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF', 'SVG'];

function DragDrop({
  section,
  children,
}: {
  section?: string;
  children: ReactElement;
}) {
  const dispatch = useAppDispatch();

  const handleChange = (file: File) => {
    if (section === 'leader') {
      dispatch(setLeaderImg(file));
      dispatch(setLeaderImgName(file.name));

      console.log(section);
    }

    if (section === 'group') {
      dispatch(setGroupImg(file));
      dispatch(setGroupImgName(file.name));

      console.log(section);
    }

    dispatch(setMediaFile(file));
    dispatch(setFileName(file.name));
  };

  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
      {children}
    </FileUploader>
  );
}

export default DragDrop;

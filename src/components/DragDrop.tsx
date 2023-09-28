'use client';

import { useAppDispatch } from '@/store/hooks';
import { setMediaFile } from '@/store/slice/mediaItems';
import React, { ReactElement } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF', 'SVG'];

function DragDrop({ children }: { children: ReactElement }) {
  const dispatch = useAppDispatch();

  const handleChange = (file: File) => {
    // console.log(file);
    dispatch(setMediaFile(file));
  };

  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
      {children}
    </FileUploader>
  );
}

export default DragDrop;

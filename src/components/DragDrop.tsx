'use client';

import { useAppDispatch } from '@/store/hooks';
import { setFileName, setMediaFile } from '@/store/slice/mediaItems';
import React, { ReactElement, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF', 'SVG'];

function DragDrop({ children }: { children: ReactElement }) {
  const dispatch = useAppDispatch();

  const handleChange = (file: File) => {
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

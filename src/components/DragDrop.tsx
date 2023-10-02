'use client';

import { useAppDispatch } from '@/store/hooks';
import { setMediaFile } from '@/store/slice/mediaItems';
import React, { ReactElement, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF', 'SVG'];

function DragDrop({ children }: { children: ReactElement }) {
  const dispatch = useAppDispatch();

  const [imgFile, setImgFile] = useState('');
  // console.log(file);
  // const handleUpload = (event: any) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   console.log(file);
  //   reader.onload = () => {
  //     setImgFile(reader.result as string);
  //   };
  // };

  const handleChange = (file: File) => {
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgFile(reader.result as string);
      dispatch(setMediaFile(reader.result as string));
    };
  };
  // console.log(typeof imgFile);

  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
      {children}
    </FileUploader>
  );
}

export default DragDrop;

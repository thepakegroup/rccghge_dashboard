import React, { ReactElement, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF', 'SVG'];

function DragDrop({ children }: { children: ReactElement }) {
  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    setFile(file);
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
      {children}
    </FileUploader>
  );
}

export default DragDrop;

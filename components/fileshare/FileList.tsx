import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import FileCard from './FileCard';

interface File {
  id: number;
  name: string;
  type: 'image' | 'pdf' | 'text' | 'video' | 'other';
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    // Fetch the list of uploaded files from local storage
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');

    // Create an array of File objects with IDs
    const fileObjects = uploadedFiles.map((fileName: string, index: number) => ({
      id: index,
      name: fileName,
      type: getFileType(fileName), // You may need to implement this function
    }));

    setFiles(fileObjects);
  }, []);

  // You can implement a function to determine the file type based on the filename
  const getFileType = (fileName: string): 'image' | 'pdf' | 'text' | 'video' | 'other' => {
    // Implement your logic here
    // This is a simplified example; you can use file extensions or other criteria to determine the type
    if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) {
      return 'image';
    } else if (fileName.endsWith('.pdf')) {
      return 'pdf';
    } else if (fileName.endsWith('.txt')) {
      return 'text';
    } else if (fileName.endsWith('.mp4')) {
      return 'video';
    } else {
      return 'other';
    }
  };

  const handleDelete = (id: number) => {
    const deletedFile = files.find((file) => file.id === id);
    if (deletedFile) {
      localStorage.removeItem(deletedFile.name);
      const updatedFiles = files.filter((file) => file.id !== id);
      setFiles(updatedFiles);
    }
  };

  return (
    <Container>
      <Typography variant="h4">List of Uploaded Files</Typography>
      <List>
        {files.map((file) => (
          <ListItem key={file.id}>
            <FileCard
              file={file}
              onDelete={handleDelete}
              onDownload={() => {}}
              onShare={() => {}}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default FileList;

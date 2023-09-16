import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from '@mui/material';

interface LocalFile {
  name: string;
  type: string;
  data: string; // base64-encoded file data
}

const FileList: React.FC = () => {
  const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
  const [showLocalFiles, setShowLocalFiles] = useState<boolean>(false);

  useEffect(() => {
    // Load local files from local storage
    const localFiles: LocalFile[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !key.endsWith('_info')) {
        const fileInfo = localStorage.getItem(key + '_info');
        if (fileInfo) {
          const fileData = localStorage.getItem(key) || '';
          const parsedFileInfo = JSON.parse(fileInfo);
          localFiles.push({
            name: parsedFileInfo.name,
            type: parsedFileInfo.type,
            data: fileData,
          });
        }
      }
    }
    setLocalFiles(localFiles);
  }, []);

  const fetchFileData = (file: LocalFile): void => {
    // You can handle the file data here
    console.log('File Name:', file.name);
    console.log('File Type:', file.type);
    console.log('File Data:', file.data);

    // For example, you can display the file as an image if it's an image
    if (file.type.startsWith('image')) {
      const img = document.createElement('img');
      img.src = 'data:' + file.type + ';base64,' + file.data;
      img.alt = file.name;
      document.body.appendChild(img);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        File List
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setShowLocalFiles(true)} // Show files from local storage
      >
        Fetch from Local Storage
      </Button>
      <Divider style={{ margin: '16px 0' }} />
      <List>
        {showLocalFiles ? (
          // Show local files if showLocalFiles is true
          localFiles.map((file, index) => (
            <ListItem key={index}>
              <ListItemText primary={file.name} />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => fetchFileData(file)}
              >
                View File
              </Button>
              {/* Add additional information or actions here */}
            </ListItem>
          ))
        ) : null}
      </List>
    </Container>
  );
};

export default FileList;

// FileSharePage.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserDashboard from '@/components/fileshare/UserDashboard';
import FileList from '@/components/fileshare/FileList';
import axios from 'axios';
const FileSharePage: React.FC = () => {
  // Fetch the local files from local storage
  const [localFiles, setLocalFiles] = useState<string[]>([]); // Assuming localFiles is an array of file names
  const [userFirstName, setUserFirstName] = useState<string>('');
  
  useEffect(() => {
    const fetchUserFirstname = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3333/');
          // Add any necessary headers or authentication here
        
          setUserFirstName(response.data.firstname);
      } catch (error) {
        console.error('Failed to fetch user firstname:', error);
      }
    };
    const fetchLocalFiles = () => {
      // Implement your logic to fetch files from local storage here
      // For example:
      const files = JSON.parse(localStorage.getItem('files') || '[]');
      setLocalFiles(files);
    };
    fetchUserFirstname();
    fetchLocalFiles();
  }, []);

  return (
    <ThemeProvider theme={createTheme()}>
      <UserDashboard
        onHomeClick={() => {
          // Implement your home click logic here
        }}
        onSettingsClick={() => {
          // Implement your settings click logic here
        }}
        onLogout={() => {
          // Implement your logout logic here
        }}
       // userFirstName={userFirstName} // Pass userFirstName as a prop
      />
    
      <Container
        maxWidth="md"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          marginTop: '5rem',
        }}
      >
        <Typography variant="h4">{userFirstName}</Typography>
        <div>
      <FileList />
    </div></Container>
    </ThemeProvider>
  );
};

export default FileSharePage;

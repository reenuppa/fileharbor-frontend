import React from 'react';
import { Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserDashboard from '@/components/fileshare/UserDashboard';
import FileList from '@/components/fileshare/FileList';

const FileSharePage: React.FC = () => {
  return (
    <ThemeProvider theme={createTheme()}>
      <UserDashboard onHomeClick={function (): void {
              throw new Error('Function not implemented.');
          } } onSettingsClick={function (): void {
              throw new Error('Function not implemented.');
          } } onLogout={function (): void {
              throw new Error('Function not implemented.');
          } } />
      <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', marginTop: '5rem' }}>
        <Typography variant="h4">File Share</Typography>
        <FileList files={[]} />
      </Container>
    </ThemeProvider>
  );
};

export default FileSharePage;

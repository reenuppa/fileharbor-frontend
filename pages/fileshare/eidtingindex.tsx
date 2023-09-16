import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserDashboard from '@/components/fileshare/UserDashboard';
import FileList from '@/components/fileshare/FileList';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

import { Delete, GetApp, Share } from '@mui/icons-material';

interface File {
    id: number; 
    name: string;
  // Add any other properties you need
}

const FileShare: React.FC = () => {
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [showLocalFiles, setShowLocalFiles] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openShareDialog, setOpenShareDialog] = useState<boolean>(false);
  const [sharedEmail, setSharedEmail] = useState<string>('');
  const [accessLevel, setAccessLevel] = useState<string>('viewer');

  const fetchFileData = (key: string): File | null => {
    const fileData = localStorage.getItem(key);
    return fileData ? JSON.parse(fileData) : null;
  };

  const handleDelete = (id: number) => {
    // Implement your delete logic here
    console.log(`Deleting file with ID: ${id}`);
    setSelectedFile(null);
    setOpenDeleteDialog(false);
  };

  const handleShare = (file: File) => {
    // Implement your share logic here
    console.log(`Sharing file: ${file.name}`);
    setSelectedFile(file);
    setOpenShareDialog(true);
  };

  const handleDownload = (fileName: string) => {
    // Implement your download logic here
    console.log(`Downloading file: ${fileName}`);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const confirmDelete = () => {
    if (selectedFile) {
      handleDelete(selectedFile.id);
    }
  };

  const handleAddShare = () => {
    // Implement your share logic here
    console.log(`Sharing file with email: ${sharedEmail}, access level: ${accessLevel}`);
    setOpenShareDialog(false);
  };

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
          // Show localFiles if showLocalFiles is true
          localFiles.map((file, index) => (
            <ListItem key={index}>
              <ListItemText primary={file.name} />
              <CardActions>
                <IconButton aria-label="share" onClick={() => handleShare(file)}>
                  <Share />
                </IconButton>
                <IconButton aria-label="download" onClick={() => handleDownload(file.name)}>
                  <GetApp />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => { setSelectedFile(file); setOpenDeleteDialog(true); }}>
                  <Delete />
                </IconButton>
              </CardActions>
            </ListItem>
          ))
        ) : null}
      </List>

      {/* Delete File Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete File</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the file <strong>{selectedFile?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Share File Dialog */}
      <Dialog open={openShareDialog} onClose={() => setOpenShareDialog(false)}>
        <DialogTitle>Share File</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={sharedEmail}
            onChange={(e) => setSharedEmail(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
            <InputLabel>Access Level</InputLabel>
            <Select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value as string)}
              label="Access Level"
            >
              <MenuItem value="viewer">Viewer</MenuItem>
              <MenuItem value="commenter">Commenter</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShareDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddShare} color="primary" variant="contained">
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </ThemeProvider>
  );
};

export default FileShare;


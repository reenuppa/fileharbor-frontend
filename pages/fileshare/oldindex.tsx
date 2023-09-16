import React, { useState } from 'react';
import {
    Grid,
    Card,
  Container,
  Typography,
  CardActions,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  CardContent,
} from '@mui/material';
import { Delete, GetApp, Share } from '@mui/icons-material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserDashboard from "../dashboard/UserDashboard";
interface File {
  id: number;
  name: string;
  sharedWith: SharedUser[];
}

interface SharedUser {
  email: string;
  accessLevel: string;
}

const FileShare: React.FC = () => {
  const [files, setFiles] = useState<File[]>([
    { id: 1, name: 'file1.txt', sharedWith: [] },
    { id: 2, name: 'file2.pdf', sharedWith: [] },
    { id: 3, name: 'file3.jpg', sharedWith: [] },
  ]);

  const [openShareDialog, setOpenShareDialog] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sharedEmail, setSharedEmail] = useState<string>('');
  const [accessLevel, setAccessLevel] = useState<string>('viewer');
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  

  const handleDelete = (id: number) => {
    // Implement delete logic here
    const fileToDelete = files.find((file) => file.id === id);
  
  if (fileToDelete) {
    // Open the delete dialog and set the selected file
    setSelectedFile(fileToDelete);
    setOpenDeleteDialog(true);
  }
  };
  
  const handleShare = (file: File) => {
    setSelectedFile(file);
    setOpenShareDialog(true);
  };

  const handleAddShare = () => {
    if (selectedFile) {
      const sharedUser: SharedUser = {
        email: sharedEmail,
        accessLevel,
      };

      // Update shared users for the selected file
      selectedFile.sharedWith.push(sharedUser);

      // Close the dialog and reset values
      setOpenShareDialog(false);
      setSelectedFile(null);
      setSharedEmail('');
      setAccessLevel('viewer');
    }
  };
   // Function to handle file download
   const handleDownload = (fileName: string) => {
    // Create a temporary anchor element
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = `/api/download/${fileName}`; // Replace with your download API endpoint

    // Set the download attribute to prompt the user for a download location
    anchor.setAttribute('download', fileName);
    // Append the anchor to the document body
    document.body.appendChild(anchor);

    // Trigger a click event on the anchor to start the download
    anchor.click();

    // Remove the anchor element from the document
    document.body.removeChild(anchor);
    };
    const confirmDelete = () => {
        if (selectedFile) {
          // Implement delete logic here, e.g., make an API call
          const fileIdToDelete = selectedFile.id;
    
          // Remove the file from the state
          setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileIdToDelete));
    
          // Close the delete dialog
          setOpenDeleteDialog(false);
    
          // Reset selected file
          setSelectedFile(null);
        }
      };
      const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedFile(null);
      };
      const handleHomeClick = () => {
        // Handle the Home button click
        console.log('Home button clicked');
      };
    
      const handleSettingsClick = () => {
        // Handle the Settings button click
        console.log('Settings button clicked');
      };
    
      const handleLogout = () => {
        // Handle the Logout button click
        console.log('Logout button clicked');
      };

  return (
    <ThemeProvider theme={createTheme()}>
      <UserDashboard onHomeClick={handleHomeClick}
        onSettingsClick={handleSettingsClick}
        onLogout={handleLogout}
          />
          <Container maxWidth="md" 
      style={{ display: 'flex', 
               flexDirection: 'column', 
               alignItems: 'center',
               height: '100vh',
               marginTop: "5rem",
               }}>
      
        
      
      <Grid container spacing={3}>
          {files.map((file) => (
            <Grid item xs={12} sm={6} md={4} key={file.id}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1">{file.name}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton aria-label="share" onClick={() => handleShare(file)}>
                    <Share />
                  </IconButton>
                  <IconButton aria-label="download" onClick={() => handleDownload(file.name)}>
                    <GetApp />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(file.id)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
      
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

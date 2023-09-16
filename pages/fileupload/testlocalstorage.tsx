import React, { useState } from 'react';
import { Button, Container, Grid, Typography, Snackbar } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useRouter } from 'next/router';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        // Create a unique key for the file using its name and current timestamp
        const key = `${selectedFile.name}_${Date.now()}`;
  
        // Save the base64-encoded file content in local storage
        localStorage.setItem(key, reader.result as string);
  
        // Show the success Snackbar
        setOpenSnackbar(true);
  
        // Redirect to the File Share page after a delay
        setTimeout(() => {
          router.push('/fileshare');
        }, 2000); // 2 seconds delay
      };
  
      reader.readAsDataURL(selectedFile);
    } else {
      console.log('No file selected');
    }
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        File Upload 
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUpload />}
            >
              Choose File
            </Button>
          </label>
          {selectedFile && (
            <Typography variant="subtitle1" color="textSecondary">
              Selected File: {selectedFile.name}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload to Local Storage
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Upload Successful"
      />
    </Container>
  );
};

export default FileUpload;

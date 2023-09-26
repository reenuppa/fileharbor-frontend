import React, { useState } from 'react';
import { Button, Container, Grid, Typography, Snackbar } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useRouter } from 'next/router';
import JSZip from 'jszip';
import Link from 'next/link';
//import FileList from '@/components/fileshare/FileList';

const FileUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      const uploadedFiles: string[] = [];

      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const key = file.name;

         
        // Save the base64-encoded file content in local storage
        localStorage.setItem(key, reader.result as string);
  
        // Store the list of uploaded files in localStorage
        //const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
        
         // Store the list of uploaded files in localStorage
        uploadedFiles.push(key);
        localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

        if (uploadedFiles.length === selectedFiles.length) {
          setOpenSnackbar(true);

          // Redirect to the File Share page after a delay
          setTimeout(() => {
            router.push('/fileshare');
          }, 2000); // 2 seconds delay
        }
      };
  
      reader.readAsDataURL(file);
    } );
  }else {
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
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            multiple //Allow multiple file selection
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
          {selectedFiles.length> 0 && (
            <Typography variant="subtitle1" color="textSecondary">
              Selected File: {selectedFiles.map((file) => file.name).join(', ')}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={selectedFiles.length ==0}
          >
            Upload to Local Storage
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
  {/* <Link href="/fileshare" >
    View Uploaded Files
  </Link> */}
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

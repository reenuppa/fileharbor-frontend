import React, { useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile.name);
      // You can perform file upload logic here
    } else {
      console.log('No file selected');
    }
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
            Upload
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FileUpload;

import React from 'react';
import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import { Delete, GetApp, Share } from '@mui/icons-material';

interface File {
  id: number;
  name: string;
}

interface FileCardProps {
  file: File;
  onDelete: (id: number) => void;
  onShare: (file: File) => void;
  onDownload: (fileName: string) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, onDelete, onShare, onDownload }) => {
  const handleDeleteClick = () => {
    onDelete(file.id);
  };

  const handleShareClick = () => {
    onShare(file);
  };

  const handleDownloadClick = () => {
    onDownload(file.name);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">{file.name}</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="share" onClick={handleShareClick}>
          <Share />
        </IconButton>
        <IconButton aria-label="download" onClick={handleDownloadClick}>
          <GetApp />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDeleteClick}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default FileCard;


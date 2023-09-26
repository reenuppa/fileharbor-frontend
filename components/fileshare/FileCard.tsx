import React, { useState } from 'react';
import {
  Paper, List, ListItem, ListItemText, Card, CardContent, Typography, CardActions, IconButton, Menu, MenuItem,
  Grid, ListItemIcon, Dialog, DialogTitle, DialogContent, Button, DialogActions, TextField, Popover, Divider,
} from '@mui/material';

import {
  Delete, GetApp, Share, MoreVert, MailOutline, PersonAdd, SupervisorAccount, InsertDriveFileOutlined, 
  PictureAsPdf, Description, PlayArrow, Edit, Settings, Visibility,
} from '@mui/icons-material';import ImageIcon from '@mui/icons-material/Image';

interface File {
  id: number;
  name: string;
  type: 'image' | 'pdf' | 'text' | 'video' | 'other';
}

interface FileCardProps {
  file: File;
  onDelete: (id: number) => void;
  onShare: (file: File) => void;
  onDownload: (fileName: string) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, onDelete, onShare, onDownload }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false); // State to control the share dialog
  const [selectedPermission, setSelectedPermission] = useState<string>(''); // State to track the selected permission
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null); // State for Popover anchor element

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };
  const handleDeleteClick = () => {
    onDelete(file.id);
  };

  const handleDownloadClick = () => {
    onDownload(file.name);
    handleMenuClose();
  };

  const handleShareClick = () => {
    setShareDialogOpen(true);
    handleMenuClose();
  };

  const handleCloseShareDialog = () => {
    setShareDialogOpen(false);
  };

  const handleShareByEmail = () => {
    // Implement sharing via email logic here
    // You can open a dialog to enter email addresses and set permissions
    // Then, close the share dialog
    console.log('Sharing via email');
    handleCloseShareDialog();
  };

  const handleSetPermissions = (permission: string) => {
    // Implement setting permissions logic here
    // You can open a dialog to set permissions (editor, viewer, owner)
    // Then, close the share dialog
    setSelectedPermission(permission);
    //console.log('Setting permissions');
    handleCloseShareDialog();
  };

  const getFileIcon = () => {
    switch (file.type) {
      case 'image':
        return <ImageIcon />;
      case 'pdf':
        return <PictureAsPdf />;
      case 'text':
        return <Description />;
      case 'video':
        return <PlayArrow />;
      default:
        return <InsertDriveFileOutlined />;
    }
  };

  return (
    <Paper elevation={3} style={{ marginBottom: '10px', width: '150%' }}>
      <ListItem>
        <ListItemIcon>{getFileIcon()}</ListItemIcon>
        <ListItemText primary={file.name} />
        <IconButton aria-label="more actions" onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleDownloadClick}>
            <ListItemIcon>
              <GetApp />
            </ListItemIcon>
            Download
          </MenuItem>
          <MenuItem onClick={handleShareClick}>
            <ListItemIcon>
              <Share />
            </ListItemIcon>
            Share
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
        <Popover
          open={Boolean(popoverAnchorEl)}
          anchorEl={popoverAnchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Grid container direction="column" spacing={2} style={{ padding: '16px' }}>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<MailOutline />}
                onClick={handleShareByEmail}
              >
                Share via Email
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => handleSetPermissions('Editor')}
              >
                Editor
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Visibility />}
                onClick={() => handleSetPermissions('Viewer')}
              >
                Viewer
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<SupervisorAccount />}
                onClick={() => handleSetPermissions('Manager')}
              >
                Manager
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Settings />}
                onClick={() => handleSetPermissions('Owner')}
              >
                Owner
              </Button>
            </Grid>
          </Grid>
        </Popover>
      </ListItem>
      <Dialog open={shareDialogOpen} onClose={handleCloseShareDialog}>
        <DialogTitle>Share File</DialogTitle>
        <DialogContent>
          <TextField label="Email Address" fullWidth />
          <Button
            variant="contained"
            startIcon={<MailOutline />}
            onClick={handleShareByEmail}
          >
            Share via Email
          </Button>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => handleSetPermissions('Editor')}
          >
            Editor
          </Button>
          <Button
            variant="contained"
            startIcon={<Visibility />}
            onClick={() => handleSetPermissions('Viewer')}
          >
            Viewer
          </Button>
          <Button
            variant="contained"
            startIcon={<SupervisorAccount />}
            onClick={() => handleSetPermissions('Manager')}
          >
            Manager
          </Button>
          <Button
            variant="contained"
            startIcon={<Settings />}
            onClick={() => handleSetPermissions('Owner')}
          >
            Owner
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShareDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default FileCard;



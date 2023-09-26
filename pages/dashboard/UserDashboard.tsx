import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import CloudIcon from "@mui/icons-material/Cloud";
import { useRouter } from 'next/router';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import SharedIcon from "@mui/icons-material/People";
import ClockIcon from "@mui/icons-material/AccessTime";
import BinIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FileUpload from '@/pages/fileupload/index';

interface UserDashboardProps {
  onHomeClick: () => void;
  onSettingsClick: () => void;
  onLogout: () => void;
  userFirstName: string;
}

const font = "'Poppins', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
  },
});

const UserDashboard: React.FC<UserDashboardProps> = ({
  onHomeClick,
  onSettingsClick,
  onLogout,
  userFirstName,

}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter(); // Use the useRouter hook

  const handleNewButtonClick = () => {
    // Redirect to the '/fileupload/index' page
    router.push('/fileupload');
  };
  const handleLogout = () => {
    // Call the onLogout function when the logout button is clicked
    onLogout();
    router.push('/');
  };
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const sidebar = (
    <div>
      <List>
        <ListItem button onClick={handleNewButtonClick}>
          <ListItemIcon>
            <AddIcon/>
          </ListItemIcon>
          <ListItemText primary="New" />
        </ListItem>
        
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DriveFolderUploadIcon />
          </ListItemIcon>
          <ListItemText primary="My Drive" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SharedIcon />
          </ListItemIcon>
          <ListItemText primary="Shared with Me" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ClockIcon />
          </ListItemIcon>
          <ListItemText primary="Recent" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BinIcon />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CloudIcon />
          </ListItemIcon>
          <ListItemText primary="Storage (50% full)" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box py={2} sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            fontFamily: "Poppins, Sans-Serif",
            backgroundColor: "#006400",
            borderRadius: "0.5rem",
            paddingTop: "0.3rem",
            paddingBottom: "0.3rem",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <AccountCircleIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userFirstName}'s FileHarbor
            </Typography>
            <Link style={{ textDecoration: "none", color: "white" }} href={"/home"}>
              <Typography>Home</Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{ width: 250 }}
        >
          {sidebar}
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default UserDashboard;

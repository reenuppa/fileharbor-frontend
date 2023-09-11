import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Container,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import {
  User,
  checkUserAuthenticated,
  getUserFromLocalStorage,
  useAuthSession,
} from "../utils/auth";
import Link from "next/link";
import "./MainLayout.css";
import { Loader } from "../components/Loaders";

const drawerWidth = 240;
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();
  const { login, logout } = useAuthSession(router);
  const [isLoading, setIsLoading] = React.useState(false);

  const theme = useTheme();
  const [sideMenuOpen, setSIdeMenuOpen] = React.useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);

  useEffect(() => {
    checkUserAuthenticated(router);
    const userData = getUserFromLocalStorage();
    setUser(userData);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleViewProfileClick = () => {
    handleCloseUserMenu();
    router.push("/profile");
  };

  const handleAccountSettingsClick = () => {
    handleCloseUserMenu();
  };

  const handleLogoutClick = () => {
    setLogoutConfirmationOpen(true);
  };

  const handleConfirmLogout = async () => {
    setIsLoading(true);
    handleCloseUserMenu();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    logout();
    setIsLoading(false);
    setLogoutConfirmationOpen(false);
  };

  const handleCancelLogout = () => {
    setLogoutConfirmationOpen(false);
  };

  const handleDrawerOpen = () => {
    setSIdeMenuOpen(true);
  };

  const handleDrawerClose = () => {
    setSIdeMenuOpen(false);
  };
  // const handleItemClick = (itemName: string) => {
  //   // Find the clicked item in the itemLists array
  //   const clickedItem = itemLists.find((item) => item.name === itemName);

  //   // Check if the item was found and log the link if it exists
  //   if (clickedItem) {
  //     router.push(clickedItem.link)
  //   } else {
  //     console.log("Item not found.");
  //   }
  // };

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // onClick={sideMenuOpen}
        sx={{

          backgroundColor: "white",
          color: "black",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Menu Icon */}
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(sideMenuOpen && { display: "none" }) }}
            > */}
            {/* <MenuIcon /> */}
            {/* </IconButton> */}
            {/* Title */}
            <Typography variant="h6" noWrap component="div" >
              <Link href="/dashboard" className="TitleLink" title="Back to Dashboard"> {title} </Link>
            </Typography>

          </Box>
          {user && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <NotificationsIcon sx={{ mr: 2 }} />
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {user.name}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleViewProfileClick}>
                  View Profile
                </MenuItem>
                <MenuItem onClick={handleAccountSettingsClick}>
                  Account Settings
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Main>
        <Container
          sx={{
            width: "100%",
            maxWidth: "100%",
            padding: 0,
            marginTop: "60px",
          }}
        >
          {children}
        </Container>
      </Main>
      <Loader open={isLoading} />
      <Dialog
        open={logoutConfirmationOpen}
        onClose={handleCancelLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

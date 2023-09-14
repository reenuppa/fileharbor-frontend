"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import Contact from "./homepage/Contact";
import Main from "./homepage/Main";
import Footer from "./homepage/Footer";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Page = () => {
  const font = "'Poppins', sans-serif";
  const theme = createTheme({
    typography: {
      fontFamily: font,
    },
  });
  
  return (
    // <ThemeProvider theme={theme}>
    <div>
      {/* header */}

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
            >
              <AccountCircleIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FileHarbor 
            </Typography>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              href={"/home"}
            >
              <Typography>Home</Typography>
              
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      {/* Your page content goes here */}
      <br></br>
      
      <Main></Main>
      <Contact></Contact> 
      <Footer></Footer> 
    </div>

    // </ThemeProvider>
  );
};

export default Page;

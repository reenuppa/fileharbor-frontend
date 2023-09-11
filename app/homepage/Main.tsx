import React from "react";
import {alpha, useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

import ApartmentIcon from "@mui/icons-material/Apartment";
import DnsIcon from "@mui/icons-material/Dns";
import TapAndPlayIcon from "@mui/icons-material/TapAndPlay";
import Link from "next/link";
import styled from 'styled-components';
import { Container, Typography, Button, TextField, Grid, Box, Paper } from '@mui/material';


export default function Main() {
  
  //const theme = useTheme();
  const breakpoints = {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  };
  
  // Define a styled container component with responsive widths
  const StyledContainer = styled(Container)`
    max-width: 100%;
    margin: 0 auto;
    padding: 16px;
  
    @media (min-width: ${breakpoints.mobile}) {
      max-width: 90%;
    }
  
    @media (min-width: ${breakpoints.tablet}) {
      max-width: 80%;
    }
  
    @media (min-width: ${breakpoints.desktop}) {
      max-width: 1200px; // Example maximum width for desktops
    }
  `;
  
   return (
    <section
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "7rem",
        marginTop: "30rem",
      }}
    >
      
    <StyledContainer>
      <div style={{marginTop: "10rem", width: '100%' }}>
      <Grid
        container
        spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
      <br></br>
        <Grid item>
          <Typography variant="h4" align="center">
            Secure and Convenient File Sharing
          </Typography>
        </Grid>
        <Grid item>
        <Link style={{ textDecoration: "none", color: "white" }}
              href="/signin" passHref>
        <Button
            variant="outlined"
            color="primary"
            size="large"
            style={{ margin: '10px' }}
          >
            Login
          </Button>
          </Link>
          <Link style={{ textDecoration: "none", color: "white" }}
              href="/register" passHref>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            style={{ margin: '10px' }}
          >
            
            Sign Up
          </Button>
          </Link>
        </Grid>
        <Typography variant="h6" align="center">
              Share and store your files in the cloud with ease.
            </Typography>
        <Grid item>
          <Paper elevation={3} style={{ padding: '30px' }}>
            
            <TextField
              label="Enter your email to get started"
              variant="outlined"
              fullWidth
              style={{ width: '300px', marginBottom: '12px' }}
              placeholder="Enter your email to get started"
             
            />
            
          </Paper>
        </Grid>
        <Grid item>
          <Button variant="text" color="primary" style={{ margin: '10px' }}>
            Features
          </Button>
          <Button variant="text" color="primary" style={{ margin: '10px' }}>
            Pricing
          </Button>
          <Button variant="text" color="primary" style={{ margin: '10px' }}>
            About
          </Button>
        </Grid>
      </Grid>
      </div>
      
      <div>
     <StyledContainer>
    <Typography variant="h4" align="center" gutterBottom>
      Features
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
      <Paper elevation={3} style={{ height:'400px', padding: '40px' }}>
          <Typography variant="h6">File Storage</Typography>
          <Typography>
            Store your files securely in the cloud and access them from
            anywhere.
          </Typography>
          <Button variant="outlined" color="primary">
            Learn More
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
      <Paper elevation={3} style={{  height:'400px', padding: '40px' }}>
          <Typography variant="h6">Collaboration Tools</Typography>
          <Typography>
            Collaborate with your team in real-time using our powerful
            collaboration tools.
          </Typography>
          <Button variant="outlined" color="primary">
            Learn More
          </Button>
        </Paper>
      </Grid>
     
      <Grid item xs={12} sm={4}>
      <Paper elevation={3} style={{  height:'400px',padding: '40px' }}>
        
          <Typography variant="h6">Version Control</Typography>
          <Typography>
            Keep track of changes and revisions with our version control
            system.
          </Typography>
          <Button variant="outlined" color="primary">
            Learn More
          </Button>
        
        </Paper>
      </Grid>
    </Grid>
    </StyledContainer>
    </div>
    <br></br>
    <div>
    <StyledContainer>
          <Grid container spacing={3}>
        {/* Left Half */}
        <Grid item xs={12} md={6}>
          <Typography variant="h2" gutterBottom  alignContent={"center"}>
            How it Works
          </Typography>
        </Grid>

        {/* Right Half */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {/* Upload Section */}
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  <Button variant="text" color="primary" style={{ margin: '10px' }}>
                    Upload
                  </Button>
                </Typography>
                <Typography>
                  Drag and drop your files into fileHarbor or use the upload button.
                </Typography>
              </Paper>
            </Grid>

            {/* Share Section */}
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  <Button variant="text" color="primary" style={{ margin: '10px' }}>
                    Share
                  </Button>
                </Typography>
                <Typography>
                  Generate unique links to share your files securely with others.
                </Typography>
              </Paper>
            </Grid>

            {/* Download Section */}
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  <Button variant="text" color="primary" style={{ margin: '10px' }}>
                    Download
                  </Button>
                </Typography>
                <Typography>
                  Simply click the download option next to each file to start downloading.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>


      </StyledContainer>
      </div>
  
  </StyledContainer>
    </section>
  );
};


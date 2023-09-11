import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { AppBar, Box } from "@mui/material";
import {  alpha} from '@mui/material/styles';

export default function Footer() {
  return (
    <Box

      sx={{


        backgroundColor: alpha("#5C76B7", .6),
     
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        margin:0
        
      }}
    >

    
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4} xl={6}>
            <Typography variant="h6" color="white" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="white">
              We are FileHarbor company, dedicated to providing the best service to our
             customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} xl={3}>
            <Typography variant="h6" color="white" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="white">
              123 Main Street, Anytown, USA
            </Typography>
            <Typography variant="body2" color="white">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="white">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4} xl={3} >
            <Typography variant="h6" color="white" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="#ffffff">
              <Facebook style={{fontSize:"2rem"}}/>
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="#ffffff"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram style={{fontSize:"2rem"}}/>
            </Link>
            <Link href="https://www.twitter.com/" color="#ffffff">
              <Twitter style={{fontSize:"2rem"}} />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="#ffffff" align="center">
            {"Copyright © "}
            <Link color="#ffffff" href="https://your-website.com/">
              Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
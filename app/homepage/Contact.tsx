import React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function Contact(props:any) {

  const font = "'Poppins', sans-serif";
  const theme2 = useTheme();
  const theme = createTheme({
    typography: {
      fontFamily: font,
    },
  });
  

  const content = {
    'contact1': '160 Sussex st, Sydney NSW 2000', 
    'contact2-desc': 'fileharbor.info@gmail.com',
    'contact4-desc': '(+62) 2399-579856',
    ...props.content
  };

  return (
    <ThemeProvider theme={theme}>
     <section style={{height:"30vh" ,paddingBottom:"10rem",display:"flex", justifyContent:"center", alignItems:"center", marginTop: "50rem"}}>
     
   
    <Container maxWidth="lg">

        <Box py={10} sx={{justifyContent:"center"}} >
          <Grid container spacing={5} >
            <Grid item xs={12} md={4} xl={5}>
              <Typography variant="h6" component="h2" gutterBottom={true}>{content['header']}</Typography>
              <Typography variant="subtitle1" color="textSecondary" paragraph={true}>{content['description']}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4}>
              <div style={{paddingLeft:theme2.spacing(4)}}>
                <Box display="flex" mb={3}>
                  <div>
                    <Avatar sx={{backgroundColor:"#5C76B7"}}>
                      <RoomIcon fontSize="small" />
                    </Avatar>
                  </div>
                  <Box ml={2}>
                    <Typography variant="body2" color="textSecondary" gutterBottom={true}>{content['contact1']}</Typography>
                    <Typography variant="body2" color="textSecondary">{content['contact1-desc1']}</Typography>
                    <Typography variant="body2" color="textSecondary">{content['contact1-desc2']}</Typography>
                  </Box>
                </Box>
                <Box display="flex">
                  <div>
                    <Avatar  sx={{backgroundColor:"#5C76B7"}}>
                      <EmailIcon fontSize="small" />
                      
                    </Avatar>
                    
                  </div>
                  <Box ml={2}>
                    <Typography variant="h6" gutterBottom={true}>{content['contact2']}</Typography>
                    <Typography variant="body2" color="textSecondary">{content['contact2-desc']}</Typography>
                  </Box>
                </Box>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
            <Box sx={{ alignItems: 'flex-end' }}>
              <Box display="flex" mb={3}>
                <div>
                  <Avatar sx={{backgroundColor:"#5C76B7"}}>
                    <WebAssetIcon  fontSize="small" />
                  </Avatar>
                </div>
                <Box ml={2}>
                  <Typography variant="h6" gutterBottom={true}>{content['contact3']}</Typography>
                  <IconButton href="#" color="inherit">
                    <FacebookIcon />
                  </IconButton>
                  <IconButton href="#" color="inherit">
                    <TwitterIcon />
                  </IconButton>
                  <IconButton href="#" color="inherit">
                    <LinkedInIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box display="flex">
                <div>
                  <Avatar sx={{backgroundColor:"#5C76B7"}}>
                    <PhoneIcon fontSize="small" />
                  </Avatar>
                </div>
                <Box ml={2}>
                  <Typography variant="h6" gutterBottom={true}>{content['contact4']}</Typography>
                  <Typography variant="body2" color="textSecondary">{content['contact4-desc']}</Typography>
                </Box>
              </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        </Container>
     
    

    </section>
    </ThemeProvider>
  );
}
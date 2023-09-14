import React, { useState } from 'react';
import {
    Grid,
    Link,
  Container,
  Typography,
  TextField,
  Button,
  makeStyles,
  ThemeProvider,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Copyright from "@/components/Copyright";
import axios from 'axios';

const theme = createTheme();

// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   form: {
//     width: '100%',
//     maxWidth: '400px',
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

const SignUp: React.FC = () => {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Implement user registration logic with PostgreSQL on the backend here
    // You should send a POST request to your backend API with formData
    // Example: axios.post('/api/register', formData);

    try {
      // Replace the following with your backend registration logic
      const response = await axios.post('/api/register', formData); // Replace with your server's API endpoint
      const data = response.data;

      // Handle registration success
      console.log('Registration successful:', data);
    } catch (error) {
      // Handle registration error
      console.error('Registration failed:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs"  sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Sign Up</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
        </form>
        <Copyright sx={{ mt: 5 }} />
        
      </Container>
        
    </ThemeProvider>
  );
};

export default SignUp;

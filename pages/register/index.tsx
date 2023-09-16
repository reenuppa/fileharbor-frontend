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
  Alert,
  AlertTitle,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Copyright from "@/components/Copyright";
import axios from 'axios';
import { useRouter } from 'next/router';

const theme = createTheme();

const SignUp: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', formData);
      const data = response.data;

      console.log('Registration successful:', data);

      // Show the success notification and redirect
      setShowSuccess(true);

      setTimeout(() => {
        router.push('/fileshare');
      }, 2000);
    } catch (error) {
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
          /><Button
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
        {showSuccess && ( // Conditionally render the success alert
          <Alert severity="success" sx={{ width: '100%', marginTop: 2 }}>
            <AlertTitle>Success</AlertTitle>
            Account successfully created! Redirecting to FileShare...
          </Alert>
        )}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;

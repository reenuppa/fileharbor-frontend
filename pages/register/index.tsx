import React, { useEffect, useState } from 'react';
import {
  Grid, Link, Container, Typography, TextField, Button,
  ThemeProvider, Alert, AlertTitle, FormControlLabel, Checkbox,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/router';

const theme = createTheme();
const api = axios.create({
  baseURL: 'http://127.0.0.1:3333', // Set this to your backend URL
});

const SignUp: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send a POST request to the backend for registration with CSRF token in headers
      const response = await axios.post('http://127.0.0.1:3333/api/register', formData);
      const data = response.data;

      console.log('Registration successful:', data);

      // Show the success notification and redirect
      setShowSuccess(true);

      setTimeout(() => {
        router.push('/fileshare');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Sign Up</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            value={formData.lastname}
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
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I accept all the Terms and conditions."
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {showSuccess && (
          <Alert severity="success" sx={{ width: '100%', marginTop: 2 }}>
            <AlertTitle>Success</AlertTitle>
            Account successfully created! Redirecting to FileShare...
          </Alert>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  ThemeProvider,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Copyright from "@/components/Copyright";
import axios from 'axios';
import router, { useRouter } from 'next/router';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const theme = createTheme();



const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:3333/api/login', formData);
      // Handle successful login (e.g., store token in localStorage and redirect)
      console.log('Logged in successfully:', response.data);

      // Redirect to the FileShare page or wherever you want
      router.push('/fileshare');
    } catch (error) {
      // Handle login error (e.g., display an error message)
      console.error('Login failed:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign In</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Container>
      <Copyright sx={{ mt: 5 }} />
    </ThemeProvider>
  );
};

export default SignIn;

"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useEffect } from "react";
import router, { useRouter } from "next/router";
import {
  checkUserAuthenticated,
  getUserFromLocalStorage,
  useAuthSession,
  User,
} from "../../utils/auth";
import Copyright from "@/components/Copyright";
import Loader from "@/components/Loaders";
const api = require( "@/apiCalls");

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const router=useRouter()
  const { login } = useAuthSession(router);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("password"),
    };
    try {
      const res = await api.register(userData);
      if (res.status === 200) {
        const user = {
          id: res.data.userInfo.id,
          name:
            res.data.userInfo.first_name + " " + res.data.userInfo.last_name,
          email: res.data.userInfo.email,
          token: res.data.token.token,
        };
        login(user);
        setIsLoading(false);

        router.push("/dashboard");
      } else {
        setError(res.data.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  // ...

  const [error, setError] = React.useState<null | string>();
  const [isLoading, setIsLoading] = React.useState(false); // State to control the visibility of the loader

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}{" "}
          {/* <- Display error message when error occurs */}
          <Box
            onSubmit={handleSubmit}
            component="form"
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I accept all the Terms and conditions. But its not real."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <Loader open={isLoading} />{" "}
        {/* Render the Loader component based on the isLoading state */}
      </Container>
    </ThemeProvider>
  );
}

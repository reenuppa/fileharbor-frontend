import React from 'react';
import Button from '@mui/material/Button';
import { User } from '@/utils/auth';
const api=require("@/apiCalls")

interface GoogleSignUpButtonProps {
  onGoogleSignUpSuccess: (user: User) => void;
  onError: (error: string) => void;
}

const GoogleSignUpButton: React.FC<GoogleSignUpButtonProps> = ({
  onGoogleSignUpSuccess,
  onError,
}) => {
 

  return (
    <Button variant="contained" color="primary" fullWidth onClick={api.handleSignUpWithGoogle}>
      Sign Up/Sign In with Google
    </Button>
  );
};

export default GoogleSignUpButton;

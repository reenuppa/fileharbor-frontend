import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface LoaderProps {
  open: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1,
        color: '#fff',
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

 export default Loader;

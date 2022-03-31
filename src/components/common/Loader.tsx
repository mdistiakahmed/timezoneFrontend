import { CircularProgress } from '@mui/material';
import React from 'react';

const Loader = ({ isLoading }: LoaderProps) => {
  if (!isLoading) {
    return null;
  }
  return (
    <div>
      <CircularProgress
        size={100}
        sx={{ position: 'fixed', zIndex: 999, bottom: '45%', left: '45%' }}
      />
    </div>
  );
};

export default Loader;

type LoaderProps = {
  isLoading: boolean;
};

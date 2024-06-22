// src/components/ConnectionState.js
import React from 'react';
import { Typography } from '@mui/material';

export function ConnectionState({ isConnected }) {
  return (
    <Typography variant="h6">
      State: {isConnected ? 'Connected' : 'Disconnected'}
    </Typography>
  );
}

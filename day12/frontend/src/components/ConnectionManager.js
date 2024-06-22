// src/components/ConnectionManager.js
import React from 'react';
import { Button, Stack } from '@mui/material';

export function ConnectionManager({ onConnect, onDisconnect }) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" color="primary" onClick={onConnect}>
        Connect
      </Button>
      <Button variant="contained" color="secondary" onClick={onDisconnect}>
        Disconnect
      </Button>
    </Stack>
  );
}

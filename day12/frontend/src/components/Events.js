// src/components/Events.js
import React from 'react';
import { Stack, Typography } from '@mui/material';

export function Events({ events }) {
  return (
    <Stack spacing={2}>
      {events.map((event, index) => (
        <Typography key={index} variant="body1">
          <strong>{event.sender}:</strong> {event.message}
        </Typography>
      ))}
    </Stack>
  );
}

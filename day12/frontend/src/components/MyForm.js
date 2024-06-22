// src/components/MyForm.js
import React, { useState } from 'react';
import { Button, TextField, Stack } from '@mui/material';

export function MyForm({ onSubmit }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Message"
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </Stack>
    </form>
  );
}

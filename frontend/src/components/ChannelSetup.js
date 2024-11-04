// frontend/src/components/ChannelSetup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';

const ChannelSetup = () => {
  const [channelsInput, setChannelsInput] = useState('');
  const navigate = useNavigate();

  const handleStartCollab = () => {
    // Extract channel names from the URLs or names inputted
    const channels = channelsInput
      .split(',')
      .map((channel) => channel.trim())
      .map((channel) => {
        // Extract channel name if a full URL is provided
        const match = channel.match(/twitch\.tv\/([a-zA-Z0-9_]+)/);
        return match ? match[1] : channel;
      });

    // Redirect to the main page with channels as URL parameters
    navigate(`/collab?channels=${encodeURIComponent(channels.join(','))}`);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '5%' }}>
      <Paper style={{ padding: 32, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to CollabCast
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter Twitch channel URLs or names to start a collaborative streaming session.
        </Typography>
        <TextField
          label="Twitch Channel URLs or Names"
          placeholder="e.g., https://www.twitch.tv/channel1, channel2"
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          value={channelsInput}
          onChange={(e) => setChannelsInput(e.target.value)}
          helperText="Separate multiple channels with commas."
          style={{ marginBottom: 24, marginTop: 16 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartCollab}
          size="large"
          fullWidth
        >
          Start Collaboration
        </Button>
      </Paper>
    </Container>
  );
};

export default ChannelSetup;
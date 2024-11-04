// StreamEmbed.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StreamEmbed = ({ channel }) => {
  const parentDomain = window.location.hostname;

  return (
    <Card elevation={4}>
      <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=${parentDomain}`}
        height="360"
        width="100%"
        allowFullScreen
        title={`Twitch Stream - ${channel}`}
        style={{ border: 'none' }}
      ></iframe>
      <CardContent style={{ textAlign: 'center' }}>
        <Typography variant="subtitle1">{channel}</Typography>
      </CardContent>
    </Card>
  );
};

export default StreamEmbed;
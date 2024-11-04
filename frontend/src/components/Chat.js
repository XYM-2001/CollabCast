// Chat.js
import React, { useEffect, useState } from 'react';
import tmi from 'tmi.js';
import { Paper, Typography } from '@mui/material';

const Chat = ({ channels }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = new tmi.Client({
      identity: {
        username: process.env.REACT_APP_TWITCH_USERNAME,
        password: process.env.REACT_APP_TWITCH_OAUTH_TOKEN,
      },
      channels: channels,
    });

    client.connect().catch(console.error);

    client.on('message', (channel, tags, message, self) => {
      setMessages((prevMessages) => [
        { channel, username: tags['display-name'], text: message },
        ...prevMessages, // Add new messages at the beginning
      ]);
    });

    return () => {
      client.disconnect();
    };
  }, [channels]);

  return (
    <Paper style={{ padding: 16, maxHeight: 400, overflowY: 'auto' }}>
      <Typography variant="h6">Unified Chat</Typography>
      <div>
        {messages.map((msg, index) => (
          <Typography key={index} variant="body2">
            <strong>[{msg.channel}] {msg.username}:</strong> {msg.text}
          </Typography>
        ))}
      </div>
    </Paper>
  );
};

export default Chat;
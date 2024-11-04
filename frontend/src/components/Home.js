// frontend/src/components/Home.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import queryString from 'query-string';
import Chat from './Chat';
import Poll from './Poll';
import StreamEmbed from './StreamEmbed';
import Notifications from './Notifications';

const Home = () => {
  const location = useLocation();
  const { channels } = queryString.parse(location.search);

  // Convert channels parameter back to an array
  const channelList = channels ? channels.split(',') : [];

  return (
    <Container maxWidth="lg" style={{ marginTop: '2%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Notifications />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {channelList.map((channel, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StreamEmbed channel={channel} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Poll />
        </Grid>
        <Grid item xs={12}>
          <Chat channels={channelList} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, ThemeProvider, createTheme } from '@mui/material';
import ChannelSetup from './components/ChannelSetup';
import Home from './components/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7', // Deep Purple
    },
    secondary: {
      main: '#ff4081', // Pink
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">CollabCast</Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<ChannelSetup />} />
        <Route path="/collab" element={<Home />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;
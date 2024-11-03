import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './components/Chat';
import Poll from './components/Poll';
import StreamEmbed from './components/StreamEmbed';

const Home = () => <div>Welcome to CollabCast</div>;

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/poll" element={<Poll />} />
        <Route path="/stream/:channel" element={<StreamEmbed />} />
      </Routes>
    </div>
  </Router>
);

export default App;
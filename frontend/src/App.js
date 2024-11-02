import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import Poll from './components/Poll';
import StreamEmbed from './components/StreamEmbed';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/chat" component={Chat} />
          <Route path="/poll" component={Poll} />
          <Route path="/stream/:channel" component={StreamEmbed} />
          <Route path="/" exact>
            <h1>Welcome to CollabCast</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
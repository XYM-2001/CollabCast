import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onChildAdded, onValue } from 'firebase/database';
import { Button, TextField, Typography, Paper, Grid, LinearProgress } from '@mui/material';

const firebaseConfig = {
    apiKey: "AIzaSyB3QXaJrgsIAN5H_h36PEn6srNVKbbYMOc",
    authDomain: "collabcast-45028.firebaseapp.com",
    projectId: "collabcast-45028",
    storageBucket: "collabcast-45028.firebasestorage.app",
    messagingSenderId: "292573060668",
    appId: "1:292573060668:web:546d14e8023880b32f2d39",
    measurementId: "G-HF3315V5M4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const pollRef = ref(database, 'polls');

const Poll = () => {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState('');

  useEffect(() => {
    onChildAdded(pollRef, (snapshot) => {
      const poll = snapshot.val();
      poll.id = snapshot.key; // Include poll ID
      setPolls((prevPolls) => [...prevPolls, poll]);
    });
  }, []);

  const createPoll = () => {
    const newPoll = {
      question,
      options: options.split(',').map((opt) => opt.trim()),
      votes: {},
    };
    push(pollRef, newPoll);
    setQuestion('');
    setOptions('');
  };

  const vote = (pollId, option) => {
    const voteRef = ref(database, `polls/${pollId}/votes`);
    push(voteRef, option);
  };

  const [votesData, setVotesData] = useState({});

  useEffect(() => {
    polls.forEach((poll) => {
      const votesRef = ref(database, `polls/${poll.id}/votes`);
      onValue(votesRef, (snapshot) => {
        const votes = snapshot.val() || {};
        setVotesData((prevVotesData) => ({
          ...prevVotesData,
          [poll.id]: Object.values(votes),
        }));
      });
    });
  }, [polls]);

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Collaborative Polls</Typography>
      <Grid container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Poll Question"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Options (comma separated)"
            fullWidth
            value={options}
            onChange={(e) => setOptions(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={createPoll}>
            Create Poll
          </Button>
        </Grid>
      </Grid>
      <div>
        {polls.map((poll, index) => {
          const votes = votesData[poll.id] || [];
          const totalVotes = votes.length;
          const optionCounts = poll.options.map((option) => {
            return votes.filter((vote) => vote === option).length;
          });

          return (
            <Paper key={index} style={{ padding: 16, marginBottom: 16 }}>
              <Typography variant="subtitle1">{poll.question}</Typography>
              {poll.options.map((option, idx) => {
                const count = optionCounts[idx];
                const percentage = totalVotes ? (count / totalVotes) * 100 : 0;
                return (
                  <div key={idx} style={{ marginBottom: 8 }}>
                    <Button variant="outlined" onClick={() => vote(poll.id, option)}>
                      {option}
                    </Button>
                    <Typography variant="body2">
                      {count} votes ({percentage.toFixed(1)}%)
                    </Typography>
                    <LinearProgress variant="determinate" value={percentage} />
                  </div>
                );
              })}
            </Paper>
          );
        })}
      </div>
    </Paper>
  );
};

export default Poll;
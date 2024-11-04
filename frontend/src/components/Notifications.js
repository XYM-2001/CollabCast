// Notifications.js
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onChildAdded } from 'firebase/database';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

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

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notifRef = ref(database, 'notifications');
    onChildAdded(notifRef, (snapshot) => {
      const notification = snapshot.val();
      setNotifications((prev) => [...prev, notification]);
    });
  }, []);

  return (
    <Paper style={{ padding: 16, maxHeight: 100, overflowY: 'auto' }}>
      <Typography variant="h6">Notifications</Typography>
      <List dense>
        {notifications.map((notif, index) => (
          <ListItem key={index}>
            <ListItemText primary={notif.message} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Notifications;
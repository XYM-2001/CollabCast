import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB3QXaJrgsIAN5H_h36PEn6srNVKbbYMOc",
    authDomain: "collabcast-45028.firebaseapp.com",
    projectId: "collabcast-45028",
    storageBucket: "collabcast-45028.firebasestorage.app",
    messagingSenderId: "292573060668",
    appId: "1:292573060668:web:546d14e8023880b32f2d39",
    measurementId: "G-HF3315V5M4"
};

firebase.initializeApp(firebaseConfig);

const pollRef = firebase.database().ref('polls');

function createPoll(pollData) {
    pollRef.push(pollData);
}

function listenForPolls() {
    pollRef.on('child_added', (snapshot) => {
        const poll = snapshot.val();
        displayPoll(poll);
    });
}

function displayPoll(poll) {
    const pollContainer = document.getElementById('polls');
    pollContainer.innerHTML += `<p>${poll.question} - ${poll.options.join(', ')}</p>`;
}

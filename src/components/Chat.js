const tmi = require('tmi.js');

const client = new tmi.Client({
    channels: ['streamer1', 'streamer2']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    const chatMessage = {
        channel,
        username: tags['display-name'],
        text: message
    };
    displayChatMessage(chatMessage);
});

function displayChatMessage(chatMessage) {
    const chatBox = document.getElementById('chat');
    chatBox.innerHTML += `<p><strong>${chatMessage.username}:</strong> ${chatMessage.text}</p>`;
}

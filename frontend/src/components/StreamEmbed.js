import React from 'react';

const StreamEmbed = ({ channel }) => (
    <div>
        <iframe
            src={`https://player.twitch.tv/?channel=${channel}&parent=yourdomain.com`}
            height="480"
            width="720"
            allowFullScreen
            title="Twitch stream"
        ></iframe>
    </div>
);

export default StreamEmbed;
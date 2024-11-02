import React from 'react';

const StreamEmbed = ({ channel }) => {
    return (
        <div>
            <iframe
                src={`https://player.twitch.tv/?channel=${channel}&parent=yourdomain.com`}
                height="480"
                width="720"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default StreamEmbed;
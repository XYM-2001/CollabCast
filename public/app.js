window.onload = function () {
    new Twitch.Embed("stream1", {
        channel: "streamer1_name",
        layout: "video",
        width: "100%",
        height: "500px",
        theme: "dark"
    });

    new Twitch.Embed("stream2", {
        channel: "streamer2_name",
        layout: "video",
        width: "100%",
        height: "500px",
        theme: "dark"
    });
};

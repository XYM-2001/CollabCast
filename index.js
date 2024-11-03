// index.js
const app = require('./server');

const PORT = process.env.PORT || 4000; // Change to a different port

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
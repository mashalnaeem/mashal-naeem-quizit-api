const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const userRoutes = require('./routes/users_route.js');
const quizRoutes = require('./routes/quizzes_route.js');
const userQuizRoutes = require('./routes/user_quizzes_route.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// JSON config for post/update requests
app.use(express.json());

// CORS config
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT || 5050;

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Change this to your frontend URL
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use CORS middleware with custom options
app.use(cors(corsOptions));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/user_quizzes', userQuizRoutes);

// Basic home route
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

// Start the combined HTTP and WebSocket server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

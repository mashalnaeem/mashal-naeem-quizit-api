const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const userRoutes = require('./routes/users_route.js');
const quizRoutes = require('./routes/quizzes_route.js');
const userQuizRoutes = require('./routes/user_quizzes_route.js');

const app = express();
const server = http.createServer(app);

// JSON config for post/update requests
app.use(express.json());

// CORS config
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT || 5050;

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
};

// Use CORS middleware with custom options
app.use(cors(corsOptions));

// const io = socketIo(server, {
//   cors: {
//       origin: 'http://localhost:3000',
//       methods: ['GET', 'POST']
//   }
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle joining the quiz room
//   socket.on('joinQuizRoom', (roomId) => {
//       socket.join(roomId);
//       console.log(`User joined Quiz Room ${roomId}`);
//   });

//   // Handle broadcasting quiz messages to the quiz room
//   socket.on('quizMessage', (roomId, message) => {
//       console.log(`Message received for Quiz Room ${roomId}: ${message}`);
//       // Broadcast the message to the specific quiz room
//       io.to(roomId).emit('quizMessage', message);
//   });

//   // Handle disconnect event
//   socket.on('disconnect', () => {
//       console.log('User disconnected');
//   });
// });

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

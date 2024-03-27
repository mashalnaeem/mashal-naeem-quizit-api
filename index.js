
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const userRoutes = require('./routes/users_route.js');
const quizRoutes = require('./routes/quizzes_route.js');
const userQuizRoutes = require('./routes/user_quizzes_route.js');

// JSON config for post/update requests
app.use(express.json());

// CORS config
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT || 5050;

// Routes
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes); 
app.use('/api/user_quizzes', userQuizRoutes); 

// Socket config
const server = http.createServer(app);
const io = socketIo(server);

// Define WebSocket event handlers
io.on('connection', (socket) => {
  console.log('A user connected');

  // Example: Handle 'joinQuiz' event
  socket.on('joinQuiz', (quizId) => {
    // Logic to handle quiz joining
    console.log(`User joined quiz ${quizId}`);
    // Broadcast to other participants that a user joined
    socket.broadcast.emit('userJoined', { quizId, userId: socket.id });
  });

  // Add more event handlers for other WebSocket events

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Basic home route
app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

// Start the combined HTTP and WebSocket server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});







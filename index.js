
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 5050;

const app = express();
app.use(cors());
app.use(express.json());

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





// const express = require('express');
// const app = express();
// const cors = require("cors");

// require("dotenv").config();

// const PORT = process.env.PORT || 5050;

// app.use(cors());
// app.use(express.json());

// // basic home route
// app.get('/', (req, res) => {
//   res.send('Welcome to my API');
// });


// app.listen(PORT, () => {
//   console.log(`running at http://localhost:${PORT}`);
// });
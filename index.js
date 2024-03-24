const express = require('express');
const app = express();
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// basic home route
app.get('/', (req, res) => {
  res.send('Welcome to my API');
});


app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
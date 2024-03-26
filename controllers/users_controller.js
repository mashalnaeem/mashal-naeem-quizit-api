const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require("../knexfile");
const { validationResult } = require('express-validator');

// Handle user login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).send("Please enter the required fields");
    }
    try {
        // Find user by email using Knex
        const user = await knex('users').where({ email }).first();

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Send token in response
        res.json({ token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get user by ID
const getUserById = async (req, res) => {
  try {
    // Check if the Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).send("Please login");
    }
    // Parse the bearer token
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    // Verify the token
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

    // Retrieve user data from the database using Knex
    const user = await knex("users").where({ id: decodedToken.userId }).first();
    
    // Remove sensitive information like password before sending the response
    delete user.password;

    // Respond with the user data
    res.send(user);

  } catch (error) {
    // Handle token verification errors
    console.error("Error verifying token:", error);
    res.status(401).send("Invalid auth token");
  }
};

// Controller function to create a new user
const createUser = async (req, res) => {
    try {
        // Validate incoming data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Extracting user data from request body
        const { username, email, password } = req.body;

        // Check if user with the same email already exists using Knex
        const existingUser = await knex('users').where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user using Knex
        const newUser = await knex('users').insert({
            username,
            email,
            password: hashedPassword,
        }).returning('*');

        // Create JWT token
        const token = jwt.sign({ userId: newUser[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Send token and user data in response
        res.status(201).json({ token, user: { id: newUser[0].id, username: newUser[0].username, email: newUser[0].email } });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { login, getUserById, createUser }
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile'));
const { validationResult } = require('express-validator');

// Handle user login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Please enter the required fields");
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

        // Send token and userId in response
        res.json({ token, userId: user.id });

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

// Update User Profile
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, email, existingPassword, newPassword, current_score } = req.body;

    try {
        // Retrieve user data from the database using Knex
        const user = await knex("users").where({ id: userId }).first();

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // If username, email, existingPassword, or newPassword is provided, 
        // ensure all fields are present
        if ((username || email || existingPassword || newPassword) &&
            (!username || !email || !existingPassword || !newPassword)) {
            return res.status(400).json({ error: 'Please provide username, email, existingPassword, and newPassword' });
        }

        // If current_score is provided, update the user's current score and total score
        if (current_score !== undefined) {
            await knex('users').where({ id: userId }).update({ current_score });

            // Increment the quizzes_played count by 1
            await knex('users').where({ id: userId }).increment('quizzes_played', 1);
            await updateTotalScore(userId, current_score);
        }

        // If username or password is provided, update username, email, and password
        if (username || newPassword) {
            // Compare the provided existing password with the stored password
            const passwordMatch = await bcrypt.compare(existingPassword, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Incorrect existing password' });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's username, email, and password
            await knex('users').where({ id: userId }).update({
                username,
                email,
                password: hashedPassword // Fixed typo in password field name
            });
        }

        res.status(200).json({ message: 'User profile updated successfully' });

    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to delete a user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        console.log(userId)

        // Check if the user exists
        const existingUser = await knex('users').where({ id: userId }).first();
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user from the database using Knex
        await knex('users').where({ id: userId }).del();

        // Respond with success message
        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to update total score
const updateTotalScore = async (userId, score) => {
    try {
        // Retrieve current user data
        const user = await knex('users').where({ id: userId }).first();

        // Calculate new total score
        const totalScore = user.total_score + score;

        // Update total score in the database
        await knex('users').where({ id: userId }).update({ total_score: totalScore });
    } catch (error) {
        console.error('Error updating total score:', error);
    }
};

module.exports = { login, getUserById, createUser, updateUser, deleteUser };


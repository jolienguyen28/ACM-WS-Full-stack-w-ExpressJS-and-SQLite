// Importing the Express framework for building web applications
const express = require('express');
// Importing body-parser to parse incoming request bodies in a middleware
const bodyParser = require('body-parser');
// Importing SQLite3 with verbose mode for additional debug information
const sqlite3 = require('sqlite3').verbose();
// Importing CORS middleware to enable Cross-Origin Resource Sharing
const cors = require('cors');
// Importing the built-in file system module to work with the file system
const fs = require('fs');
// Importing a custom setup function for Swagger documentation
const setupSwagger = require('./swagger');
// Creating an instance of Express
const app = express();
// Setting the port number the server will listen on
const port = 3000;

// Using body-parser middleware to parse JSON requests
app.use(bodyParser.json());
// Using CORS middleware to allow cross-origin requests
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Initialize SQLite database
const db = new sqlite3.Database('./db.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Run your SQL schema file
const initSql = fs.readFileSync('mysql.sql', 'utf8');

db.exec(initSql, (err) => {
  if (err) {
    console.error('Error initializing database', err);
  } else {
    console.log('Database initialized successfully');
  }
});

// Swagger setup
setupSwagger(app);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   balance:
 *                     type: number
 */

app.get('/api/users', (req, res) => {});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 balance:
 *                   type: number
 */

app.post('/api/users', (req, res) => {});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: No content, user deleted
 */


app.delete('/api/users/:id', (req, res) => {});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 balance:
 *                   type: number
 */


app.put('/api/users/:id', (req, res) => {});

// Starting the Express server and making it listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

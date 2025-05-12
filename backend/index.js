// Import required libraries
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;  // You can use the PORT provided by Render or set a default

// Middleware to parse JSON requests
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// Sample API route
app.get('/api/loan', (req, res) => {
  // Your logic to return loans
  res.json({ message: 'Loan data' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

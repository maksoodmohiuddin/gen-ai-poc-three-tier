const express = require('express');
const app = express();

// Define a GET route
app.get('/api/data', (req, res) => {
  // Replace this with your desired data
  const data = {
    message: 'Hello, World!'
  };

  res.json(data);
});

// Start the server
const port = 3001; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

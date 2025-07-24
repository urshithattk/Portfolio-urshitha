const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

const API_KEY = process.env.API_KEY; 

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint to hide API key
app.get('/news', async (req, res) => {
  try {
    const response = await axios.get(`https://api.thenewsapi.com/v1/news/all`, {
      params: {
        api_token: API_KEY,
        language: 'en'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

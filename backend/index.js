const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const response = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "a2314157-2e33-4f29-8a4a-286822e76a3d" } }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with an error status
      return res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      return res.status(500).json({ error: 'No response received from the server.' });
    } else {
      // Something happened in setting up the request that triggered an Error
      return res.status(500).json({ error: 'Error setting up the request.' });
    }
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

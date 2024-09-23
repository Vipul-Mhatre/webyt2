const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; 

app.use(cors());

app.get('/api/channel/:channelId', async (req, res) => {
  const channelId = req.params.channelId;
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${YOUTUBE_API_KEY}`;
  const videosUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`;

  try {
    const channelResponse = await axios.get(channelUrl);
    const videosResponse = await axios.get(videosUrl);

    const channelData = {
      title: channelResponse.data.items[0].snippet.title,
      description: channelResponse.data.items[0].snippet.description,
      publishedAt: channelResponse.data.items[0].snippet.publishedAt,
      thumbnails: channelResponse.data.items[0].snippet.thumbnails.default.url,
      statistics: channelResponse.data.items[0].statistics,
      videos: videosResponse.data.items.map(video => ({
        id: video.id.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        publishTime: video.snippet.publishedAt,
        thumbnail: video.snippet.thumbnails.default.url,
      })),
    };

    res.json(channelData);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: 'Error fetching channel data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
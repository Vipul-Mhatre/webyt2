import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Channel = ({ channelId }) => {
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/channel/${channelId}`);
        setChannelData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching channel data');
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [channelId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const statistics = channelData.statistics || {};
  const videos = channelData.videos || [];

  const data = {
    labels: videos.map(video => video.title),
    datasets: [
      {
        label: 'Views Count',
        data: videos.map(video => video.views || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h1>{channelData.title}</h1>
      <p>{channelData.description}</p>
      <div>
        <h3>Channel Statistics:</h3>
        <p>Subscribers: {statistics.subscriberCount || 'N/A'}</p>
        <p>Total Views: {statistics.viewCount || 'N/A'}</p>
        <p>Video Count: {statistics.videoCount || 'N/A'}</p>
      </div>
      <h2>Videos:</h2>
      <Bar data={data} />
      <ul>
        {videos.map(video => (
          <li key={video.id}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <p>Published on: {video.publishTime}</p>
            <img src={video.thumbnail} alt={video.title} />
          </li>
        ))}
      </ul>
      <style>
        {`
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

h3 {
  font-size: 1.5rem;
  color: #444;
  margin: 20px 0 10px;
}

h2 {
  font-size: 1.75rem;
  color: #444;
  margin-top: 30px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}

li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

img {
  max-width: 100%;
  border-radius: 5px;
  margin-top: 10px;
}

.bar-chart {
  margin: 30px 0;
}
        `}
      </style>
    </div>
  );
};

export default Channel;
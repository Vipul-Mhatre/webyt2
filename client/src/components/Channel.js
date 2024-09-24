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

const truncateTitle = (title) => {
  const maxWords = 4;
  const words = title.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : title;
};

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
    labels: videos.map(video => truncateTitle(video.title)), // Truncate titles
    datasets: [
      {
        label: 'Views Count',
        data: videos.map(video => video.views || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 0, // Keep x-axis labels horizontal
          minRotation: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend for simplicity
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
      },
    },
  };

  return (
    <div className="container">
      <h1 className="channel-title">{channelData.title}</h1>
      <p className="channel-description">{channelData.description}</p>

      <div className="statistics-container">
        <h3 className="stats-heading">Channel Statistics:</h3>
        <div className="stats-grid">
          <p className="stat-item">Subscribers: <span>{statistics.subscriberCount || 'N/A'}</span></p>
          <p className="stat-item">Total Views: <span>{statistics.viewCount || 'N/A'}</span></p>
          <p className="stat-item">Video Count: <span>{statistics.videoCount || 'N/A'}</span></p>
        </div>
      </div>

      <h2 className="video-heading">Videos:</h2>
      <div className="bar-chart">
        <Bar data={data} options={options} />
      </div>

      <ul className="video-list">
        {videos.map(video => (
          <li className="video-item" key={video.id}>
            <h3 className="video-title">{video.title}</h3>
            <p className="video-description">{video.description}</p>
            <p className="publish-date">Published on: {new Date(video.publishTime).toLocaleDateString()}</p>
            <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
          </li>
        ))}
      </ul>

      <style>
        {`
          .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Roboto', sans-serif;
            background-color: #f4f7fc;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }

          .channel-title {
            font-size: 2.5rem;
            color: red;
            font-weight: 780;
            margin-bottom: 15px;
            text-align: center;
          }

          .channel-description {
            font-size: 1.2rem;
            color: #34495e;
            margin-bottom: 20px;
            text-align: center;
            line-height: 1.8;
          }

          .statistics-container {
            margin-bottom: 30px;
            text-align: center;
          }

          .stats-heading {
            font-size: 1.75rem;
            color: #16a085;
            font-weight: 600;
            margin-bottom: 10px;
          }

          .stats-grid {
            display: flex;
            justify-content: space-around;
            padding: 20px 0;
          }

          .stat-item {
            font-size: 1.25rem;
            color: #2d3e50;
          }

          .stat-item span {
            font-weight: bold;
            color: #2980b9;
          }

          .video-heading {
            font-size: 2rem;
            color: #e74c3c;
            margin-bottom: 25px;
            text-align: center;
          }

          .bar-chart {
            width: 100%;
            margin: 0 auto;
            padding: 0;
            height: 400px;
            color: green;
          }

          .video-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }

          .video-item {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ecf0f1;
            border-radius: 10px;
            background-color: #fff;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          }

          .video-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          }

          .video-title {
            font-size: 1.5rem;
            color: #3498db;
            margin-bottom: 10px;
          }

          .video-description {
            font-size: 1.1rem;
            color: #7f8c8d;
            line-height: 1.6;
            margin-bottom: 10px;
          }

          .publish-date {
            font-size: 0.9rem;
            color: #95a5a6;
          }

          .video-thumbnail {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin-top: 15px;
          }
        `}
      </style>
    </div>
  );
};

export default Channel;
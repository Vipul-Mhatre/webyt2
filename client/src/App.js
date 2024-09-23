import React, { useState } from 'react';
import Channel from './components/Channel';
import logo from './assets/logo.jpeg'; // Adjust the path if needed

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <img src={logo} alt="Logo" className="logo" />
      <div className="loader"></div>
      <p className="mt-4 font-bold text-teal-400 text-2xl">Analyzing youtube channel</p>
      <style>
        {`
        .fixed {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }

          .logo {
            margin-bottom: 20px;
            width: 100px; 
          }

          .loader {
            width: 150px;
            padding: 8px;
            aspect-ratio: 1;
            border-radius: 50%;
            background: #25b09b;
            --_m: 
              conic-gradient(#0700 10%,#000),
              linear-gradient(#000 0 0) content-box;
            -webkit-mask: var(--_m);
                    mask: var(--_m);
            -webkit-mask-composite: source-out;
                    mask-composite: subtract;
            animation: l3 1s infinite linear;
          }

          @keyframes l3 {
            to {
              transform: rotate(1turn);
            }
          }
        `}
      </style>
    </div>
  );
};

const App = () => {
  const [channelId, setChannelId] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Simulate loading for 4 seconds
    setTimeout(() => {
      console.log("Channel ID submitted:", inputValue); // Debugging line
      setChannelId(inputValue);
      setLoading(false);
    }, 4000);
  };

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="input-container flex flex-col items-center">
          <img src={logo} alt="Logo" className="logo" />
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter YouTube Channel ID"
              value={inputValue}
              onChange={handleInputChange}
              required
              className="input-field"
            />
            <button type="submit" className="submit-button">Submit</button>
          </form>
          {channelId && <Channel channelId={channelId} />} {/* Display channel component if ID exists */}
        </div>
      )}
    </div>
  );
};

export default App;
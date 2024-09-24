import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Channel from './components/Channel';
import logo from './assets/logo.jpeg';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
import AnimatedCircles from './components/AnimatedCircles'; 

const firebaseConfig = {
  apiKey: "AIzaSyD_rIJNmpmoSZbHo1xUa-WCld_dkkz8tPQ",
  authDomain: "glowing-harmony-411318.firebaseapp.com",
  databaseURL: "https://glowing-harmony-411318-default-rtdb.firebaseio.com",
  projectId: "glowing-harmony-411318",
  storageBucket: "glowing-harmony-411318.appspot.com",
  messagingSenderId: "125127943597",
  appId: "1:125127943597:web:0a2f9ca6da7e9623376d24",
  measurementId: "G-N9483XGEE"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const App = () => {
  const [user, setUser] = useState(null);
  const [channelId, setChannelId] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('userId', user.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const logOut = async () => {
    try {
      await signOut(firebaseAuth);
      setUser(null);
      toast.success("Logged out successfully");
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
      toast.success("Login successful");
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log("Channel ID submitted:", inputValue);
      setChannelId(inputValue);
      setLoading(false);
    }, 4000);
  };

  return (
    <div className="App">
      <AnimatedCircles /> {/* Animated background component */}
      {!user ? ( // not authenticated user
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
  <img src={logo} alt="Logo" className="logo mb-4" />
  <h1 className="text-3xl font-bold mb-2">Welcome to Web.yt!</h1>
  <p className="text-lg mb-4 text-center">
    Your go-to platform for managing YouTube channels efficiently. Streamline your channel management, engage with your audience, and gain insights into your performance.
  </p>
  <h2 className="text-2xl font-semibold mb-2">Why Choose Web.yt?</h2>
  <ul className="list-disc list-inside mb-4">
    <li><strong>Easy Channel Management:</strong> Manage all your YouTube channels in one place.</li>
    <li><strong>Insightful Analytics:</strong> Understand your channel’s growth and performance metrics.</li>
    <li><strong>Engagement Tools:</strong> Build a community and keep your audience engaged.</li>
    <li><strong>Custom Notifications:</strong> Get timely alerts for important channel events.</li>
  </ul>
  <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
  <p className="mb-4 text-center">
    Signing in is simple! Click the button below to log in with your Google account and start managing your channels effortlessly.
  </p>
  <button onClick={signInWithGoogle} className="btn mb-4">
    Sign in with Google
  </button>
  <footer className="footer mt-6">
    <p>&copy; 2024 Web.yt. All rights reserved.</p>
    <a href="/support" className="footer-link">Support</a>
    <a href="/terms" className="footer-link">Terms of Service</a>
    <a href="/privacy" className="footer-link">Privacy Policy</a>
  </footer>
</div>

      ) : (
        <>
          <div className="user-profile">
            {user.photoURL && <img src={user.photoURL} alt="User Profile" className="profile-pic" />}
            <p className="user-name">{user.displayName}</p>
            <button onClick={logOut} className="btn">Log Out</button>
          </div>
          
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="input-container">
              <img src={logo} alt="Logo" className="logo" />
              <form onSubmit={handleSubmit} className="form">
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
              {channelId && <Channel channelId={channelId} />}
            </div>
          )}
        </>
      )}
      
      <style>
        {`
          .App {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            position: relative;
          }

          .user-profile {
            position: absolute;
            top: 20px;
            right: 20px;
            display: flex;
            align-items: center;
          }

          .profile-pic {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
          }

          .user-name {
            font-size: 16px;
            font-weight: bold;
            margin-right: 10px;
          }

          .btn {
            padding: 5px 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .btn:hover {
            background-color: #0056b3;
          }

          .input-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .logo {
            width: 150px;
            margin-bottom: 20px;
          }

          .form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .input-field {
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 250px;
          }

          .submit-button {
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .submit-button:hover {
            background-color: #218838;
          }

          
        `}
      </style>
    </div>
  );  
}

export default App;
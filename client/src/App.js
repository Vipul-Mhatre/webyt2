import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Channel from './components/Channel';
import logo from './assets/logo.jpeg';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
  apiKey: "AIzaSyD_rIJNmpmoSZbHo1xUa-WCld_dkkz8tPQ",
  authDomain: "glowing-harmony-411318.firebaseapp.com",
  databaseURL: "https://glowing-harmony-411318-default-rtdb.firebaseio.com",
  projectId: "glowing-harmony-411318",
  storageBucket: "glowing-harmony-411318.appspot.com",
  messagingSenderId: "125127943597",
  appId: "1:125127943597:web:0a2f9ca6da7e9623376d24",
  measurementId: "G-N9483XGEEG"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
    <img src={logo} alt="Logo" className="logo" />
    <div className="loader"></div>
    <p className="mt-4 font-bold text-teal-400 text-2xl">Analyzing YouTube channel</p>
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
          --_m: conic-gradient(#0700 10%,#000), linear-gradient(#000 0 0) content-box;
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

const App = () => {
  const [user, setUser] = useState(null);
  const [channelId, setChannelId] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        localStorage.setItem('userId', user.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  const isLoggedIn = !!user;

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

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <button onClick={signInWithGoogle} className="btn">
          Sign in with Google
        </button>
      </div>
    );
  }

  // console.log("User: ",user?.photoURL)
  return (
    <div className="App flex flex-col items-center justify-center min-h-screen">
      <div className="user-profile flex flex-col items-center mb-4">
        {user.photoURL && <img src={user.photoURL} alt="User Profile" className="profile-pic" />}
        <p className="user-name">{user.displayName}</p>
        <button onClick={logOut} className="btn">Log Out</button>
      </div>
  
      {loading ? (
        <div>Loading...</div>
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
          {channelId && <Channel channelId={channelId} />}
        </div>
      )}
    </div>
  );
}  
export default App;

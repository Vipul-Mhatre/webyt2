import React from 'react';

const AnimatedCircles = () => {
  return (
    <div className="animated-background">
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
      <style>
        {`
          .animated-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1; /* Ensures it stays in the background */
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f0f0f0; /* Change background color as desired */
          }

          .circle {
            position: absolute;
            border-radius: 50%;
            background: rgba(37, 176, 155, 0.5);
            animation: float 6s ease-in-out infinite;
            opacity: 0.5;
          }

          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-30px);
            }
            100% {
              transform: translateY(0);
            }
          }

          /* Adjust the size and positions of the circles */
          .circle:nth-child(1) {
            width: 200px;
            height: 200px;
            top: 20%;
            left: 10%;
            animation-duration: 5s;
          }

          .circle:nth-child(2) {
            width: 150px;
            height: 150px;
            top: 60%;
            left: 30%;
            animation-duration: 7s;
          }

          .circle:nth-child(3) {
            width: 100px;
            height: 100px;
            top: 40%;
            right: 15%;
            animation-duration: 6s;
          }

          .circle:nth-child(4) {
            width: 250px;
            height: 250px;
            top: 80%;
            right: 25%;
            animation-duration: 8s;
          }

          .circle:nth-child(5) {
            width: 180px;
            height: 180px;
            top: 30%;
            right: 5%;
            animation-duration: 4s;
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedCircles;
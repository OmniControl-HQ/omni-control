import { useState, useEffect } from 'react';
import TitleBar from './TitleBar';

export default function App() {
  const [clientCount, setClientCount] = useState(0);

  useEffect(() => {
    // TODO: We'll need to expose socket.io to renderer or handle this via preload
    // For now, let's keep the UI
  }, []);

  return (
    <>
      <TitleBar />
      <div className="container">
        <div className="logo-container">
          <svg
            className="logo-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 17l6-6-6-6M12 19h8" />
          </svg>
        </div>
        <h1>OmniControl</h1>
        <div className="status-badge">
          <div className="status-dot"></div>
          Desktop Server Running
        </div>
        <div className="details-box">
          <div className="details-row">
            <span className="label">Socket Port</span>
            <span className="value">5000</span>
          </div>
          <div className="details-row">
            <span className="label">Status</span>
            <span className="value success">Listening</span>
          </div>
          <div className="details-row">
            <span className="label">Connected Clients</span>
            <span className="value" id="client-count">
              {clientCount}
            </span>
          </div>
        </div>
        <p className="instruction">
          Start the mobile app and point it to this machine's local IP on port 5000.
        </p>
      </div>
    </>
  );
}

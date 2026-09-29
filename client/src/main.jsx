import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.css';

function App() {
  return (
    <main className="starter-card">
      <h1>campuslens</h1>
      <p className="tagline">your campus , powered by ai</p>
      <div className="guidelines-box">
        <strong>Team:</strong> campuslens<br />
        <strong>Problem Statement:</strong> CampusLens aims to solve this by building an AI-powered campus intelligence layer that can understand natural-language requests, analyze images, classify campus issues, intelligently match lost and found items, and provide contextual event and academic recommendations
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

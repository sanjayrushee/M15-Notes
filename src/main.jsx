import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';  // Optional: Add Helmet for SEO metadata

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Helmet for global SEO meta tags */}
      <Helmet>
        <title>M15 Notes - Organize Your Ideas</title>
        <meta name="description" content="M15 Notes helps you take and organize notes efficiently and easily." />
        <meta name="keywords" content="notes, organization, productivity, M15 Notes" />
      </Helmet>

      {/* Main content of the application wrapped in <main> */}
      <main role="main" id="main-content">
        <App />
      </main>
    </BrowserRouter>
  </React.StrictMode>
);

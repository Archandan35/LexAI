import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './app/App.jsx';
import './styles/index.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  // Disable browser native scroll restoration so our manual scroll wins.
  if (typeof window !== 'undefined' && window.history?.scrollRestoration) {
    window.history.scrollRestoration = 'manual';
  }

  useLayoutEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

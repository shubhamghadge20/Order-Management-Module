import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from react-dom/client (instead of react-dom)
import './styles/App.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create a root element
root.render(  // Use root.render() instead of ReactDOM.render()
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

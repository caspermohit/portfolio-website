import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/Styles/styles.scss'; // Updated path
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'boxicons/css/boxicons.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

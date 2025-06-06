import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import './styles/fonts.css';
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
